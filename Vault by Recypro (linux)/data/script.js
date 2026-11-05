document.addEventListener('DOMContentLoaded', () => {
    // --- Éléments du DOM ---
    const mainContainer = document.getElementById('main-container');
    const passwordForm = document.getElementById('password-form');
    const siteInput = document.getElementById('site-input');
    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');
    const passwordsList = document.getElementById('passwords-list');
    const searchInput = document.getElementById('search-input');
    const generatePasswordBtn = document.getElementById('generate-password-btn');
    const togglePasswordBtn = document.getElementById('toggle-password-btn');
    const passwordStrengthBar = document.getElementById('password-strength-bar');
    const changeMasterPasswordBtn = document.getElementById('change-master-password-btn');
    const exportPasswordsBtn = document.getElementById('export-passwords-btn');

    // Modal de connexion
    const modal = document.getElementById('master-password-modal');
    const masterPasswordForm = document.getElementById('master-password-form');
    const masterPasswordInput = document.getElementById('master-password-input');
    const masterPasswordError = document.getElementById('master-password-error');

    // Modal de changement de mot de passe
    const changePasswordModal = document.getElementById('change-password-modal');
    const changePasswordForm = document.getElementById('change-password-form');
    const oldMasterPasswordInput = document.getElementById('old-master-password');
    const newMasterPasswordInput = document.getElementById('new-master-password');
    const confirmNewMasterPasswordInput = document.getElementById('confirm-new-master-password');
    const changePasswordError = document.getElementById('change-password-error');
    const cancelChangePasswordBtn = document.getElementById('cancel-change-password');

    // Modal de modification d'entrée
    const editPasswordModal = document.getElementById('edit-password-modal');
    const editPasswordForm = document.getElementById('edit-password-form');
    const editPasswordIndex = document.getElementById('edit-password-index');
    const editSiteInput = document.getElementById('edit-site-input');
    const editUsernameInput = document.getElementById('edit-username-input');
    const editPasswordInput = document.getElementById('edit-password-input');
    const cancelEditPasswordBtn = document.getElementById('cancel-edit-password');

    // --- État de l'application ---
    let encryptionKey = null;
    let decryptedPasswords = [];

    // --- Fonctions de chiffrement (Crypto) ---
    const deriveKey = (password, salt) => {
        const encoder = new TextEncoder();
        return window.crypto.subtle.importKey('raw', encoder.encode(password), { name: 'PBKDF2' }, false, ['deriveKey'])
            .then(baseKey => window.crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, baseKey, { name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']));
    };

    const encrypt = (data, key) => {
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const encodedData = new TextEncoder().encode(data);
        return window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encodedData)
            .then(encryptedContent => {
                const fullEncryptedData = new Uint8Array(iv.length + encryptedContent.byteLength);
                fullEncryptedData.set(iv);
                fullEncryptedData.set(new Uint8Array(encryptedContent), iv.length);
                return btoa(String.fromCharCode.apply(null, fullEncryptedData));
            });
    };

    const decrypt = (encryptedDataB64, key) => {
        const encryptedData = new Uint8Array(atob(encryptedDataB64).split('').map(c => c.charCodeAt(0)));
        const iv = encryptedData.slice(0, 12);
        const content = encryptedData.slice(12);
        return window.crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, content)
            .then(decryptedContent => new TextDecoder().decode(decryptedContent));
    };

    // --- Fonctions de l'application ---
    const getPasswords = () => decryptedPasswords;

    const savePasswords = (passwords) => {
        decryptedPasswords = passwords;
        encrypt(JSON.stringify(passwords), encryptionKey).then(encryptedData => {
            const existingData = JSON.parse(localStorage.getItem('passwordManagerData')) || {};
            existingData.passwords = encryptedData;
            localStorage.setItem('passwordManagerData', JSON.stringify(existingData));
        });
    };

    const renderPasswords = (filter = '') => {
        passwordsList.innerHTML = '';
        const passwords = getPasswords();
        const lowerCaseFilter = filter.toLowerCase();
        const filteredPasswords = passwords.filter(p => p.site.toLowerCase().includes(lowerCaseFilter) || p.username.toLowerCase().includes(lowerCaseFilter));
        if (filteredPasswords.length === 0) { passwordsList.innerHTML = '<p>Aucun mot de passe à afficher.</p>'; return; }
        filteredPasswords.forEach(p => {
            const originalIndex = passwords.findIndex(pwd => pwd === p);
            const passwordItem = document.createElement('div');
            passwordItem.className = 'password-item';
            passwordItem.innerHTML = `
                <div class="password-info">
                    <strong>${p.site}</strong><br>
                    Utilisateur: ${p.username}<br>
                    Mot de passe: <span class="password-display">••••••••</span>
                </div>
                <div class="password-actions">
                    <button class="edit-btn" data-index="${originalIndex}">Modifier</button>
                    <button class="copy-btn" data-index="${originalIndex}">Copier</button>
                    <button class="show-btn" data-index="${originalIndex}">Afficher</button>
                    <button class="delete-btn" data-index="${originalIndex}">Supprimer</button>
                </div>
            `;
            passwordsList.appendChild(passwordItem);
        });
    };

    const addPassword = (e) => {
        e.preventDefault();
        if (!siteInput.value || !usernameInput.value || !passwordInput.value) return;
        const newPassword = { site: siteInput.value, username: usernameInput.value, password: passwordInput.value };
        const passwords = getPasswords();
        passwords.push(newPassword);
        savePasswords(passwords);
        passwordForm.reset();
        updatePasswordStrength();
        setPasswordVisibility(false);
        renderPasswords(searchInput.value);
    };

    const handlePasswordActions = (e) => {
        const target = e.target;
        const index = target.dataset.index;
        if (index === undefined) return;
        let passwords = getPasswords();
        const password = passwords[index];

        if (target.classList.contains('edit-btn')) {
            editPasswordIndex.value = index;
            editSiteInput.value = password.site;
            editUsernameInput.value = password.username;
            editPasswordInput.value = password.password;
            editPasswordModal.style.display = 'flex';
        }

        if (target.classList.contains('delete-btn')) {
            passwords.splice(index, 1);
            savePasswords(passwords);
            renderPasswords(searchInput.value);
        }
        if (target.classList.contains('show-btn')) {
            const passwordDisplay = target.closest('.password-item').querySelector('.password-display');
            if (target.textContent === 'Afficher') { passwordDisplay.textContent = password.password; target.textContent = 'Cacher'; } else { passwordDisplay.textContent = '••••••••'; target.textContent = 'Afficher'; }
        }
        if (target.classList.contains('copy-btn')) {
            navigator.clipboard.writeText(password.password).then(() => { target.textContent = 'Copié!'; setTimeout(() => { target.textContent = 'Copier'; }, 2000); });
        }
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const index = editPasswordIndex.value;
        const passwords = getPasswords();
        passwords[index] = {
            site: editSiteInput.value,
            username: editUsernameInput.value,
            password: editPasswordInput.value
        };
        savePasswords(passwords);
        renderPasswords(searchInput.value);
        editPasswordModal.style.display = 'none';
    };

    const setPasswordVisibility = (visible) => {
        passwordInput.type = visible ? 'text' : 'password';
        togglePasswordBtn.textContent = visible ? 'Cacher' : 'Afficher';
    };

    const togglePasswordVisibility = () => {
        setPasswordVisibility(passwordInput.type === 'password');
    };

    const generatePassword = () => {
        const length = 16;
        const charset = { lowercase: 'abcdefghijklmnopqrstuvwxyz', uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', numbers: '0123456789', symbols: '!@#$%^&*()_+-=[]{}|;:,.<>/?' };
        let password = '';
        const allChars = Object.values(charset).join('');
        password += charset.lowercase[Math.floor(Math.random() * charset.lowercase.length)];
        password += charset.uppercase[Math.floor(Math.random() * charset.uppercase.length)];
        password += charset.numbers[Math.floor(Math.random() * charset.numbers.length)];
        password += charset.symbols[Math.floor(Math.random() * charset.symbols.length)];
        for (let i = password.length; i < length; i++) { password += allChars[Math.floor(Math.random() * allChars.length)]; }
        passwordInput.value = password.split('').sort(() => 0.5 - Math.random()).join('');
        updatePasswordStrength();
    };

    const updatePasswordStrength = () => {
        const password = passwordInput.value;
        let score = 0;
        if (!password) { passwordStrengthBar.style.width = '0%'; return; }
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;
        let width = (score / 5) * 100;
        let color = '#e74c3c';
        if (score >= 4) { color = '#2ecc71'; } else if (score >= 2) { color = '#f1c40f'; }
        passwordStrengthBar.style.width = `${width}%`;
        passwordStrengthBar.style.backgroundColor = color;
    };

    const handleChangeMasterPassword = (e) => {
        e.preventDefault();
        const oldPassword = oldMasterPasswordInput.value;
        const newPassword = newMasterPasswordInput.value;
        const confirmPassword = confirmNewMasterPasswordInput.value;
        changePasswordError.textContent = '';
        if (newPassword !== confirmPassword) { changePasswordError.textContent = 'Les nouveaux mots de passe ne correspondent pas.'; return; }
        if (!newPassword) { changePasswordError.textContent = 'Le nouveau mot de passe ne peut pas être vide.'; return; }
        const data = JSON.parse(localStorage.getItem('passwordManagerData'));
        const salt = new Uint8Array(atob(data.salt).split('').map(c => c.charCodeAt(0)));
        deriveKey(oldPassword, salt).then(key => {
            return decrypt(data.passwords, key).then(decryptedData => {
                return deriveKey(newPassword, salt).then(newKey => {
                    encryptionKey = newKey;
                    savePasswords(JSON.parse(decryptedData));
                    changePasswordForm.reset();
                    changePasswordModal.style.display = 'none';
                    alert('Votre mot de passe principal a été changé avec succès !');
                });
            });
        }).catch(err => { console.error(err); changePasswordError.textContent = 'L\'ancien mot de passe principal est incorrect.'; });
    };

    const exportPasswordsToTxt = () => {
        const passwords = getPasswords();
        if (passwords.length === 0) {
            alert('Aucun mot de passe à exporter.');
            return;
        }

        if (!confirm("ATTENTION : Vous êtes sur le point d\'exporter vos mots de passe dans un fichier texte non chiffré. Ce fichier sera lisible par n\'importe qui. Êtes-vous sûr de vouloir continuer ?")) {
            return;
        }

        let fileContent = 'Sauvegarde de vos mots de passe\n';
        fileContent += 'ATTENTION : Ce fichier n\'est pas chiffré. Conservez-le en lieu sûr.\n';
        fileContent += '====================================\n\n';

        passwords.forEach(p => {
            fileContent += `Site: ${p.site}\n`;
            fileContent += `Utilisateur: ${p.username}\n`;
            fileContent += `Mot de passe: ${p.password}\n`;
            fileContent += '------------------------------------\n';
        });

        const dataBlob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(dataBlob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'sauvegarde_mots_de_passe.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // --- Logique de démarrage et de déverrouillage ---
    const init = () => {
        const data = JSON.parse(localStorage.getItem('passwordManagerData'));
        if (!data || !data.salt) { modal.style.display = 'flex'; } else {
            document.getElementById('modal-title').textContent = 'Entrez votre mot de passe principal';
            document.getElementById('modal-text').textContent = 'Veuillez entrer votre mot de passe principal pour déverrouiller vos données.';
            document.getElementById('master-password-submit').textContent = 'Déverrouiller';
            modal.style.display = 'flex';
        }
    };

    masterPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const masterPassword = masterPasswordInput.value;
        masterPasswordError.textContent = '';
        if (!masterPassword) return;
        let data = JSON.parse(localStorage.getItem('passwordManagerData')) || {};
        if (!data.salt) {
            const salt = window.crypto.getRandomValues(new Uint8Array(16));
            data.salt = btoa(String.fromCharCode.apply(null, salt));
            deriveKey(masterPassword, salt).then(key => {
                encryptionKey = key;
                data.passwords = '';
                localStorage.setItem('passwordManagerData', JSON.stringify(data));
                modal.style.display = 'none';
                mainContainer.style.display = 'block';
                renderPasswords();
            });
        } else {
            const salt = new Uint8Array(atob(data.salt).split('').map(c => c.charCodeAt(0)));
            deriveKey(masterPassword, salt).then(key => {
                encryptionKey = key;
                if (!data.passwords) { decryptedPasswords = []; modal.style.display = 'none'; mainContainer.style.display = 'block'; renderPasswords(); return; }
                decrypt(data.passwords, key).then(decryptedData => {
                    decryptedPasswords = JSON.parse(decryptedData);
                    modal.style.display = 'none';
                    mainContainer.style.display = 'block';
                    renderPasswords();
                }).catch(err => { console.error(err); masterPasswordError.textContent = 'Mot de passe principal incorrect.'; });
            });
        }
    });

    // --- Écouteurs d'événements ---
    passwordForm.addEventListener('submit', addPassword);
    passwordsList.addEventListener('click', handlePasswordActions);
    searchInput.addEventListener('input', (e) => renderPasswords(e.target.value));
    generatePasswordBtn.addEventListener('click', generatePassword);
    togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
    passwordInput.addEventListener('input', updatePasswordStrength);
    changeMasterPasswordBtn.addEventListener('click', () => { changePasswordModal.style.display = 'flex'; });
    cancelChangePasswordBtn.addEventListener('click', () => { changePasswordModal.style.display = 'none'; changePasswordForm.reset(); changePasswordError.textContent = ''; });
    changePasswordForm.addEventListener('submit', handleChangeMasterPassword);
    editPasswordForm.addEventListener('submit', handleEditSubmit);
    cancelEditPasswordBtn.addEventListener('click', () => { editPasswordModal.style.display = 'none'; });
    exportPasswordsBtn.addEventListener('click', exportPasswordsToTxt);

    // --- Initialisation ---
    init();
});
