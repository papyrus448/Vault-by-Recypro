# Vault by Recypro — version Windows

Ce dossier contient l'application web d'origine **plus** la configuration nécessaire pour la transformer en programme Windows.

## Résultat

- **`dist/Vault-by-Recypro-1.0.0-portable.exe`** → le programme Windows, en un seul fichier (aucune installation).
  Double-clic pour lancer. L'icône utilisée est `img/icon.png` (convertie en `build/icon.ico`).

## Où sont stockés les mots de passe ?

Les données sont chiffrées (AES-GCM, clé dérivée du mot de passe principal par PBKDF2) et enregistrées sur l'ordinateur, dans :

```
C:\Users\<votre nom>\AppData\Roaming\Vault by Recypro\
```

Conséquences :
- fermer puis rouvrir le programme conserve les données ;
- copier le `.exe` sur un autre PC **ne copie pas** les mots de passe ;
- désinstaller/supprimer ce dossier `AppData\Roaming\Vault by Recypro` efface définitivement les données.

Le bouton « Exporter en .txt » ouvre une boîte de dialogue Windows « Enregistrer sous ».

## Reconstruire le .exe

Prérequis : Node.js 20+ et npm.

```bash
npm install
npm run dist:win
```

Cela enchaîne :
1. `pack:win` : copie de l'application + Electron dans `dist/win-unpacked/` ;
2. `patch:win` : injection de l'icône et des informations de version dans l'exécutable (via `resedit`, sans Wine) ;
3. création du fichier portable dans `dist/`.

Pour tester l'application sur Linux : `npm start`.

## Créer un vrai installateur (Setup.exe)

Deux méthodes sont disponibles.

### Sans Wine (recommandé sous Linux)

L'installateur NSIS est décrit dans `installer.nsi` et se compile avec le `makensis` fourni par electron-builder :

```bash
npm run dist:win:installer:linux
```

Cela produit `dist/Vault-by-Recypro-Setup-<version>.exe`. L'installateur installe l'application dans le profil utilisateur, crée les raccourcis Bureau et menu Démarrer, et ajoute un désinstalleur (données `%APPDATA%` conservées).

### Avec electron-builder (nécessite Wine)

```bash
npm run dist:win:installer
```

⚠️ Cette variante utilise NSIS via electron-builder et nécessite **Wine** sur Linux (ou de lancer la commande sous Windows) :

```bash
sudo pacman -S wine        # Arch / Omarchy
```

## Fichiers ajoutés

| Fichier | Rôle |
|---|---|
| `package.json` | configuration Electron + electron-builder |
| `main.js` | fenêtre de l'application (sécurité, export .txt, icône) |
| `build/icon.ico` | icône Windows générée depuis `img/icon.png` |
| `scripts/patch-exe.js` | injection de l'icône/version sans Wine |
| `dist/` | fichiers produits (ignorés lors d'une future mise en ligne) |

Le site (`data/index.html`, `data/style.css`, `data/script.js` et `img/`) n'a pas été modifié.
