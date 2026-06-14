V23 : correction suppression d'un mois réalisé.

Correction :
- Si le mois est marqué réalisé, le bouton supprimer l'archive au lieu de le supprimer.
- L'archive est bien sauvegardée dans apartment_savings.status.
- Le mois disparaît de l'affichage mais reste dans l'historique des calculs.

SQL requis si pas déjà fait :
alter table apartment_savings
add column if not exists done boolean default false;

alter table apartment_savings
add column if not exists status text;
