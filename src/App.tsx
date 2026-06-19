/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { products as rawProducts, Product } from './data/products';
import ProductDetailPage from './components/ProductDetailPage';

const translationDictionary: Record<string, Record<string, string>> = {
  en: {
    "vélo d'appartement": "Stationary Bike",
    "vélo tout chemin": "Hybrid Bike",
    "vélo de ville enjambement bas": "Step-Through City Bike",
    "vélo de ville": "City Bike",
    "vélo de route": "Road Bike",
    "vélo route": "Road Bike",
    "vélo vtt": "Mountain Bike (MTB)",
    "vtt": "Mountain Bike (MTB)",
    "poche à eau": "Water Bladder",
    "bâton de randonnée": "Hiking Pole",
    "bâton ultra-compact": "Ultra-Compact Pole",
    "bâton": "Hiking Pole",
    "lampe frontale": "Headlamp",
    "gourde": "Water Bottle",
    "repas lyophilisé": "Freeze-Dried Meal",
    "pâtes à la bolognaise": "Pasta Bolognese",
    "riz et poulet au curry": "Curry Chicken with Rice",
    "purée de pomme de terre à la viande hachée": "Mashed Potatoes with Minced Beef",
    "sans gluten": "Gluten-Free",
    "tapis de sol": "Floor Mat",
    "tapis de course": "Treadmill",
    "tapis de protection sol": "Floor Protection Mat",
    "tapis de marche": "Walking Pad",
    "vélo elliptique": "Elliptical Trainer",
    "rameur": "Rowing Machine",
    "montre gps de sport": "GPS Sports Watch",
    "montre connectée gps": "GPS Smartwatch",
    "montre connectée": "Smartwatch",
    "montre gps": "GPS Watch",
    "popote": "Camping Cookset",
    "isotherme inox": "Stainless Steel Insulated",
    "isotherme": "Insulated",
    "bouchon à ouverture rapide": "Quick-open Cap",
    "pour la randonnée": "for Hiking",
    "en acier inox": "Stainless Steel",
    "anti-adhésif": "Non-stick",
    "personnes": "People",
    "éléments": "Pieces",
    "réglage rapide et précis": "Quick & Precise Adjustment",
    "connecté et auto-alimenté": "Connected & Self-powered",
    "auto-alimenté et connecté": "Self-powered & Connected",
    "résistance motorisée": "Motorized Resistance",
    "auto-alimenté": "Self-powered",
    "connecté": "Connected",
    "pliable": "Foldable",
    "garanti par decathlon": "Guaranteed by Decathlon",
    "cadre haut": "High-Step Frame",
    "cadre bas": "Low-Step Frame",
    "enjambement bas": "Easy Low-Step",
    "bleu nuit": "Night Blue",
    "bleu tempête": "Storm Blue",
    "gris foncé": "Dark Grey",
    "gris clair": "Light Grey",
    "vert bouteille": "Bottle Green",
    "vert amande": "Almond Green",
    "bleu": "Blue",
    "vert": "Green",
    "noir": "Black",
    "blanc": "White",
    "gris": "Grey"
  },
  es: {
    "vélo d'appartement": "Bicicleta Estática",
    "vélo tout chemin": "Bicicleta Híbrida",
    "vélo de ville": "Bicicleta Urbana",
    "vélo de route": "Bicicleta de Carretera",
    "vélo route": "Bicicleta de Carretera",
    "vélo vtt": "Bicicleta de Montaña (MTB)",
    "vtt": "Bicicleta de Montaña (MTB)",
    "poche à eau": "Bolsa de Agua",
    "bâton": "Bastón de Senderismo",
    "lampe frontale": "Linterna Frontal",
    "gourde": "Cantimplora",
    "repas lyophilisé": "Comida Liofilizada",
    "pâtes à la bolognaise": "Pasta a la Boloñesa",
    "riz et poulet au curry": "Arroz con Pollo al Curry",
    "purée de pomme de terre à la viande hachée": "Puré de Patatas con Carne Picada",
    "sans gluten": "Sin Gluten",
    "tapis de sol": "Esterilla de Fitness",
    "tapis de course": "Cinta de Correr",
    "tapis de protection sol": "Alfombra Protectora de Suelo",
    "tapis de marche": "Cinta de Andar",
    "vélo elliptique": "Bicicleta Elíptica",
    "rameur": "Máquina de Remo",
    "montre gps de sport": "Reloj Deportivo con GPS",
    "montre connectée": "Reloj Inteligente",
    "popote": "Útiles de Cocina de Camping",
    "isotherme": "Isotérmica",
    "inox": "Acero Inoxidable",
    "connecté": "Conectado",
    "pliable": "Plegable",
    "garanti par decathlon": "Garantizado por Decathlon",
    "bleu nuit": "Azul Noche",
    "bleu tempête": "Azul Tormenta",
    "gris foncé": "Gris Oscuro",
    "gris clair": "Gris Claro",
    "vert bouteille": "Verde Botella",
    "vert amande": "Verde Almendra",
    "bleu": "Azul",
    "vert": "Verde",
    "noir": "Negro",
    "blanc": "Blanco",
    "gris": "Gris"
  },
  de: {
    "vélo d'appartement": "Heimtrainer",
    "vélo tout chemin": "Trekkingrad",
    "vélo de ville": "City-Fahrrad",
    "vélo de route": "Rennrad",
    "vélo route": "Rennrad",
    "vélo vtt": "Mountainbike (MTB)",
    "vtt": "Mountainbike (MTB)",
    "poche à eau": "Trinkblase",
    "bâton": "Wanderstock",
    "lampe frontale": "Stirnlampe",
    "gourde": "Trinkflasche",
    "repas lyophilisé": "Gefriergetrocknete Mahlzeit",
    "pâtes à la bolognaise": "Nudeln Bolognese",
    "riz et poulet au curry": "Reis und Hühnchen-Curry",
    "purée de pomme de terre à la viande hachée": "Kartoffelpüree mit Hackfleisch",
    "sans gluten": "Glutenfrei",
    "tapis de sol": "Bodenmatte",
    "tapis de course": "Laufband",
    "tapis de protection sol": "Bodenschutzmatte",
    "tapis de marche": "Walking-Pad",
    "vélo elliptique": "Crosstrainer",
    "rameur": "Rudergerät",
    "montre gps de sport": "GPS-Sportuhr",
    "montre connectée": "Smartwatch",
    "popote": "Camping-Kochgeschirr",
    "isotherme": "isoliert",
    "inox": "Edelstahl",
    "connecté": "vernetzt",
    "pliable": "faltbar",
    "garanti par decathlon": "garantiert von Decathlon",
    "bleu nuit": "Nachtblau",
    "bleu tempête": "Sturmblau",
    "gris foncé": "Dunkelgrau",
    "gris clair": "Hellgrau",
    "vert bouteille": "Flaschengrün",
    "vert amande": "Mandelgrün",
    "bleu": "Blau",
    "vert": "Grün",
    "noir": "Schwarz",
    "blanc": "Weiß",
    "gris": "Grau"
  },
  it: {
    "vélo d'appartement": "Cyclette da camera",
    "vélo tout chemin": "Bici da trekking",
    "vélo de ville": "Bici da città",
    "vélo de route": "Bici da corsa",
    "vélo route": "Bici da corsa",
    "vélo vtt": "Mountain bike (MTB)",
    "vtt": "Mountain bike (MTB)",
    "poche à eau": "Sacca idrica",
    "bâton": "Bastoncino da trekking",
    "lampe frontale": "Lampada frontale",
    "gourde": "Borraccia",
    "repas lyophilisé": "Pasto liofilizzato",
    "pâtes à la bolognaise": "Pasta alla bolognese",
    "riz et poulet au curry": "Riso e pollo al curry",
    "purée de pomme de terre à la viande hachée": "Purè di patate con carne macinata",
    "sans gluten": "Senza glutine",
    "tapis de sol": "Tappetino da fitness",
    "tapis de course": "Tapis roulant",
    "tapis de protection sol": "Tappetino salvapavimento",
    "tapis de marche": "Tappeto da camminata",
    "vélo elliptique": "Bici ellittica",
    "rameur": "Vogatore",
    "montre gps de sport": "Orologio sportivo GPS",
    "montre connectée": "Smartwatch",
    "popote": "Gavetta da campeggio",
    "isotherme": "Isotermica",
    "inox": "Acciaio inossidabile",
    "connecté": "Connesso",
    "pliable": "Pieghevole",
    "garanti par decathlon": "Garantito da Decathlon",
    "bleu nuit": "Blu notte",
    "bleu tempête": "Blu tempesta",
    "gris foncé": "Grigio scuro",
    "gris clair": "Grigio chiaro",
    "vert bouteille": "Verde bottiglia",
    "vert amande": "Verde mandorla",
    "bleu": "Blu",
    "vert": "Verde",
    "noir": "Nero",
    "blanc": "Bianco",
    "gris": "Grigio"
  },
  ja: {
    "vélo d'appartement": "エアロバイク",
    "vélo tout chemin": "クロスバイク",
    "vélo de ville": "シティサイクル",
    "vélo de route": "ロードバイク",
    "vélo route": "ロードバイク",
    "vélo vtt": "マウンテンバイク (MTB)",
    "vtt": "マウンテンバイク (MTB)",
    "poche à eau": "ハイドレーションバルブ",
    "bâton": "トレッキングポール",
    "lampe frontale": "ヘッドランプ",
    "gourde": "ウォーターボトル",
    "repas lyophilisé": "フリーズドライ食品",
    "pâtes à la bolognaise": "ボロネーゼパスタ",
    "riz et poulet au curry": "チキンカレーライス",
    "purée de pomme de terre à la viande hachée": "ひき肉入りマッシュポテト",
    "sans gluten": "グルテンフリー",
    "tapis de sol": "ヨガマット",
    "tapis de course": "ランニングマシン",
    "tapis de protection sol": "フロア保護マット",
    "tapis de marche": "ウォーキングパッド",
    "vélo elliptique": "クロストレーナー",
    "rameur": "ローイングマシン",
    "montre gps de sport": "GPSスポーツウォッチ",
    "montre connectée": "スマートウォッチ",
    "popote": "クッカーセット",
    "isotherme": "魔法瓶・保温",
    "inox": "ステンレス製",
    "connecté": "スマート接続対応",
    "pliable": "折りたたみ式",
    "garanti par decathlon": "デカトロン保証付",
    "bleu nuit": "ナイトブルー",
    "bleu tempête": "ストームブルー",
    "gris foncé": "ダークグレー",
    "gris clair": "ライトグレー",
    "vert bouteille": "ボトルグリーン",
    "vert amande": "アーモンドグリーン",
    "bleu": "ブルー",
    "vert": "グリーン",
    "noir": "ブラック",
    "blanc": "ホワイト",
    "gris": "グレー"
  }
};

const translateTitle = (title: string, currentLang: string): string => {
  if (currentLang === 'fr' || !title) return title;
  
  const dict = translationDictionary[currentLang];
  if (!dict) return title;

  let translated = title;
  const sortedKeys = Object.keys(dict).sort((a, b) => b.length - a.length);

  for (const frenchWord of sortedKeys) {
    const targetWord = dict[frenchWord];
    const escapedKey = frenchWord.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedKey, 'gi');
    translated = translated.replace(regex, (match) => {
      if (match === match.toUpperCase()) {
        return targetWord.toUpperCase();
      }
      if (match[0] === match[0].toUpperCase()) {
        return targetWord[0].toUpperCase() + targetWord.slice(1);
      }
      return targetWord;
    });
  }
  return translated;
};

// Types pour le panier
interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

