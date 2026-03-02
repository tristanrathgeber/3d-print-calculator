#!/bin/bash
# ─── Manual Deploy Script (Fallback) ──────────────────────
# Usage: ./scripts/deploy.sh
# Requires: SSH key at ~/.ssh/hetzner_dev

set -euo pipefail

SERVER="root@91.98.160.72"
SSH_KEY="$HOME/.ssh/hetzner_dev"
REMOTE_PATH="/var/www/3d-print-calculator"

echo "🔨 Building..."
npm run build

echo "🧹 Cleaning old assets on server..."
ssh -i "$SSH_KEY" "$SERVER" "rm -rf ${REMOTE_PATH}/assets/*"

echo "📦 Deploying to server..."
rsync -avz --delete -e "ssh -i $SSH_KEY" dist/ "${SERVER}:${REMOTE_PATH}/"

echo "🔄 Reloading nginx..."
ssh -i "$SSH_KEY" "$SERVER" "systemctl reload nginx"

echo "✅ Verifying..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://calc.makrhub.io)
if [ "$HTTP_STATUS" = "200" ]; then
  echo "✅ Deploy successful! calc.makrhub.io → HTTP $HTTP_STATUS"
else
  echo "❌ Verification failed! HTTP $HTTP_STATUS"
  exit 1
fi
