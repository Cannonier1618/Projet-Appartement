V9 : ajout d'un lien internet par achat.

IMPORTANT Supabase :
Lancer une seule fois dans SQL Editor :

alter table apartment_expenses
add column if not exists url text;

Fonctionnalités :
- Champ "Lien internet" dans ajout/modification d'un achat.
- Petit bouton ↗ sur la ligne quand un lien existe.
- Le lien est sauvegardé dans Supabase.
