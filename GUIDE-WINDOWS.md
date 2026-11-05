# Vault by Recypro 1.0.0 — Guide Windows

Ce guide explique comment **télécharger**, **installer** et **utiliser** Vault by Recypro sur Windows 10 ou 11.

Deux formats sont disponibles :

| Format | Pour qui ? |
|---|---|
| **Installateur** `Setup.exe` (recommandé) | Installation classique : raccourcis créés automatiquement, désinstalleur inclus |
| **Version portable** `.exe` | Aucune installation : un seul fichier à copier dans un dossier |

- Dépôt : <https://github.com/papyrus448/Vault-by-Recypro>
- Version : **1.0.0** (novembre 2026)

> ⚠️ **Important :** le code source affiché dans le dépôt GitHub **n'est pas exécutable** (ce sont des fichiers `.js`, `.html`, etc.). Les programmes prêts à l'emploi se trouvent uniquement dans la page **Releases**, section **Assets**.

---

## 1. Prérequis

- Windows 10 ou Windows 11, en **64 bits**
- Environ **250 Mo** d'espace libre
- Un accès au dépôt GitHub (public)

---

## 2. Télécharger l'application

1. Ouvrir la page des versions : <https://github.com/papyrus448/Vault-by-Recypro/releases/latest>
2. Descendre jusqu'à la section **Assets**
3. Cliquer sur le fichier souhaité :
   - `Vault-by-Recypro-Setup-1.0.0.exe` → **installateur (recommandé)**
   - `Vault-by-Recypro-1.0.0-portable.exe` → version portable

Le fichier est enregistré dans votre dossier `Téléchargements`.

Liens directs :

```text
https://github.com/papyrus448/Vault-by-Recypro/releases/download/v1.0.0/Vault-by-Recypro-Setup-1.0.0.exe
https://github.com/papyrus448/Vault-by-Recypro/releases/download/v1.0.0/Vault-by-Recypro-1.0.0-portable.exe
```

> Ne téléchargez **pas** le bouton vert « Code » → « Download ZIP » : cela télécharge le code source, pas le programme.

---

## 3. Méthode A — Installer avec l'installateur (recommandé)

### 3.1 Lancer l'installateur

Double-cliquer sur `Vault-by-Recypro-Setup-1.0.0.exe`.

### 3.2 Message SmartScreen

Windows affiche probablement **« Windows a protégé votre ordinateur »**, car l'application n'a pas de signature numérique (certificat payant).

1. Cliquer sur **Informations complémentaires**
2. Cliquer sur **Exécuter quand même**

Si le fichier est bloqué et que rien ne se passe :

1. Clic droit sur le fichier → **Propriétés**
2. En bas de l'onglet **Général**, cocher **Débloquer**
3. **Appliquer**, puis **OK**

### 3.3 Suivre l'assistant

1. **Bienvenue** → **Suivant**
2. **Dossier de destination** : laisser la valeur par défaut (`C:\Users\<votre nom>\AppData\Local\Programs\Vault by Recypro`) ou choisir un autre dossier → **Suivant**
3. **Installer**
4. À la fin, laisser cocher **Lancer Vault by Recypro** → **Terminer**

### 3.4 Ce que l'installateur fait automatiquement

- Copie l'application dans votre profil utilisateur (aucun droit administrateur requis)
- Crée un raccourci sur le **Bureau**
- Crée un raccourci dans le **menu Démarrer**
- Ajoute l'application dans **Paramètres → Applications** (désinstallation propre)
- Installe un désinstalleur `Uninstall.exe`

> Passez directement à la section **5. Utilisation**.

---

## 4. Méthode B — Version portable (sans installation)

### 4.1 Créer un dossier stable sur `C:`

Pourquoi ne pas laisser le fichier dans `Téléchargements` ? Parce que Windows peut nettoyer ce dossier. Un dossier stable évite de perdre l'application.

1. Ouvrir l'Explorateur de fichiers avec `Win + E`
2. Cliquer sur **Ce PC**, puis double-cliquer sur le disque `C:`
3. Clic droit dans un espace vide → **Nouveau** → **Dossier**
4. Nommer le dossier `Apps`
5. Ouvrir `C:\Apps`, puis créer un second dossier nommé `Vault by Recypro`

Vous obtenez :

```text
C:\Apps\Vault by Recypro
```

> **Pourquoi pas `C:\Program Files` ?** Ce dossier exige les droits administrateur (invite UAC) à chaque copie ou modification. `C:\Apps` fonctionne sans droits admin.

