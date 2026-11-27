const CONFIG = {
    vendeurWhatsApp: "242069453774",
    numeroAffichage: "+242 06 945 37 74",
    numeroCopie: "069453774",
    devise: "FCFA"
};
const CATEGORIES = [
    {
        nom: "Gaming",
        image: "image/jeux.png",
        description: "Recharges jeux, cartes cadeaux, abonnements consoles et crédits en ligne."
    },
    {
        nom: "Streaming TV",
        image: "image/tv.webp",
        description: "Netflix, Prime Video, IPTV, chaînes sport et films en haute définition."
    },
    {
        nom: "Streaming musique",
        image: "image/musique.webp",
        description: "Spotify, Apple Music, Deezer et abonnements audio illimités."
    },
    {
        nom: "Tout",
        image: "image/tout.jpg",
        description: "Afficher l'ensemble de tous les produits disponibles dans la boutique."
    }
];
const CHAMPS_PAR_CATEGORIE = {
    "Gaming": [
        {
            id: "extraField1",
            label: "ID Joueur / Pseudo in-game",
            placeholder: "Ex. : AJA_Gamer#1234",
            type: "text",
            required: true
        },
        {
            id: "extraField2",
            label: "Nombre de Produits",
            placeholder: "Ex. : 3",
            type: "text",
            required: true
        }
    ],
    "Streaming TV": [
        {
            id: "extraField1",
            label: "Adresse e-mail ou identifiant de réception",
            placeholder: "Ex. : client@exemple.com",
            type: "email",
            required: true
        },
        {
            id: "extraField2",
            label: "Nombre de produits",
            placeholder: "Ex. : 1 abonnement",
            type: "text",
            required: true
        }
    ],
    "Streaming musique": [
        {
            id: "extraField1",
            label: "Adresse e-mail associée au compte musical",
            placeholder: "Ex. : musique@exemple.com",
            type: "email",
            required: true
        },
        {
            id: "extraField2",
            label: "Nombres de produits",
            placeholder: "Ex. : 1 abonnement",
            type: "text",
            required: true
        }
    ],
    "default": [
        {
            id: "extraField1",
            label: "Identifiant ou e-mail de livraison",
            placeholder: "Ex. : nom@exemple.com ou identifiant",
            type: "text",
            required: true
        },
        {
            id: "extraField2",
            label: "Nombre de Produits",
            placeholder: "Ex. : 2 produits",
            type: "text",
            required: false
        }
    ]
};

const SOUS_CATEGORIES_CONFIG = {
    "PUBG Mobile": {
        description: "Recharges UC, Royale Pass et packs rapides pour PUBG Mobile.",
        image: "image/pubg.jpg"
    },
    "Call of Duty Mobile": {
        description: "Crédits COD Points et offres disponibles pour Call of Duty Mobile.",
        image: "image/codm.jpg"
    },
    
    "Netflix": {
        description: "Abonnements Netflix",
        image: "image/netflix.jpeg"
    },
    "Prime video": {
        description: "Abonnements Prime video",
        image: "image/prime-video.jpeg"
    },
    "IPTV": {
        description: "Abonnements IPTV",
        image: "image/iptv.jpeg"
    },
    "Spotify": {
        description: "Abonnements Spotify",
        image: "image/spotify.jpeg"
    },
    "Apple Music": {
        description: "Abonnements Apple music",
        image: "image/app-music.jpeg"
    }
};

