#!/bin/bash
# Se placer dans le dossier du projet Cypress
cd ~/desktop/cypress/project1

# Lancer Cypress avec les bons paramètres
npx cypress run --env grepTags=@__regression var=recette
