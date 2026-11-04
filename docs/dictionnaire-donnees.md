# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, il est obligatoire et unique dans le carnet | — | SO2 |
|`parcelle`|surface délimité permettant d'identifier la parcelle sur laquelle le point est observé | texte| il doit être obligatoire et non vide |-| P1|
|  `texture`| Indique la classe de texturale du sol observé| texte|Accepter uniquement: sableux, limoneux ou argileux | -| argileux|
| `pH`| il représente le niveau d'acidité ou d'alcalinité du sol au point d'observé| nombre|non vide, doit être un nombre et accepter uniquement les nombres compris entre 0 et 14 inclus. | sans unité|4.5 |
|`etatHumidite`|	Indique l'état d'humidité du sol observé| texte |Accepter uniquement: sec, intermédiaire ou humide. | -| intermédiaire|

**Listes de valeurs autorisées** : 
- texture : sableux, limoneux, argileux.
- etat d'humidité : sec, intermédiaire, humide.
- pH : nombres compris entre 0 et 14 inclus.

**Sources** : 
- dictionnaire de l'expert C: Sol et capteur de Sol
- donnees/observations.json
- SUJET.md (données)
