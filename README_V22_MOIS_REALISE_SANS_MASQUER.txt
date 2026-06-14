V22 : mois réalisé, sans bouton masquer.

SQL requis une seule fois dans Supabase :

alter table apartment_savings
add column if not exists done boolean default false;

alter table apartment_savings
add column if not exists status text;

Fonctionnement :
- Bouton ✓ sur chaque carte mois : mois réalisé.
- La carte est grisée, mais aucun solde ne change.
- Supprimer un mois réalisé : archive la carte, elle disparaît de l'affichage mais reste dans l'historique des calculs.
- Supprimer un mois non réalisé : suppression normale.
- Aucun bouton masquer pour les mois.
