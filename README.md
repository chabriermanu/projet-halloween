🎪 Cirque Maudit - Inscription Halloween

Projet personnel - Basé sur un TP validation de formulaire @ AFPA Saint-Jean-de-Védas

Application d'inscription pour un événement Halloween fictif "Le Cirque Maudit" avec tirage au sort par tranches d'âge et export PDF. Projet démarré à partir d'un TP sur la validation de formulaires, puis personnalisé avec une thématique spooky.
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

🎯 Objectif du projet
Base pédagogique : Validation de formulaire avec Regex
Évolution personnelle : Projet thématique complet avec fonctionnalités avancées
🎃 Fonctionnalités
📝 Formulaire d'inscription
✅ Validation en temps réel avec Regex Unicode (support accents)
✅ Anti-doublon sur les numéros de téléphone
✅ Messages d'erreur par champ
✅ Feedback visuel (bordures vertes/rouges)
✅ Affichage dynamique dans un tableau
🗂️ Gestion des participants
✅ Tableau Bootstrap responsive
✅ Tri par âge (bouton dédié)
✅ Suppression individuelle (bouton poubelle)
🎲 Tirage au sort par tranches d'âge

Moins de 5 ans
5 à 10 ans
10 à 15 ans
Plus de 15 ans

✅ 1 gagnant aléatoire par tranche
✅ Affichage dans un tableau dédié
✅ Surbrillance verte des gagnants
📄 Export PDF
✅ Export de la liste des gagnants (après tirage)
✅ Export de tous les participants (si pas de tirage)
✅ Utilisation de jsPDF + autoTable
🎨 Design Halloween
✅ Thème Cirque Maudit effrayant
✅ Effet glassmorphism (transparence + blur)
✅ Image de fond immersive
✅ Interface responsive (Bootstrap 5)

💻 Technologies utilisées
TechnologieUsageHTML5Structure sémantiqueCSS3Glassmorphism, animationsBootstrap 5Grid, composants, responsiveJavaScript ES6Logique métier, validationRegex UnicodeValidation multi-languejsPDFGénération PDFautoTableTableaux PDF stylisés

🏗️ Structure du code
Validation du formulaire
javascript// Regex avec support Unicode complet
const textRegex = /^[\p{L}\s'-]{3,}$/u;
const phoneRegex = /^\+33\s?[0-9](?:\s?\d{2}){4}$/;
Anti-doublon téléphone
javascriptfunction existsPhone(phone) {
    const rows = document.querySelectorAll('#dataTable tbody tr');
    return [...rows].some(row => row.cells[3].textContent.trim() === phone);
}
Tirage au sort par tranches
javascriptconst tranches = {
    ' Moins de 5 ans': [],
    ' 5 à 10 ans': [],
    ' 10 à 15 ans': [],
    ' Plus de 15 ans': []
};
// Répartition automatique + tirage aléatoire
Export PDF conditionnel
javascript// Si gagnants existent → export gagnants
// Sinon → export tous les participants

🚀 Installation
bash# Cloner le repo
git clone https://github.com/chabriermanu/projet-halloween.git

# Ouvrir index.html dans un navigateur
# (Pas de serveur requis, fonctionne en local)

🎮 Utilisation

Remplir le formulaire (nom, prénom, âge, téléphone)
Valider → Les données s'ajoutent au tableau
Trier par âge (optionnel)
Tirage au sort → 1 gagnant par tranche d'âge
Exporter en PDF → Récupérer la liste des gagnants


📝 Validation des champs
ChampRègleMessage d'erreurNomMin 3 lettres, accents autorisés"Nom invalide (3 lettres minimum)"PrénomMin 3 lettres, accents autorisés"Prénom invalide (3 lettres minimum)"ÂgeEntre 1 et 120"Âge entre 1 et 120"TéléphoneFormat français +33"Numéro FR valide requis"Anti-doublonNuméro unique"Numéro déjà enregistré !"

🎓 Contexte de réalisation
Formation : Développeur Web et Web Mobile
Organisme : AFPA Saint-Jean-de-Védas
Base : TP Validation de formulaires avec Regex
Évolution : Projet personnel thématique Halloween
Période : 2025

💡 Compétences démontrées
Validation & Sécurité
✅ Regex avancées (Unicode pour accents)
✅ Validation côté client
✅ Gestion des doublons
✅ Feedback utilisateur en temps réel
Manipulation DOM
✅ Création dynamique d'éléments
✅ Gestion des événements
✅ Tri de tableaux HTML
✅ Classes CSS conditionnelles
Algorithmes
✅ Tri par âge (Array.sort)
✅ Répartition par tranches
✅ Tirage aléatoire (Math.random)
Librairies externes
✅ Intégration jsPDF
✅ Utilisation d'autoTable
✅ Bootstrap 5 (grid, components)
Design
✅ Effet glassmorphism
✅ Thématique cohérente
✅ UX optimisée
✅ Responsive design

🔧 Améliorations futures

 Sauvegarde LocalStorage
 Mode sombre/clair
 Animations CSS avancées
 Sons d'ambiance Halloween
 Backend pour persistance des données
 Envoi d'emails aux gagnants


👨‍💻 Auteur
Emmanuel Chabrier
Développeur Web & Web Mobile en formation
🔗 GitHub : chabriermanu
🔗 LinkedIn : Emmanuel Chabrier
📍 Saint Genies de Fontedit, France
🔍 Recherche stage 10 semaines - Février 2026

🎃 Projet inspiré d'un TP, transformé en expérience interactive !

Projet personnel - Formation AFPA 2025
