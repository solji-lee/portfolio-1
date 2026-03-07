---
description: Sync code to Mac Mini render server
---

# Sync to Mac Mini

Syncs the local `src/` directory to the Mac Mini render server via rsync over SSH.

## Prerequisites
- SSH config at `~/.ssh/config` with `Host macmini` (solji@172.30.1.65)
- Mac Mini must be on the same network (172.30.1.65)

## Steps

// turbo-all

1. Verify SSH connectivity:
```bash
ssh macmini "echo 'Connected ✅' && hostname"
```

2. Sync source code to Mac Mini:
```bash
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude 'venv' \
  --exclude '.env.local' \
  --exclude '.env' \
  /Users/soljilee/Desktop/BiasArchive/src/ \
  macmini:/Users/solji/Desktop/BiasArchive/src/
```

3. Verify the Mac Mini dev server picked up changes (optional):
```bash
curl -sS --connect-timeout 5 http://172.30.1.65:3000/api/content/upload-progress
```
