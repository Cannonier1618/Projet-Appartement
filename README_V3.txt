V3 : correction complète des formules pour respecter le Google Sheet.
- Plan épargne : dépenses du mois = somme de la colonne Montant originale par mois, sans conversion.
- Solde restant du plan = épargne cumulée - cumul des dépenses mensuelles.
- Dépenses : Montant CHF = ROUND(IF(devise €; montant*taux*(1-14.5%+8.1%); montant);0).
- Solde après dépense = SUMIF(dates épargne <= date achat) - somme cumulée des Montants CHF.
