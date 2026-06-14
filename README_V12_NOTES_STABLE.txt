V12 : notes / codes de réduction, version stable.

IMPORTANT Supabase, à lancer une seule fois :
alter table apartment_expenses
add column if not exists note text;

Cette version repart de la V10 qui fonctionnait.
Elle ajoute :
- champ Notes / codes de réduction
- bouton ✦ si une note existe
- sauvegarde Supabase dans apartment_expenses.note
