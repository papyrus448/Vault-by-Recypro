const { app, BrowserWindow, Menu, dialog, session, shell } = require('electron');
const path = require('node:path');

const APP_NAME = 'Vault by Recypro';

// Une seule instance de l'application à la fois.
if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 800,
        minWidth: 820,
        minHeight: 600,
        show: false,
        title: APP_NAME,
        backgroundColor: '#ffffff',
        icon: path.join(__dirname, 'img', 'icon.png'),
        autoHideMenuBar: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true,
            spellcheck: false
        }
    });

    // Pas de menu "Fichier / Édition / Affichage" : l'app est autonome.
    Menu.setApplicationMenu(null);
    mainWindow.setMenuBarVisibility(false);

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.loadFile(path.join(__dirname, 'data', 'index.html'));

    // Sécurité : aucun lien ne doit remplacer l'application par une page externe.
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (/^https?:\/\//i.test(url)) shell.openExternal(url);
        return { action: 'deny' };
    });
    mainWindow.webContents.on('will-navigate', (event) => event.preventDefault());

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('second-instance', () => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
    }
});

app.whenReady().then(() => {
    // Identifiant Windows (icône de la barre des tâches, notifications).
    app.setAppUserModelId('com.recypro.vault');

    // L'export .txt de l'application déclenche un téléchargement :
    // on propose une vraie boîte de dialogue "Enregistrer sous".
    session.defaultSession.on('will-download', (event, item) => {
        const defaultPath = path.join(app.getPath('downloads'), item.getFilename());
        const savePath = dialog.showSaveDialogSync(mainWindow, {
            title: 'Enregistrer la sauvegarde',
            defaultPath,
            filters: [
                { name: 'Fichier texte', extensions: ['txt'] },
                { name: 'Tous les fichiers', extensions: ['*'] }
            ]
        });
        if (savePath) {
            item.setSavePath(savePath);
        } else {
            item.cancel();
        }
    });

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
