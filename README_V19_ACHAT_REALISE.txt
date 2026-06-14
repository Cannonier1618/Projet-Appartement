V19 : option Achat réalisé.

SQL requis une seule fois dans Supabase SQL Editor :

alter table apartment_expenses
add column if not exists done boolean default false;

Fonctionnement :
- Bouton discret ○ / ✓ sur chaque ligne.
- ✓ = achat réalisé.
- Une ligne réalisée reste visible et grisée.
- Une ligne réalisée ne compte plus dans les simulations :
  dépenses prévues, solde restant, dépenses du mois, solde cumulé, solde après achat.
- Si tu supprimes ensuite une ligne déjà réalisée, cela n'impacte pas les soldes.