// Définition des traductions issues de l'HTML original, enrichies pour de nouvelles sections
const translations: Record<string, Record<string, string>> = {
  fr: {
    create_account: "Créer un compte",
    cart: "Panier",
    search_placeholder: "Rechercher un produit...",
    free_shipping: "LIVRAISON GRATUITE DÈS 50€",
    nav_velo: "Vélo",
    nav_randonnee: "Randonnée",
    nav_fitness: "Fitness",
    nav_running: "Running",
    nav_nutrition: "Nutrition",
    nav_accessoires: "Accessoires",
    hero_tag: "SÉRIE 900 • PERFORMANCE",
    hero_title: "REPOUSSEZ VOS LIMITES AVEC APEX.",
    hero_desc: "Découvrez notre nouvelle collection de cyclisme de route haute performance. Conçue pour la vitesse, testée pour l'endurance.",
    view_collection: "VOIR LA COLLECTION",
    learn_more: "EN SAVOIR PLUS",
    categories_title: "CATÉGORIES",
    discover: "DÉCOUVRIR",
    featured_title: "PRODUITS PHARES",
    featured_desc: "Équipements les plus plébiscités par nos athlètes.",
    view_all: "VOIR TOUT",
    tag_bike: "Équipement Vélo",
    tag_tech: "Accessoires Tech",
    in_stock: "En Stock",
    low_stock: "Stock faible",
    brand_title: "L'INGÉNIERIE AU SERVICE DE LA PERFORMANCE.",
    brand_desc: "Chaque produit Apex est testé par des professionnels dans les conditions les plus extrêmes pour vous garantir une fiabilité sans faille.",
    stat_engineers: "INGÉNIEURS",
    stat_satisfaction: "SATISFACTION",
    footer_about: "L'expertise technique pour les athlètes exigeants. Gear Engineered for Winners.",
    customer_service: "Service Client",
    company: "Entreprise",
    footer_cs: "Service Client",
    footer_shipping: "Infos Livraison",
    footer_returns: "Retours",
    footer_stores: "Trouver un magasin",
    footer_contact: "Contactez-nous",
    footer_privacy: "Politique de Confidentialité",
    newsletter_desc: "Recevez nos dernières spécifications techniques.",
    newsletter_placeholder: "Votre email",
    rights: "Tous droits réservés.",
    all_products: "Tous les produits",
    sort_by: "Trier par",
    sort_relevance: "Pertinence",
    sort_price_asc: "Prix : croissant",
    sort_price_desc: "Prix : décroissant",
    sort_rating: "Meilleures notes",
    size_label: "Taille",
    add_to_cart: "Ajouter au panier",
    no_products: "Aucun produit trouvé pour votre recherche.",
    no_category_products_title: "Arrivage imminent !",
    no_category_products_desc: "Nous préparons actuellement notre nouvelle sélection d'articles de sport de niveau professionnel pour la gamme",
    no_category_products_button: "Retourner aux produits phares",
    cart_title: "Votre Panier",
    cart_empty: "Votre panier est vide",
    cart_total: "Total",
    cart_checkout: "Passer la commande",
    continue_shopping: "Continuer mes achats",
    checkout_success_title: "Commande confirmée !",
    checkout_success_desc: "Un email contenant votre récapitulatif ainsi que vos informations d'expédition vous a été envoyé. Merci de faire confiance à APEX SPORTS !",
    checkout_success_btn: "Fermer",
    item_removed: "Produit retiré du panier",
    item_added: "Produit ajouté au panier",
    quantity: "Quantité",
    order_summary: "Résumé de la commande",
    subtotal: "Sous-total",
    shipping_cost: "Livraison",
    free: "Gratuite",
    shipping_note: "Livraison gratuite pour les commandes supérieures à 50 € !",
    newsletter_success: "Merci ! Votre inscription à la newsletter technique d'APEX SPORTS a été enregistrée.",
    about_us_title: "À propos d'APEX",
    quick_view: "Aperçu",
    select_size: "Veuillez choisir une taille",
    close: "Fermer"
  },
  en: {
    create_account: "Create Account",
    cart: "Cart",
    search_placeholder: "Search for a product...",
    free_shipping: "FREE SHIPPING ON ORDERS OVER 50€",
    nav_velo: "Biking",
    nav_randonnee: "Hiking",
    nav_fitness: "Fitness",
    nav_running: "Running",
    nav_nutrition: "Nutrition",
    nav_accessoires: "Accessories",
    hero_tag: "900 SERIES • PERFORMANCE",
    hero_title: "PUSH YOUR LIMITS WITH APEX.",
    hero_desc: "Discover our new high-performance road cycling collection. Built for speed, tested for endurance.",
    view_collection: "VIEW COLLECTION",
    learn_more: "LEARN MORE",
    categories_title: "CATEGORIES",
    discover: "DISCOVER",
    featured_title: "FEATURED PRODUCTS",
    featured_desc: "Equipment most praised by our athletes.",
    view_all: "VIEW ALL",
    tag_bike: "Cycling Gear",
    tag_tech: "Tech Accessories",
    in_stock: "In Stock",
    low_stock: "Low stock",
    brand_title: "ENGINEERING FOR PERFORMANCE.",
    brand_desc: "Every Apex product is professional-tested in extreme conditions to guarantee flawless reliability.",
    stat_engineers: "ENGINEERS",
    stat_satisfaction: "SATISFACTION",
    footer_about: "Technical expertise for demanding athletes. Gear Engineered for Winners.",
    customer_service: "Customer Service",
    company: "Company",
    footer_cs: "Customer Service",
    footer_shipping: "Shipping Info",
    footer_returns: "Returns",
    footer_stores: "Store Finder",
    footer_contact: "Contact Us",
    footer_privacy: "Privacy Policy",
    newsletter_desc: "Receive our latest technical specifications.",
    newsletter_placeholder: "Your email",
    rights: "All rights reserved.",
    all_products: "All products",
    sort_by: "Sort by",
    sort_relevance: "Relevance",
    sort_price_asc: "Price: Low to High",
    sort_price_desc: "Price: High to Low",
    sort_rating: "Best reviews",
    size_label: "Size",
    add_to_cart: "Add to cart",
    no_products: "No products found matching your search.",
    no_category_products_title: "Coming soon!",
    no_category_products_desc: "We are currently curating our high-performance technical sports gear for the collection",
    no_category_products_button: "Back to featured products",
    cart_title: "Your Cart",
    cart_empty: "Your cart is empty",
    cart_total: "Total",
    cart_checkout: "Checkout",
    continue_shopping: "Continue Shopping",
    checkout_success_title: "Order Confirmed!",
    checkout_success_desc: "A confirmation email detailing your shipment has been sent to your address. Thank you for choosing APEX SPORTS!",
    checkout_success_btn: "Close",
    item_removed: "Item removed from cart",
    item_added: "Item added to cart",
    quantity: "Quantity",
    order_summary: "Order Summary",
    subtotal: "Subtotal",
    shipping_cost: "Shipping",
    free: "Free",
    shipping_note: "Free shipping on orders over 50 €!",
    newsletter_success: "Thank you! You have subscribed to the APEX SPORTS technical newsletter.",
    about_us_title: "About APEX",
    quick_view: "Preview",
    select_size: "Please select a size",
    close: "Close"
  },
  es: {
    create_account: "Crear Cuenta",
    cart: "Carrito",
    search_placeholder: "Buscar un producto...",
    free_shipping: "ENVÍO GRATIS DESDE 50€",
    nav_velo: "Ciclismo",
    nav_randonnee: "Senderismo",
    nav_fitness: "Fitness",
    nav_running: "Running",
    nav_nutrition: "Nutrición",
    nav_accessoires: "Accesorios",
    hero_tag: "SERIE 900 • RENDIMIENTO",
    hero_title: "SUPERA TUS LÍMITES CON APEX.",
    hero_desc: "Descubre nuestra nueva colección de ciclismo de carretera de alto rendimiento. Diseñada para la velocidad, probada para la resistencia.",
    view_collection: "VER COLECCIÓN",
    learn_more: "MÁS INFORMACIÓN",
    categories_title: "CATEGORÍAS",
    discover: "DESCUBRIR",
    featured_title: "PRODUCTOS DESTACADOS",
    featured_desc: "Equipos más aclamados por nuestros atletas.",
    view_all: "VER TODO",
    tag_bike: "Equipo de Ciclismo",
    tag_tech: "Accesorios Tech",
    in_stock: "En Stock",
    low_stock: "Stock bajo",
    brand_title: "INGENIERÍA AL SERVICIO DEL RENDIMIENTO.",
    brand_desc: "Cada producto Apex es probado por profesionales en las condiciones más extremas para garantizar una fiabilidad total.",
    stat_engineers: "INGENIEROS",
    stat_satisfaction: "SATISFACCIÓN",
    footer_about: "Experiencia técnica para atletas exigentes. Gear Engineered for Winners.",
    customer_service: "Servicio al Cliente",
    company: "Empresa",
    footer_cs: "Servicio al Cliente",
    footer_shipping: "Información de Envío",
    footer_returns: "Devoluciones",
    footer_stores: "Buscador de Tiendas",
    footer_contact: "Contáctenos",
    footer_privacy: "Política de Privacidad",
    newsletter_desc: "Reciba nuestras últimas especificaciones técnicas.",
    newsletter_placeholder: "Su email",
    rights: "Todos los derechos reservados.",
    all_products: "Todos los productos",
    sort_by: "Ordenar por",
    sort_relevance: "Relevancia",
    sort_price_asc: "Precio: de menor a mayor",
    sort_price_desc: "Precio: de mayor a menor",
    sort_rating: "Mejores valoraciones",
    size_label: "Talla",
    add_to_cart: "Añadir al carrito",
    no_products: "No se encontraron productos que coincidan con su búsqueda.",
    no_category_products_title: "¡Próximamente!",
    no_category_products_desc: "Actualmente estamos preparando nuestra nueva selección técnica de artículos deportivos para la gama",
    no_category_products_button: "Volver a productos destacados",
    cart_title: "Su Carrito",
    cart_empty: "Su carrito está vacío",
    cart_total: "Total",
    cart_checkout: "Proceder al pago",
    continue_shopping: "Continuar Comprando",
    checkout_success_title: "¡Pedido Confirmado!",
    checkout_success_desc: "Se ha enviado un correo electrónico con el resumen del pedido y la información de entrega. ¡Gracias por confiar en APEX SPORTS!",
    checkout_success_btn: "Cerrar",
    item_removed: "Producto retirado del carrito",
    item_added: "Producto añadido al carrito",
    quantity: "Cantidad",
    order_summary: "Resumen del Pedido",
    subtotal: "Subtotal",
    shipping_cost: "Envío",
    free: "Gratis",
    shipping_note: "¡Envío gratuito para pedidos superiores a 50 €!",
    newsletter_success: "¡Gracias! Su suscripción al boletín técnico de APEX SPORTS ha sido registrada.",
    about_us_title: "Sobre APEX",
    quick_view: "Vista previa",
    select_size: "Por favor, seleccione una talla",
    close: "Cerrar"
  },
  de: {
    create_account: "Konto erstellen",
    cart: "Warenkorb",
    search_placeholder: "Nach einem Produkt suchen...",
    free_shipping: "KOSTENLOSER VERSAND AB 50€",
    nav_velo: "Radsport",
    nav_randonnee: "Wandern",
    nav_fitness: "Fitness",
    nav_running: "Laufen",
    nav_nutrition: "Ernährung",
    nav_accessoires: "Zubehör",
    hero_tag: "SERIE 900 • PERFORMANCE",
    hero_title: "ÜBERTREFFEN SIE IHRE GRENZEN MIT APEX.",
    hero_desc: "Entdecken Sie unsere neue Hochleistungs-Rennrad-Kollektion. Gebaut für Geschwindigkeit, getestet für Ausdauer.",
    view_collection: "KOLLEKTION ANSEHEN",
    learn_more: "MEHR ERFAHREN",
    categories_title: "KATEGORIEN",
    discover: "ENTDECKEN",
    featured_title: "PRODUKTHIGHLIGHTS",
    featured_desc: "Ausrüstung, die von unseren Athleten am meisten geschätzt wird.",
    view_all: "ALLE ANZEIGEN",
    tag_bike: "Radsportausrüstung",
    tag_tech: "Tech-Zubehör",
    in_stock: "Auf Lager",
    low_stock: "Geringer Bestand",
    brand_title: "INGENIEURSKUNST IM DIENSTE DER LEISTUNG.",
    brand_desc: "Jedes Apex-Produkt wird von Profis unter den extremsten Bedingungen getestet, um absolute Zuverlässigkeit zu garantieren.",
    stat_engineers: "INGENIEURE",
    stat_satisfaction: "ZUFRIEDENHEIT",
    footer_about: "Technische Expertise für anspruchsvolle Athleten. Gear Engineered for Winners.",
    customer_service: "Kundendienst",
    company: "Unternehmen",
    footer_cs: "Kundendienst",
    footer_shipping: "Versandinformationen",
    footer_returns: "Rücksendungen",
    footer_stores: "Filialfinder",
    footer_contact: "Kontakt",
    footer_privacy: "Datenschutzerklärung",
    newsletter_desc: "Erhalten Sie unsere neuesten technischen Spezifikationen.",
    newsletter_placeholder: "Ihre E-Mail",
    rights: "Alle Rechte vorbehalten.",
    all_products: "Alle Produkte",
    sort_by: "Sortieren nach",
    sort_relevance: "Relevanz",
    sort_price_asc: "Preis: aufsteigend",
    sort_price_desc: "Preis: absteigend",
    sort_rating: "Beste Bewertungen",
    size_label: "Größe",
    add_to_cart: "In den Warenkorb",
    no_products: "Keine Produkte für Ihre Suche gefunden.",
    no_category_products_title: "In Kürze verfügbar!",
    no_category_products_desc: "Wir bereiten derzeit unsere neue professionelle Sportauswahl vor für die Reihe",
    no_category_products_button: "Zurück zu den Highlights",
    cart_title: "Ihr Warenkorb",
    cart_empty: "Ihr Warenkorb ist leer",
    cart_total: "Gesamtsumme",
    cart_checkout: "Zur Kasse",
    continue_shopping: "Einkauf fortsetzen",
    checkout_success_title: "Bestellung bestätigt!",
    checkout_success_desc: "Eine Bestätigungs-E-Mail mit den Bestelldetails und Versandinformationen wurde an Ihre Adresse gesendet. Vielen Dank für Ihr Vertrauen in APEX SPORTS!",
    checkout_success_btn: "Schließen",
    item_removed: "Produkt aus dem Warenkorb entfernt",
    item_added: "Produkt zum Warenkorb hinzugefügt",
    quantity: "Menge",
    order_summary: "Bestellübersicht",
    subtotal: "Zwischensumme",
    shipping_cost: "Versand",
    free: "Kostenlos",
    shipping_note: "Kostenloser Versand für Bestellungen über 50 €!",
    newsletter_success: "Vielen Dank! Ihre Anmeldung zum technischen Newsletter von APEX SPORTS wurde registriert.",
    about_us_title: "Über APEX",
    quick_view: "Vorschau",
    select_size: "Bitte wählen Sie eine Größe",
    close: "Schließen"
  },
  it: {
    create_account: "Crea un Account",
    cart: "Carrello",
    search_placeholder: "Cerca un prodotto...",
    free_shipping: "SPEDIZIONE GRATUITA DA 50€",
    nav_velo: "Ciclismo",
    nav_randonnee: "Escursionismo",
    nav_fitness: "Fitness",
    nav_running: "Corsa",
    nav_nutrition: "Nutrizione",
    nav_accessoires: "Accessori",
    hero_tag: "SERIE 900 • PERFORMANCE",
    hero_title: "SUPERA I TUOI LIMITI CON APEX.",
    hero_desc: "Scopri la nostra nuova collezione per ciclismo di strada ad alte prestazioni. Progettata per la velocità, testata per la durata.",
    view_collection: "VEDI COLLEZIONE",
    learn_more: "SCOPRI DI PIÙ",
    categories_title: "CATEGORIE",
    discover: "SCOPRI",
    featured_title: "PRODOTTI IN EVIDENZA",
    featured_desc: "Attrezzatura più apprezzata dai nostri atleti.",
    view_all: "VEDI TUTTO",
    tag_bike: "Attrezzatura Ciclismo",
    tag_tech: "Accessori Tech",
    in_stock: "Disponibile",
    low_stock: "Poche unità",
    brand_title: "INGEGNERIA AL SERVIZIO DELLA PERFORMANCE.",
    brand_desc: "Ogni prodotto Apex è testato da professionisti nelle condizioni più estreme per garantire un'affidabilità totale.",
    stat_engineers: "INGEGNERI",
    stat_satisfaction: "SODDISFAZIONE",
    footer_about: "Competenza tecnica per atleti esigenti. Gear Engineered for Winners.",
    customer_service: "Servizio Clienti",
    company: "Azienda",
    footer_cs: "Servizio Clienti",
    footer_shipping: "Info Spedizione",
    footer_returns: "Resi e rimborsi",
    footer_stores: "Trova un negozio",
    footer_contact: "Contattaci",
    footer_privacy: "Informativa sulla Privacy",
    newsletter_desc: "Ricevi le nostre ultime specifiche tecniche.",
    newsletter_placeholder: "La tua email",
    rights: "Tutti i diritti riservati.",
    all_products: "Tutti i prodotti",
    sort_by: "Ordina per",
    sort_relevance: "Rilevanza",
    sort_price_asc: "Prezzo: dal più basso",
    sort_price_desc: "Prezzo: dal più alto",
    sort_rating: "Recensioni migliori",
    size_label: "Taglia",
    add_to_cart: "Aggiungi al carrello",
    no_products: "Nessun prodotto trovato per la tua ricerca.",
    no_category_products_title: "In arrivo!",
    no_category_products_desc: "Stiamo preparando la nostra nuova selezione atletica professionale per la linea",
    no_category_products_button: "Torna in evidenza",
    cart_title: "Il tuo Carrello",
    cart_empty: "Il tuo carrello è vuoto",
    cart_total: "Totale",
    cart_checkout: "Procedi al pagamento",
    continue_shopping: "Continua lo Shopping",
    checkout_success_title: "Ordine Confermato!",
    checkout_success_desc: "Ti abbiamo inviato un'email di riepilogo con le informazioni sulla spedizione. Grazie per aver scelto APEX SPORTS!",
    checkout_success_btn: "Chiudi",
    item_removed: "Prodotto rimosso dal carrello",
    item_added: "Prodotto aggiunto al carrello",
    quantity: "Quantità",
    order_summary: "Riassunto dell'Ordine",
    subtotal: "Subtotale",
    shipping_cost: "Spedizione",
    free: "Gratis",
    shipping_note: "Spedizione gratuita per ordini superiori a 50 €!",
    newsletter_success: "Grazie! La tua iscrizione alla newsletter tecnica di APEX SPORTS è stata registrata.",
    about_us_title: "Chi siamo",
    quick_view: "Anteprima",
    select_size: "Seleziona una taglia",
    close: "Chiudi"
  },
  ja: {
    create_account: "アカウント作成",
    cart: "カート",
    search_placeholder: "商品を検索...",
    free_shipping: "50€以上のご購入で送料無料",
    nav_velo: "バイク",
    nav_randonnee: "ハイキング",
    nav_fitness: "フィットネス",
    nav_running: "ランニング",
    nav_nutrition: "栄養食品",
    nav_accessoires: "アクセサリー",
    hero_tag: "900 シリーズ • パフォーマンス",
    hero_title: "APEXで限界を超えろ。",
    hero_desc: "高機能ロードサイクリングコレクションが登場。スピードと耐久性を極限まで追求。",
    view_collection: "コレクションを見る",
    learn_more: "詳細はこちら",
    categories_title: "カテゴリー",
    discover: "発見する",
    featured_title: "注目の製品",
    featured_desc: "トップアスリートたちに最も支持されているギア。",
    view_all: "すべて表示",
    tag_bike: "バイクギア",
    tag_tech: "テックアクセサリー",
    in_stock: "在庫あり",
    low_stock: "残りわずか",
    brand_title: "パフォーマンスのためのテクノロジー。",
    brand_desc: "すべてのApex製品は極限の環境でプロによるテストを重ね、確かな信頼性を保証しています。",
    stat_engineers: "技術者",
    stat_satisfaction: "顧客満足度",
    footer_about: "要求の厳しいアスリートのための技術的専門知識。Gear Engineered for Winners.",
    customer_service: "カスタマーサービス",
    company: "会社概要",
    footer_cs: "カスタマーサービス",
    footer_shipping: "配送情報",
    footer_returns: "返品について",
    footer_stores: "店舗検索",
    footer_contact: "お問合せ",
    footer_privacy: "個人情報保護方針",
    newsletter_desc: "最新のテクノロジースペックを配信中。",
    newsletter_placeholder: "メールアドレス",
    rights: "All rights reserved.",
    all_products: "すべての製品",
    sort_by: "並び替え",
    sort_relevance: "おすすめ順",
    sort_price_asc: "価格の安い順",
    sort_price_desc: "価格の高い順",
    sort_rating: "評価の高い順",
    size_label: "サイズ",
    add_to_cart: "カートに追加",
    no_products: "検索条件に一致する製品が見つかりませんでした。",
    no_category_products_title: "間もなく登場！",
    no_category_products_desc: "現在、アスリートモデルの新ラインナップを準備中です。対象コレクション：",
    no_category_products_button: "注目製品に戻る",
    cart_title: "ショッピングカート",
    cart_empty: "カートが空です",
    cart_total: "合計",
    cart_checkout: "ご購入手続きへ",
    continue_shopping: "買い物を続ける",
    checkout_success_title: "ご注文が確定しました！",
    checkout_success_desc: "ご注文内容とお届け情報の詳細を記載した確認メールをお送りしました。APEX SPORTSをご利用いただきありがとうございます！",
    checkout_success_btn: "閉じる",
    item_removed: "カートから商品を削除しました",
    item_added: "商品をカートに追加しました",
    quantity: "数量",
    order_summary: "注文の概要",
    subtotal: "小計",
    shipping_cost: "送料",
    free: "無料",
    shipping_note: "50€以上のご注文で送料無料！",
    newsletter_success: "ありがとうございます！APEX SPORTS技術ニュースレターへのご登録が完了しました。",
    about_us_title: "APEXについて",
    quick_view: "プレビュー",
    select_size: "サイズを選択してください",
    close: "閉じる"
  }
};

