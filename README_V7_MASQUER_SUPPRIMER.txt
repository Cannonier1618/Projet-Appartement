V7 Projet Appartement

Ajouts :
- bouton discret ○ / ◉ sur chaque achat pour masquer la ligne des calculs sans la supprimer
- sauvegarde Supabase du masquage
- suppression renforcée avec sauvegarde immédiate Supabase

SQL à lancer une seule fois dans Supabase :
alter table apartment_expenses
add column if not exists hidden boolean default false;

Puis uploader les fichiers sur GitHub.
