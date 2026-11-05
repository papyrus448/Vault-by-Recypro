// Injecte l'icône et les informations de version dans l'exécutable Windows.
// Utilise `resedit` (pur JavaScript) : aucune installation de Wine n'est nécessaire.
const fs = require('node:fs');
const path = require('node:path');
const { NtExecutable, NtExecutableResource, Resource, Data } = require('resedit');

const root = path.resolve(__dirname, '..');
const exePath = path.join(root, 'dist', 'win-unpacked', 'Vault by Recypro.exe');
const icoPath = path.join(root, 'build', 'icon.ico');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

if (!fs.existsSync(exePath)) {
    console.error(`Exécutable introuvable : ${exePath}`);
    process.exit(1);
}

const exe = NtExecutable.from(fs.readFileSync(exePath));
const res = NtExecutableResource.from(exe);

// --- Icône ---
const iconFile = Data.IconFile.from(fs.readFileSync(icoPath));
const iconData = iconFile.icons.map((i) => i.data);
const groups = Resource.IconGroupEntry.fromEntries(res.entries);
if (groups.length === 0) {
    Resource.IconGroupEntry.replaceIconsForResource(res.entries, 1, 1033, iconData);
} else {
    for (const group of groups) {
        Resource.IconGroupEntry.replaceIconsForResource(res.entries, group.id, group.lang, iconData);
    }
}

// --- Informations de version ---
const [major, minor, patch] = pkg.version.split('.').map((n) => parseInt(n, 10) || 0);
const versionInfos = Resource.VersionInfo.fromEntries(res.entries);
for (const vi of versionInfos) {
    for (const language of vi.getAllLanguagesForStringValues()) {
        vi.setStringValues(language, {
            CompanyName: pkg.author || 'Recypro',
            FileDescription: pkg.description || pkg.productName,
            FileVersion: pkg.version,
            InternalName: pkg.productName,
            LegalCopyright: `Copyright © ${new Date().getFullYear()} ${pkg.author || 'Recypro'}`,
            OriginalFilename: `${pkg.productName}.exe`,
            ProductName: pkg.productName,
            ProductVersion: pkg.version
        });
    }
    vi.setFileVersion(major, minor, patch, 0);
    vi.setProductVersion(major, minor, patch, 0);
    vi.outputToResourceEntries(res.entries);
}

res.outputResource(exe);
fs.writeFileSync(exePath, Buffer.from(exe.generate()));
console.log(`Icône et version appliquées à : ${exePath}`);
