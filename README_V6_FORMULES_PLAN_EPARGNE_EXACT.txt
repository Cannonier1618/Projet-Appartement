V6 : correction complète du Plan épargne pour coller au Google Sheet.

Logique appliquée :
- Dépenses du mois = somme brute des montants du mois.
- CHF = montant CHF brut.
- EUR = montant EUR brut.
- Solde cumulé = épargne cumulée - dépenses brutes cumulées.
- Le coût net CHF reste affiché séparément dans le tableau détaillé pour les lignes EUR.

Important Supabase :
Si une ancienne version a déjà rempli apartment_settings, lancer dans Supabase SQL Editor :

update apartment_settings
set rate = 0.9192,
    savin_rate = 14.5,
    vat_rate = 8.1
where id = 1;

