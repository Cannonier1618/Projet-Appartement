V10 : correction du lien internet persistant.

Cause corrigée :
- Le lien était affiché localement mais n'était pas envoyé dans le payload Supabase.
- Maintenant le champ url est chargé depuis Supabase et sauvegardé dans apartment_expenses.

SQL requis une seule fois :
alter table apartment_expenses
add column if not exists url text;
