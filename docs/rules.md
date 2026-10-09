# Game rules and tuning (canonical)

Mirror of what `index.html` implements today. Update this file first when rules change.

## Map
- Grid 44 x 30 tiles, 22 px per tile. A river runs top to bottom around x=20-22, splitting the land in two.
- 6 castle sites (2x2 tiles): 4 outer start sites (one pair per bank) and 2 middle sites claimable only by enclosure.

## Round structure
Rounds: 8. Steps per round, strictly alternating, player 0 then player 1:
1. Cannons  2. Battle  3. Rebuild
Before round 1 each player picks an outer castle; a wall ring (8x8 tiles, 1 thick) appears around it.

## Phases
| Phase | Time | Notes |
|---|---|---|
| Cannons | 12 s | Cannons are 2x2 on enclosed free land. Round 1: 3 cannons. After: min(8, 1 + castles + floor(area/25)). |
| Battle | 12 s | Click fires nearest ready cannon at the crosshair. Reload 1.4 s for humans; AI Easy 2.3 / Normal 1.75 / Hard 1.35. Ball flight 0.35 s + distance/650. |
| Rebuild | 14 s | Random polyomino pieces (1-5 tiles). Valid only on free land. Rotate with right-click, R, Space or wheel. |

## Damage
- A ball destroys enemy wall tiles whose centre is within 0.95 tile of the impact.
- Cannons have 2 hp and take one hit per ball landing on them.
- Castles are never hit directly. They are lost only by being left unenclosed at the end of their owner's rebuild.
- All cannons fire whether or not their walls are intact.

## Enclosure
A tile is enclosed for a player if it cannot be reached from the map edge by 4-neighbour steps without crossing that player's walls. Diagonal wall gaps count as sealed. Only the player's own walls block the flood fill.

## Scoring and winning
- +10 per wall tile destroyed, +40 per cannon destroyed.
- End of each rebuild: + enclosed land tiles + 50 per owned castle.
- Lose all castles -> immediate loss. After round 8: most castles, then highest score.

## AI summary
- Select: random start site, preferring the opposite bank.
- Cannons: random valid enclosed spots.
- Battle: 30 % chance to target a cannon, otherwise a random enemy wall; aim error Easy 2.3 / Normal 1.3 / Hard 0.65 tiles.
- Rebuild: refill destroyed wall tiles first; expand only when a piece increases enclosed area or claims a castle.
