V8 stable — Projet Appartement

Correction majeure :
- suppression sécurisée : supprime uniquement la ligne concernée dans Supabase.
- masquage sécurisé : met à jour uniquement le champ hidden de la ligne concernée.
- plus de sauvegarde globale qui efface puis réinsère toute la table.
- plus de refresh automatique toutes les 15 secondes.

Prérequis Supabase :
alter table apartment_expenses
add column if not exists hidden boolean default false;
