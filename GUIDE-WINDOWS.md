# Vault by Recypro 1.0.0 — Guide Windows

Ce guide explique comment **télécharger**, **installer** et **utiliser** Vault by Recypro sur Windows 10 ou 11.

**En résumé :** l'application tient dans un seul fichier `.exe` (72 Mo). Aucune installation classique n'est nécessaire : on copie le fichier dans un dossier sur `C:`, on crée un raccourci sur le Bureau, et c'est prêt.

- Dépôt : <https://github.com/papyrus448/Vault-by-Recypro>
- Version : **1.0.0** (novembre 2026)

---

## 1. Prérequis

- Windows 10 ou Windows 11, en **64 bits**
- Environ **150 Mo** d'espace libre
- Un accès au dépôt GitHub (le dépôt est **privé** : il faut être connecté avec un compte autorisé)

---

## 2. Télécharger l'application

1. Ouvrir la page des versions : <https://github.com/papyrus448/Vault-by-Recypro/releases/latest>
2. Dans la section **Assets**, cliquer sur `Vault-by-Recypro-1.0.0-portable.exe`
3. Le fichier est enregistré dans votre dossier `Téléchargements`

Lien de téléchargement direct :

```text
https://github.com/papyrus448/Vault-by-Recypro/releases/download/v1.0.0/Vault-by-Recypro-1.0.0-portable.exe
```

> **Dépôt privé :** pour qu'un client puisse télécharger sans compte GitHub, partagez-lui directement le fichier `.exe` (OneDrive, WeTransfer, clé USB), ou rendez le dépôt public, ou ajoutez-le comme collaborateur.

---

## 3. Copier l'application sur le disque `C:`

Pourquoi ne pas la laisser dans `Téléchargements` ? Parce que Windows peut nettoyer ce dossier, et son chemin change d'un utilisateur à l'autre. Un dossier stable évite de perdre l'application.

### 3.1 Créer le dossier

1. Ouvrir l'Explorateur de fichiers avec `Win + E`
2. Cliquer sur **Ce PC**, puis double-cliquer sur le disque `C:`
3. Clic droit dans un espace vide → **Nouveau** → **Dossier**
4. Nommer le dossier `Apps`
5. Ouvrir `C:\Apps`, puis créer un second dossier nommé `Vault by Recypro`

Vous obtenez :

```text
C:\Apps\Vault by Recypro
```