### 4.2 Copier le fichier

1. Dans `Téléchargements`, faire un clic droit sur `Vault-by-Recypro-1.0.0-portable.exe` → **Copier**
2. Aller dans `C:\Apps\Vault by Recypro`
3. Clic droit dans le dossier → **Coller**

Résultat :

```text
C:\Apps\Vault by Recypro\Vault-by-Recypro-1.0.0-portable.exe
```

Vous pouvez renommer le fichier en `Vault by Recypro.exe`. Conservez bien l'extension `.exe`.

> ⚠️ Ne déplacez plus le fichier après avoir créé le raccourci, sinon le raccourci ne fonctionnera plus.

### 4.3 Premier lancement et SmartScreen

Double-cliquer sur le fichier, puis, si Windows affiche **« Windows a protégé votre ordinateur »** :

1. **Informations complémentaires**
2. **Exécuter quand même**

### 4.4 Créer le raccourci sur le Bureau

**Méthode la plus simple :**

1. Dans `C:\Apps\Vault by Recypro`, clic droit sur le `.exe`
2. **Envoyer vers** → **Bureau (créer un raccourci)**
3. Sur le Bureau, clic droit sur le raccourci → **Renommer** → `Vault by Recypro`

**Si « Envoyer vers » n'apparaît pas :**

1. Clic droit sur le Bureau → **Nouveau** → **Raccourci**
2. **Parcourir**, sélectionner le `.exe`, puis **Suivant**
3. Nommer `Vault by Recypro`, puis **Terminer**

**Changer l'icône (facultatif) :** clic droit sur le raccourci → **Propriétés** → **Changer d'icône** → **Parcourir** → sélectionner le `.exe` → **OK**.

**Épingler :**

- Menu Démarrer : clic droit sur le raccourci → **Épingler à l'écran de démarrage**
- Barre des tâches : lancer l'application, clic droit sur son icône → **Épingler à la barre des tâches**

---

## 5. Utilisation

### 5.1 Créer le mot de passe principal (première fois)

Au premier lancement, une fenêtre **« Définir un mot de passe principal »** s'affiche.

1. Saisir un mot de passe long et unique (idéalement une phrase de passe de 4 mots ou plus)
2. Cliquer sur **Définir**

> ⚠️ **Ce mot de passe n'est stocké nulle part.** S'il est perdu, les mots de passe enregistrés sont **irrécupérables**.

### 5.2 Ajouter un mot de passe

1. Remplir **Site web / Service**, **Nom d'utilisateur / Email** et **Mot de passe**
2. Bouton **Générer** : crée un mot de passe fort de 16 caractères (majuscules, minuscules, chiffres, symboles)
3. Bouton **Afficher** : affiche temporairement le mot de passe saisi
4. La barre de couleur indique la force du mot de passe (rouge → jaune → vert)
5. Cliquer sur **Ajouter**

### 5.3 Consulter, copier, afficher

Chaque entrée de la liste propose quatre boutons :

| Bouton | Action |
|---|---|
| **Modifier** | Ouvre une fenêtre pour changer le site, l'utilisateur ou le mot de passe |
| **Copier** | Copie le mot de passe dans le presse-papiers (message « Copié! ») |
| **Afficher** | Affiche le mot de passe en clair ; un second clic le masque |
| **Supprimer** | Supprime l'entrée |

> Sur un poste partagé, videz le presse-papiers après avoir collé le mot de passe.

### 5.4 Rechercher

Le champ **« Rechercher par site ou utilisateur »** filtre la liste en temps réel.

### 5.5 Modifier une entrée

Cliquer sur **Modifier**, changer les champs, puis **Sauvegarder**.

### 5.6 Supprimer une entrée

Cliquer sur **Supprimer**.

> ⚠️ **Aucune confirmation n'est demandée** : la suppression est immédiate.

### 5.7 Exporter en `.txt`

1. Cliquer sur **Exporter en .txt**
2. Lire l'avertissement et confirmer
3. Choisir l'emplacement dans la boîte **Enregistrer sous**

> ⚠️ Le fichier exporté **n'est pas chiffré** : n'importe qui peut le lire. Conservez-le dans un endroit sûr et supprimez-le après usage. Ne l'envoyez jamais par courriel.

### 5.8 Changer le mot de passe principal

