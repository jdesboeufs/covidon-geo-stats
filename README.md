# covidon-geo-stats

Script permettant de générer des statistiques géographiques basiques à partir d'un CSV contenant des latitudes (`_lat`) et longitudes (`_lon`).

Exemple de résultat :

```
Manche (50) : 19
Hérault (34) : 5
Ille-et-Vilaine (35) : 2
Saône-et-Loire (71) : 1
Haute-Savoie (74) : 1
```

## Pré-requis

- [Node.js](https://nodejs.org) version 10 ou supérieure
- Base de données spatiales `gazetteer.sqlite` (générée par [Etalab](https://github.com/etalab/gazetteer))

## Utilisation

### Installation des dépendances

```
npm install
```

### Copie de la base de données

La base de données `gazetteer.sqlite` doit être copiée dans le dossier de travail.

### Exécution

```
cat input.csv | npm run generate-stats > output.csv
```

## Licence

MIT
