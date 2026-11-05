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
  async function ajouter() {
    console.log('--- Ajouter une observation ---');
    const id = await demander('Point observé (exemple: S11) : ');
    if (id === null) return;
    const parcelle = await demander('Parcelle (exemple: P1) : ');
    if (parcelle === null) return;
    const texture = await demander(`Texture (${TEXTURES.join(', ')}) : `);
    if (texture === null) return;
    const pH = await demander('pH (nombre de 0 à 14, sans unité, virgule  acceptée) : ');
    if (pH === null) return;
    const etatHumidite = await demander(`État d'humidité (${HUMIDITES.join(', ')}) : `);
    if (etatHumidite === null) return;
      
    const saisie = {
      id: id.toUpperCase(),
      parcelle: parcelle.toUpperCase(),
      texture: texture.toLowerCase(),
      pH,
      etatHumidite: etatHumidite.toLowerCase(),
    };

 const erreurs = ajouterObservation(observations, saisie);
    if (erreurs.length > 0) {
      console.log('Observation refusée :');
      for (const erreur of erreurs) {
        console.log(`  - ${erreur}`);
      }
      console.log(`Le carnet compte toujours ${observations.length} observation(s).`);
      return;
    }
    await enregistrerJson(FICHIER_DONNEES, observations);
    console.log(`Observation ${saisie.id} ajoutée. Le carnet compte ${observations.length} observation(s).`);
  }
   function lister() {
    console.log(`--- Liste des observations (${observations.length}) ---`);
    console.log(listerObservations(observations));
  }
  async function rechercher() {
    console.log('---- Rechercher ----');
    console.log('1. Par point (identifiant)');
    console.log('2. Par parcelle');
    console.log("3. Les observations d'une texture");
    const sousChoix = await demander('Votre choix : ');
    if (sousChoix === null) return;
    
    if (sousChoix === '1') {
      const reponse = await demander('Point : ');
      if (reponse === null) return;
      const id = reponse.toUpperCase();
      const observation = trouverParId(observations, id);
      if (observation === undefined) {
        console.log(`Observation ${id} introuvable.`);
      } else {
        console.log(formaterObservation(observation));
      }
    } else if (sousChoix === '2') {
      const reponse = await demander('Parcelle : ');
      if (reponse === null) return;
      const parcelle = reponse.toUpperCase();
      const trouvees = filtrerParParcelle(observations, parcelle);
      console.log(`${trouvees.length} observation(s) sur la parcelle ${parcelle} :`);
      console.log(listerObservations(trouvees));
    } else if (sousChoix === '3') {
      const reponse = await demander('Texture : ');
      if (reponse === null) return;
      const texture = reponse.toLowerCase();
      const trouvees = filtrerParTexture(observations, texture);
      console.log(`${trouvees.length} observation(s) de texture ${texture} :`);
      console.log(listerObservations(trouvees));
    } else {
      console.log('Choix inconnu : retour au menu.');
    }
  }
  //Trier par pH 
  
  async function trier() {
    console.log('--- Trier ---');
    console.log('1. Par pH croissant');
    const sousChoix = await demander('Votre choix : ');
    if (sousChoix === null) return;
    if (sousChoix === '1') {
      console.log(listerObservations(trierParPh(observations)));
    } else {
      console.log('Choix inconnu : retour au menu.');
    }
  }
  //Synthèse
  function synthese() {
    console.log('--- Synthèse des observations ---');
    console.log(`Nombre d'observations : ${observations.length}`);
    const minMax = phMinMax(observations);
    if (minMax === null) {
      console.log('pH minimum et maximum : aucune donnée');
    } else {
      console.log(`pH minimum : ${minMax.min} · pH maximum : ${minMax.max}`);
    }
      console.log('Observations par texture :');
      const comptes = compterParTexture(observations);
    for (const [texture, nombre] of Object.entries(comptes)) {
      console.log(`  ${texture} : ${nombre}`);
    }
  
   const aDiscuter = pointsADiscuter(observations, SEUIL_PH_A_DISCUTER);
    console.log(`Points à discuter avec le coach (pH < ${SEUIL_PH_A_DISCUTER}) : ${aDiscuter.length}`);
    for (const observation of aDiscuter) {
      console.log(`  ${formaterObservation(observation)}`);
    }
 
    console.log("Rappels : le pH est sans unité. Aucune moyenne de pH n'est calculée (échelle logarithmique).");
    console.log("Ces points ne sont pas un diagnostic de fertilisation : ils servent à préparer l'échange avec le coach.");
  }
  let continuer = true;
  while (continuer) {
    afficherMenu();
      const choix = await demander('Votre choix : ');
    if (choix === null || choix === '0') {
      console.log('Au revoir !');
      continuer = false;
    }else{
      console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
    }
  
    try {
      if (choix === '1') {
        await ajouter();
      } else if (choix === '2') {
        lister();
      } else if (choix === '3') {
        await rechercher();
      } else if (choix === '4') {
        await trier();
      } else if (choix === '5') {
        synthese();
      } else {
        console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
      }
    } catch (erreur) {
      if (erreur.message.startsWith('TODO')) {
        console.log(`À compléter : ${erreur.message}`);
      }else{
        console.log(`Erreur inattendue : ${erreur.message}`);
    }
  }
}
fermerSaisie();
      }
main();
