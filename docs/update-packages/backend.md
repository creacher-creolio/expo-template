# UPDATE PACKAGES

## VIRTUAL ENVIRONMENT

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

## BULK CHECK

```bash
pip install pipdeptree  # Optional: Install this if you want a dependency tree
pip list --outdated     # Lists outdated packages in your venv

pip install pipreqs  # Optional: Install this if not already present
pip check            # Checks for dependency conflicts in your venv
```

## CHECK A SINGLE PACKAGE

```bash
pip show <package_name>
```

## UPDATE

```bash
pip install --upgrade <package_name>
pip freeze | % {pip install --upgrade $_.split("==")[0]}
```

## UPDATE REQUIREMENTS.TXT FROM VIRTUAL ENVIRONMENT

```bash
pip freeze > requirements.txt  # Overwrites requirements.txt with current venv versions
```

## Clean Install

```bash
deactivate               # Exit the venv
Remove-Item -Recurse -Force venv  # remove venv
python -m venv venv      # Create a new venv
venv\Scripts\activate    # On Windows: Activate it
pip install -r requirements.txt
```