const currencyRates: Record<string, { symbol: string; rate: number; pos: 'left' | 'right' }> = {
  EUR: { symbol: "€", rate: 1, pos: 'right' },
  USD: { symbol: "$", rate: 1.1, pos: 'left' },
  GBP: { symbol: "£", rate: 0.85, pos: 'left' },
  JPY: { symbol: "¥", rate: 160, pos: 'left' },
  CAD: { symbol: "C$", rate: 1.5, pos: 'left' },
  CHF: { symbol: "CHF", rate: 0.95, pos: 'right' }
};

interface LanguageOption {
  lang: string;
  currency: string;
  flag: string;
  label: string;
}

const languageOptions: LanguageOption[] = [
  { lang: 'fr', currency: 'EUR', flag: 'https://flagcdn.com/w40/fr.png', label: 'FR/EUR' },
  { lang: 'en', currency: 'USD', flag: 'https://flagcdn.com/w40/us.png', label: 'US/USD' },
  { lang: 'en', currency: 'GBP', flag: 'https://flagcdn.com/w40/gb.png', label: 'UK/GBP' },
  { lang: 'es', currency: 'EUR', flag: 'https://flagcdn.com/w40/es.png', label: 'ES/EUR' },
  { lang: 'de', currency: 'EUR', flag: 'https://flagcdn.com/w40/de.png', label: 'DE/EUR' },
  { lang: 'it', currency: 'EUR', flag: 'https://flagcdn.com/w40/it.png', label: 'IT/EUR' },
  { lang: 'ja', currency: 'JPY', flag: 'https://flagcdn.com/w40/jp.png', label: 'JP/JPY' },
  { lang: 'en', currency: 'CAD', flag: 'https://flagcdn.com/w40/ca.png', label: 'CA/CAD' },
  { lang: 'de', currency: 'CHF', flag: 'https://flagcdn.com/w40/ch.png', label: 'CH/CHF' }
];

const catSubcategories: Record<string, { id: string; label: Record<string, string>; match: (p: Product) => boolean }[]> = {
  'vélo': [
    { id: 'vtt', label: { fr: 'VTT', en: 'MTB', es: 'VTT', de: 'MTB', it: 'VTT', ja: 'マウンテンバイク (MTB)' }, match: (p) => p.title.toLowerCase().includes('vtt') },
    { id: 'vtc', label: { fr: 'VTC', en: 'VTC / Hybrid', es: 'VTC / Híbrida', de: 'Trekkingrad', it: 'VTC / Trekking', ja: 'クロスバイク' }, match: (p) => p.title.toLowerCase().includes('vtc') || p.title.toLowerCase().includes('tout chemin') || p.title.toLowerCase().includes('gravel') },
    { id: 'route', label: { fr: 'Route', en: 'Road Bike', es: 'Carretera', de: 'Rennrad', it: 'Corsa', ja: 'ロードバイク' }, match: (p) => p.title.toLowerCase().includes('route') || p.title.toLowerCase().includes('rc120') || p.title.toLowerCase().includes('van rysel') },
    { id: 'electrique', label: { fr: 'Électrique', en: 'Electric Bike', es: 'Eléctrica', de: 'E-Bike', it: 'Elettrica', ja: '電動アシスト自転車' }, match: (p) => p.title.toLowerCase().includes('électrique') || p.title.toLowerCase().includes('e-expl') || p.title.toLowerCase().includes('e-actv') },
  ],
  'randonnée': [
    { id: 'baton', label: { fr: 'Bâtons', en: 'Hiking Poles', es: 'Bastones', de: 'Wanderstöcke', it: 'Bastoncini', ja: 'トレッキングポール' }, match: (p) => p.title.toLowerCase().includes('bâton') || p.title.toLowerCase().includes('compact') },
    { id: 'cuisine', label: { fr: 'Cuisine & Gourdes', en: 'Cooksets & Bottles', es: 'Cocina y Cantimploras', de: 'Kochen & Flaschen', it: 'Borraccia e Gavetta', ja: 'クッカー＆ボトル' }, match: (p) => p.title.toLowerCase().includes('popote') || p.title.toLowerCase().includes('gourde') || p.title.toLowerCase().includes('lyophilisé') || p.title.toLowerCase().includes('repas') },
    { id: 'high-tech', label: { fr: 'Montres & Éclairage', en: 'Watches & Lighting', es: 'Relojes y Linternas', de: 'Uhren & Stirnlampen', it: 'Orologi e Frontali', ja: '時計＆ヘッドライト' }, match: (p) => p.title.toLowerCase().includes('montre') || p.title.toLowerCase().includes('gps') || p.title.toLowerCase().includes('lampe') || p.title.toLowerCase().includes('frontale') },
    { id: 'accessoires', label: { fr: 'Hydratation', en: 'Hydration', es: 'Hidratación', de: 'Trinkblasen', it: 'Sacca idrica', ja: 'ハイドレーション' }, match: (p) => p.title.toLowerCase().includes('poche à eau') },
  ],
  'fitness': [
    { id: 'tapis', label: { fr: 'Tapis & Protections', en: 'Treadmills & Mats', es: 'Cintas y Alfombras', de: 'Laufbänder & Matten', it: 'Tapis roulant e Tappetini', ja: 'トレッドミル＆ヨガマット' }, match: (p) => p.title.toLowerCase().includes('tapis') || p.title.toLowerCase().includes('marche') || p.title.toLowerCase().includes('course') || p.title.toLowerCase().includes('sol') },
    { id: 'velos', label: { fr: 'Vélos d\'Appartement', en: 'Stationary Bikes', es: 'Bicicletas Estáticas', de: 'Heimtrainer', it: 'Cyclette da camera', ja: 'エアロバイク' }, match: (p) => p.title.toLowerCase().includes('vélo d\'appartement') || p.title.toLowerCase().includes('elliptique') },
    { id: 'rameurs', label: { fr: 'Rameurs & Autre', en: 'Rowing Machines', es: 'Vogadores', de: 'Rudergeräte', it: 'Rameurs & Altro', ja: 'ローイングマシン' }, match: (p) => p.title.toLowerCase().includes('rameur') },
  ]
};

