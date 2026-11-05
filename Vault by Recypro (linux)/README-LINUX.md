# Vault by Recypro — version Linux

## Résultat

- **`dist/Vault-by-Recypro-1.0.0-x86_64.AppImage`** (104 Mo) → fichier unique, aucune installation.
- **`dist/Vault-by-Recypro-1.0.0-x64.tar.gz`** (98 Mo) → version « dossier » si l'AppImage ne démarre pas (FUSE absent, etc.).

## Utilisation

```bash
chmod +x "Vault-by-Recypro-1.0.0-x86_64.AppImage"
./"Vault-by-Recypro-1.0.0-x86_64.AppImage"
```

Ou double-clic dans le gestionnaire de fichiers (le bit exécutable doit être activé).
Sur certains systèmes, l'AppImage demande `libfuse2` :

```bash
sudo pacman -S fuse2        # Arch / Omarchy
```

Sinon, version sans FUSE :

```bash
tar -xzf Vault-by-Recypro-1.0.0-x64.tar.gz
./Vault-by-Recypro-1.0.0/vault-by-recypro
```

## Où sont stockés les mots de passe ?

Chiffrés (AES-GCM, clé dérivée du mot de passe principal par PBKDF2), dans :

```
~/.config/Vault by Recypro/
```

Fermer/rouvrir l'application conserve les données ; supprimer ce dossier les efface définitivement.

## Structure du projet

```
Vault by Recypro (linux)/
├── data/            ← le site (index.html, style.css, script.js)
├── img/             ← logo + icône
├── build/           ← icon.png (512 px) et icon.ico
├── main.js          ← fenêtre Electron (charge data/index.html)
├── package.json     ← configuration + cibles AppImage / tar.gz
└── dist/            ← fichiers produits
```

## Reconstruire

```bash
npm install
npm run dist:linux
```

Ou seulement tester sans empaqueter : `npm start`.

## Notes

- L'AppImage lance Chromium avec `--no-sandbox` (comportement par défaut d'electron-builder pour ce format). L'application ne charge que des fichiers locaux, `nodeIntegration` est désactivé et `contextIsolation` est activé.
- Aucune signature de code : Linux n'en a pas besoin, mais certains environnements (AppArmor/SELinux stricts) peuvent demander une autorisation au premier lancement.
