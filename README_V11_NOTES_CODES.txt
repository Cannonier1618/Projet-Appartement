V11 : ajout des notes / codes de réduction par achat.

SQL requis une seule fois dans Supabase SQL Editor :

alter table apartment_expenses
add column if not exists note text;

Fonctionnalités :
- Champ "Notes / codes de réduction" dans ajout/modification.
- Petit bouton ✦ sur la ligne quand une note existe.
- La note est sauvegardée dans Supabase, donc elle ne disparaît pas.
