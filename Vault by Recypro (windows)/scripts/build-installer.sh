#!/usr/bin/env bash
# Compile l'installateur Windows (installer.nsi) avec NSIS, sans Wine.
# Utilise le makensis fourni par electron-builder, ou celui du systeme.
set -euo pipefail

cd "$(dirname "$0")/.."

MAKENSIS="${MAKENSIS:-}"

if [ -z "$MAKENSIS" ]; then
    for candidate in \
        "$HOME"/.cache/electron-builder/nsis/nsis-*/linux/makensis \
        "$HOME"/.cache/electron-builder/nsis/nsis-*/makensis
    do
        if [ -x "$candidate" ]; then
            MAKENSIS="$candidate"
            break
        fi
    done
fi

if [ -z "$MAKENSIS" ] && command -v makensis >/dev/null 2>&1; then
    MAKENSIS="$(command -v makensis)"
fi

if [ -z "$MAKENSIS" ]; then
    echo "Erreur : makensis introuvable." >&2
    echo "Installez NSIS, ou lancez d'abord 'npm run pack:win' pour telecharger les outils electron-builder." >&2
    exit 1
fi

echo "makensis : $MAKENSIS"
"$MAKENSIS" installer.nsi
