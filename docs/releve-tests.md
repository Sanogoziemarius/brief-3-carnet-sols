# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : 
- pH minimum : 4,8 (S04) ; pH maximum : 7,6 (S08).
- Nombre d'observations par texture : 3 sableux, 4 limoneux, 3 argileux.
- Points à discuter (pH strictement inférieur à 5,5) : S01, S04, S06, S09.

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |
| 1;s11;p6;LIMONEUX;5,8; humide| toute les saisies seront acceptées et une nouvelle observation doit s'ajouter au relévé, donc 11 observations au totale|Observation S11 ajoutée. Le carnet compte 11 observation(s). | zie marius sanogo|
|1, S01, P6, limoneux, 5,8, humide| id existe déja dans le carnet|Observation refusée :Cet identifiant existe déjà dans le carnet Le carnet compte toujours 10 observation(s).| zie marius sanogo|
|1, S12, P6, limoneux, 14,1, humide|refus pH doit être compris entre 0 et 14|Observation refusée :Le pH doit être un nombre de 0 à 14.Le carnet compte toujours 10 observation(s).|zie marius sanogo |
|3, 1, S98|observation S98 introuvable|Observation S98 introuvable|zie marius sanogo |
|4, 1 |pHmin:S04(4,8) et pHmax: S08(7,6)| premier :pH 4.8  et dernier: pH 7.6| zie marius sanogo|
| choix 9 | choix inconnu : 9. saisir un chiffre du menu et le menu apparait|Choix inconnu : « 9 ». Tapez un chiffre du menu. | zie marius sanogo|

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : 
node app.js: le programme fonctionne correctement avec les tests.
npm test: 29 tests valide hors bonus 
nom du testeur: jean-marie DADIE