> **Pourquoi pas `C:\Program Files` ?** Ce dossier exige les droits administrateur (invite UAC) à chaque copie ou modification. `C:\Apps` fonctionne sans droits admin. Évitez aussi de déposer le fichier directement à la racine `C:\`.

### 3.2 Copier le fichier

1. Dans `Téléchargements`, faire un clic droit sur `Vault-by-Recypro-1.0.0-portable.exe` → **Copier**
2. Aller dans `C:\Apps\Vault by Recypro`
3. Clic droit dans le dossier → **Coller**

Résultat :

```text
C:\Apps\Vault by Recypro\Vault-by-Recypro-1.0.0-portable.exe
```

Vous pouvez renommer le fichier en `Vault by Recypro.exe` (clic droit → **Renommer**). Conservez bien l'extension `.exe`.

> ⚠️ Ne déplacez plus le fichier après avoir créé le raccourci, sinon le raccourci ne fonctionnera plus.

---

## 4. Premier lancement : le message SmartScreen

Au premier lancement, Windows affiche probablement **« Windows a protégé votre ordinateur »**. C'est normal : l'application n'a pas de signature numérique (certificat payant).

1. Cliquer sur **Informations complémentaires**
2. Cliquer sur **Exécuter quand même**

Si le fichier est bloqué et que rien ne se passe :

1. Clic droit sur le `.exe` → **Propriétés**
2. En bas de l'onglet **Général**, cocher **Débloquer**
3. Cliquer sur **Appliquer**, puis **OK**

> Si un antivirus met le fichier en quarantaine, ajoutez une exclusion pour le dossier `C:\Apps\Vault by Recypro`.

---

## 5. Créer le raccourci sur le Bureau

### Méthode A — la plus simple

1. Dans `C:\Apps\Vault by Recypro`, faire un clic droit sur le fichier `.exe`
2. Choisir **Envoyer vers** → **Bureau (créer un raccourci)**
3. Sur le Bureau, faire un clic droit sur le nouveau raccourci → **Renommer** → `Vault by Recypro`

### Méthode B — si « Envoyer vers » n'apparaît pas

1. Clic droit sur le Bureau → **Nouveau** → **Raccourci**
2. Cliquer sur **Parcourir**, sélectionner le `.exe`, puis **Suivant**
3. Nommer le raccourci `Vault by Recypro`, puis **Terminer**

### Changer l'icône (facultatif)

L'icône est déjà intégrée au fichier `.exe` :

1. Clic droit sur le raccourci → **Propriétés**
2. Onglet **Raccourci** → **Changer d'icône**
3. **Parcourir** → sélectionner le `.exe` → **OK**

### Épingler au menu Démarrer ou à la barre des tâches

- **Menu Démarrer :** clic droit sur le raccourci → **Épingler à l'écran de démarrage**
- **Barre des tâches :** lancer l'application, puis clic droit sur son icône dans la barre → **Épingler à la barre des tâches**

---

## 6. Utilisation

### 6.1 Créer le mot de passe principal (première fois)

Au premier lancement, une fenêtre **« Définir un mot de passe principal »** s'affiche.

1. Saisir un mot de passe long et unique (idéalement une phrase de passe de 4 mots ou plus)
2. Cliquer sur **Définir**

> ⚠️ **Ce mot de passe n'est stocké nulle part.** S'il est perdu, les mots de passe enregistrés sont **irrécupérables**.

### 6.2 Ajouter un mot de passe

1. Remplir **Site web / Service**, **Nom d'utilisateur / Email** et **Mot de passe**
2. Bouton **Générer** : crée un mot de passe fort de 16 caractères (majuscules, minuscules, chiffres, symboles)
3. Bouton **Afficher** : affiche temporairement le mot de passe saisi
4. La barre de couleur indique la force du mot de passe (rouge → jaune → vert)
5. Cliquer sur **Ajouter**

### 6.3 Consulter, copier, afficher

Chaque entrée de la liste propose quatre boutons :

| Bouton | Action |
|---|---|
| **Modifier** | Ouvre une fenêtre pour changer le site, l'utilisateur ou le mot de passe |
| **Copier** | Copie le mot de passe dans le presse-papiers (message « Copié! ») |
| **Afficher** | Affiche le mot de passe en clair ; un second clic le masque |
| **Supprimer** | Supprime l'entrée |

> Sur un poste partagé, videz le presse-papiers après avoir collé le mot de passe.

### 6.4 Rechercher

Le champ **« Rechercher par site ou utilisateur »** filtre la liste en temps réel.

### 6.5 Modifier une entrée

Cliquer sur **Modifier**, changer les champs, puis **Sauvegarder**.

### 6.6 Supprimer une entrée

Cliquer sur **Supprimer**.

> ⚠️ **Aucune confirmation n'est demandée** : la suppression est immédiate.

### 6.7 Exporter en `.txt`

1. Cliquer sur **Exporter en .txt**
2. Lire l'avertissement et confirmer
3. Choisir l'emplacement dans la boîte **Enregistrer sous**

> ⚠️ Le fichier exporté **n'est pas chiffré** : n'importe qui peut le lire. Conservez-le dans un endroit sûr (clé USB chiffrée, coffre-fort) et supprimez-le après usage. Ne l'envoyez jamais par courriel.

### 6.8 Changer le mot de passe principal

1. Cliquer sur **Changer le mot de passe principal**
2. Saisir l'ancien mot de passe, le nouveau, puis la confirmation
3. Cliquer sur **Confirmer**

Les données sont re-chiffrées avec le nouveau mot de passe.

---

## 7. Où sont stockées les données

Les mots de passe sont enregistrés sur l'ordinateur, dans :

```text
C:\Users\<votre nom>\AppData\Roaming\Vault by Recypro\
```

Accès rapide : `Win + R`, taper `%APPDATA%\Vault by Recypro`, puis `Entrée`.

Caractéristiques :

- Chiffrement **AES-256-GCM**
- Clé dérivée du mot de passe principal par **PBKDF2-SHA256** (100 000 itérations)
- Le fichier `.exe` **ne contient aucune donnée** : copier le `.exe` sur un autre PC ne copie pas les mots de passe
- Les données sont **propres à chaque compte Windows**
- Supprimer ce dossier efface **définitivement** les mots de passe

---

## 8. Sauvegarde et restauration

### Sauvegarder (application fermée)

1. `Win + R` → taper `%APPDATA%` → `Entrée`
2. Copier le dossier `Vault by Recypro` vers une clé USB ou un disque externe
3. Conserver également une copie du fichier `.exe`

### Restaurer

1. Fermer l'application
2. Recopier le dossier sauvegardé dans `%APPDATA%`
3. Relancer l'application

> La sauvegarde reste chiffrée : le mot de passe principal est nécessaire pour la lire.
> Sauvegardez régulièrement, et **toujours avant une mise à jour**.

---

## 9. Mise à jour

1. Télécharger le nouveau `.exe` depuis la page **Releases**
2. Fermer l'application
3. Remplacer l'ancien fichier par le nouveau (garder le même nom et le même dossier)
4. Relancer l'application

Les données restent dans `%APPDATA%` et sont conservées. Faites une sauvegarde avant l'opération.

---

## 10. Désinstallation

1. Fermer l'application
2. Supprimer le dossier `C:\Apps\Vault by Recypro` et le raccourci du Bureau
3. Pour effacer aussi les mots de passe : supprimer `%APPDATA%\Vault by Recypro`

Il n'y a pas de désinstalleur, car il s'agit d'une version **portable**.

---

## 11. Dépannage

| Problème | Solution |
|---|---|
| « Windows a protégé votre ordinateur » | **Informations complémentaires** → **Exécuter quand même** |
| Rien ne se passe au double-clic | Clic droit → **Propriétés** → cocher **Débloquer** |
| Le raccourci ne fonctionne plus | Le `.exe` a été déplacé ou renommé : recréer le raccourci |
| Mot de passe principal oublié | Aucune récupération possible ; restaurer une sauvegarde si elle existe |
| L'application ne s'ouvre pas | Elle est peut-être déjà ouverte (une seule instance autorisée) |
| Les mots de passe ont disparu | Vérifier que vous êtes sur le **même compte Windows** ; les données sont par utilisateur |
| L'antivirus bloque l'application | Ajouter une exclusion pour `C:\Apps\Vault by Recypro` |

---

## 12. Bonnes pratiques de sécurité

- Choisir un mot de passe principal **long et unique** (phrase de passe)
- Ne jamais transmettre l'export `.txt` par courriel ni par messagerie
- Verrouiller la session Windows (`Win + L`) en quittant le poste
- Sauvegarder régulièrement le dossier `%APPDATA%\Vault by Recypro`
- Ne télécharger l'application que depuis la page **Releases** officielle du dépôt

---

## 13. Limites connues de la version 1.0.0

- Pas de verrouillage automatique après inactivité
- Pas de confirmation avant la suppression d'une entrée
- L'export `.txt` n'est pas chiffré
- Pas de signature numérique (message SmartScreen au premier lancement)
- Pas de synchronisation entre plusieurs ordinateurs