const PRODUITS = [
    {
        id: 1,
        categorie: "Gaming",
        sousCategorie: "PUBG Mobile",
        nom: "60 UC PUBG Mobile",
        description: "Recharge rapide en 5 minutes",
        prix: 900,
        image: "image/uc-icone.png"
    },
    {
        id: 3,
        categorie: "Gaming",
        sousCategorie: "Call of Duty Mobile",
        nom: "80 CP Call of Duty Mobile",
        description: "Recharge rapide en 5 minutes",
        prix: 1500,
        image: "image/cp-codm.jpg"
    },
    { 
        id: 2,
        categorie: "Gaming",
        sousCategorie: "PUBG Mobile",
        nom: "325 UC PUBG Mobile",
        description: "Recharge rapide en 5 minutes",
        prix: 4000,
        image: "image/uc-icone.png"
    },
    {
        id: 4,
        categorie: "Gaming",
        sousCategorie: "PUBG Mobile",
        nom: "660 UC PUBG Mobile",
        description: "Recharge rapide en 5 minutes",
        prix: 7500,
        image: "image/uc-icone.png"
    },
    {
        id: 5,
        categorie: "Gaming",
        sousCategorie: "PUBG Mobile",
        nom: "1800 UC PUBG Mobile",
        description: "Recharge rapide en 5 minutes",
        prix: 17500,
        image: "image/uc-icone.png"
    },
    {
        id: 6,
        categorie: "Gaming",
        sousCategorie: "PUBG Mobile",
        nom: "3850 UC PUBG Mobile",
        description: "Recharge rapide en 5 minutes",
        prix: 36000,
        image: "image/uc-icone.png"
    },
    {
        id: 7,
        categorie: "Gaming",
        sousCategorie: "PUBG Mobile",
        nom: "8100 UC PUBG Mobile",
        description: "Recharge rapide en 5 minutes",
        prix: 70000,
        image: "image/uc-icone.png"
    },
    {
        id: 8,
        categorie: "Gaming",
        sousCategorie: "Call of Duty Mobile",
        nom: "88 CP ",
        description: "Recharge rapide en 5 minutes",
        prix: 900,
        image: "image/cp-codm.jpg"
    },
    {
        id: 9,
        categorie: "Gaming",
        sousCategorie: "Call of Duty Mobile",
        nom: "460 CP",
        description: "Recharge rapide en 5 minutes",
        prix: 4000,
        image: "image/cp-codm.jpg"
    },
     {
        id: 10,
        categorie: "Gaming",
        sousCategorie: "Call of Duty Mobile",
        nom: "960 CP",
        description: "Recharge rapide en 5 minutes",
        prix: 7000,
        image: "image/cp-codm.jpg"
    },
     {
        id: 11,
        categorie: "Gaming",
        sousCategorie: "Call of Duty Mobile",
        nom: "2600 CP",
        description: "Recharge rapide en 5 minutes",
        prix: 22000,
        image: "image/cp-codm.jpg"
    },
     {
        id: 12,
        categorie: "Gaming",
        sousCategorie: "Call of Duty Mobile",
        nom: "5400 CP",
        description: "Recharge rapide en 5 minutes",
        prix: 42000,
        image: "image/cp-codm.jpg"
    },
    {
        id: 13,
        categorie: "Gaming",
        sousCategorie: "Call of Duty Mobile",
        nom: "100 Cartes mythiques",
        description: "Recharge rapide en 5 minutes",
        prix: 6000,
        image: "image/cp-codm.jpg"
    },
    
    {
        id: 14,
        categorie: "Streaming TV",
        sousCategorie: "Prime video",
        nom: "Abonnement Standard",
        description: "Accès complet au catalogue, sans pubs, jusqu'à 3 écran simultanés en 4K UHD Recharge rapide en 5 minutes",
        prix: 4500,
        image: "image/prime-video.jpeg"
    },
     {
        id: 15,
        categorie: "Streaming TV",
        sousCategorie: "IPTV",
        nom: "Abonnement solo",
        description: "Recharge rapide en 5 minutes",
        prix: 3500,
        image: "image/iptv.jpeg"
    },
     {
        id: 16,
        categorie: "Streaming musique",
        sousCategorie: "Apple Musique",
        nom: "Individuel",
        description: "1 compte personnel Recharge rapide en 5 minutes",
        prix: 3500,
        image: "image/app-music.jpeg"
    },
    {
        id: 3,
        categorie: "Streaming TV",
        sousCategorie: "Netflix",
        nom: "Mobile",
        description: "1 écran à la fois ( Smartphone et tablette ) en HD (720P)Recharge rapide en 5 minutes",
        prix: 2500,
        image: "image/netflix.jpeg"
    },
    {
        id: 18,
        categorie: "Streaming TV",
        sousCategorie: "Netflix",
        nom: "Essentiel",
        description: "1 écran à la fois ( TV, Ordinateur, smartphone et tablette ) en HD (720P) Recharge rapide en 5 minutes",
        prix: 3500,
        image: "image/netflix.jpeg"
    },
     {
        id: 19,
        categorie: "Streaming TV",
        sousCategorie: "Netflix",
        nom: "Standard",
        description: "2 écran à la fois ( TV, Ordinateur, smartphone et tablette ) en full HD (1080P) Recharge rapide en 5 minutes",
        prix: 5500,
        image: "image/netflix.jpeg"
    },
     {
        id: 20,
        categorie: "Streaming TV",
        sousCategorie: "Netflix",
        nom: "Premium",
        description: "4 écran à la fois ( TV, Ordinateur, smartphone et tablette ) en ultra HD (4K) Recharge rapide en 5 minutes",
        prix: 7000,
        image: "image/netflix.jpeg"
    },
     {
        id: 21,
        categorie: "Streaming musique",
        sousCategorie: "Spotify",
        nom: "Premium Personnel",
        description: "Sans pubs, telechargement, zapping illimité et meilleur qualité audio",
        prix: 3000,
        image: "image/spotify.jpeg"
    },
    {
        id: 22,
        categorie: "Streaming musique",
        sousCategorie: "Apple Musique",
        nom: "Famille",
        description: "Jusqu'à 6 personnes Recharge rapide en 5 minutes",
        prix: 3500,
        image: "image/app-music.jpeg"
    },
];