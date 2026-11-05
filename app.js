// Carnet d'observation des sols — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { HUMIDITES, TEXTURES, ajouterObservation, formaterObservation, listerObservations, trouverParId } from './src/registre.js';
import { filtrerParParcelle, filtrerParTexture, trierParPh } from './src/recherche.js';
import { SEUIL_PH_A_DISCUTER, compterParTexture, phMinMax, pointsADiscuter } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/observations.json';

async function main() {
  ouvrirSaisie();
  console.log("==================================================");
  console.log("   CARNET D'OBSERVATION DES SOLS");
  console.log("   Ferme pédagogique");
  console.log("==================================================");

  let observations = [];
  try {
    observations = await chargerJson(FICHIER_DONNEES);
    console.log(`${observations.length} observation(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
  } catch (erreur) {
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. Le carnet démarre vide.`);
  }
  function afficherMenu (){
    console.log("");
    console.log("--------------------- MENU ---------------------");
    console.log("1. Ajouter une observation");
    console.log("2. Lister les observations");
    console.log("3. Rechercher (point, parcelle, texture)");
    console.log("4. Trier par pH");
    console.log("5. Synthèse des observations");
    console.log("0. Quitter");
}
let continuer = true;
  while (continuer) {
    afficherMenu();
    const choix = await demander('Votre choix : ');
    if (choix === null || choix === '0') {
      console.log('Au revoir !');
      continuer = false;
    } else {
      console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
    }
fermerSaisie();
}
}
main();
