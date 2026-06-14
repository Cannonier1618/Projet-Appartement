V21 : achat réalisé = visuel, pas simulation.

SQL requis une seule fois si pas déjà fait :
alter table apartment_expenses
add column if not exists done boolean default false;

Logique :
- Masquer : inchangé, sort la ligne des calculs de simulation.
- Achat réalisé : grise la ligne mais ne change AUCUN solde.
- Supprimer un achat réalisé : archive la ligne au lieu de la supprimer réellement.
  Elle disparaît de la liste mais reste dans les calculs, donc les soldes ne bougent pas.
- Supprimer un achat non réalisé : suppression normale.
