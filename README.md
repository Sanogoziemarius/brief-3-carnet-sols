# Carnet d'observation des sols

> Projet individuel du SAS DFS, brief 3 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte

### Contexte

Le carnet est destiné à l'assistant terrain Agritech de la ferme pédagogique qui est chargé d'observer les caractéristiques du sol sur différentes parcelles. À l'aide d'une fiche de terrain, il relève la texture, le pH et l'état d'humidité de chaque point observé. Il a besoin d'un outil simple pour enregistrer ses observations, les retrouver facilement et repérer les valeurs à vérifier avec le coach. Pour chaque point, il renseigne un identifiant, une parcelle, une texture, un pH compris entre 0 et 14 et un état d'humidité. Le programme permet de consulter, rechercher et trier les observations, ainsi que d'obtenir une synthèse des données collectées. Il signale notamment les points dont le pH est inférieur à 5,5 pour qu'ils soient discutés avec le coach. Le carnet enregistre uniquement des constats : il ne réalise aucun diagnostic de fertilisation, ne donne aucun conseil automatique et ne calcule pas de moyenne de pH.

## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-3-carnet-sols.git
cd brief-3-carnet-sols
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [ ] Données lues et enregistrées dans `donnees/observations.json`
- [ ] Ajouter une observation, saisies invalides refusées sans arrêter le programme
- [ ] Lister les observations, message si le carnet est vide
- [ ] Rechercher par point ou par parcelle ; filtrer par texture
- [ ] Trier par pH
- [ ] Synthèse : pH minimum et maximum, nombre par texture, points à discuter (pH < 5,5)
- [ ] Bonus : supprimer et modifier une observation (choix 6 et 7)
- [ ] Bonus : tri par pH décroissant, texture la plus fréquente

## Données

✏️ *Le fichier, le nombre d'observations, les champs (voir [docs/dictionnaire-donnees.md](docs/dictionnaire-donnees.md)), le pH sans unité. Rappelez qu'elles sont fictives.*

## Limites

✏️ *Au moins trois. Par exemple : le carnet repère des valeurs à discuter, mais ne produit aucun diagnostic de fertilisation.*

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

✏️ *Prénom NOM, compte GitHub. Entraide : avec qui, sur quoi.*