export default function App() {
  // --- States ---
  const [lang, setLang] = useState<string>('fr');

  const products = useMemo(() => {
    return rawProducts.map(p => ({
      ...p,
      title: translateTitle(p.title, lang)
    }));
  }, [lang]);

  const [currency, setCurrency] = useState<string>('EUR');
  const [currentFlag, setCurrentFlag] = useState<string>('https://flagcdn.com/w40/fr.png');
  const [currentLangLabel, setCurrentLangLabel] = useState<string>('FR/EUR');
  
  const [dropdownActive, setDropdownActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all'); // 'all', 'vélo', 'randonnée', 'fitness' etc.
  const [sortBy, setSortBy] = useState<string>('relevance');

  // --- Left Sidebar Filter States ---
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [isSubcategoryAccordionOpen, setIsSubcategoryAccordionOpen] = useState<boolean>(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Panier
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('apex_sports_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const prodId = params.get('product') || params.get('p');
      if (prodId) {
        const found = rawProducts.find(p => String(p.id) === String(prodId));
        if (found) return found;
      }
      const hash = window.location.hash;
      if (hash) {
        const hashParams = new URLSearchParams(hash.replace(/^#/, ''));
        const hashProdId = hashParams.get('product') || hashParams.get('p');
        if (hashProdId) {
          const found = rawProducts.find(p => String(p.id) === String(hashProdId));
          if (found) return found;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  });
  const [sizeSelection, setSizeSelection] = useState<string>('');
  const [checkoutStep, setCheckoutStep] = useState<'shopping' | 'success'>('shopping');

  // Comparateur de produits
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [slotQueries, setSlotQueries] = useState<string[]>(['', '', '']);
  const [pickingSlotIndex, setPickingSlotIndex] = useState<number | null>(null);
  const [pickerSearchQuery, setPickerSearchQuery] = useState<string>('');

  const renderSidebarFilters = () => {
    return (
      <div className="space-y-6">
        {/* 1. SUBCATEGORIES SECTION (ADAPTIVE TO ACTIVE SPORT CATEGORY) */}
        {(() => {
          if (selectedCategory === 'all') return null;
          const activeCategoryForSub = selectedCategory;
          const subList = catSubcategories[activeCategoryForSub] || [];
          if (subList.length === 0) return null;
          
          return (
            <div className="space-y-3" id="sidebar-subcategories-group">
              <div 
                className="flex items-center justify-between pb-2 border-b border-outline-variant/50 cursor-pointer" 
                onClick={() => setIsSubcategoryAccordionOpen(!isSubcategoryAccordionOpen)}
              >
                <h4 className="font-bold text-xs uppercase tracking-wider text-primary">
                  {activeCategoryForSub === 'vélo' ? 'VÉLO' : activeCategoryForSub === 'randonnée' ? 'RANDONNÉE' : activeCategoryForSub.toUpperCase()}
                </h4>
                <span className="material-symbols-outlined text-outline text-[16px] transition-transform duration-200" style={{ transform: isSubcategoryAccordionOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}>
                  expand_less
                </span>
              </div>
              
              {isSubcategoryAccordionOpen && (
                <div className="space-y-0.5 py-1 animate-in fade-in duration-200" id="sidebar-subcategories-links">
                  {subList.map((sub) => {
                    // Compute dynamic product count in search or category context
                    const matchingCount = products.filter(p => {
                      const isOfCat = selectedCategory === 'all' ? true : p.category === selectedCategory;
                      return isOfCat && sub.match(p);
                    }).length;

                    const isActive = selectedSubcategory === sub.id;
                    
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedSubcategory(isActive ? null : sub.id)}
                        className={`w-full flex items-center justify-between text-left py-1 px-1 text-sm transition-all rounded-sm cursor-pointer hover:bg-surface-container/50 ${
                          isActive 
                            ? 'font-bold text-primary text-[14.5px]' 
                            : 'text-on-surface-variant font-medium hover:text-primary text-[13.5px]'
                        }`}
                      >
                        <span className={isActive ? "underline decoration-primary decoration-2" : ""}>
                          {sub.label[lang] || sub.label['fr']}
                        </span>
                        <span className={`text-[11px] font-technical-data ${isActive ? 'font-bold text-primary' : 'text-outline/80'}`}>
                          ({matchingCount})
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })()}

        {/* 3. PRIX FILTER */}
        <div className="space-y-4" id="sidebar-price-group">
          <div className="pb-2 border-b border-outline-variant/50">
            <h4 className="font-bold text-xs uppercase tracking-wider text-primary">
              {lang === 'fr' ? 'PRIX (EUR)' : 'PRICE (EUR)'}
            </h4>
          </div>
          
          <div className="space-y-4 pt-1">
            {/* Range Slider for Max Price */}
            <div className="relative">
              <input 
                type="range" 
                min="0" 
                max="5000" 
                step="50"
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-outline font-technical-data font-medium mt-1 uppercase">
                <span>0€</span>
                <span>5000€</span>
              </div>
            </div>

            {/* Direct inputs for min and max price */}
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <input 
                  type="number" 
                  value={minPrice} 
                  min="0"
                  max="5000"
                  onChange={(e) => setMinPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-white border border-outline-variant/80 px-2 py-1.5 rounded-sm text-sm text-[13px] text-center font-technical-data text-on-surface focus:outline-none focus:border-primary"
                  placeholder="Min"
                />
              </div>
              <span className="text-outline text-xs font-semibold">-</span>
              <div className="relative flex-grow">
                <input 
                  type="number" 
                  value={maxPrice} 
                  min="0"
                  max="5000"
                  onChange={(e) => setMaxPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-white border border-outline-variant/80 px-2 py-1.5 rounded-sm text-sm text-[13px] text-center font-technical-data text-on-surface focus:outline-none focus:border-primary"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Clear Filters Button */}
            {(minPrice > 0 || maxPrice < 5000 || selectedSubcategory !== null) && (
              <button 
                onClick={() => {
                  setMinPrice(0);
                  setMaxPrice(5000);
                  setSelectedSubcategory(null);
                }}
                className="w-full py-1.5 border border-outline-variant hover:border-outline text-on-surface text-[11px] font-label-bold rounded-sm transition-colors mt-2 uppercase tracking-wide cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[14px]">filter_alt_off</span>
                <span>{lang === 'fr' ? "Réinitialiser" : "Reset"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const changeCategory = (catId: string) => {
    setSelectedProduct(null);
    setSelectedCategory(catId);
    setSelectedSubcategory(null);
  };

  const setSlotQuery = (idx: number, val: string) => {
    setSlotQueries((prev) => {
      const updated = [...prev];
      updated[idx] = val;
      return updated;
    });
  };

  const toggleCompareProduct = (product: Product) => {
    setComparedProducts((prev) => {
      const isAlreadyAdded = prev.some((p) => p.id === product.id);
      if (isAlreadyAdded) {
        setToastMessage(lang === 'fr' ? "Produit retiré du comparateur" : "Product removed from comparison");
        setTimeout(() => setToastMessage(''), 2500);
        return prev.filter((p) => p.id !== product.id);
      } else {
        // Enforce category coherence: compare only products of the same category
        if (prev.length > 0 && prev[0].category !== product.category) {
          const currentCategory = prev[0].category;
          const displayCategory = currentCategory === 'vélo' 
            ? (lang === 'fr' ? 'vélos' : 'bikes') 
            : currentCategory === 'randonnée' 
              ? (lang === 'fr' ? 'randonnée' : 'hiking') 
              : currentCategory === 'running'
                ? (lang === 'fr' ? 'running' : 'running')
                : currentCategory === 'nutrition'
                  ? (lang === 'fr' ? 'nutrition' : 'nutrition')
                  : (lang === 'fr' ? 'fitness' : 'fitness');
          
          setToastMessage(
            lang === 'fr' 
              ? `Incohérent : Vous ne pouvez comparer que des articles de la même catégorie (ex: ${displayCategory}).` 
              : `Inconsistent: You can only compare items from the same category (${displayCategory}).`
          );
          setTimeout(() => setToastMessage(''), 3500);
          return prev;
        }

        if (prev.length >= 3) {
          setToastMessage(lang === 'fr' ? "Vous pouvez comparer jusqu'à 3 produits maximum." : "You can compare up to 3 products maximum.");
          setTimeout(() => setToastMessage(''), 3000);
          return prev;
        }
        setToastMessage(lang === 'fr' ? "Produit ajouté au comparateur" : "Product added to comparison");
        setTimeout(() => setToastMessage(''), 2500);
        setIsCompareModalOpen(true); // Automatically open the modal window!
        return [...prev, product];
      }
    });
  };

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterToast, setNewsletterToast] = useState<string>('');

  // Toasts de notification
  const [toastMessage, setToastMessage] = useState<string>('');

  // S'assurer que le HTML utilise la bonne langue
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Bloquer le défilement de l'arrière-plan quand un modal/drawer est ouvert
  useEffect(() => {
    const isAnyOverlayOpen = isCompareModalOpen || isCartOpen || isAccountOpen || isMobileFilterOpen;
    if (isAnyOverlayOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCompareModalOpen, isCartOpen, isAccountOpen, isMobileFilterOpen]);

  // Sauvegarder le panier
  useEffect(() => {
    localStorage.setItem('apex_sports_cart', JSON.stringify(cart));
  }, [cart]);

  // Synchroniser le produit sélectionné avec l'URL de l'application
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlProdId = params.get('product') || params.get('p');
      
      if (selectedProduct) {
        if (urlProdId !== String(selectedProduct.id)) {
          params.set('product', String(selectedProduct.id));
          const newUrl = `${window.location.pathname}?${params.toString()}`;
          window.history.pushState({ productId: selectedProduct.id }, '', newUrl);
        }
      } else {
        if (urlProdId) {
          params.delete('product');
          params.delete('p');
          const searchStr = params.toString();
          const newUrl = searchStr ? `${window.location.pathname}?${searchStr}` : window.location.pathname;
          window.history.pushState({}, '', newUrl);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [selectedProduct]);

  // Écouter les boutons Précédent/Suivant et changements de hash/navigateur
  useEffect(() => {
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const prodId = params.get('product') || params.get('p');
        
        if (prodId) {
          const found = products.find(p => String(p.id) === String(prodId));
          if (found) {
            setSelectedProduct(found);
            return;
          }
        }
        
        const hash = window.location.hash;
        if (hash) {
          const hashParams = new URLSearchParams(hash.replace(/^#/, ''));
          const hashProdId = hashParams.get('product') || hashParams.get('p');
          if (hashProdId) {
            const found = products.find(p => String(p.id) === String(hashProdId));
            if (found) {
              setSelectedProduct(found);
              return;
            }
          }
        }
        
        setSelectedProduct(null);
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [products]);

  // --- Traduction helper ---
  const t = (key: string): string => {
    const langData = translations[lang] || translations['fr'];
    return langData[key] || translations['fr'][key] || key;
  };

  // --- Devises helper ---
  const formatPrice = (priceInEur: number): string => {
    const activeCurrency = currencyRates[currency] || currencyRates['EUR'];
    const convertedAmount = priceInEur * activeCurrency.rate;
    const converted = currency === 'JPY' ? Math.round(convertedAmount).toString() : convertedAmount.toFixed(2);
    if (activeCurrency.pos === 'right') {
      return `${converted.replace('.', ',')} ${activeCurrency.symbol}`;
    } else {
      return `${activeCurrency.symbol}${converted}`;
    }
  };

  // --- Actions ---
  const selectLanguageOption = (opt: LanguageOption) => {
    setLang(opt.lang);
    setCurrency(opt.currency);
    setCurrentFlag(opt.flag);
    setCurrentLangLabel(opt.label);
    setDropdownActive(false);
  };

  const addToCartAction = (product: Product, size: string, qty: number = 1) => {
    if (!size && product.sizes && product.sizes.length > 0 && product.sizes[0] !== "Sans taille" && product.sizes[0] !== "Sans taille." && product.sizes[0] !== "UNIQUE" && product.sizes[0] !== "NO SIZE") {
      // Si la taille est nécessaire mais pas encore choisie, on ouvre la modal produit
      setSelectedProduct(product);
      setSizeSelection(product.sizes[0]);
      return;
    }

    const finalSize = size || (product.sizes && product.sizes[0]) || "Standard";

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedSize === finalSize);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += qty;
        return copy;
      } else {
        return [...prev, { product, quantity: qty, selectedSize: finalSize }];
      }
    });

    showToast(`${qty}x ${product.title} (${finalSize}) ${t('item_added')}`);
  };

  const updateQuantity = (productId: string, size: string, change: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.selectedSize === size) {
          const newQty = item.quantity + change;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size)));
    showToast(t('item_removed'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterToast(t('newsletter_success'));
    setNewsletterEmail('');
    setTimeout(() => {
      setNewsletterToast('');
    }, 4500);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment process and empty cart
    setCheckoutStep('success');
    setCart([]);
  };

  // --- Tri et Filtres ---
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Filtrer par recherche
    if (searchQuery.trim() !== '') {
      const removeAccents = (str: string) => {
        return str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
      };

      const queryNorm = removeAccents(searchQuery.trim());
      const queryTokens = queryNorm.split(/\s+/).filter(token => token.length > 0);

      result = result.filter(p => {
        const titleNorm = removeAccents(p.title);
        const categoryNorm = removeAccents(p.category);

        // 1. Check direct substring match
        if (titleNorm.includes(queryNorm) || categoryNorm.includes(queryNorm)) {
          return true;
        }

        // 2. Token match: check if every token in the query matches either title or category
        const allTokensMatch = queryTokens.every(token => 
          titleNorm.includes(token) || categoryNorm.includes(token)
        );
        if (allTokensMatch) {
          return true;
        }

        // 3. Partial match: if query has multiple words, allow showing if we match at least 60% of significant tokens (length >= 3)
        const significantTokens = queryTokens.filter(t => t.length >= 3);
        if (significantTokens.length > 0) {
          const matchedSignificant = significantTokens.filter(token =>
            titleNorm.includes(token) || categoryNorm.includes(token)
          );
          if (matchedSignificant.length / significantTokens.length >= 0.6) {
            return true;
          }
        } else {
          // If all tokens are short (e.g. 1-2 chars), check if any matches
          const anyTokenMatch = queryTokens.some(token => 
            titleNorm.includes(token) || categoryNorm.includes(token)
          );
          if (anyTokenMatch) {
            return true;
          }
        }

        return false;
      });
    }

    // 2. Filtrer par catégorie
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 2.b. Filtrer par sous-catégorie adaptée
    if (selectedSubcategory && selectedCategory !== 'all') {
      const activeCategoryForSub = selectedCategory;
      const subList = catSubcategories[activeCategoryForSub] || [];
      const matchingSub = subList.find(sub => sub.id === selectedSubcategory);
      if (matchingSub) {
        result = result.filter(p => matchingSub.match(p));
      }
    }

    // 2.c. Filtrer par fourchette de prix
    result = result.filter(p => p.price.price >= minPrice && p.price.price <= maxPrice);

    // 3. Trier
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price.price - b.price.price);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price.price - a.price.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.reviews.notation - a.reviews.notation);
    } // relevance = ordre naturel du json

    return result;
  }, [searchQuery, selectedCategory, sortBy, minPrice, maxPrice, selectedSubcategory, products]);

  // Calcul du panier
  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.product.price.price * item.quantity), 0);
  }, [cart]);

  const cartTotalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Pour fermer les dropdowns
  useEffect(() => {
    const handleOutsideClick = () => {
      setDropdownActive(false);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col selection:bg-secondary selection:text-white" id="app-root">
      


      {/* Main Header */}
      <header className="w-full bg-surface border-b border-outline-variant sticky top-0 z-40 shadow-sm" id="apex-header">
        <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center py-4 gap-4 md:gap-6">
          
          {/* Brand Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => { changeCategory('all'); setSearchQuery(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }} id="apex-logo-container">
            <h1 className="text-[24px] sm:text-[28px] md:text-[30px] font-black text-primary tracking-tighter uppercase mb-0 leading-none select-none hover:opacity-95 transition-opacity">
              APEX SPORTS
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-grow w-full md:max-w-2xl relative" id="apex-search-container">
            <input 
              className="w-full pl-12 pr-4 py-3 bg-surface-container border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-sm text-body-sm outline-none" 
              id="search-input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search_placeholder')} 
              type="text" 
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
              search
            </span>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors text-lg"
                id="search-clear-btn"
              >
                close
              </button>
            )}
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-5 justify-center md:justify-end w-full md:w-auto md:ml-auto" id="apex-actions-container">
            
            {/* Language/Currency Dropdown */}
            <div className="relative inline-block text-left z-50" id="apex-language-dropdown">
              <div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownActive(!dropdownActive);
                  }} 
                  className="inline-flex items-center justify-center gap-x-2 rounded-md bg-white border border-outline-variant px-3 py-2 text-sm font-technical-data font-medium text-on-surface hover:bg-surface-container-low transition-all shadow-sm" 
                  id="language-dropdown-button" 
                  type="button"
                >
                  <img src={currentFlag} alt="flag" className="w-5 h-3.5 object-cover inline-block rounded-xs shadow-xs border border-gray-100" referrerPolicy="no-referrer" id="current-flag" />
                  <span className="uppercase tracking-tight" id="current-lang-currency">{currentLangLabel}</span>
                  <span className="material-symbols-outlined text-[18px] text-outline">expand_more</span>
                </button>
              </div>

              {/* Dropdown Menu Content */}
              {dropdownActive && (
                <div 
                  className="absolute left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 block animate-in fade-in slide-in-from-top-2 duration-150" 
                  role="menu"
                  id="language-dropdown-menu"
                >
                  <div className="py-1" role="none">
                    {languageOptions.map((opt, idx) => (
                      <button 
                        key={idx}
                        className="w-full text-left text-on-surface hover:bg-surface-container flex items-center gap-3 px-4 py-3 text-sm font-label-bold transition-colors cursor-pointer" 
                        onClick={() => selectLanguageOption(opt)} 
                        role="menuitem"
                        id={`lang-opt-${idx}`}
                      >
                        <img src={opt.flag} alt={`${opt.label} flag`} className="w-5 h-3.5 object-cover rounded-xs shadow-xs border border-gray-100" referrerPolicy="no-referrer" /> 
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Compare Button */}
            <button 
              onClick={() => setIsCompareModalOpen(true)}
              className="p-2 text-on-surface hover:text-secondary transition-colors flex items-center justify-center relative cursor-pointer" 
              title={lang === 'fr' ? "Comparateur" : "Compare"}
              id="apex-header-compare-btn"
            >
              <span className="material-symbols-outlined text-[24px]">compare_arrows</span>
              {comparedProducts.length > 0 && (
                <span className="absolute top-0 right-0 w-4.5 h-4.5 bg-secondary text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-surface">
                  {comparedProducts.length}
                </span>
              )}
            </button>

            {/* User Account Icon */}
            <button 
              onClick={() => setIsAccountOpen(true)}
              className="p-2 text-on-surface hover:text-secondary transition-colors flex items-center justify-center cursor-pointer" 
              title={t('create_account')}
              id="apex-account-btn"
            >
              <span className="material-symbols-outlined text-[24px]">person</span>
            </button>

            {/* Cart Icon */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-on-surface hover:text-secondary transition-colors flex items-center justify-center relative cursor-pointer" 
              title={t('cart')}
              id="apex-cart-btn"
            >
              <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
              {cartTotalItems > 0 ? (
                <span className="absolute top-0 right-0 w-5 h-5 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-surface animate-bounce" id="cart-multiplier">
                  {cartTotalItems}
                </span>
              ) : (
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full border border-surface"></span>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Links (Filtres de Catégories) */}
        <nav className="max-w-max-width mx-auto px-margin-desktop hidden md:block" id="apex-navigation-desktop">
          <ul className="flex items-center gap-8 py-3">
            {[
              { id: 'all', label: t('all_products') },
              { id: 'vélo', label: t('nav_velo') },
              { id: 'randonnée', label: t('nav_randonnee') },
              { id: 'fitness', label: t('nav_fitness') },
              { id: 'running', label: t('nav_running') },
              { id: 'nutrition', label: t('nav_nutrition') },
              { id: 'accessories', label: t('nav_accessoires') }
            ].map((cat) => {
              const isActive = selectedCategory === cat.id;
              
              return (
                <li key={cat.id} className="relative group">
                  <button 
                    onClick={() => {
                      changeCategory(cat.id);
                      document.getElementById('catalog-anchor')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`font-label-bold text-label-bold pb-2 transition-all cursor-pointer block border-b-2 hover:text-secondary ${
                      isActive 
                        ? 'text-primary border-secondary font-bold' 
                        : 'text-on-surface-variant border-transparent font-medium hover:border-outline-variant'
                    }`}
                    id={`nav-link-${cat.id}`}
                  >
                    {cat.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* Main Container */}
      <main className="flex-grow">
        {selectedProduct ? (
          <ProductDetailPage 
            product={products.find(p => p.id === selectedProduct.id) || selectedProduct}
            allProducts={products}
            onBack={() => { setSelectedProduct(null); window.scrollTo({ top: 0 }); }}
            onSelectProduct={(p) => setSelectedProduct(p)}
            addToCartAction={addToCartAction}
            formatPrice={formatPrice}
            t={t}
            lang={lang}
            isCompared={comparedProducts.some((p) => p.id === selectedProduct.id)}
            comparedProducts={comparedProducts.map(p => products.find(prod => prod.id === p.id) || p)}
            onToggleCompare={toggleCompareProduct}
          />
        ) : (
          <>
            {/* Hero Section */}
            {!searchQuery && (
              <section className="relative w-full h-[320px] sm:h-[400px] md:h-[520px] overflow-hidden bg-inverse-surface" id="apex-hero-section">
                <div className="absolute inset-0 z-0">
                  <img 
                    alt="Apex Performance Hero" 
                    className="w-full h-full object-cover opacity-80 object-center sm:object-[center_35%]" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG2Qn_Cf9Gbwq0YQt2DzeoAmPTrT7wXp-ggdMBFFcvt1mlUSlMiVCBCboelXn5oDxqujerHclmlCIfr8m8T6jnQS8w7kRBwNnHCDei9u9oSDOmlpcshKE0xUusprpwdOuSJzsMIS_NQFD8-qF9fQ17Ptrx3Z5EMhW9_aFzFR-jGVJJ_6jeoHxD2D56xsty8xNbhFdynqHTI1ReeWjSJJftFj35sZTSm8l-zh_wFQ1D6R5qexPMPl49NkZagUBV59FaE6tMJ7WkKgg" 
                  />
                  <div className="absolute inset-0 hero-gradient"></div>
                </div>
                
                <div className="relative z-10 max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop h-full flex flex-col justify-center items-start text-white">
                  <span className="bg-secondary text-white px-2.5 py-0.5 sm:px-3 sm:py-1 font-technical-data text-[10px] sm:text-technical-data uppercase mb-2 sm:mb-4 tracking-widest" id="hero-mini-tag">
                    {t('hero_tag')}
                  </span>
                  <h2 className="font-headline-xl text-[22px] sm:text-[30px] md:text-headline-xl mb-3 sm:mb-6 max-w-lg sm:max-w-2xl leading-tight uppercase font-black" id="hero-main-title">
                    {t('hero_title')}
                  </h2>
                  <p className="font-body-lg text-[11px] sm:text-xs md:text-body-lg mb-4 sm:mb-8 max-w-[280px] sm:max-w-md md:max-w-lg text-surface-variant leading-relaxed line-clamp-3 sm:line-clamp-none" id="hero-main-description">
                    {t('hero_desc')}
                  </p>
                  <div className="flex gap-2 sm:gap-4">
                    <button 
                      onClick={() => {
                        const targetElement = document.getElementById('catalog-anchor');
                        targetElement?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-secondary hover:bg-tertiary-container text-white px-4 py-2.5 sm:px-8 sm:py-4 font-label-bold text-[11px] sm:text-label-bold transition-all transform active:scale-95 flex items-center gap-1.5 sm:gap-2 cursor-pointer rounded-sm"
                      id="hero-view-collection-btn"
                    >
                      <span>{t('view_collection')}</span> 
                      <span className="material-symbols-outlined text-[14px] sm:text-[18px]">arrow_forward</span>
                    </button>
                    <button 
                      onClick={() => setIsAccountOpen(true)}
                      className="border border-white/30 hover:border-white text-white px-4 py-2.5 sm:px-8 sm:py-4 font-label-bold text-[11px] sm:text-label-bold transition-all cursor-pointer rounded-sm bg-black/10 hover:bg-black/20"
                      id="hero-learn-more-btn"
                    >
                      {t('learn_more')}
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Categories Grid */}
            {!searchQuery && (
              <section className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12" id="apex-categories">
                <div className="flex justify-between items-end mb-6 md:mb-8">
                  <div>
                    <h3 className="font-headline-lg text-headline-lg text-primary uppercase" id="categories-title-h3">
                      {t('categories_title')}
                    </h3>
                    <div className="w-16 h-1 bg-secondary mt-2"></div>
                  </div>
                </div>
                
                <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-gutter-md scrollbar-none snap-x snap-mandatory pb-4 md:pb-0">
                  
                  {/* Category Item 1 - Velo */}
                  <div 
                    onClick={() => {
                      changeCategory('vélo');
                      document.getElementById('catalog-anchor')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group relative h-[220px] sm:h-[260px] md:h-[300px] w-[250px] sm:w-[320px] md:w-full shrink-0 snap-start overflow-hidden rounded-lg bg-surface-container-highest cursor-pointer decoration-none"
                    id="category-card-velo"
                  >
                    <img 
                      alt="Velo Category" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiUbNMdqwa_PHJM1piYn_VRJRbk8Id1VfIjsyWXfAwygiTXOPYVSI1H7bLRi_dU6xADIRRvBFo0bH0FOUvAD1bkebgU0iZ73J4Fat6ztVMm5ybI39K9AHX9WsliKxSJHSCjTdyfEard-JYS3pCeb8CLFzkPHipLZlh7PnmO75XVd4Wsb5KflNpYX5KnmiJfGVO2bHkrRlD5ALIuREZ18hkDauBxJK--OIAcwWCAKxZscgul9gOyhx_I3Li-Ps1JfO5tzAe59M0bsw" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent flex flex-col justify-end p-6">
                      <h4 className="text-white font-headline-md text-headline-md mb-2">{t('nav_velo')}</h4>
                      <span className="text-white/90 font-technical-data text-technical-data group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                        <span>{t('discover')}</span> 
                        <span className="material-symbols-outlined">chevron_right</span>
                      </span>
                    </div>
                  </div>

                  {/* Category Item 2 - Randonnee */}
                  <div 
                    onClick={() => {
                      changeCategory('randonnée');
                      document.getElementById('catalog-anchor')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group relative h-[220px] sm:h-[260px] md:h-[300px] w-[250px] sm:w-[320px] md:w-full shrink-0 snap-start overflow-hidden rounded-lg bg-surface-container-highest cursor-pointer decoration-none"
                    id="category-card-hiking"
                  >
                    <img 
                      alt="Randonnee Category" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=1000" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent flex flex-col justify-end p-6">
                      <h4 className="text-white font-headline-md text-headline-md mb-2">{t('nav_randonnee')}</h4>
                      <span className="text-white/90 font-technical-data text-technical-data group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                        <span>{t('discover')}</span> 
                        <span className="material-symbols-outlined">chevron_right</span>
                      </span>
                    </div>
                  </div>

                  {/* Category Item 3 - Fitness */}
                  <div 
                    onClick={() => {
                      changeCategory('fitness');
                      document.getElementById('catalog-anchor')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group relative h-[220px] sm:h-[260px] md:h-[300px] w-[250px] sm:w-[320px] md:w-full shrink-0 snap-start overflow-hidden rounded-lg bg-surface-container-highest cursor-pointer decoration-none"
                    id="category-card-fitness"
                  >
                    <img 
                      alt="Fitness Category" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5gO3OVoE7RtStcULCydCynWIPeeP2TFpcDCOadpmtsOwhFCckDzmuJq3U3iJ35H40-frQ6D3QoZfYfzUN2k2yvANmxg5_T_Blgphc4wZldQKaZoffXp3XWm2-aBRYFJauZk8Isp0IB-w8dwDYFZIAsxRhhcm3ud8NiMexfAh6-soo_8oo8iU4KpTnhjeEg0CBs6C-oz4CNmk5eoNN724NWI5QPSjgM2UGE6wuaMNMu3ffB3KVOWOQi576MbA1NEUrcHaRcNNNB8s" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent flex flex-col justify-end p-6">
                      <h4 className="text-white font-headline-md text-headline-md mb-2">{t('nav_fitness')}</h4>
                      <span className="text-white/90 font-technical-data text-technical-data group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                        <span>{t('discover')}</span> 
                        <span className="material-symbols-outlined">chevron_right</span>
                      </span>
                    </div>
                  </div>

                </div>
              </section>
            )}

        {/* anchor point */}
        <div id="catalog-anchor" className="scroll-mt-24"></div>

        {/* Featured Products Section */}
        <section className="bg-surface-container-low py-16" id="apex-featured-catalog">
          <div className="max-w-max-width mx-auto px-margin-desktop">
            
            {/* Catalog controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <div>
                <h3 className="font-headline-lg text-headline-lg text-primary uppercase" id="catalog-title">
                  {selectedCategory === 'all' 
                    ? t('featured_title') 
                    : selectedCategory === 'vélo' 
                      ? t('nav_velo') 
                      : selectedCategory === 'randonnée' 
                        ? t('nav_randonnee') 
                        : selectedCategory === 'fitness' 
                          ? t('nav_fitness') 
                          : selectedCategory.toUpperCase()}
                </h3>
                <p className="font-body-sm text-body-sm text-outline capitalize" id="catalog-subtitle">
                  {filteredAndSortedProducts.length} {t('featured_desc').substring(12)}
                </p>
              </div>

              {/* Tri par & Filtres sur Mobile/Tablette */}
              <div className="flex items-center gap-2.5 w-full md:w-auto" id="sorting-container">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="md:hidden flex flex-[1.2] items-center justify-center gap-1.5 px-3 py-2 border border-outline-variant rounded-md bg-transparent hover:bg-neutral-100/50 text-primary font-bold font-technical-data text-[12px] uppercase tracking-wider cursor-pointer transition-colors"
                  id="mobile-filter-drawer-trigger"
                >
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  <span>{lang === 'fr' ? 'Filtres' : 'Filters'}</span>
                  {(minPrice > 0 || maxPrice < 5000 || selectedSubcategory !== null) && (
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-ping"></span>
                  )}
                </button>

                <div className="flex flex-1 md:flex-initial items-center gap-1.5 sm:gap-3">
                  <label htmlFor="sorting-select" className="text-body-sm font-label-bold text-on-surface flex-shrink-0 hidden sm:inline-block">
                    {t('sort_by')} :
                  </label>
                  <select 
                    id="sorting-select" 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-outline-variant px-3 py-2 rounded-md font-body-sm text-[12px] sm:text-body-sm text-on-surface focus:outline-none focus:border-primary w-full md:w-auto flex-grow md:flex-grow-0"
                  >
                    <option value="relevance">{t('sort_relevance')}</option>
                    <option value="price_asc">{t('sort_price_asc')}</option>
                    <option value="price_desc">{t('sort_price_desc')}</option>
                    <option value="rating">{t('sort_rating')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* List products with Left Sidebar Filter Panel */}
            <div className="flex flex-col md:flex-row gap-8" id="catalog-content-layout">
              {/* LEFT SIDEBAR FILTER PANEL */}
              <aside className="hidden md:block w-64 flex-shrink-0 space-y-6 self-start bg-transparent p-0 rounded-none border-none shadow-none" id="catalog-sidebar-filters">
                {renderSidebarFilters()}
              </aside>

              {/* RIGHT PRODUCT GRID PANEL */}
              <div className="flex-grow">
                {filteredAndSortedProducts.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-gutter-md" id="products-catalog-grid">
                    {filteredAndSortedProducts.map((product) => {
                      // Determine stock condition
                      const isLowStock = product.reviews.count % 10 < 3; // dynamic but reliable condition logic for simulation

                      return (
                        <div 
                          key={product.id}
                          className="bg-white border border-outline-variant p-2.5 sm:p-4 product-card-hover transition-all duration-300 relative flex flex-col group h-full"
                          id={`product-card-${product.id}`}
                        >
                          {/* Image container */}
                          <div 
                            className="relative aspect-square mb-2 sm:mb-4 bg-surface-container overflow-hidden rounded-md cursor-pointer"
                            onClick={() => {
                              setSelectedProduct(product);
                              setSizeSelection(product.sizes[0] || '');
                            }}
                            id={`product-img-wrapper-${product.id}`}
                          >
                            <img 
                              alt={product.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              src={product.images[0]} 
                              loading="lazy"
                            />

                            {/* Hover Quick view layout */}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <span className="bg-white text-primary font-label-bold text-label-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-md shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-xs sm:text-sm">
                                {t('quick_view')}
                              </span>
                            </div>
                          </div>

                          {/* Info block */}
                          <div className="space-y-1 flex-grow flex flex-col justify-between" id={`product-info-${product.id}`}>
                            <div>
                              <span className="font-technical-data text-[9px] sm:text-[10px] text-outline uppercase tracking-wider block">
                                {product.category === 'vélo' 
                                  ? t('tag_bike') 
                                  : product.category === 'randonnée' 
                                    ? t('nav_randonnee') 
                                    : t('nav_fitness')}
                              </span>
                              
                              <h5 
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setSizeSelection(product.sizes[0] || '');
                                }}
                                className="font-label-bold text-[12px] sm:text-xs md:text-label-bold text-on-surface line-clamp-2 min-h-[32px] cursor-pointer hover:text-primary transition-colors mt-0.5"
                              >
                                {product.title}
                              </h5>

                              {/* Stars and counts */}
                              <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-warning py-0.5 sm:py-1" id={`rating-${product.id}`}>
                                <div className="flex items-center shrink-0">
                                  {Array.from({ length: 5 }).map((_, i) => {
                                    const fillVal = i + 1 <= Math.round(product.reviews.notation) ? '1' : '0';
                                    return (
                                      <span 
                                        key={i} 
                                        className="material-symbols-outlined text-[9.5px] sm:text-[13px] md:text-[14px]" 
                                        style={{ fontVariationSettings: `'FILL' ${fillVal}` }}
                                      >
                                        star
                                      </span>
                                    );
                                  })}
                                </div>
                                <span className="text-outline text-[8.5px] sm:text-[11px] font-medium whitespace-nowrap">
                                  ({product.reviews.count})
                                </span>
                              </div>
                            </div>

                            <div className="pt-1.5 sm:pt-2 mt-auto">
                              {/* Price and Stock status */}
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2 mb-1" id={`meta-price-${product.id}`}>
                                <span className="font-headline-md text-xs sm:text-sm md:text-headline-md text-primary font-bold">
                                  {formatPrice(product.price.price)}
                                </span>
                                
                                {isLowStock ? (
                                  <span className="text-warning font-technical-data text-[9px] sm:text-[11px] flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-warning rounded-full animate-pulse"></span> 
                                    <span>{t('low_stock')}</span>
                                  </span>
                                ) : (
                                  <span className="text-success font-technical-data text-[9px] sm:text-[11px] flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-success rounded-full"></span> 
                                    <span>{t('in_stock')}</span>
                                  </span>
                                )}
                              </div>

                              {/* Action Buttons: Add to Basket & Compare (vertical layout on mobile & tablet for seamless fit inside borders, side-by-side on large desktop screens) */}
                              <div className="flex flex-col lg:flex-row gap-1.5 mt-2.5 w-full">
                                <button 
                                  onClick={() => addToCartAction(product, product.sizes[0] || "Sans taille")}
                                  className="w-full lg:flex-grow bg-primary hover:bg-primary-container text-white h-9 lg:h-10 px-2.5 sm:px-3 rounded-md font-label-bold text-[10.5px] sm:text-[11px] lg:text-body-xs transition-all flex items-center justify-center gap-1.5 transform active:scale-[0.98] outline-none cursor-pointer"
                                  id={`add-btn-${product.id}`}
                                >
                                  <span className="material-symbols-outlined text-[14px] lg:text-[16px]">add_shopping_cart</span>
                                  <span className="truncate">{t('add_to_cart')}</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCompareProduct(product);
                                  }}
                                  className={`w-full lg:w-10 h-8 lg:h-10 lg:flex-shrink-0 flex items-center justify-center rounded-md border transition-all duration-150 cursor-pointer outline-none gap-1.5 px-3 lg:px-0 ${
                                    comparedProducts.some((p) => p.id === product.id)
                                      ? 'bg-secondary border-secondary text-white'
                                      : 'bg-white border-outline-variant text-primary hover:bg-surface-container-low hover:border-slate-muted'
                                  }`}
                                  title={lang === 'fr' ? "Comparer ce produit" : "Compare this product"}
                                  id={`compare-btn-card-${product.id}`}
                                >
                                  <span className="material-symbols-outlined text-[14px] lg:text-[18px]">
                                    {comparedProducts.some((p) => p.id === product.id) ? 'check' : 'compare_arrows'}
                                  </span>
                                  <span className="lg:hidden text-[9px] font-label-bold uppercase tracking-wider">
                                    {comparedProducts.some((p) => p.id === product.id) 
                                      ? (lang === 'fr' ? 'Comparé' : 'Compared') 
                                      : (lang === 'fr' ? 'Comparer' : 'Compare')}
                                  </span>
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
            ) : (
              /* No matches case or Empty category case */
              <div className="text-center py-16 px-4 bg-white border border-outline-variant rounded-lg" id="no-products-found-fallback">
                {['running', 'nutrition', 'accessories'].includes(selectedCategory) ? (
                  <div className="max-w-md mx-auto" id="com-soon">
                    <span className="material-symbols-outlined text-[64px] text-outline mb-4">
                      hourglass_empty
                    </span>
                    <h4 className="text-headline-md font-headline-md text-primary uppercase mb-2">
                      {t('no_category_products_title')}
                    </h4>
                    <p className="text-body-sm text-outline mb-6 leading-relaxed">
                      {t('no_category_products_desc')} <strong className="text-secondary">"{t(`nav_${selectedCategory === 'accessories' ? 'accessoires' : selectedCategory}`)}"</strong>.
                    </p>
                    <button 
                      onClick={() => {
                        changeCategory('all');
                        document.getElementById('catalog-anchor')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-primary hover:bg-primary-container text-white px-6 py-3 font-label-bold text-label-bold rounded-md transition-colors cursor-pointer"
                      id="back-to-all-btn"
                    >
                      {t('no_category_products_button')}
                    </button>
                  </div>
                ) : (
                  <div className="max-w-md mx-auto" id="no-match">
                    <span className="material-symbols-outlined text-[64px] text-outline mb-4">
                      search_off
                    </span>
                    <p className="text-body-md text-on-surface-variant font-medium mb-6">
                      {t('no_products')}
                    </p>
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        changeCategory('all');
                        document.getElementById('catalog-anchor')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-secondary hover:bg-tertiary-container text-white px-6 py-3 font-label-bold text-label-bold rounded-md transition-colors cursor-pointer"
                      id="reset-filter-btn"
                    >
                      {t('view_all')}
                    </button>
                  </div>
                )}
              </div>
            )}
              </div>
            </div>

          </div>
        </section>

        {/* Dynamic Brand Section */}
        <section className="w-full bg-primary py-16 text-white overflow-hidden relative" id="apex-brand-section">
          <div className="max-w-max-width mx-auto px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="max-w-xl">
              <h3 className="font-headline-lg text-[28px] md:text-headline-lg mb-4 font-extrabold uppercase leading-tight" id="brand-title-h3-tag">
                {t('brand_title')}
              </h3>
              <p className="font-body-md text-body-md text-primary-fixed" id="brand-desc-p">
                {t('brand_desc')}
              </p>
            </div>
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="flex gap-12 text-center" id="brand-stats">
                <div>
                  <div className="font-headline-xl text-headline-xl text-secondary font-black leading-none mb-1">+150</div>
                  <div className="font-technical-data text-technical-data uppercase tracking-widest text-primary-fixed">
                    {t('stat_engineers')}
                  </div>
                </div>
                <div>
                  <div className="font-headline-xl text-headline-xl text-secondary font-black leading-none mb-1">99.8%</div>
                  <div className="font-technical-data text-technical-data uppercase tracking-widest text-primary-fixed">
                    {t('stat_satisfaction')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background Pattern icon decal */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-y-12 translate-x-12" id="pattern-icon-decal">
            <span className="material-symbols-outlined text-[300px] leading-none">
              precision_manufacturing
            </span>
          </div>
        </section>
          </>
        )}
      </main>

      {/* --- Footer --- */}
      <footer className="bg-inverse-surface text-on-primary-fixed-variant pt-16 pb-8 border-t border-outline-variant/20" id="apex-footer">
        <div className="max-w-max-width mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter-md">
          
          {/* Column 1 - Brand Info */}
          <div id="footer-col-1">
            <h3 className="font-headline-md text-headline-md text-white mb-6 uppercase tracking-tighter font-black">
              APEX SPORTS
            </h3>
            <p className="font-body-sm text-body-sm text-surface-variant max-w-xs mb-6">
              {t('footer_about')}
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-secondary text-white hover:border-secondary transition-colors"
                id="footer-social-share"
              >
                <span className="material-symbols-outlined text-sm">share</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-secondary text-white hover:border-secondary transition-colors"
                id="footer-social-group"
              >
                <span className="material-symbols-outlined text-sm">group</span>
              </a>
            </div>
          </div>

          {/* Column 2 - Customer service */}
          <div id="footer-col-2">
            <h4 className="font-label-bold text-label-bold text-white mb-6 uppercase">
              {t('customer_service')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a className="font-body-sm text-body-sm text-surface-variant hover:text-secondary transition-colors block" href="#footer-anchor">
                  {t('footer_cs')}
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-surface-variant hover:text-secondary transition-colors block" href="#footer-anchor">
                  {t('footer_shipping')}
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-surface-variant hover:text-secondary transition-colors block" href="#footer-anchor">
                  {t('footer_returns')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div id="footer-col-3">
            <h4 className="font-label-bold text-label-bold text-white mb-6 uppercase">
              {t('company')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a className="font-body-sm text-body-sm text-surface-variant hover:text-secondary transition-colors block" href="#footer-anchor">
                  {t('footer_stores')}
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-surface-variant hover:text-secondary transition-colors block" href="#footer-anchor">
                  {t('footer_contact')}
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-surface-variant hover:text-secondary transition-colors block" href="#footer-anchor">
                  {t('footer_privacy')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div id="footer-col-4">
            <h4 className="font-label-bold text-label-bold text-white mb-6 uppercase">
              Newsletter
            </h4>
            <p className="font-technical-data text-technical-data text-surface-variant mb-4">
              {t('newsletter_desc')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input 
                className="bg-inverse-surface border border-outline-variant p-2 flex-grow text-white font-body-sm outline-none focus:border-secondary rounded-l-md" 
                id="newsletter-input" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={t('newsletter_placeholder')} 
                type="email" 
                required
              />
              <button 
                type="submit"
                className="bg-secondary hover:bg-secondary-container text-white px-4 py-2 uppercase font-label-bold text-[12px] rounded-r-md cursor-pointer transition-colors"
                id="newsletter-ok-btn"
              >
                OK
              </button>
            </form>
            {newsletterToast && (
              <p className="text-[12px] text-success mt-2 font-technical-data" id="newsletter-toast-notify">
                {newsletterToast}
              </p>
            )}
          </div>

        </div>

        {/* Footer legal & rights */}
        <div className="max-w-max-width mx-auto px-margin-desktop mt-12 pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4" id="footer-sub-grid">
          <p className="font-technical-data text-technical-data text-surface-variant">
            © 2026 APEX SPORTS Engineering. <span>{t('rights')}</span>
          </p>
          <div className="flex gap-6">
            <span className="material-symbols-outlined text-surface-variant hover:text-white transition-colors cursor-help" title="Visa / Mastercard">credit_card</span>
            <span className="material-symbols-outlined text-surface-variant hover:text-white transition-colors cursor-help" title="Mobile Pay">payments</span>
            <span className="material-symbols-outlined text-surface-variant hover:text-white transition-colors cursor-help" title="Bank draft Wallet">account_balance_wallet</span>
          </div>
        </div>
      </footer>

      {/* --- CART DRAWER (SIDEBAR) --- */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex justify-end animate-in fade-in duration-200"
          id="cart-drawer-backdrop"
          onClick={() => {
            setIsCartOpen(false);
            setCheckoutStep('shopping');
          }}
        >
          <div 
            className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl relative animate-in slide-in-from-right duration-250"
            id="cart-drawer-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">shopping_cart</span>
                <h3 className="font-headline-md text-headline-md text-primary font-black uppercase">
                  {t('cart_title')}
                </h3>
              </div>
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  setCheckoutStep('shopping');
                }}
                className="p-1 cursor-pointer hover:text-secondary hover:bg-surface-container-high rounded-full transition-colors"
                id="close-cart-btn"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Shopping status and list */}
            {checkoutStep === 'shopping' ? (
              <>
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                   {cart.length > 0 ? (
                    cart.map((item, idx) => {
                      const resolvedProduct = products.find(p => p.id === item.product.id) || item.product;
                      return (
                        <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4 p-3 bg-surface-container-low border border-outline-variant/50 rounded-lg animate-in fade-in duration-150 relative">
                          {/* thumbnail image */}
                          <div className="w-16 h-16 rounded-md bg-surface-container overflow-hidden border border-outline-variant flex-shrink-0">
                            <img src={resolvedProduct.images[0]} alt={resolvedProduct.title} className="w-full h-full object-cover" />
                          </div>
                          
                          {/* description info */}
                          <div className="flex-grow space-y-1">
                            <h4 className="font-label-bold text-body-sm line-clamp-1 text-on-surface">
                              {resolvedProduct.title}
                            </h4>
                          <span className="text-[11px] font-technical-data text-outline block">
                            Size: <span className="text-secondary font-bold">{item.selectedSize}</span>
                          </span>
                          
                          <div className="flex justify-between items-center pt-1">
                             {/* quantity controls */}
                             <div className="flex items-center border border-outline-variant rounded-md overflow-hidden bg-white">
                               <button 
                                 onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                                 className="w-7 h-7 flex items-center justify-center hover:bg-surface-container font-black text-[13px] text-on-surface"
                               >
                                 −
                               </button>
                               <span className="px-2 font-technical-data text-xs text-primary font-bold min-w-[16px] text-center">
                                 {item.quantity}
                               </span>
                               <button 
                                 onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                                 className="w-7 h-7 flex items-center justify-center hover:bg-surface-container font-black text-[13px] text-on-surface"
                               >
                                 +
                               </button>
                             </div>
                            
                            {/* item price multiplier */}
                            <span className="font-label-bold text-body-sm text-primary font-bold">
                              {formatPrice(item.product.price.price * item.quantity)}
                            </span>
                          </div>
                        </div>

                        {/* trash bin clear selection */}
                        <button 
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="absolute top-2 right-2 text-outline hover:text-error hover:bg-surface-container-high rounded-full p-1 transition-colors"
                          title={t('item_removed')}
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    )})
                  ) : (
                    <div className="text-center py-20" id="cart-drawer-empty-view">
                      <span className="material-symbols-outlined text-[64px] text-outline mb-4">
                        shopping_basket
                      </span>
                      <p className="text-body-md text-outline font-medium">
                        {t('cart_empty')}
                      </p>
                      <button 
                        onClick={() => setIsCartOpen(false)}
                        className="mt-6 bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-md font-label-bold text-body-sm transition-colors cursor-pointer"
                      >
                        {t('continue_shopping')}
                      </button>
                    </div>
                  )}
                </div>

                {/* Subtotal and checkout action */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-outline-variant bg-surface-container">
                    
                    {/* Sum details */}
                    <div className="space-y-2 mb-6" id="summary-bill">
                      <div className="flex justify-between items-center text-body-sm">
                        <span className="text-on-surface-variant">{t('subtotal')}</span>
                        <span className="font-medium text-on-surface">{formatPrice(cartSubtotal)}</span>
                      </div>
                      <div className="flex justify-between items-center text-body-sm">
                        <span className="text-on-surface-variant">{t('shipping_cost')}</span>
                        <span className="text-success font-bold font-technical-data">
                          {cartSubtotal >= 50 ? t('free').toUpperCase() : formatPrice(4.99)}
                        </span>
                      </div>
                      
                      <div className="border-t border-outline-variant/60 my-2"></div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-label-bold text-body-md text-on-surface font-extrabold">{t('cart_total')}</span>
                        <span className="font-headline-md text-headline-md text-primary font-black">
                          {formatPrice(cartSubtotal >= 50 ? cartSubtotal : cartSubtotal + 4.99)}
                        </span>
                      </div>
                      <p className="text-[11px] text-outline text-center pt-2 italic">
                        {t('shipping_note')}
                      </p>
                    </div>

                    {/* Simulating checkout submission wrapper form */}
                    <form onSubmit={handleCheckoutSubmit} className="space-y-4" id="checkout-gateway-sim">
                      <div className="space-y-2">
                        <input 
                          type="email" 
                          required 
                          placeholder="votre.email@adresse.com" 
                          className="w-full bg-white border border-outline-variant rounded-md p-2 text-body-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <input 
                          type="text" 
                          required 
                          placeholder="Adresse complète d'expédition" 
                          className="w-full bg-white border border-outline-variant rounded-md p-2 text-body-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-secondary hover:bg-tertiary-container text-white py-3 rounded-md font-label-bold text-label-bold text-center tracking-wide block transition-colors cursor-pointer"
                      >
                        {t('cart_checkout').toUpperCase()}
                      </button>
                    </form>

                  </div>
                )}
              </>
            ) : (
              /* checkout success screen state representer */
              <div className="flex-grow flex flex-col items-center justify-center p-8 text-center" id="checkout-completed">
                <span className="material-symbols-outlined text-[72px] text-success mb-4 animate-bounce">
                  check_circle
                </span>
                <h4 className="text-headline-md font-headline-md text-primary uppercase mb-3">
                  {t('checkout_success_title')}
                </h4>
                <p className="text-body-sm text-outline leading-relaxed mb-8">
                  {t('checkout_success_desc')}
                </p>
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    setCheckoutStep('shopping');
                  }}
                  className="bg-primary hover:bg-primary-container text-white px-8 py-3 rounded-md font-label-bold text-body-sm transition-colors cursor-pointer"
                >
                  {t('checkout_success_btn')}
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* --- MOBILE FILTER DRAWER overlay --- */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" id="mobile-filter-drawer-container">
          {/* Backdrop with fade effect */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileFilterOpen(false)}
          ></div>
          
          {/* Drawer Content that slides in from the left */}
          <div className="relative flex flex-col w-[310px] max-w-[85vw] h-full bg-white shadow-2xl p-6 overflow-y-auto z-10 animate-in slide-in-from-left duration-250">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant mb-6">
              <h3 className="font-headline-sm text-sm uppercase tracking-wider text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                <span>{lang === 'fr' ? 'Filtres' : 'Filters'}</span>
              </h3>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 active:scale-95 transition-all text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            {/* Filters rendered dynamically */}
            <div className="flex-grow">
              {renderSidebarFilters()}
            </div>
            
            {/* Action Bottom sticky-equivalent block */}
            <div className="mt-8 pt-4 border-t border-outline-variant/60 flex gap-2 shrink-0">
              <button 
                onClick={() => {
                  setMinPrice(0);
                  setMaxPrice(5000);
                  setSelectedSubcategory(null);
                }}
                className="flex-1 py-2.5 border border-outline-variant text-[11px] font-bold uppercase tracking-wider rounded-md text-on-surface bg-white hover:bg-neutral-50 active:scale-[0.98] transition-all cursor-pointer"
              >
                {lang === 'fr' ? 'Réinitialiser' : 'Reset'}
              </button>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-primary text-white text-[11px] font-bold uppercase tracking-wider rounded-md hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer"
              >
                {lang === 'fr' ? 'Appliquer' : 'Apply'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL : USER ACCOUNT PROFILE REGISTRATION --- */}
      {isAccountOpen && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-xs animate-in fade-in duration-200"
          id="account-modal-backdrop"
          onClick={() => setIsAccountOpen(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-200"
            id="account-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsAccountOpen(false)}
              className="absolute right-4 top-4 text-on-surface hover:text-primary transition-colors p-1"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="text-center mb-6">
              <span className="material-symbols-outlined text-primary text-[48px]">person</span>
              <h3 className="font-headline-md text-headline-md text-primary uppercase font-black tracking-tight mt-2">
                {t('create_account')}
              </h3>
              <p className="text-body-sm text-outline mt-1">Rejoignez l'élite sportive de l'équipe APEX</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setIsAccountOpen(false);
              showToast("Bienvenue chez APEX ! Votre espace membre est créé.");
            }} className="space-y-4">
              <div>
                <label className="block text-body-sm font-label-bold text-on-surface mb-1">Nom / Prénom</label>
                <input 
                  type="text" 
                  required 
                  className="w-full bg-surface-container border border-outline-variant p-2.5 rounded-md text-body-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Raphaël"
                />
              </div>
              
              <div>
                <label className="block text-body-sm font-label-bold text-on-surface mb-1">Adresse Email</label>
                <input 
                  type="email" 
                  required 
                  className="w-full bg-surface-container border border-outline-variant p-2.5 rounded-md text-body-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="votre.email@gmail.com"
                />
              </div>

              <div>
                <label className="block text-body-sm font-label-bold text-on-surface mb-1">Mot de Passe</label>
                <input 
                  type="password" 
                  required 
                  className="w-full bg-surface-container border border-outline-variant p-2.5 rounded-md text-body-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="newsletter-opt-in" className="rounded border-outline-variant text-primary focus:ring-primary" defaultChecked />
                <label htmlFor="newsletter-opt-in" className="text-[12px] text-outline">
                  S'abonner aux spécifications techniques hebdomadaires
                </label>
              </div>

              <button 
                type="submit" 
                className="w-full bg-secondary hover:bg-tertiary-container text-white py-3 rounded-md font-label-bold text-body-sm uppercase tracking-wide cursor-pointer focus:outline-none transition-colors"
              >
                Valider et Créer mon espace
              </button>
            </form>
          </div>
        </div>
      )}



      {/* Comparison Modal Overlay */}
      {isCompareModalOpen && (
        <div 
          className="fixed inset-0 bg-black/75 flex items-start md:items-center justify-center p-3 sm:p-6 overflow-y-auto z-50 backdrop-blur-xs animate-in fade-in duration-200"
          id="compare-modal-backdrop"
          onClick={() => {
            setIsCompareModalOpen(false);
            setSlotQueries(['', '', '']); // Clear queries on close
          }}
        >
          <div 
            className="bg-white rounded-2xl max-w-6xl w-full max-h-[94vh] md:max-h-[92vh] overflow-y-auto mt-[2.5vh] sm:mt-[5vh] md:mt-0 p-4 sm:p-8 border border-outline-variant/50 shadow-2xl relative animate-in zoom-in-95 duration-200 text-left"
            id="compare-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => {
                setIsCompareModalOpen(false);
                setSlotQueries(['', '', '']);
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-on-surface hover:text-primary transition-all duration-200 cursor-pointer border border-outline-variant/30 shadow-xs"
              id="close-compare-modal"
            >
              <span className="material-symbols-outlined mb-0">close</span>
            </button>

            {/* Header section */}
            <div className="pb-5 border-b border-outline-variant/40 mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="max-w-2xl">
                <h3 className="font-headline-lg text-[22px] sm:text-headline-lg text-primary uppercase font-black tracking-tight leading-none">
                  {lang === 'fr' ? "Comparateur Expert APEX" : "Apex Pro Comparison"}
                </h3>
                <p className="text-body-sm text-slate-muted mt-2 leading-relaxed">
                  {lang === 'fr' 
                    ? "Prenez des décisions éclairées. Comparez en face à face jusqu'à 3 articles de la même catégorie pour analyser instantanément les tarifs, les avis clients et les disponibilités." 
                    : "Make informed choices. Compare up to 3 items side-by-side to instantly evaluate prices, customer reviews, and sizes."}
                </p>
              </div>

              {comparedProducts.length > 0 && (
                <div className="flex items-center gap-3 self-start md:self-end bg-slate-50 border border-outline-variant/35 rounded-xl px-4 py-2.5">
                  <span className="text-xs font-black uppercase text-primary tracking-wider">
                    {lang === 'fr' 
                      ? `${comparedProducts.length} / 3 Produits`
                      : `${comparedProducts.length} / 3 Items`}
                  </span>
                  <div className="w-px h-4 bg-outline-variant/60"></div>
                  <button
                    type="button"
                    onClick={() => {
                      setComparedProducts([]);
                      setSlotQueries(['', '', '']);
                      setToastMessage(lang === 'fr' ? "Comparateur réinitialisé" : "Comparison cleared");
                      setTimeout(() => setToastMessage(''), 2500);
                    }}
                    className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-650 border border-red-200 rounded font-label-bold text-[10.5px] uppercase tracking-wide transition-all duration-150 cursor-pointer flex items-center gap-1 shrink-0"
                    title={lang === 'fr' ? "Vider tous les produits" : "Remove all products"}
                  >
                    <span className="material-symbols-outlined text-[13px]">delete_sweep</span>
                    <span>{lang === 'fr' ? "Vider tout" : "Clear all"}</span>
                  </button>
                </div>
              )}
            </div>

            {(() => {
              const SLOT_COUNT = 3;
              const slots = Array.from({ length: SLOT_COUNT }).map((_, idx) => {
                const rawProduct = comparedProducts[idx];
                return rawProduct ? (products.find(prod => prod.id === rawProduct.id) || rawProduct) : null;
              });
              
              const activeCategory = comparedProducts[0]?.category || null;

              // List of compared products (not null)
              const activeComparedProducts = slots.filter((p): p is Product => p !== null);

              // Find lowest price and highest rating to highlight them dynamically!
              let lowestPriceId = "";
              let highestRatingId = "";

              if (activeComparedProducts.length > 1) {
                // Determine lowest price
                const minPrice = Math.min(...activeComparedProducts.map(p => p.price.price));
                const cheapest = activeComparedProducts.find(p => p.price.price === minPrice);
                if (cheapest) lowestPriceId = cheapest.id;

                // Determine highest rating
                const maxRating = Math.max(...activeComparedProducts.map(p => p.reviews.notation));
                const bestRated = activeComparedProducts.find(p => p.reviews.notation === maxRating);
                if (bestRated) highestRatingId = bestRated.id;
              }
              
              // Filter products by category coherence & duplicates
              const eligibleProducts = products.filter(p => 
                !comparedProducts.some(comp => comp.id === p.id) &&
                (!activeCategory || p.category === activeCategory)
              );

              // 💡 Compute quick comparison suggestions
              const quickSuggestions = eligibleProducts.slice(0, 4);

              return (
                <>
                  <div className="space-y-6">

                  {/* --- MOBILE AND TABLET CARDS VIEW (lg:hidden) --- */}
                  <div className="lg:hidden" id="compare-mobile-cards-view">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {slots.map((p, idx) => {
                        const isCheapestOnTable = p && lowestPriceId === p.id;
                        const isBestRatedOnTable = p && highestRatingId === p.id;

                        return (
                          <div 
                            key={idx} 
                            className={`bg-white rounded-2xl border p-4 sm:p-5 flex flex-col relative h-full transition-all duration-300 ${
                              p 
                                ? 'border-outline-variant/50 shadow-xs hover:shadow-md hover:border-secondary/40' 
                                : 'border-dashed border-outline-variant/60 bg-slate-50/15'
                            }`}
                          >
                            {p ? (
                              <div className="flex flex-col h-full justify-between gap-4">
                                {/* Header action inside Card: Category tag & Removal button */}
                                <div className="flex justify-between items-start gap-2">
                                  <span className="text-[9px] uppercase tracking-wider font-semibold text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full inline-block">
                                    {p.category}
                                  </span>
                                  
                                  <button
                                    type="button"
                                    onClick={() => toggleCompareProduct(p)}
                                    className="w-7 h-7 rounded-full bg-red-55/10 hover:bg-red-50 text-red-600 flex items-center justify-center transition-all duration-150 shadow-xs cursor-pointer border border-red-100"
                                    title={lang === 'fr' ? "Retirer ce produit" : "Remove this item"}
                                  >
                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                  </button>
                                </div>

                                {/* Product Image and Title */}
                                <div className="text-center pt-1">
                                  <div 
                                    className="aspect-square w-full max-w-[110px] mx-auto bg-surface-container rounded-xl overflow-hidden border border-outline-variant/40 shadow-inner group cursor-pointer hover:border-secondary hover:shadow-md transition-all duration-200"
                                    onClick={() => { setSelectedProduct(p); setIsCompareModalOpen(false); }}
                                    title={lang === 'fr' ? "Voir la fiche produit complète" : "View full details"}
                                  >
                                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" />
                                  </div>
                                  <h4 
                                    className="font-label-bold text-xs text-primary line-clamp-2 mt-3 hover:text-secondary cursor-pointer transition-colors leading-snug tracking-tight font-extrabold max-w-[190px] mx-auto"
                                    onClick={() => { setSelectedProduct(p); setIsCompareModalOpen(false); }}
                                  >
                                    {p.title}
                                  </h4>
                                </div>

                                {/* Characteristics Grid per mobile card */}
                                <div className="space-y-3 pt-4 border-t border-outline-variant/35 text-xs flex-grow my-2">
                                  {/* Price Section */}
                                  <div className={`p-2.5 rounded-xl border flex flex-col gap-1.5 ${isCheapestOnTable ? "bg-emerald-50/50 border-emerald-100" : "bg-slate-50/50 border-outline-variant/20"}`}>
                                    <div className="flex justify-between items-center">
                                      <span className="text-slate-muted font-bold tracking-tight uppercase text-[9.5px]">
                                        {lang === 'fr' ? "Tarif public" : "Public price"}
                                      </span>
                                      {isCheapestOnTable && (
                                        <span className="text-[8px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5 shadow-3xs">
                                          <span className="material-symbols-outlined text-[10px]">payments</span>
                                          {lang === 'fr' ? "Meilleur Prix" : "Best Price"}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-baseline justify-between pt-0.5">
                                      <span className={`font-mono font-black ${isCheapestOnTable ? "text-emerald-700 text-[13px]" : "text-primary text-[12.5px]"}`}>
                                        {formatPrice(p.price.price)}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Reviews Section */}
                                  <div className={`p-2.5 rounded-xl border flex flex-col gap-1.5 ${isBestRatedOnTable ? "bg-amber-50/40 border-amber-100" : "bg-slate-50/50 border-outline-variant/20"}`}>
                                    <div className="flex justify-between items-center">
                                      <span className="text-slate-muted font-bold tracking-tight uppercase text-[9.5px]">
                                        {lang === 'fr' ? "Avis des cyclistes" : "Rider reviews"}
                                      </span>
                                      {isBestRatedOnTable && (
                                        <span className="text-[8px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5 shadow-3xs">
                                          <span className="material-symbols-outlined text-[10px]">workspace_premium</span>
                                          {lang === 'fr' ? "Mieux Noté" : "Top Rated"}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center justify-between gap-1 pt-0.5">
                                      <div className="flex items-center text-warning gap-0.5 shrink-0">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                          <span 
                                            key={i} 
                                            className="material-symbols-outlined text-[11px] select-none" 
                                            style={{ fontVariationSettings: `'FILL' ${i + 1 <= Math.round(p.reviews.notation) ? '1' : '0'}` }}
                                          >
                                            star
                                          </span>
                                        ))}
                                      </div>
                                      <span className="text-[10px] font-black text-primary font-sans">
                                        {p.reviews.notation} / 5 <span className="text-slate-muted text-[8.5px] font-medium">({p.reviews.count})</span>
                                      </span>
                                    </div>
                                  </div>

                                  {/* Available Sizes Section */}
                                  <div className="p-2.5 rounded-xl border bg-slate-50/50 border-outline-variant/20 flex flex-col gap-1.5">
                                    <span className="text-slate-muted font-bold tracking-tight uppercase text-[9.5px]">
                                      {lang === 'fr' ? "Tailles disponibles" : "Available sizes"}
                                    </span>
                                    <div className="flex flex-wrap gap-1 max-w-full pt-0.5">
                                      {p.sizes.map((s) => (
                                        <span key={s} className="bg-white text-on-surface px-1.5 py-0.5 rounded border border-outline-variant/30 text-[9px] font-black shadow-3xs">
                                          {s.split(' - ')[0]}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {/* Order Quick Button */}
                                <div className="pt-3 border-t border-outline-variant/35">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedProduct(p);
                                      setSizeSelection(p.sizes[0] || '');
                                      setIsCompareModalOpen(false);
                                    }}
                                    className="w-full bg-primary hover:bg-secondary text-white text-[10px] font-black py-2.5 rounded-xl border border-primary hover:border-secondary transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 shadow-xs uppercase cursor-pointer"
                                  >
                                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                    <span>{lang === 'fr' ? "Choisir la taille" : "Choose size"}</span>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              /* Empty pick slot trigger card on Mobile */
                              <button
                                type="button"
                                onClick={() => {
                                  setPickingSlotIndex(idx);
                                  setPickerSearchQuery('');
                                }}
                                className="w-full min-h-[220px] flex flex-col justify-center items-center gap-3.5 text-center group cursor-pointer transition-all duration-300 py-8 px-4"
                              >
                                <div className="w-12 h-12 rounded-full bg-slate-200/60 group-hover:bg-secondary/15 flex items-center justify-center text-outline group-hover:text-secondary group-hover:scale-110 shadow-inner overflow-hidden transition-all duration-300">
                                  <span className="material-symbols-outlined text-[24px] leading-none">add_circle</span>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-[11px] font-black text-primary uppercase tracking-widest block">
                                    {lang === 'fr' ? "Ajouter un produit" : "Add Product"}
                                  </span>
                                  <span className="text-[9px] text-slate-muted block font-medium max-w-[140px] mx-auto leading-normal">
                                    {lang === 'fr' ? "Cliquez ici pour choisir un modèle" : "Click to select a product"}
                                  </span>
                                </div>
                                {activeCategory && (
                                  <span className="text-[8px] font-black uppercase text-secondary tracking-wider bg-secondary/10 px-2 py-0.5 inline-block rounded-full mt-1">
                                    {activeCategory}
                                  </span>
                                )}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>


                  {/* --- THE COMPARISON DATA TABLE GRID FOR DESKTOP (hidden lg:block) --- */}
                  <div className="hidden lg:block overflow-x-auto rounded-xl border border-outline-variant/40 shadow-sm" id="compare-grid-wrapper">
                    <table className="w-full text-left border-collapse min-w-[780px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-outline-variant/55">
                          <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-slate-muted w-1/4 select-none">
                            <span className="flex items-center gap-1.5 text-primary">
                              <span className="material-symbols-outlined text-[16px] text-zinc-500">description</span>
                              <span>{lang === 'fr' ? "Spécification" : "Record Feature"}</span>
                            </span>
                          </th>
                          {slots.map((p, idx) => (
                            <th key={idx} className="py-4 px-5 w-1/4 relative align-top">
                              {p ? (
                                <div className="flex flex-col h-full justify-between gap-3 text-center relative pt-2">
                                  {/* Remove card button top-right */}
                                  <button
                                    type="button"
                                    onClick={() => toggleCompareProduct(p)}
                                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-all duration-150 shadow-sm z-10 cursor-pointer"
                                    title={lang === 'fr' ? "Retirer ce produit" : "Remove this item"}
                                  >
                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                  </button>

                                  <div 
                                    className="aspect-square w-full max-w-[125px] mx-auto bg-surface-container rounded-lg overflow-hidden border border-outline-variant/40 shadow-inner group cursor-pointer hover:border-secondary hover:shadow-md transition-all duration-200" 
                                    onClick={() => { setSelectedProduct(p); setIsCompareModalOpen(false); }}
                                    title={lang === 'fr' ? "Voir la fiche produit complète" : "View full details"}
                                  >
                                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-350" />
                                  </div>

                                  <div className="text-center">
                                    <span className="text-[9px] uppercase tracking-wider font-technical-data text-secondary font-black bg-secondary/10 px-2.5 py-0.5 rounded-full inline-block">
                                      {p.category}
                                    </span>
                                    <h4 
                                      className="font-label-bold text-body-xs text-primary line-clamp-2 mt-2.5 min-h-[35px] hover:text-secondary cursor-pointer transition-colors leading-snug tracking-tight font-extrabold max-w-[180px] mx-auto" 
                                      onClick={() => { setSelectedProduct(p); setIsCompareModalOpen(false); }}
                                    >
                                      {p.title}
                                    </h4>
                                  </div>
                                </div>
                              ) : (
                                /* Centralized selector trigger card */
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPickingSlotIndex(idx);
                                    setPickerSearchQuery('');
                                  }}
                                  className="border-2 border-dashed border-outline-variant/60 hover:border-secondary/60 rounded-xl p-5 bg-slate-50/50 hover:bg-secondary/5 flex flex-col justify-center items-center gap-3 min-h-[220px] w-full text-center group cursor-pointer transition-all duration-300 shadow-xs"
                                >
                                  <div className="w-11 h-11 rounded-full bg-slate-200/60 group-hover:bg-secondary/15 flex items-center justify-center text-outline group-hover:text-secondary group-hover:scale-110 shadow-inner overflow-hidden transition-all duration-300">
                                    <span className="material-symbols-outlined text-[22px] leading-none">add_circle</span>
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-[10.5px] font-black text-primary uppercase tracking-widest block">
                                      {lang === 'fr' ? "Ajouter un produit" : "Add Product"}
                                    </span>
                                    <span className="text-[9px] text-slate-muted block font-medium max-w-[130px] mx-auto leading-normal">
                                      {lang === 'fr' ? "Cliquez ici pour ouvrir le catalogue d'analyse" : "Click to select a product from catalog"}
                                    </span>
                                  </div>
                                  {activeCategory && (
                                    <span className="text-[8px] font-black uppercase text-secondary tracking-wider bg-secondary/10 px-2 mt-1.5 inline-block rounded-full">
                                      {activeCategory}
                                    </span>
                                  )}
                                </button>
                              )}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/35 text-sm">
                        {/* 1. Price Row with automatic cheapest highlight banner */}
                        <tr className="hover:bg-slate-50/40 transition-colors">
                          <td className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-slate-muted select-none">
                            {lang === 'fr' ? "Tarif public" : "Public price"}
                          </td>
                          {slots.map((p, index) => {
                            const isCheapestOnTable = p && lowestPriceId === p.id;
                            return (
                              <td 
                                key={index} 
                                className={`py-4 px-5 text-center transition-all ${
                                  isCheapestOnTable ? "bg-emerald-50/40" : ""
                                }`}
                              >
                                {p ? (
                                  <div className="flex flex-col items-center justify-center gap-1.5">
                                    <span className={`font-mono font-black text-body-sm ${isCheapestOnTable ? "text-emerald-700 text-[15px]" : "text-primary"}`}>
                                      {formatPrice(p.price.price)}
                                    </span>
                                    {isCheapestOnTable && (
                                      <span className="inline-flex items-center gap-0.5 text-[9.5px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full shadow-xs animate-pulse">
                                        <span className="material-symbols-outlined text-[11px]">payments</span>
                                        <span>{lang === 'fr' ? "Meilleur Prix" : "Best Price"}</span>
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-zinc-300 font-mono">-</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>

                        {/* 2. Customer Reviews with automatic highest rating highlight */}
                        <tr className="hover:bg-slate-50/40 transition-colors">
                          <td className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-slate-muted select-none">
                            {lang === 'fr' ? "Avis des cyclistes" : "Rider reviews"}
                          </td>
                          {slots.map((p, index) => {
                            const isBestRatedOnTable = p && highestRatingId === p.id;
                            return (
                              <td 
                                key={index} 
                                className={`py-4 px-5 text-center transition-all ${
                                  isBestRatedOnTable ? "bg-amber-55/10" : ""
                                }`}
                              >
                                {p ? (
                                  <div className="flex flex-col items-center justify-center gap-1">
                                    <div className="flex items-center text-warning gap-0.5">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <span 
                                          key={i} 
                                          className="material-symbols-outlined text-[13px]" 
                                          style={{ fontVariationSettings: `'FILL' ${i + 1 <= Math.round(p.reviews.notation) ? '1' : '0'}` }}
                                        >
                                          star
                                        </span>
                                      ))}
                                    </div>
                                    <span className="text-[10.5px] font-black text-primary font-sans">
                                      {p.reviews.notation} / 5
                                    </span>
                                    <span className="text-[9.5px] text-slate-muted font-medium">
                                      ({p.reviews.count} {lang === 'fr' ? "avis" : "reviews"})
                                    </span>
                                    {isBestRatedOnTable && (
                                      <span className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full shadow-xs mt-1">
                                        <span className="material-symbols-outlined text-[11px]">workspace_premium</span>
                                        <span>{lang === 'fr' ? "Mieux Noté" : "Top Rated"}</span>
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-zinc-300 font-mono">-</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>

                        {/* 3. Category Row */}
                        <tr className="hover:bg-slate-50/40 transition-colors">
                          <td className="py-3.5 px-5 text-xs font-bold uppercase tracking-wider text-slate-muted select-none">
                            {lang === 'fr' ? "Catégorie" : "Category"}
                          </td>
                          {slots.map((p, index) => (
                            <td key={index} className="py-3.5 px-5 font-bold text-slate-muted text-body-xs text-center capitalize">
                              {p ? p.category : <span className="text-zinc-200">-</span>}
                            </td>
                          ))}
                        </tr>

                        {/* 4. Sizes Row */}
                        <tr className="hover:bg-slate-50/40 transition-colors">
                          <td className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-slate-muted select-none">
                            {lang === 'fr' ? "Tailles disponibles" : "Available sizes"}
                          </td>
                          {slots.map((p, index) => (
                            <td key={index} className="py-4 px-5 text-center text-body-xs font-mono">
                              {p ? (
                                <div className="flex flex-wrap gap-1 justify-center max-w-[160px] mx-auto">
                                  {p.sizes.map((s) => (
                                    <span key={s} className="bg-surface-container text-on-surface px-2 py-0.5 rounded border border-outline-variant/30 text-[9.5px] font-bold">
                                      {s.split(' - ')[0]}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-zinc-300">-</span>
                              )}
                            </td>
                          ))}
                        </tr>

                        {/* 5. Add to basket inline shortcut row */}
                        <tr className="bg-slate-50/30">
                          <td className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-slate-muted select-none">
                            {lang === 'fr' ? "Commande rapide" : "Quick action"}
                          </td>
                          {slots.map((p, index) => (
                            <td key={index} className="py-4 px-5 text-center">
                              {p ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedProduct(p);
                                    setSizeSelection(p.sizes[0] || '');
                                    setIsCompareModalOpen(false);
                                  }}
                                  className="bg-primary hover:bg-secondary text-white text-[10px] font-black px-4 py-2.5 rounded-lg border border-primary hover:border-secondary transition-all duration-200 active:scale-[0.98] inline-flex items-center gap-1.5 shadow-xs uppercase cursor-pointer"
                                >
                                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                  <span>{lang === 'fr' ? "Choisir la taille" : "Choose size"}</span>
                                </button>
                              ) : (
                                <span className="text-zinc-300 font-mono">-</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Recommendations Helper Notice */}
                  {comparedProducts.length === 1 && (
                    <div className="bg-amber-50 text-amber-900 border border-amber-100 rounded-xl p-4 text-xs flex items-center gap-2.5 max-w-max mx-auto shadow-xs" id="comparison-reminder">
                      <span className="material-symbols-outlined text-amber-600 text-[20px]">info</span>
                      <span className="font-medium">
                        {lang === 'fr' 
                          ? "Astuce : Pour lancer le comparatif côte-à-côte, ajoutez un deuxième produit de la même catégorie en cliquant sur l'une des suggestions rapides ci-dessus !" 
                          : "Protip: To start the side-by-side analysis, select a second product from the suggested row or search box!"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Centralized Product Picker overlay sheet */}
                {pickingSlotIndex !== null && (
                  <div className="absolute inset-0 bg-white rounded-2xl p-5 sm:p-8 flex flex-col z-50 animate-in fade-in slide-in-from-bottom-6 duration-300 text-left">
                    {/* Picker Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-outline-variant/40 mb-6">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setPickingSlotIndex(null)}
                          className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 text-primary flex items-center justify-center transition-all duration-150 cursor-pointer shadow-xs border border-outline-variant/30"
                          title={lang === 'fr' ? "Retour au tableau" : "Back to grid"}
                        >
                          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        </button>
                        <div>
                          <h4 className="font-extrabold text-[15px] sm:text-headline-xs text-primary uppercase tracking-tight flex items-center gap-2">
                            <span>
                              {lang === 'fr' 
                                ? `Sélectionner un produit (Emplacement n°${pickingSlotIndex + 1})` 
                                : `Select Compared Item (Slot #${pickingSlotIndex + 1})`}
                            </span>
                          </h4>
                          <p className="text-[11px] text-slate-muted">
                            {lang === 'fr' 
                              ? "Sélectionnez un modèle de la même catégorie pour l'analyse." 
                              : "Add and compare features side-by-side."}
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          setPickingSlotIndex(null);
                        }}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-on-surface hover:text-primary transition-all duration-150 cursor-pointer border border-outline-variant/10 shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>

                    {/* Centralized High Fidelity Search Bar */}
                    <div className="mb-5 space-y-3">
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-muted text-[18px] pointer-events-none">
                          search
                        </span>
                        <input
                          type="text"
                          autoFocus
                          value={pickerSearchQuery}
                          onChange={(e) => setPickerSearchQuery(e.target.value)}
                          placeholder={
                            activeCategory
                              ? (lang === 'fr' ? `Rechercher dans la catégorie : ${activeCategory}...` : `Search inside category: ${activeCategory}...`)
                              : (lang === 'fr' ? "Rechercher par nom, catégorie, technologie (Ex: carbone)..." : "Search model by brand, component or category...")
                          }
                          className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-outline-variant/60 rounded-xl text-body-xs font-sans outline-none focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-white text-primary shadow-xs transition-all"
                        />
                        {pickerSearchQuery && (
                          <button
                            type="button"
                            onClick={() => setPickerSearchQuery('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-muted hover:text-primary bg-zinc-100 hover:bg-zinc-200 transition-colors rounded-full p-0.5 flex"
                          >
                            <span className="material-symbols-outlined text-[14px]">close</span>
                          </button>
                        )}
                      </div>

                      {/* Lock warning badge */}
                      {activeCategory && (
                        <div className="bg-secondary/10 border border-secondary/20 rounded-lg py-1.5 px-3 flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary text-[15px] leading-none">lock</span>
                          <span className="text-[10px] font-bold text-secondary">
                            {lang === 'fr' 
                              ? `Filtre intelligent : Seuls les articles "${activeCategory}" sont affichés pour un comparatif réaliste.` 
                              : `Smart Filter: Only matches for category "${activeCategory}" are shown for technical coherence.`}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Spacious Picker Grid/Selector */}
                    <div className="flex-1 overflow-y-auto pr-1 min-h-[340px]" id="picker-results-scroller">
                      {(() => {
                        const query = pickerSearchQuery.toLowerCase();
                        const items = eligibleProducts.filter(item => 
                          item.title.toLowerCase().includes(query) || 
                          item.category.toLowerCase().includes(query) ||
                          (item.hero_tag && item.hero_tag.toLowerCase().includes(query))
                        );

                        if (items.length === 0) {
                          return (
                            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-muted space-y-2">
                              <span className="material-symbols-outlined text-[36px] text-zinc-300">search_off</span>
                              <p className="text-body-xs font-black text-primary uppercase tracking-widest">
                                {lang === 'fr' ? "Aucun modèle trouvé" : "No models found"}
                              </p>
                              <p className="text-[11px] text-slate-muted max-w-xs">
                                {lang === 'fr' 
                                  ? "Modifiez le mot clé saisi ou effacez la recherche pour voir tous les produits disponibles." 
                                  : "Modify your keyword or clear the search to view all results."}
                              </p>
                            </div>
                          );
                        }

                        return (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pb-4">
                            {items.map((item) => {
                              const isAlreadyCompared = comparedProducts.some(p => p.id === item.id);
                              return (
                                <div
                                  key={item.id}
                                  className={`border rounded-xl p-3 flex items-start gap-3 transition-all relative group shadow-xs ${
                                    isAlreadyCompared 
                                      ? "bg-slate-50 border-outline-variant/30 opacity-60 cursor-not-allowed" 
                                      : "bg-white border-outline-variant/50 hover:border-secondary hover:shadow-md cursor-pointer"
                                  }`}
                                  onClick={() => {
                                    if (isAlreadyCompared) return;
                                    
                                    // Append model to comparison list
                                    setComparedProducts((prev) => [...prev, item]);
                                    setPickingSlotIndex(null);
                                    setToastMessage(lang === 'fr' ? `Produit ajouté au comparateur` : `Product added to comparison`);
                                    setTimeout(() => setToastMessage(''), 2500);
                                  }}
                                >
                                  {/* Product Tiny Image */}
                                  <div className="w-14 h-14 rounded-lg bg-slate-50 flex-shrink-0 border border-outline-variant/20 overflow-hidden">
                                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 duration-300" />
                                  </div>

                                  {/* Text Info */}
                                  <div className="flex-grow space-y-1 overflow-hidden">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[8px] uppercase tracking-wider font-extrabold text-secondary bg-secondary/10 px-1.5 py-0.2 rounded-sm capitalize">
                                        {item.category}
                                      </span>
                                    </div>
                                    <h5 className="font-extrabold text-[12px] text-primary truncate block" title={item.title}>
                                      {item.title}
                                    </h5>
                                    
                                    <div className="flex items-center justify-between">
                                      <span className="font-mono font-black text-[11px] text-primary">
                                        {formatPrice(item.price.price)}
                                      </span>
                                      <div className="flex items-center text-warning gap-0.5 scale-85 origin-right">
                                        <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="text-[9.5px] font-bold text-slate-muted mt-0.5">{item.reviews.notation}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Action Status overlay pill / button */}
                                  <div className="flex items-center self-center pl-1 shrink-0">
                                    {isAlreadyCompared ? (
                                      <span className="material-symbols-outlined text-success text-[18px]">
                                        check_circle
                                      </span>
                                    ) : (
                                      <div className="w-6 h-6 rounded-full bg-slate-50 border border-outline-variant/40 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-150">
                                        <span className="material-symbols-outlined text-[13px] leading-none">add</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </>
            );
            })()}
          </div>
        </div>
      )}

      {/* Toast Notification Container */}
      {toastMessage && (
        <div 
          className="fixed bottom-6 left-6 z-[100] max-w-sm bg-inverse-surface border border-outline-variant/60 text-white p-4 shadow-2xl rounded-md flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300"
          id="system-toast-notif"
        >
          <span className="material-symbols-outlined text-success">
            check_circle
          </span>
          <span className="text-body-sm font-medium font-body-sm">
            {toastMessage}
          </span>
        </div>
      )}

    </div>
  );
}