1. Cliquer sur **Changer le mot de passe principal**
2. Saisir l'ancien mot de passe, le nouveau, puis la confirmation
3. Cliquer sur **Confirmer**

Les données sont re-chiffrées avec le nouveau mot de passe.

---

## 6. Où sont stockées les données

Les mots de passe sont enregistrés sur l'ordinateur, dans :

```text
C:\Users\<votre nom>\AppData\Roaming\Vault by Recypro\
```

Accès rapide : `Win + R`, taper `%APPDATA%\Vault by Recypro`, puis `Entrée`.

Caractéristiques :

- Chiffrement **AES-256-GCM**
- Clé dérivée du mot de passe principal par **PBKDF2-SHA256** (100 000 itérations)
- Le programme **ne contient aucune donnée** : copier le `.exe` sur un autre PC ne copie pas les mots de passe
- Les données sont **propres à chaque compte Windows**
- Supprimer ce dossier efface **définitivement** les mots de passe

> L'installateur et le désinstalleur **ne touchent pas** à ce dossier : vos mots de passe survivent à une désinstallation.

---

## 7. Sauvegarde et restauration

### Sauvegarder (application fermée)

1. `Win + R` → taper `%APPDATA%` → `Entrée`
2. Copier le dossier `Vault by Recypro` vers une clé USB ou un disque externe

### Restaurer

1. Fermer l'application
2. Recopier le dossier sauvegardé dans `%APPDATA%`
3. Relancer l'application

> La sauvegarde reste chiffrée : le mot de passe principal est nécessaire pour la lire.
> Sauvegardez régulièrement, et **toujours avant une mise à jour**.

---

## 8. Mise à jour

**Avec l'installateur :**

1. Télécharger le nouveau `Vault-by-Recypro-Setup-<version>.exe`
2. Fermer l'application
3. Lancer le nouvel installateur : il remplace l'ancienne version
4. Vos données dans `%APPDATA%` sont conservées

**Avec la version portable :**

1. Télécharger le nouveau `.exe`
2. Fermer l'application
3. Remplacer l'ancien fichier par le nouveau (même dossier, même nom)
4. Relancer

Faites une sauvegarde avant l'opération.

---

## 9. Désinstallation

**Avec l'installateur :**

1. **Paramètres** → **Applications** → **Applications installées**
2. Chercher **Vault by Recypro** → **Désinstaller**
3. Ou lancer `Uninstall.exe` depuis le dossier d'installation

**Avec la version portable :**

1. Fermer l'application
2. Supprimer le dossier `C:\Apps\Vault by Recypro` et le raccourci du Bureau

**Pour effacer aussi les mots de passe** (dans les deux cas) : supprimer `%APPDATA%\Vault by Recypro`.

---

## 10. Dépannage

| Problème | Solution |
|---|---|
| « Windows a protégé votre ordinateur » | **Informations complémentaires** → **Exécuter quand même** |
| Rien ne se passe au double-clic | Clic droit → **Propriétés** → cocher **Débloquer** |
| Le fichier téléchargé n'est pas un `.exe` | Vous avez téléchargé le code source : utiliser la section **Assets** de la page **Releases** |
| Le raccourci ne fonctionne plus (portable) | Le `.exe` a été déplacé ou renommé : recréer le raccourci |
| Mot de passe principal oublié | Aucune récupération possible ; restaurer une sauvegarde si elle existe |
| L'application ne s'ouvre pas | Elle est peut-être déjà ouverte (une seule instance autorisée) |
| Les mots de passe ont disparu | Vérifier que vous êtes sur le **même compte Windows** ; les données sont par utilisateur |
| L'antivirus bloque l'application | Ajouter une exclusion pour le dossier d'installation |

---

## 11. Bonnes pratiques de sécurité

- Choisir un mot de passe principal **long et unique** (phrase de passe)
- Ne jamais transmettre l'export `.txt` par courriel ni par messagerie
- Verrouiller la session Windows (`Win + L`) en quittant le poste
- Sauvegarder régulièrement le dossier `%APPDATA%\Vault by Recypro`
- Ne télécharger l'application que depuis la page **Releases** officielle du dépôt

---

## 12. Limites connues de la version 1.0.0

- Pas de verrouillage automatique après inactivité
- Pas de confirmation avant la suppression d'une entrée
- L'export `.txt` n'est pas chiffré
- Pas de signature numérique (message SmartScreen au premier lancement)
- Pas de synchronisation entre plusieurs ordinateurs
