# UPDATE PACKAGES

## MINOR UPDATES

```bash
pnpm outdated  # check outdated packages
pnpm update  # update packages to the latest version
```

## CHECK PACKAGE VERSION

```bash
pnpm view {package-name} versions
```

## MAJOR UPDATES

```bash
pnpm install -g npm-check-updates  # install npm-check-updates
ncu  # check for outdated packages
ncu -u  # update all packages to the latest version
pnpm install  # install the updated packages
```

## Clean Install

```bash
pnpm install --force --no-cache
# OR
Remove-Item -Path node_modules -Force
Remove-Item -Path .expo -Force
Remove-Item -Path package-lock.json -Force
Remove-Item -Path pnpm-lock.yaml -Force
pnpm install
```
