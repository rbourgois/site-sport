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
  },
  pt: {
    "vélo d'appartement": "Bicicleta Estática",
    "vélo tout chemin": "Bicicleta Híbrida",
    "vélo de ville enjambement bas": "Bicicleta Urbana de Entrada Baixa",
    "vélo de ville": "Bicicleta Urbana",
    "vélo de route": "Bicicleta de Estrada",
    "vélo route": "Bicicleta de Estrada",
    "vélo vtt": "BTT (Bicicleta de Montanha)",
    "vtt": "BTT (Bicicleta de Montanha)",
    "poche à eau": "Bolsa de Água",
    "bâton de randonnée": "Bastão de Caminhada",
    "bâton ultra-compact": "Bastão Ultra-Compacto",
    "bâton": "Bastão",
    "lampe frontale": "Lanterna Frontal",
    "gourde": "Garrafa de Água",
    "repas lyophilisé": "Comida Liofilizada",
    "pâtes à la bolognaise": "Massa à Bolonhesa",
    "riz et poulet au curry": "Arroz de Frango com Caril",
    "purée de pomme de terre à la viande hachée": "Puré de Batata com Carne Picada",
    "sans gluten": "Sem Glúten",
    "tapis de sol": "Tapete de Treino",
    "tapis de course": "Passadeira de Corrida",
    "tapis de protection sol": "Tapete Protetor de Chão",
    "tapis de marche": "Tapete de Caminhada",
    "vélo elliptique": "Bicicleta Elíptica",
    "rameur": "Máquina de Remo",
    "montre gps de sport": "Relógio Desportivo GPS",
    "montre connectée gps": "Relógio Inteligente GPS",
    "montre connectée": "Relógio Inteligente",
    "montre gps": "Relógio GPS",
    "popote": "Conjunto de Cozinha de Camping",
    "isotherme inox": "Isotérmico em Aço Inox",
    "isotherme": "Isotérmico",
    "bouchon à ouverture rapide": "Tampa de Abertura Rápida",
    "pour la randonnée": "para Caminhada",
    "en acier inox": "em Aço Inoxidável",
    "anti-adhésif": "Anti-aderente",
    "personnes": "Pessoas",
    "éléments": "Elementos",
    "réglage rapide et précis": "Ajuste Rápido e Preciso",
    "connecté et auto-alimenté": "Conectado e Auto-alimentado",
    "auto-alimenté et connecté": "Auto-alimentado e Conectado",
    "résistance motorisée": "Resistência Motorizada",
    "auto-alimenté": "Auto-alimentado",
    "connecté": "Conectado",
    "pliable": "Dobrável",
    "garanti par decathlon": "Garantido por Decathlon",
    "cadre haut": "Quadro Alto",
    "cadre bas": "Quadro Baixo",
    "enjambement bas": "Entrada Baixa",
    "bleu nuit": "Azul Noite",
    "bleu tempête": "Azul Tempestade",
    "gris foncé": "Cinzento Escuro",
    "gris clair": "Cinzento Claro",
    "vert bouteille": "Verde Garrafa",
    "vert amande": "Verde Amêndoa",
    "bleu": "Azul",
    "vert": "Verde",
    "noir": "Preto",
    "blanc": "Branco",
    "gris": "Cinzento"
  },
  nl: {
    "vélo d'appartement": "Hometrainer",
    "vélo tout chemin": "Hybride Fiets",
    "vélo de ville enjambement bas": "Stadsfiets met Lage Instap",
    "vélo de ville": "Stadsfiets",
    "vélo de route": "Racefiets",
    "vélo route": "Racefiets",
    "vélo vtt": "Mountainbike (MTB)",
    "vtt": "Mountainbike (MTB)",
    "poche à eau": "Drinkreservoir",
    "bâton de randonnée": "Wandelstok",
    "bâton ultra-compact": "Ultra-Compacte Wandelstok",
    "bâton": "Wandelstok",
    "lampe frontale": "Hoofdlamp",
    "gourde": "Drinkfles",
    "repas lyophilisé": "Vriesdroogmaaltijd",
    "pâtes à la bolognaise": "Pasta Bolognese",
    "riz et poulet au curry": "Kip Curry met Rijst",
    "purée de pomme de terre à la viande hachée": "Aardappelpuree met Gehakt",
    "sans gluten": "Glutenvrij",
    "tapis de sol": "Fitnessmat",
    "tapis de course": "Loopband",
    "tapis de protection sol": "Vloerbeschermmat",
    "tapis de marche": "Wandelpad",
    "vélo elliptique": "Crosstrainer",
    "rameur": "Roeitrainer",
    "montre gps de sport": "GPS Sporthorloge",
    "montre connectée gps": "GPS Smartwatch",
    "montre connectée": "Smartwatch",
    "montre gps": "GPS Horloge",
    "popote": "Kampeerkookset",
    "isotherme inox": "Geïsoleerd RVS",
    "isotherme": "Geïsoleerd",
    "bouchon à ouverture rapide": "Snelsluitende Dop",
    "pour la randonnée": "voor het Wandelen",
    "en acier inox": "van Roestvrij Staal",
    "anti-adhésif": "Antiaanbaklaag",
    "personnes": "Personen",
    "éléments": "Onderdelen",
    "réglage rapide et précis": "Snelle en Nauwkeurige Afstelling",
    "connecté et auto-alimenté": "Verbonden en Zelfvoorzienend",
    "auto-alimenté et connecté": "Zelfvoorzienend en Verbonden",
    "résistance motorisée": "Gemotoriseerde Weerstand",
    "auto-alimenté": "Zelfvoorzienend",
    "connecté": "Verbonden",
    "pliable": "Opvouwbaar",
    "garanti par decathlon": "Gegarandeerd door Decathlon",
    "cadre haut": "Hoog Frame",
    "cadre bas": "Laag Frame",
    "enjambement bas": "Lage Instap",
    "bleu nuit": "Nachtblauw",
    "bleu tempête": "Stormblauw",
    "gris foncé": "Donkergrijs",
    "gris clair": "Lichtgrijs",
    "vert bouteille": "Flesgroen",
    "vert amande": "Amandelgroen",
    "bleu": "Blauw",
    "vert": "Groen",
    "noir": "Zwart",
    "blanc": "Wit",
    "gris": "Grijs"
  },
  ar: {
    "vélo d'appartement": "دراجة تمارين رياضية",
    "vélo tout chemin": "دراجة هجينة",
    "vélo de ville enjambement bas": "دراجة مدينة بإطار منخفض",
    "vélo de ville": "دراجة مدينة",
    "vélo de route": "دراجة طريق",
    "vélo route": "دراجة طريق",
    "vélo vtt": "دراجة جبلية (MTB)",
    "vtt": "دراجة جبلية (MTB)",
    "poche à eau": "حقيبة مياه",
    "bâton de randonnée": "عصا للمشي المسافات الطويلة",
    "bâton ultra-compact": "عصا مدمجة للغاية",
    "bâton": "عصا",
    "lampe frontale": "كشاف رأس",
    "gourde": "مطرة ماء",
    "repas lyophilisé": "وجبة مجففة بالتجميد",
    "pâtes à la bolognaise": "معكرونة بولونيز",
    "riz et poulet au curry": "أرز ودجاج كاري",
    "purée de pomme de terre à la viande hachée": "بطاطا مهروسة باللحم المفروم",
    "sans gluten": "خالي من الغلوتين",
    "tapis de sol": "سجادة رياضية",
    "tapis de course": "جهاز جري كهربائي",
    "tapis de protection sol": "مفرش حماية الأرضية",
    "tapis de marche": "جهاز مشي",
    "vélo elliptique": "جهاز الـ Elliptical",
    "rameur": "جهاز التجديف",
    "montre gps de sport": "ساعة رياضية بنظام تحديد المواقع GPS",
    "montre connectée gps": "ساعة ذكية بنظام تحديد المواقع GPS",
    "montre connectée": "ساعة ذكية",
    "montre gps": "ساعة بنظام تحديد المواقع GPS",
    "popote": "مجموعة أواني طبخ للتخييم",
    "isotherme inox": "حافظ للحرارة من الفولاذ المقاوم للصدأ",
    "isotherme": "حافظ للحرارة",
    "bouchon à ouverture rapide": "غطاء سريع الفتح",
    "pour la randonnée": "للمشي والتجول",
    "en acier inox": "من الفولاذ المقاوم للصدأ",
    "anti-adhésif": "مضاد للالتصاق",
    "personnes": "أشخاص",
    "elements": "قطع",
    "réglage rapide et précis": "تعديل سريع ودقيق",
    "connecté et auto-alimenté": "متصل وتلقائي التغذية الكهربائية",
    "auto-alimenté et connecté": "متصل وتلقائي التغذية الكهربائية",
    "résistance motorisée": "مقاومة بمحرك",
    "auto-alimenté": "تلقائي التغذية",
    "connecté": "متصل",
    "pliable": "قابل للطي",
    "garanti par decathlon": "مضمون من ديكاتلون",
    "cadre haut": "إطار مرتفع",
    "cadre bas": "إطار منخفض",
    "enjambement bas": "مستوى عبور منخفض",
    "bleu nuit": "أزرق داكن",
    "bleu tempête": "أزرق عاصف",
    "gris foncé": "رمادي غامق",
    "gris clair": "رمادي فاتح",
    "vert bouteille": "أخضر زجاجي",
    "vert amande": "أخضر لوزي",
    "bleu": "أزرق",
    "vert": "أخضر",
    "noir": "أسود",
    "blanc": "أبيض",
    "gris": "رمادي"
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
    reset: "Réinitialiser",
    filters: "Filtres",
    apply: "Appliquer",
    compare: "Comparer",
    compared: "Comparé",
    join_elite_apex: "Rejoignez l'élite sportive de l'équipe APEX",
    field_name_label: "Nom / Prénom",
    field_email_label: "Adresse Email",
    field_password_label: "Mot de Passe",
    field_newsletter_label: "S'abonner aux spécifications techniques hebdomadaires",
    btn_submit_account: "Valider et Créer mon espace",
    account_success_toast: "Bienvenue chez APEX ! Votre espace membre est créé.",
    comparison_title: "Comparateur Expert APEX",
    comparison_desc: "Prenez des décisions éclairées. Comparez en face à face jusqu'à 3 articles de la même catégorie pour analyser instantanément les tarifs, les avis clients et les disponibilités.",
    comparison_clean_all: "Vider tout",
    comparison_remove_all: "Vider tous les produits",
    comparison_remove_item: "Retirer ce produit",
    comparison_view_details: "Voir la fiche produit complète",
    comparison_public_price: "Tarif public",
    comparison_best_price: "Meilleur Prix",
    comparison_rider_reviews: "Avis des cyclistes",
    comparison_top_rated: "Mieux Noté",
    comparison_sizes_available: "Tailles disponibles",
    comparison_choose_size: "Choisir la taille",
    comparison_add_product: "Ajouter un produit",
    comparison_click_to_select: "Cliquez ici pour choisir un modèle",
    comparison_click_to_select_catalog: "Cliquez ici pour ouvrir le catalogue d'analyse",
    comparison_spec: "Spécification",
    comparison_quick_action: "Commande rapide",
    comparison_back_to_grid: "Retour au tableau",
    comparison_no_models: "Aucun modèle trouvé",
    comparison_cleared_toast: "Comparateur réinitialisé",
    comparison_max_reached_toast: "Vous pouvez comparer jusqu'à 3 produits maximum.",
    comparison_added_toast: "Produit ajouté au comparateur",
    comparison_removed_toast: "Produit retiré du comparateur",
    technical_info: "Informations Techniques",
    specifications_guide: "Fiche synthétique issue de la base de données officielle.",
    category: "Catégorie",
    base_price: "Base",
    sizes: "Tailles",
    score: "Score",
    returns_30_days: "Retours sous 30 jours",
    shipping_guarantee: "Livraison Offerte dès 50€",
    official_gear_guarantee: "Sélection Officielle APEX",
    compare_product_tooltip: "Comparer ce produit",
    products_label: "Produits",
    reviews_label: "avis",
    comparison_reminder_tip: "Astuce : Pour lancer le comparatif côte-à-côte, ajoutez un deuxième produit de la même catégorie en cliquant sur l'une des suggestions rapides ci-dessus !",
    comparison_select_slot: "Sélectionner un produit (Emplacement n°{slot})",
    comparison_select_slot_sub: "Sélectionnez un modèle de la même catégorie pour l'analyse.",
    comparison_search_in_category: "Rechercher dans la catégorie : {category}...",
    comparison_search_all: "Rechercher par nom, catégorie, technologie...",
    comparison_smart_filter: "Filtre intelligent : Seuls les articles \"{category}\" sont affichés pour un comparatif réaliste.",
    comparison_no_models_sub: "Modifiez le mot clé saisi ou effacez la recherche pour voir tous les produits disponibles.",
    comparison_incoherent_toast: "Incohérent : Vous ne pouvez comparer que des articles de la même catégorie (ex: {category}).",

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
    close: "Fermer",
    home: "Accueil",
    back_to_products: "Retour aux produits",
    fast_shipping: "Expédition rapide",
    alternative_suggestions: "Suggestions alternatives",
    alternative_suggestions_desc: "Équipements du catalogue officiel dans la même catégorie.",
    technical_informations_database: "Informations Techniques",
    technical_informations_database_desc: "Fiche synthétique issue de la base de données officielle.",
    select_size_alert: "Veuillez choisir une taille avant d'ajouter l'article au panier."
  },
  en: {
    reset: "Reset",
    filters: "Filters",
    apply: "Apply",
    compare: "Compare",
    compared: "Compared",
    join_elite_apex: "Join the athletic elite of Team APEX",
    field_name_label: "First / Last Name",
    field_email_label: "Email Address",
    field_password_label: "Password",
    field_newsletter_label: "Subscribe to weekly specifications",
    btn_submit_account: "Verify & Create my space",
    account_success_toast: "Welcome to APEX! Your member space has been created.",
    comparison_title: "Apex Pro Comparison",
    comparison_desc: "Make informed choices. Compare up to 3 items side-by-side to instantly evaluate prices, customer reviews, and sizes.",
    comparison_clean_all: "Clear all",
    comparison_remove_all: "Remove all products",
    comparison_remove_item: "Remove this item",
    comparison_view_details: "View full details",
    comparison_public_price: "Public price",
    comparison_best_price: "Best Price",
    comparison_rider_reviews: "Rider reviews",
    comparison_top_rated: "Top Rated",
    comparison_sizes_available: "Available sizes",
    comparison_choose_size: "Choose size",
    comparison_add_product: "Add Product",
    comparison_click_to_select: "Click to select a product",
    comparison_click_to_select_catalog: "Click to select a product from catalog",
    comparison_spec: "Record Feature",
    comparison_quick_action: "Quick action",
    comparison_back_to_grid: "Back to grid",
    comparison_no_models: "No models found",
    comparison_cleared_toast: "Comparison cleared",
    comparison_max_reached_toast: "You can compare up to 3 products maximum.",
    comparison_added_toast: "Product added to comparison",
    comparison_removed_toast: "Product removed from comparison",
    technical_info: "Technical Information",
    specifications_guide: "Official catalog database specifications guide.",
    category: "Category",
    base_price: "Base Price",
    sizes: "Sizes",
    score: "Score",
    returns_30_days: "30-day Easy Returns",
    shipping_guarantee: "Free shipping over 50€",
    official_gear_guarantee: "Official APEX Gear",
    compare_product_tooltip: "Compare this product",
    products_label: "Products",
    reviews_label: "reviews",
    comparison_reminder_tip: "Tip: To start the side-by-side analysis, select a second product from the suggested row or search box!",
    comparison_select_slot: "Select Compared Item (Slot #{slot})",
    comparison_select_slot_sub: "Add and compare features side-by-side.",
    comparison_search_in_category: "Search inside category: {category}...",
    comparison_search_all: "Search model by brand, component or category...",
    comparison_smart_filter: "Smart Filter: Only matches for category \"{category}\" are shown for technical coherence.",
    comparison_no_models_sub: "Modify your keyword or clear the search to view all results.",
    comparison_incoherent_toast: "Inconsistent: You can only compare items from the same category ({category}).",

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
    close: "Close",
    home: "Home",
    back_to_products: "Back to products",
    fast_shipping: "Fast Shipping",
    alternative_suggestions: "Alternative Suggestions",
    alternative_suggestions_desc: "Official items matching this category class.",
    technical_informations_database: "Technical Information",
    technical_informations_database_desc: "Official catalog database specifications guide.",
    select_size_alert: "Please select a size before adding the item to your cart."
  },
  es: {
    reset: "Restablecer",
    filters: "Filtros",
    apply: "Aplicar",
    compare: "Comparar",
    compared: "Comparado",
    join_elite_apex: "Únete a la élite deportiva del equipo APEX",
    field_name_label: "Nombre / Apellido",
    field_email_label: "Correo electrónico",
    field_password_label: "Contraseña",
    field_newsletter_label: "Suscribirse a las especificaciones técnicas semanales",
    btn_submit_account: "Validar y Crear mi espacio",
    account_success_toast: "¡Bienvenido a APEX! Se ha creado tu espacio de miembro.",
    comparison_title: "Comparador Experto APEX",
    comparison_desc: "Toma decisiones informadas. Compara cara a cara hasta 3 artículos de la misma categoría para analizar tarifas, opiniones y disponibilidad al instante.",
    comparison_clean_all: "Vaciar todo",
    comparison_remove_all: "Eliminar todos los productos",
    comparison_remove_item: "Eliminar este producto",
    comparison_view_details: "Ver detalles completos del producto",
    comparison_public_price: "Precio público",
    comparison_best_price: "Mejor Precio",
    comparison_rider_reviews: "Opiniones de ciclistas",
    comparison_top_rated: "Mejor Valorado",
    comparison_sizes_available: "Tallas disponibles",
    comparison_choose_size: "Elegir talla",
    comparison_add_product: "Añadir producto",
    comparison_click_to_select: "Haz clic aquí para elegir un modelo",
    comparison_click_to_select_catalog: "Haz clic aquí para abrir el catálogo de análisis",
    comparison_spec: "Especificación",
    comparison_quick_action: "Acción rápida",
    comparison_back_to_grid: "Volver a la tabla",
    comparison_no_models: "No se encontraron modelos",
    comparison_cleared_toast: "Comparador restablecido",
    comparison_max_reached_toast: "Puedes comparar hasta un máximo de 3 productos.",
    comparison_added_toast: "Producto añadido al comparador",
    comparison_removed_toast: "Producto eliminado del comparador",
    technical_info: "Información Técnica",
    specifications_guide: "Ficha sintética de la base de datos oficial.",
    category: "Categoría",
    base_price: "Precio Base",
    sizes: "Tallas",
    score: "Puntuación",
    returns_30_days: "Cambios/Devoluciones en 30 días",
    shipping_guarantee: "Envío gratis desde 50€",
    official_gear_guarantee: "Selección oficial APEX",
    compare_product_tooltip: "Comparar este producto",
    products_label: "Productos",
    reviews_label: "opiniones",
    comparison_reminder_tip: "Sugerencia: Para iniciar el análisis comparativo, seleccione un segundo producto de la fila de sugerencias o del cuadro de búsqueda.",
    comparison_select_slot: "Seleccionar un producto (Posición n°{slot})",
    comparison_select_slot_sub: "Seleccione un modelo de la misma categoría de análisis.",
    comparison_search_in_category: "Buscar en la categoría: {category}...",
    comparison_search_all: "Buscar modelo por marca, componente o categoría...",
    comparison_smart_filter: "Filtro inteligente: Solo se muestran los artículos de \"{category}\" para una comparación realista.",
    comparison_no_models_sub: "Modifique su palabra clave o borre la búsqueda para ver todos los resultados disponibles.",
    comparison_incoherent_toast: "Incoherente: Solo se pueden comparar productos de la misma categoría (ej: {category}).",

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
    close: "Cerrar",
    home: "Inicio",
    back_to_products: "Volver a productos",
    fast_shipping: "Envío rápido",
    alternative_suggestions: "Sugerencias alternativas",
    alternative_suggestions_desc: "Equipos del catálogo oficial en la misma categoría.",
    technical_informations_database: "Información Técnica",
    technical_informations_database_desc: "Ficha de datos oficiales del catálogo.",
    select_size_alert: "Por favor, seleccione una talla antes de añadir el artículo al carrito."
  },
  de: {
    reset: "Zurücksetzen",
    filters: "Filter",
    apply: "Anwenden",
    compare: "Vergleichen",
    compared: "Verglichen",
    join_elite_apex: "Tritt der sportlichen Elite des APEX-Teams bei",
    field_name_label: "Vorname / Nachname",
    field_email_label: "E-Mail-Adresse",
    field_password_label: "Passwort",
    field_newsletter_label: "Abonnieren Sie wöchentliche technische Spezifikationen",
    btn_submit_account: "Bestätigen & Mein Konto erstellen",
    account_success_toast: "Willkommen bei APEX! Ihr Mitgliederbereich wurde erstellt.",
    comparison_title: "APEX Experten-Vergleich",
    comparison_desc: "Treffen Sie fundierte Entscheidungen. Vergleichen Sie bis zu 3 Artikel derselben Kategorie nebeneinander, um Preise, Kundenbewertungen und Verfügbarkeiten sofort zu analysieren.",
    comparison_clean_all: "Alles leeren",
    comparison_remove_all: "Alle Produkte entfernen",
    comparison_remove_item: "Dieses Produkt entfernen",
    comparison_view_details: "Vollständige Produktdetails anzeigen",
    comparison_public_price: "Listenpreis",
    comparison_best_price: "Bestpreis",
    comparison_rider_reviews: "Fahrerbewertungen",
    comparison_top_rated: "Am besten bewertet",
    comparison_sizes_available: "Verfügbare Größen",
    comparison_choose_size: "Größe wählen",
    comparison_add_product: "Produkt hinzufügen",
    comparison_click_to_select: "Klicken Sie hier, um ein Modell auszuwählen",
    comparison_click_to_select_catalog: "Klicken Sie hier, um den Analysekatalog zu öffnen",
    comparison_spec: "Spezifikation",
    comparison_quick_action: "Schnellbestellung",
    comparison_back_to_grid: "Zurück zur Übersicht",
    comparison_no_models: "Keine Modelle gefunden",
    comparison_cleared_toast: "Vergleich zurückgesetzt",
    comparison_max_reached_toast: "Sie können maximal 3 Produkte vergleichen.",
    comparison_added_toast: "Produkt zum Vergleich hinzugefügt",
    comparison_removed_toast: "Produkt aus dem Vergleich entfernt",
    technical_info: "Technische Informationen",
    specifications_guide: "Technisches Datenblatt aus der offiziellen Datenbank.",
    category: "Kategorie",
    base_price: "Basispreis",
    sizes: "Größen",
    score: "Bewertung",
    returns_30_days: "30 Tage Rückgaberecht",
    shipping_guarantee: "Gratisversand ab 50€",
    official_gear_guarantee: "Offizielles APEX-Sortiment",
    compare_product_tooltip: "Dieses Produkt vergleichen",
    products_label: "Produkte",
    reviews_label: "Bewertungen",
    comparison_reminder_tip: "Tipp: Um den Vergleich nebeneinander zu starten, wählen Sie ein zweites Produkt aus der Vorschlagsliste oder dem Suchfeld aus!",
    comparison_select_slot: "Produkt auswählen (Platz Nr. {slot})",
    comparison_select_slot_sub: "Wählen Sie ein Modell aus derselben Kategorie für die Analyse.",
    comparison_search_in_category: "In Kategorie suchen: {category}...",
    comparison_search_all: "Modell nach Marke, Komponente oder Kategorie suchen...",
    comparison_smart_filter: "Smarter Filter: Nur Artikel aus der Kategorie „{category}“ werden für einen realistischen Vergleich angezeigt.",
    comparison_no_models_sub: "Ändern Sie Ihr Suchwort oder löschen Sie die Suche, um alle verfügbaren Ergebnisse zu sehen.",
    comparison_incoherent_toast: "Inkonsistent: Sie können nur Artikel aus derselben Kategorie vergleichen (z. B. {category}).",

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
    close: "Schließen",
    home: "Startseite",
    back_to_products: "Zurück zu Produkten",
    fast_shipping: "Schneller Versand",
    alternative_suggestions: "Alternative Vorschläge",
    alternative_suggestions_desc: "Offizieles Sortiment aus derselben Kategorie.",
    technical_informations_database: "Technische Informationen",
    technical_informations_database_desc: "Synthetisches Blatt aus der offiziellen Datenbank.",
    select_size_alert: "Bitte wählen Sie eine Größe, bevor Sie das Produkt in den Warenkorb legen."
  },
  it: {
    reset: "Reimposta",
    filters: "Filtri",
    apply: "Applica",
    compare: "Confronta",
    compared: "Confrontato",
    join_elite_apex: "Unisciti all'élite sportiva del team APEX",
    field_name_label: "Nome / Cognome",
    field_email_label: "Indirizzo Email",
    field_password_label: "Password",
    field_newsletter_label: "Iscriviti alle specifiche tecniche settimanali",
    btn_submit_account: "Conferma e Crea il mio spazio",
    account_success_toast: "Benvenuto in APEX! Il tuo spazio membro è stato creato.",
    comparison_title: "Confronto Esperti APEX",
    comparison_desc: "Prendi decisioni informate. Confronta fino a 3 articoli della stessa categoria per valutare istantaneamente prezzi, recensioni e disponibilità.",
    comparison_clean_all: "Svuota tutto",
    comparison_remove_all: "Rimuovi tutti i prodotti",
    comparison_remove_item: "Rimuovi questo articolo",
    comparison_view_details: "Visualizza scheda prodotto completa",
    comparison_public_price: "Prezzo pubblico",
    comparison_best_price: "Miglior Prezzo",
    comparison_rider_reviews: "Recensioni dei ciclisti",
    comparison_top_rated: "Più votato",
    comparison_sizes_available: "Taglie disponibili",
    comparison_choose_size: "Scegli la taglia",
    comparison_add_product: "Aggiungi prodotto",
    comparison_click_to_select: "Clicca qui per scegliere un modello",
    comparison_click_to_select_catalog: "Clicca qui per aprire il catalogo",
    comparison_spec: "Specifiche",
    comparison_quick_action: "Azione rapida",
    comparison_back_to_grid: "Torna alla tabella",
    comparison_no_models: "Nessun modello trovato",
    comparison_cleared_toast: "Confronto azzerato",
    comparison_max_reached_toast: "Puoi confrontare al massimo 3 prodotti.",
    comparison_added_toast: "Prodotto aggiunto al confronto",
    comparison_removed_toast: "Prodotto rimosso dal confronto",
    technical_info: "Informazioni Tecniche",
    specifications_guide: "Scheda di sintesi dal database ufficiale del catalogo.",
    category: "Categoria",
    base_price: "Prezzo Base",
    sizes: "Taglie",
    score: "Punteggio",
    returns_30_days: "Resi entro 30 giorni",
    shipping_guarantee: "Spedizione gratis da 50€",
    official_gear_guarantee: "Selezione ufficiale APEX",
    compare_product_tooltip: "Confronta questo prodotto",
    products_label: "Prodotti",
    reviews_label: "recensioni",
    comparison_reminder_tip: "Suggerimento: Per avviare l'analisi comparativa, seleziona un secondo prodotto dalla riga dei suggerimenti o dalla casella di ricerca!",
    comparison_select_slot: "Seleziona un prodotto (Slot n°{slot})",
    comparison_select_slot_sub: "Seleziona un modello della stessa categoria per l'analisi.",
    comparison_search_in_category: "Cerca nella categoria: {category}...",
    comparison_search_all: "Cerca modello per marca, componente o categoria...",
    comparison_smart_filter: "Filtro intelligente: Vengono mostrati solo gli articoli \"{category}\" per un confronto realistico.",
    comparison_no_models_sub: "Modifica la parola chiave o cancella la ricerca per vedere tutti i risultati disponibili.",
    comparison_incoherent_toast: "Incoerente: Puoi confrontare solo prodotti della stessa categoria (es: {category}).",

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
    close: "Chiudi",
    home: "Home",
    back_to_products: "Torna ai prodotti",
    fast_shipping: "Spedizione rapida",
    alternative_suggestions: "Suggerimenti alternativi",
    alternative_suggestions_desc: "Articoli dello stesso genere nel catalogo ufficiale.",
    technical_informations_database: "Informazioni Tecniche",
    technical_informations_database_desc: "Fornito direttamente dal database ufficiale.",
    select_size_alert: "Seleziona una taglia prima di inserire l'articolo nel carrello."
  },
  ja: {
    reset: "リセット",
    filters: "フィルター",
    apply: "適用",
    compare: "比較する",
    compared: "比較中",
    join_elite_apex: "APEXチームのアスリート向けエリートに加わる",
    field_name_label: "お名前",
    field_email_label: "メールアドレス",
    field_password_label: "パスワード",
    field_newsletter_label: "週刊技術スペックマガジンを購読する",
    btn_submit_account: "確認してアカウントを作成",
    account_success_toast: "APEXへようこそ！メンバー専用スペースが作成されました。",
    comparison_title: "APEX プロ仕様比較",
    comparison_desc: "的確な選択を。同じカテゴリーの製品を最大3つ並べて比較し、価格、レビュー、サイズを瞬時に評価できます。",
    comparison_clean_all: "すべてクリア",
    comparison_remove_all: "すべての製品を削除",
    comparison_remove_item: "この製品を削除",
    comparison_view_details: "製品仕様の詳細を見る",
    comparison_public_price: "一般販売価格",
    comparison_best_price: "ベスト価格",
    comparison_rider_reviews: "ライダーによる評価",
    comparison_top_rated: "最高評価",
    comparison_sizes_available: "選択可能なサイズ",
    comparison_choose_size: "サイズを選択",
    comparison_add_product: "製品を追加",
    comparison_click_to_select: "ここをクリックしてモデルを選択",
    comparison_click_to_select_catalog: "ここをクリックして分析カタログを開く",
    comparison_spec: "技術仕様",
    comparison_quick_action: "スピード注文",
    comparison_back_to_grid: "グリッド表示に戻る",
    comparison_no_models: "モデルが見つかりません",
    comparison_cleared_toast: "比較リストをクリアしました",
    comparison_max_reached_toast: "比較できる製品は最大3点までです。",
    comparison_added_toast: "製品を比較リストに追加しました",
    comparison_removed_toast: "製品を比較リストから削除しました",
    technical_info: "製品・仕様スペック",
    specifications_guide: "公式データベースの仕様ガイド。",
    category: "カテゴリー",
    base_price: "基本価格",
    sizes: "サイズ",
    score: "スコア",
    returns_30_days: "30日間返品保証",
    shipping_guarantee: "50€以上のご購入で送料無料",
    official_gear_guarantee: "APEX 公式コレクション",
    compare_product_tooltip: "この製品を比較する",
    products_label: "製品",
    reviews_label: "件のレビュー",
    comparison_reminder_tip: "ヒント：並べて比較するには、おすすめエリアまたは検索ボックスから同じカテゴリーの2つ目の製品を追加してください！",
    comparison_select_slot: "製品を選択 (スロット #{slot})",
    comparison_select_slot_sub: "スペック分析を行うために同じカテゴリーのモデルを選択してください。",
    comparison_search_in_category: "カテゴリー {category} 内を検索...",
    comparison_search_all: "モデル、ブランド、カテゴリー、テクノロジーで検索...",
    comparison_smart_filter: "スマートフィルター：仕様の整合性を確保するため、カテゴリーが「{category}」の製品のみ表示されています。",
    comparison_no_models_sub: "キーワードを変更するか、検索条件をクリアしてすべての製品を表示してください。",
    comparison_incoherent_toast: "カテゴリ不一致：同一のカテゴリ（例: {category}）の製品同士しか比較できません。",

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
    close: "閉じる",
    home: "ホーム",
    back_to_products: "商品一覧に戻る",
    fast_shipping: "迅速な配送",
    alternative_suggestions: "別のご提案",
    alternative_suggestions_desc: "同じカテゴリからのおすすめの製品です。",
    technical_informations_database: "技術情報",
    technical_informations_database_desc: "公式データベースによる製品スペック仕様一覧。",
    select_size_alert: "カートに入れる前にお好みのサイズを選択してください。"
  },
  pt: {
    reset: "Redefinir",
    filters: "Filtros",
    apply: "Aplicar",
    compare: "Comparar",
    compared: "Comparado",
    join_elite_apex: "Junte-se à elite desportiva da equipa APEX",
    field_name_label: "Nome / Sobrenome",
    field_email_label: "Endereço de E-mail",
    field_password_label: "Palavra-passe",
    field_newsletter_label: "Subscrever as especificações técnicas semanais",
    btn_submit_account: "Validar e Criar espaço",
    account_success_toast: "Bem-vindo à APEX! O seu espaço de membro foi criado.",
    comparison_title: "Comparador Expert APEX",
    comparison_desc: "Tome decisões informadas. Compare lado a lado até 3 artigos da mesma categoria para analisar tarifas, avaliações e disponibilidade instantaneamente.",
    comparison_clean_all: "Limpar tudo",
    comparison_remove_all: "Remover todos os produtos",
    comparison_remove_item: "Remover este item",
    comparison_view_details: "Ver ficha de produto completa",
    comparison_public_price: "Preço público",
    comparison_best_price: "Melhor Preço",
    comparison_rider_reviews: "Avaliações dos ciclistas",
    comparison_top_rated: "Mais votado",
    comparison_sizes_available: "Tamanhos disponíveis",
    comparison_choose_size: "Escolher tamanho",
    comparison_add_product: "Adicionar produto",
    comparison_click_to_select: "Clique aqui para escolher um modelo",
    comparison_click_to_select_catalog: "Clique aqui para abrir o catálogo de análise",
    comparison_spec: "Especificação",
    comparison_quick_action: "Ação rápida",
    comparison_back_to_grid: "Voltar à tabela",
    comparison_no_models: "Nenhum modelo encontrado",
    comparison_cleared_toast: "Comparador redefinido",
    comparison_max_reached_toast: "Pode comparar até ao máximo de 3 produtos.",
    comparison_added_toast: "Produto adicionado ao comparador",
    comparison_removed_toast: "Produto removido do comparador",
    technical_info: "Informações Técnicas",
    specifications_guide: "Ficha sintética da base de dados oficial de catálogo.",
    category: "Categoria",
    base_price: "Preço Base",
    sizes: "Tamanhos",
    score: "Avaliação",
    returns_30_days: "Devoluções em 30 dias",
    shipping_guarantee: "Envio grátis a partir de 50€",
    official_gear_guarantee: "Seleção oficial APEX",
    compare_product_tooltip: "Comparar este produto",
    products_label: "Produtos",
    reviews_label: "avaliações",
    comparison_reminder_tip: "Dica: Para iniciar a análise comparativa lado a lado, selecione um segundo produto a partir da linha sugerida ou caixa de pesquisa!",
    comparison_select_slot: "Selecionar um produto (Espaço n°{slot})",
    comparison_select_slot_sub: "Selecione um modelo da mesma categoria para análise.",
    comparison_search_in_category: "Pesquisar na categoria: {category}...",
    comparison_search_all: "Pesquisar modelo por marca, componente ou categoria...",
    comparison_smart_filter: "Filtro inteligente: Apenas artigos de \"{category}\" são apresentados para uma comparação realista.",
    comparison_no_models_sub: "Modifique a sua palavra-chave ou limpe a pesquisa para ver todos os resultados disponíveis.",
    comparison_incoherent_toast: "Incoerente: Apenas pode comparar artigos da mesma categoria (ex: {category}).",

    create_account: "Criar uma conta",
    cart: "Carrinho",
    search_placeholder: "Procurar um produto...",
    free_shipping: "ENVIO GRATUITO A PARTIR DE 50€",
    nav_velo: "Ciclismo",
    nav_randonnee: "Caminhada",
    nav_fitness: "Fitness",
    nav_running: "Corrida",
    nav_nutrition: "Nutrição",
    nav_accessoires: "Acessórios",
    hero_tag: "SÉRIE 900 • PERFORMANCE",
    hero_title: "SUPERE OS SEUS LIMITES COM A APEX.",
    hero_desc: "Descubra a nossa nova coleção de ciclismo de estrada de alta performance. Concebida para velocidade, testada para resistência.",
    view_collection: "VER COLECÇÃO",
    learn_more: "SABER MAIS",
    categories_title: "CATEGORIAS",
    discover: "DESCOBRIR",
    featured_title: "PRODUTOS EM DESTAQUE",
    featured_desc: "Equipamento mais aclamado pelos nossos atletas.",
    view_all: "VER TUDO",
    tag_bike: "Equipamento de Ciclismo",
    tag_tech: "Acessórios de Tecnologia",
    in_stock: "Em stock",
    low_stock: "Stock baixo",
    brand_title: "ENGENHARIA AO SERVIÇO DA PERFORMANCE.",
    brand_desc: "Cada produto Apex é testado por profissionais nas condições mais extremas para garantir uma fiabilidade total.",
    stat_engineers: "ENGENHEIROS",
    stat_satisfaction: "SATISFAÇÃO",
    footer_about: "Experiência técnica para atletas exigentes. Gear Engineered for Winners.",
    customer_service: "Apoio ao Cliente",
    company: "Empresa",
    footer_cs: "Apoio ao Cliente",
    footer_shipping: "Informação de Envio",
    footer_returns: "Devoluções",
    footer_stores: "Encontrar uma loja",
    footer_contact: "Contacte-nos",
    footer_privacy: "Política de Privacidade",
    newsletter_desc: "Receba as nossas especificações técnicas mais recentes.",
    newsletter_placeholder: "O seu e-mail",
    rights: "Todos os direitos reservados.",
    all_products: "Todos os produtos",
    sort_by: "Ordenar por",
    sort_relevance: "Relevância",
    sort_price_asc: "Preço: mais baixo primeiro",
    sort_price_desc: "Preço: mais alto primeiro",
    sort_rating: "Melhores avaliações",
    size_label: "Tamanho",
    add_to_cart: "Adicionar ao carrinho",
    no_products: "Nenhum produto encontrado para a sua pesquisa.",
    no_category_products_title: "Chegando em breve!",
    no_category_products_desc: "Estamos a preparar a nossa nova seleção profissional de artigos desportivos para a gama",
    no_category_products_button: "Voltar aos destaques",
    cart_title: "O seu Carrinho",
    cart_empty: "O seu carrinho está vazio",
    cart_total: "Total",
    cart_checkout: "Finalizar compra",
    continue_shopping: "Continuar a comprar",
    checkout_success_title: "Encomenda Confirmada!",
    checkout_success_desc: "Foi enviado um e-mail com o resumo da encomenda e detalhes de envio. Obrigado por confiar na APEX SPORTS!",
    checkout_success_btn: "Fechar",
    item_removed: "Produto removido do carrinho",
    item_added: "Produto adicionado ao carrinho",
    quantity: "Quantidade",
    order_summary: "Resumo da Encomenda",
    subtotal: "Subtotal",
    shipping_cost: "Processamento",
    free: "Grátis",
    shipping_note: "Portes gratuitos para encomendas superiores a 50 €!",
    newsletter_success: "Obrigado! A sua inscrição na newsletter técnica da APEX SPORTS foi registada.",
    about_us_title: "Sobre a APEX",
    quick_view: "Visualização rápida",
    select_size: "Por favor, selecione um tamanho",
    close: "Fechar",
    home: "Inicio",
    back_to_products: "Voltar para produtos",
    fast_shipping: "Envio rápido",
    alternative_suggestions: "Sugestões alternativas",
    alternative_suggestions_desc: "Artigos oficiais da mesma categoria no catálogo.",
    technical_informations_database: "Informações Técnicas",
    technical_informations_database_desc: "Ficha oficial de especificações técnicas do produto.",
    select_size_alert: "Por favor escolha um tamanho antes de adicionar ao carrinho."
  },
  nl: {
    reset: "Resetten",
    filters: "Filters",
    apply: "Toepassen",
    compare: "Vergelijken",
    compared: "Vergeleken",
    join_elite_apex: "Sluit je aan bij de sportieve elite van Team APEX",
    field_name_label: "Voornaam / Achternaam",
    field_email_label: "E-mailadres",
    field_password_label: "Wachtwoord",
    field_newsletter_label: "Abonneer op wekelijkse technische specificaties",
    btn_submit_account: "Bevestigen & Account maken",
    account_success_toast: "Welkom bij APEX! Je ledenaccount is aangemaakt.",
    comparison_title: "APEX Experts vergelijker",
    comparison_desc: "Maak weloverwogen keuzes. Vergelijk tot 3 artikelen uit dezelfde categorie naast elkaar om direct prijzen, reviews en beschikbaarheid te evalueren.",
    comparison_clean_all: "Alles wissen",
    comparison_remove_all: "Alle producten wissen",
    comparison_remove_item: "Dit product verwijderen",
    comparison_view_details: "Bekijk volledige productfiche",
    comparison_public_price: "Publieke prijs",
    comparison_best_price: "Beste Prijs",
    comparison_rider_reviews: "Ervaringen van fietsers",
    comparison_top_rated: "Best beoordeeld",
    comparison_sizes_available: "Beschikbare maten",
    comparison_choose_size: "Kies maat",
    comparison_add_product: "Product toevoegen",
    comparison_click_to_select: "Klik hier om een model te kiezen",
    comparison_click_to_select_catalog: "Klik hier om de analysecatalogus te openen",
    comparison_spec: "Specificatie",
    comparison_quick_action: "Snelle actie",
    comparison_back_to_grid: "Terug naar overzicht",
    comparison_no_models: "Geen modellen gevonden",
    comparison_cleared_toast: "Vergelijker gereset",
    comparison_max_reached_toast: "Je kunt maximaal 3 producten vergelijken.",
    comparison_added_toast: "Product toegevoegd aan vergelijker",
    comparison_removed_toast: "Product verwijderd uit vergelijker",
    technical_info: "Technische specificaties",
    specifications_guide: "Samenvatting uit de officiële productendatabase.",
    category: "Categorie",
    base_price: "Basisprijs",
    sizes: "Maten",
    score: "Score",
    returns_30_days: "30 dagen bedenktijd",
    shipping_guarantee: "Gratis verzending vanaf 50€",
    official_gear_guarantee: "Officiële APEX Selectie",
    compare_product_tooltip: "Vergelijk dit product",
    products_label: "Producten",
    reviews_label: "beoordelingen",
    comparison_reminder_tip: "Tip: Om de vergelijking te starten, kies je een tweede product uit de voorgestelde rij of het zoekvenster!",
    comparison_select_slot: "Product selecteren (Invoer #{slot})",
    comparison_select_slot_sub: "Kies een model uit dezelfde categorie ter vergelijking.",
    comparison_search_in_category: "Zoeken binnen categorie: {category}...",
    comparison_search_all: "Zoek model op merk, component of categorie...",
    comparison_smart_filter: "Slimme filter: Alleen artikelen uit de categorie \"{category}\" worden getoond voor een getrouwe vergelijking.",
    comparison_no_models_sub: "Wijzig je zoekterm of wis de zoekactie om alle beschikbare resultaten te zien.",
    comparison_incoherent_toast: "Inconsistent: Je kunt alleen producten uit dezelfde categorie vergelijken (bijv. {category}).",

    create_account: "Account aanmaken",
    cart: "Winkelwagen",
    search_placeholder: "Zoeken naar een product...",
    free_shipping: "GRATIS VERZENDING VANAF 50€",
    nav_velo: "Wielersport",
    nav_randonnee: "Wandelen",
    nav_fitness: "Fitness",
    nav_running: "Hardlopen",
    nav_nutrition: "Voeding",
    nav_accessoires: "Accessoires",
    hero_tag: "900 SERIE • PRESTATIE",
    hero_title: "VERLEG JE GRENZEN MET APEX.",
    hero_desc: "Ontdek onze nieuwe high-performance wielrencollectie. Gemaakt voor snelheid, getest op uithoudingsvermogen.",
    view_collection: "BEKIJK COLLECTIE",
    learn_more: "MEER INFORMATIE",
    categories_title: "CATEGORIEËN",
    discover: "ONTDEKKEN",
    featured_title: "UITGELICHTE PRODUCTEN",
    featured_desc: "Uitrusting die het meest wordt geprezen door onze atleten.",
    view_all: "ALLE WEERGEVEN",
    tag_bike: "Fietsuitrusting",
    tag_tech: "Tech Accessoires",
    in_stock: "Op voorraad",
    low_stock: "Beperkte voorraad",
    brand_title: "TECHNOLOGIE IN DIENST VAN PRESTATIES.",
    brand_desc: "Elk Apex-product is door professionals getest in de meest extreme omstandigheden om absolute betrouwbaarheid te garanderen.",
    stat_engineers: "INGENIEURS",
    stat_satisfaction: "TEVREDENHEID",
    footer_about: "Technische expertise voor veeleisende atleten. Gear Engineered for Winners.",
    customer_service: "Klantenservice",
    company: "Bedrijf",
    footer_cs: "Klantenservice",
    footer_shipping: "Verzendinformatie",
    footer_returns: "Retourneren",
    footer_stores: "Winkelzoeker",
    footer_contact: "Contact",
    footer_privacy: "Privacybeleid",
    newsletter_desc: "Ontvang onze nieuwste technische specificaties.",
    newsletter_placeholder: "Uw e-mailadres",
    rights: "Alle rechten voorbehouden.",
    all_products: "Alle producten",
    sort_by: "Sorteren op",
    sort_relevance: "Relevantie",
    sort_price_asc: "Prijs: laag naar hoog",
    sort_price_desc: "Prijs: hoog naar laag",
    sort_rating: "Beste beoordelingen",
    size_label: "Maat",
    add_to_cart: "In winkelwagen",
    no_products: "Geen producten gevonden die voldoen aan uw zoekopdracht.",
    no_category_products_title: "Binnenkort beschikbaar!",
    no_category_products_desc: "We bereiden momenteel onze nieuwe professionele sportcollectie voor voor het assortiment",
    no_category_products_button: "Terug naar uitgelichte producten",
    cart_title: "Uw Winkelwagen",
    cart_empty: "Uw winkelwagen is leeg",
    cart_total: "Totaal",
    cart_checkout: "Afrekenen",
    continue_shopping: "Verder winkelen",
    checkout_success_title: "Bestelling bevestigd!",
    checkout_success_desc: "Een bevestigingsmail met uw bestelgegevens en verzendinformatie is verzonden naar uw adres. Bedankt voor uw vertrouwen in APEX SPORTS!",
    checkout_success_btn: "Sluiten",
    item_removed: "Product verwijderd uit winkelwagen",
    item_added: "Product toegevoegd aan winkelwagen",
    quantity: "Aantal",
    order_summary: "Besteloverzicht",
    subtotal: "Subtotaal",
    shipping_cost: "Verzending",
    free: "Gratis",
    shipping_note: "Gratis verzending voor bestellingen vanaf 50 €!",
    newsletter_success: "Bedankt! Uw aanmelding voor de technische nieuwsbrief van APEX SPORTS is geregistreerd.",
    about_us_title: "Over APEX",
    quick_view: "Snel bekijken",
    select_size: "Selecteer een maat",
    close: "Sluiten",
    home: "Startpagina",
    back_to_products: "Terug naar producten",
    fast_shipping: "Snelle verzending",
    alternative_suggestions: "Alternatieve suggesties",
    alternative_suggestions_desc: "Officiële producten uit dezelfde categorie.",
    technical_informations_database: "Technische informatie",
    technical_informations_database_desc: "Synthetisch specificatieblad uit de database.",
    select_size_alert: "Kies een maat voordat u het artikel in uw winkelwagen plaatst."
  },
  sv: {
    reset: "Återställ",
    filters: "Filter",
    apply: "Använd",
    compare: "Jämför",
    compared: "Jämförd",
    join_elite_apex: "Gå med i den idrottsliga eliten i APEX-teamet",
    field_name_label: "För- och efternamn",
    field_email_label: "E-postadress",
    field_password_label: "Lösenord",
    field_newsletter_label: "Prenumerera på veckovisa tekniska specifikationer",
    btn_submit_account: "Godkänn & Skapa mitt konto",
    account_success_toast: "Välkommen till APEX! Ditt medlemskonto har skapats.",
    comparison_title: "APEX Expertjämförelse",
    comparison_desc: "Gör välgrundade val. Jämför upp till 3 artiklar sida vid sida för att omedelbart utvärdera priser, omdömen och storlekar.",
    comparison_clean_all: "Rensa allt",
    comparison_remove_all: "Ta bort alla produkter",
    comparison_remove_item: "Ta bort den här artikeln",
    comparison_view_details: "Visa fullständig produktinformation",
    comparison_public_price: "Ordinarie pris",
    comparison_best_price: "Bästa pris",
    comparison_rider_reviews: "Cyklistomdömen",
    comparison_top_rated: "Högst betyg",
    comparison_sizes_available: "Tillgängliga storlekar",
    comparison_choose_size: "Välj storlek",
    comparison_add_product: "Lägg till produkt",
    comparison_click_to_select: "Klicka här för att välja en produkt",
    comparison_click_to_select_catalog: "Klicka här för att öppna analyskatalogen",
    comparison_spec: "Specifikation",
    comparison_quick_action: "Snabbköp",
    comparison_back_to_grid: "Tillbaka till tabell",
    comparison_no_models: "Inga modeller hittades",
    comparison_cleared_toast: "Jämförelse rensad",
    comparison_max_reached_toast: "Du kan jämföra maximalt 3 produkter.",
    comparison_added_toast: "Produkt tillagd i jämförelsen",
    comparison_removed_toast: "Produkt borttagen från jämförelsen",
    technical_info: "Teknisk information",
    specifications_guide: "Sammanställning från den officiella databasen.",
    category: "Kategori",
    base_price: "Baspris",
    sizes: "Storlekar",
    score: "Betyg",
    returns_30_days: "30 dagars öppet köp",
    shipping_guarantee: "Fri frakt över 50€",
    official_gear_guarantee: "Officiell APEX-utrustning",
    compare_product_tooltip: "Jämför denna produkt",
    products_label: "Produkter",
    reviews_label: "recensioner",
    comparison_reminder_tip: "Tips: För att starta en jämförelse sida vid sida, välj en andra produkt från förslagsraden eller sökfältet!",
    comparison_select_slot: "Välj produkt (Plats #{slot})",
    comparison_select_slot_sub: "Välj en produkt från samma kategori för analys.",
    comparison_search_in_category: "Sök inom kategorin: {category}...",
    comparison_search_all: "Sök produkt efter märke, komponent eller kategori...",
    comparison_smart_filter: "Smart filter: Endast produkter från kategorin ”{category}” visas för en realistisk jämförelse.",
    comparison_no_models_sub: "Ändra sökordet eller rensa sökningen för att visa alla tillgängliga produkter.",
    comparison_incoherent_toast: "Inkonsekvent: Du kan bara jämföra produkter från samma kategori (t.ex. {category}).",

    create_account: "Skapa konto",
    cart: "Varukorg",
    search_placeholder: "Sök produkt...",
    free_shipping: "FRI FRAKT FRÅN 50€",
    nav_velo: "Cykling",
    nav_randonnee: "Vandring",
    nav_fitness: "Fitness",
    nav_running: "Löpning",
    nav_nutrition: "Kosttillskott",
    nav_accessoires: "Tillbehör",
    hero_tag: "900-SERIEN • PRESTANDA",
    hero_title: "ÖVERTRÄFFA DINA GRÄNSER MED APEX.",
    hero_desc: "Upptäck vår nya kollektion för landsvägscykling med hög prestanda. Byggd för snabbhet, testad för uthållighet.",
    view_collection: "VISA KOLLEKTIONEN",
    learn_more: "LÄS MER",
    categories_title: "KATEGORIER",
    discover: "UPPTÄCK",
    featured_title: "UTVALDA PRODUKTER",
    featured_desc: "Utrustning som rekommenderas mest av våra idrottare.",
    view_all: "VISA ALLA",
    tag_bike: "Cykelutrustning",
    tag_tech: "Teknologitillbehör",
    in_stock: "I lager",
    low_stock: "Få i lager",
    brand_title: "INGENJÖRSKONST FÖR PRESTANDA.",
    brand_desc: "Varje Apex-produkt testas av proffs under de mest extrema förhållanden för att garantera absolut pålitlighet.",
    stat_engineers: "INGENJÖRER",
    stat_satisfaction: "NÖJDA KUNDER",
    footer_about: "Teknisk expertis för krävande idrottare. Gear Engineered for Winners.",
    customer_service: "Kundtjänst",
    company: "Företag",
    footer_cs: "Kundservice",
    footer_shipping: "Fraktinformation",
    footer_returns: "Returer",
    footer_stores: "Hitta butik",
    footer_contact: "Kontakta oss",
    footer_privacy: "Integritetspolicy",
    newsletter_desc: "Få våra senaste tekniska specifikationer.",
    newsletter_placeholder: "Din e-postadress",
    rights: "Alla rättigheter förbehållna.",
    all_products: "Alla produkter",
    sort_by: "Sortera efter",
    sort_relevance: "Relevans",
    sort_price_asc: "Pris: Lågt till högt",
    sort_price_desc: "Pris: Högt till lågt",
    sort_rating: "Bästa betyg",
    size_label: "Storlek",
    add_to_cart: "Köp nu",
    no_products: "Hittade inga produkter som matchar din sökning.",
    no_category_products_title: "Kommer snart!",
    no_category_products_desc: "Vi förbereder just nu vårt nya sortiment av högpresterande träningskläder och utrustning för linjen",
    no_category_products_button: "Tillbaka till utvalda produkter",
    cart_title: "Din Varukorg",
    cart_empty: "Din varukorg är tom",
    cart_total: "Totalt",
    cart_checkout: "Gå till kassan",
    continue_shopping: "Fortsätt handla",
    checkout_success_title: "Beställning bekräftad!",
    checkout_success_desc: "Ett bekräftelsemejl med dina beställningsuppgifter och leveransinfo har skickats till din adress. Tack för att du väljer APEX SPORTS!",
    checkout_success_btn: "Stäng",
    item_removed: "Produkt borttagen från varukorgen",
    item_added: "Produkt tillagd i varukorgen",
    quantity: "Antal",
    order_summary: "Beställningssammanfattning",
    subtotal: "Delsumma",
    shipping_cost: "Frakt",
    free: "Gratis",
    shipping_note: "Fri frakt på beställningar över 50 €!",
    newsletter_success: "Tack! Din prenumeration på APEX SPORTS tekniska nyhetsbrev har registrerats.",
    about_us_title: "Om APEX",
    quick_view: "Snabbvisning",
    select_size: "Välj storlek",
    close: "Stäng",
    home: "Hem",
    back_to_products: "Tillbaka till produkter",
    fast_shipping: "Snabb leverans",
    alternative_suggestions: "Alternativa förslag",
    alternative_suggestions_desc: "Officiella artiklar från samma kategori i katalogen.",
    technical_informations_database: "Teknisk information",
    technical_informations_database_desc: "Officiell specifikation från databaskatalogen.",
    select_size_alert: "Vänligen välj en storlek innan du lägger till produkten i varukorgen."
  },
  pl: {
    reset: "Resetuj",
    filters: "Filtry",
    apply: "Zastosuj",
    compare: "Porównaj",
    compared: "Porównano",
    join_elite_apex: "Dołącz do sportowej elity zespołu APEX",
    field_name_label: "Imię / Nazwisko",
    field_email_label: "Adres E-mail",
    field_password_label: "Hasło",
    field_newsletter_label: "Zapisz się na cotygodniowe specyfikacje techniczne",
    btn_submit_account: "Zatwierdź i Utwórz konto",
    account_success_toast: "Witaj w APEX! Twoje konto członkowskie zostało utworzone.",
    comparison_title: "Komparator Specjalistyczny APEX",
    comparison_desc: "Podejmuj świadome decyzje. Porównaj bezpośrednio do 3 artykułów z tej samej kategorii, aby natychmiast przeanalizować ceny, opinie i dostępność.",
    comparison_clean_all: "Wyczyść wszystko",
    comparison_remove_all: "Usuń wszystkie produkty",
    comparison_remove_item: "Usuń ten produkt",
    comparison_view_details: "Zobacz pełną kartę produktu",
    comparison_public_price: "Cena sugerowana",
    comparison_best_price: "Najlepsza Cena",
    comparison_rider_reviews: "Opinie rowerzystów",
    comparison_top_rated: "Najwyżej oceniany",
    comparison_sizes_available: "Dostępne rozmiary",
    comparison_choose_size: "Wybierz rozmiar",
    comparison_add_product: "Dodaj produkt",
    comparison_click_to_select: "Kliknij tutaj, aby wybrać model",
    comparison_click_to_select_catalog: "Kliknij tutaj, aby otworzyć katalog",
    comparison_spec: "Specyfikacja",
    comparison_quick_action: "Szybki zakup",
    comparison_back_to_grid: "Powrót do tabeli",
    comparison_no_models: "Nie znaleziono modeli",
    comparison_cleared_toast: "Zresetowano komparator",
    comparison_max_reached_toast: "Możesz porównać maksymalnie 3 produkty.",
    comparison_added_toast: "Produkt dodany do komparatora",
    comparison_removed_toast: "Produkt usunięty z komparatora",
    technical_info: "Informacje Techniczne",
    specifications_guide: "Karta katalogowa z oficjalnej bazy danych.",
    category: "Kategoria",
    base_price: "Cena Podstawowa",
    sizes: "Rozmiary",
    score: "Ocena",
    returns_30_days: "Zwroty do 30 dni",
    shipping_guarantee: "Darmowa dostawa od 50€",
    official_gear_guarantee: "Oficjalny wybór APEX",
    compare_product_tooltip: "Porównaj ten produkt",
    products_label: "Produkty",
    reviews_label: "opinii",
    comparison_reminder_tip: "Wskazówka: Aby rozpocząć porównanie, wybierz drugi produkt w sugerowanym wierszu wyszukiwania powyżej!",
    comparison_select_slot: "Wybierz produkt (Miejsce #{slot})",
    comparison_select_slot_sub: "Wybierz model z tej samej kategorii do analizy.",
    comparison_search_in_category: "Szukaj w kategorii: {category}...",
    comparison_search_all: "Szukaj modelu według nazwy, kategorii lub technologii...",
    comparison_smart_filter: "Inteligentny filtr: Pokazywane są tylko produkty z kategorii „{category}” w celu zapewnienia rzetelności porównania.",
    comparison_no_models_sub: "Zmień wpisane słowo kluczowe lub wyczyść wyszukiwanie, aby zobaczyć wszystkie dostępne produkty.",
    comparison_incoherent_toast: "Niezgodność: Możesz porównywać tylko produkty z tej samej kategorii (np. {category}).",

    create_account: "Załóż konto",
    cart: "Koszyk",
    search_placeholder: "Szukaj produktu...",
    free_shipping: "DARMOWA DOSTAWA OD 50€",
    nav_velo: "Kolarstwo",
    nav_randonnee: "Turystyka",
    nav_fitness: "Fitness",
    nav_running: "Bieganie",
    nav_nutrition: "Odżywianie",
    nav_accessoires: "Akcesoria",
    hero_tag: "SERIA 900 • WYDAJNOŚĆ",
    hero_title: "PRZEKRACZAJ GRANICE Z APEX.",
    hero_desc: "Odkryj naszą nową kolekcję szosową o wysokiej wydajności. Stworzona z myślą o szybkości, przetestowana pod kątem wytrzymałości.",
    view_collection: "ZOBACZ KOLEKCJĘ",
    learn_more: "DOWIEDZ SIĘ WIĘCEJ",
    categories_title: "KATEGORIE",
    discover: "ODKRYJ",
    featured_title: "FLAGOWE PRODUKTY",
    featured_desc: "Sprzęt najbardziej ceniony przez naszych sportowców.",
    view_all: "ZOBACZ WSZYSTKO",
    tag_bike: "Sprzęt Rowerowy",
    tag_tech: "Akcesoria Tech",
    in_stock: "W magazynie",
    low_stock: "Niski stan",
    brand_title: "INŻYNIERIA W SŁUŻBIE WYDAJNOŚCI.",
    brand_desc: "Każdy produkt Apex jest testowany przez profesjonalistów w najbardziej ekstremalnych warunkach, aby zapewnić niezawodność.",
    stat_engineers: "INŻYNIEROWIE",
    stat_satisfaction: "ZADOWOLENIE",
    footer_about: "Wsparcie techniczne dla wymagających sportowców. Gear Engineered for Winners.",
    customer_service: "Obsługa Klienta",
    company: "Firma",
    footer_cs: "Dział Obsługi Klienta",
    footer_shipping: "Informacje o Dostawie",
    footer_returns: "Zwroty",
    footer_stores: "Znajdź sklep",
    footer_contact: "Kontakt z nami",
    footer_privacy: "Polityka Prywatności",
    newsletter_desc: "Otrzymuj nasze najnowsze specyfikacje techniczne.",
    newsletter_placeholder: "Twój e-mail",
    rights: "Wszelkie prawa zastrzeżone.",
    all_products: "Wszystkie produkty",
    sort_by: "Sortuj według",
    sort_relevance: "Trafność",
    sort_price_asc: "Cena: od najniższej",
    sort_price_desc: "Cena: od najwyższej",
    sort_rating: "Najwyższe oceny",
    size_label: "Rozmiar",
    add_to_cart: "Dodaj do koszyka",
    no_products: "Nie znaleziono produktów spełniających kryteria wyszukiwania.",
    no_category_products_button: "Powrót do polecanych produktów",
    cart_title: "Twój Koszyk",
    cart_empty: "Twój koszyk jest pusty",
    cart_total: "Suma",
    cart_checkout: "Przejdź do kasy",
    continue_shopping: "Kontynuuj zakupy",
    checkout_success_title: "Zamówienie Potwierdzone!",
    checkout_success_desc: "E-mail z podsumowaniem oraz informacjami o wysyłce został wysłany na Twój adres. Dziękujemy za zaufanie do APEX SPORTS!",
    checkout_success_btn: "Zamknij",
    item_removed: "Produkt usunięty z koszyka",
    item_added: "Produkt dodany do koszyka",
    quantity: "Ilość",
    order_summary: "Podsumowanie Zamówienia",
    subtotal: "Suma cząstkowa",
    shipping_cost: "Dostawa",
    free: "Darmowa",
    shipping_note: "Darmowa dostawa dla zamówień powyżej 50 €!",
    newsletter_success: "Dziękujemy! Twój zapis do newslettera technicznego APEX SPORTS został zarejestrowany.",
    about_us_title: "O APEX",
    quick_view: "Szybki podgląd",
    select_size: "Wybierz rozmiar",
    close: "Zamknij",
    home: "Główna",
    back_to_products: "Powrót do produktów",
    fast_shipping: "Szybka wysyłka",
    alternative_suggestions: "Alternatywne sugestie",
    alternative_suggestions_desc: "Oficjalne artykuły z tej samej kategorii w katalogu.",
    technical_informations_database: "Informacje techniczne",
    technical_informations_database_desc: "Oficjalna specyfikacja z katalogu bazodanowego.",
    select_size_alert: "Proszę wybrać rozmiar przed dodaniem produktu do koszyka."
  },
  tr: {
    reset: "Sıfırla",
    filters: "Filtreler",
    apply: "Uygula",
    compare: "Karşılaştır",
    compared: "Karşılaştırıldı",
    join_elite_apex: "APEX ekibinin sportif elitlerine katılın",
    field_name_label: "Ad / Soyad",
    field_email_label: "E-posta Adresi",
    field_password_label: "Şifre",
    field_newsletter_label: "Haftalık teknik özellik bültenine abone olun",
    btn_submit_account: "Onayla ve Hesabımı Oluştur",
    account_success_toast: "APEX'e hoş geldiniz! Üye alanınız oluşturuldu.",
    comparison_title: "APEX Uzman Karşılaştırma",
    comparison_desc: "Bilinçli seçimler yapın. Fiyatları, müşteri yorumlarını ve boyutları anında değerlendirmek için aynı kategorideki en fazla 3 ürünü yan yana karşılaştırın.",
    comparison_clean_all: "Tümünü Temizle",
    comparison_remove_all: "Tüm ürünleri kaldır",
    comparison_remove_item: "Bu ürünü kaldır",
    comparison_view_details: "Tüm ürün detaylarını görüntüle",
    comparison_public_price: "Satış fiyatı",
    comparison_best_price: "En İyi Fiyat",
    comparison_rider_reviews: "Sürücü incelemeleri",
    comparison_top_rated: "En Yüksek Puanlı",
    comparison_sizes_available: "Mevcut bedenler",
    comparison_choose_size: "Beden seçin",
    comparison_add_product: "Ürün Ekle",
    comparison_click_to_select: "Bir model seçmek için buraya tıklayın",
    comparison_click_to_select_catalog: "Analiz kataloğunu açmak için buraya tıklayın",
    comparison_spec: "Özellik",
    comparison_quick_action: "Hızlı Sipariş",
    comparison_back_to_grid: "Tabloya geri dön",
    comparison_no_models: "Model bulunamadı",
    comparison_cleared_toast: "Karşılaştırma sıfırlandı",
    comparison_max_reached_toast: "En fazla 3 ürünü karşılaştırabilirsiniz.",
    comparison_added_toast: "Ürün karşılaştırıcıya eklendi",
    comparison_removed_toast: "Ürün karşılaştırıcıdan kaldırıldı",
    technical_info: "Teknik Bilgiler",
    specifications_guide: "Resmi katalog veritabanından sentezlenmiş özellik kılavuzu.",
    category: "Kategori",
    base_price: "Taban Fiyat",
    sizes: "Bedenler",
    score: "Puan",
    returns_30_days: "30 Gün İçinde İade",
    shipping_guarantee: "50€ üzeri ücretsiz kargo",
    official_gear_guarantee: "Orijinal APEX Ekipmanı",
    compare_product_tooltip: "Bu ürünü karşılaştır",
    products_label: "Ürünler",
    reviews_label: "değerlendirme",
    comparison_reminder_tip: "İpucu: Yan yana analiz başlatmak için önerilen satırdan veya arama kutusundan aynı kategoride ikinci bir ürün seçin!",
    comparison_select_slot: "Ürün Seçin (Hane #{slot})",
    comparison_select_slot_sub: "Teknik analiz için aynı kategoriden bir model seçin.",
    comparison_search_in_category: "{category} kategorisinde ara...",
    comparison_search_all: "Marka, bileşen veya kategoriye göre ara...",
    comparison_smart_filter: "Akıllı Filtre: Teknik tutarlılık için yalnızca \"{category}\" kategorisindeki ürünler gösterilir.",
    comparison_no_models_sub: "Tüm sonuçları görmek için arama kelimesini değiştirin veya aramayı temizleyin.",
    comparison_incoherent_toast: "Tutarsız: Yalnızca aynı kategorideki ürünleri karşılaştırabilirsiniz (örneğin: {category}).",

    create_account: "Üyelik Oluştur",
    cart: "Sepetim",
    search_placeholder: "Ürün ara...",
    free_shipping: "50€ ÜZERİ SİPARİŞLERDE ÜCRETSİZ KARGO",
    nav_velo: "Bisiklet",
    nav_randonnee: "Doğa Yürüyüşü",
    nav_fitness: "Kondisyon",
    nav_running: "Koşu",
    nav_nutrition: "Sporcu Besini",
    nav_accessoires: "Aksesuar",
    hero_tag: "900 SERİSİ • PERFORMANS",
    hero_title: "APEX İLE SINIRLARINI ZORLA.",
    hero_desc: "Yeni yüksek performanslı yol bisikleti koleksiyonumuzu keşfedin. Hız için üretildi, dayanıklılık için test edildi.",
    view_collection: "KOLEKSİYONU GÖR",
    learn_more: "DAHA FAZLA BİLGİ",
    categories_title: "KATEGORİLER",
    discover: "KEŞFET",
    featured_title: "ÖNE ÇIKAN ÜRÜNLER",
    featured_desc: "Sporcularımız tarafından en çok tercih edilen ekipmanlar.",
    view_all: "TÜMÜNÜ GÖR",
    tag_bike: "Bisiklet Ekipmanı",
    tag_tech: "Teknoloji Aksesuarları",
    in_stock: "Stokta Var",
    low_stock: "Son Ürünler",
    brand_title: "PERFORMANS HİZMETİNDEKİ MÜHENDİSLİK.",
    brand_desc: "Her Apex ürünü, tam bir güvenilirlik sağlamak için en zorlu koşullarda profesyoneller tarafından test edilmiştir.",
    stat_engineers: "MÜHENDİS",
    stat_satisfaction: "MEMNUNİYET",
    footer_about: "Zorlu sporcular için teknik uzmanlık. Apex: Gear Engineered for Winners.",
    customer_service: "Müşteri Hizmetleri",
    company: "Şirketimiz",
    footer_cs: "Müşteri Hizmetleri",
    footer_shipping: "Teslimat Bilgileri",
    footer_returns: "İade ve Değişim",
    footer_stores: "Mağaza Bulucu",
    footer_contact: "Bizimle İletişime Geçin",
    footer_privacy: "Gizlilik Politikası",
    newsletter_desc: "En son teknik özelliklerden haberdar olun.",
    newsletter_placeholder: "E-posta adresiniz",
    rights: "Tüm hakları saklıdır.",
    all_products: "Tüm Ürünler",
    sort_by: "Sırala",
    sort_relevance: "Önerilen",
    sort_price_asc: "Fiyat: Düşükten Yükseğe",
    sort_price_desc: "Fiyat: Yüksekten Düşüğe",
    sort_rating: "En Yüksek Puanlılar",
    size_label: "Beden/Boyut",
    add_to_cart: "Sepete Ekle",
    no_products: "Aramanızla eşleşen ürün bulunamadı.",
    no_category_products_title: "Çok Yakında!",
    no_category_products_desc: "Yeni profesyonel spor ürünleri koleksiyonumuzu şu seri için hazırlıyoruz:",
    no_category_products_button: "Öne Çıkan Ürünlere Dön",
    cart_title: "Sepetiniz",
    cart_empty: "Sepetiniz henüz boş",
    cart_total: "Toplam",
    cart_checkout: "Alışverişi Tamamla",
    continue_shopping: "Alışverişe Devam Et",
    checkout_success_title: "Siparişiniz Onaylandı!",
    checkout_success_desc: "Sipariş özetinizi ve gönderi takip bilgilerinizi içeren bir onay e-postası kayıtlı e-posta adresinize gönderilmiştir. APEX SPORTS'a güvendiğiniz için teşekkür ederiz!",
    checkout_success_btn: "Kapat",
    item_removed: "Ürün sepetten çıkarıldı",
    item_added: "Ürün sepete eklendi",
    quantity: "Adet",
    order_summary: "Sipariş Özeti",
    subtotal: "Ara Toplam",
    shipping_cost: "Kargo Ücreti",
    free: "Ücretsiz",
    shipping_note: "50 € ve üzeri siparişlerde kargo ücretsiz!",
    newsletter_success: "Teşekkürler! APEX SPORTS bülten kaydınız başarıyla alındı.",
    about_us_title: "APEX Hakkında",
    quick_view: "Hızlı Bakış",
    select_size: "Lütfen bir beden seçin",
    close: "Kapat",
    home: "Anasayfa",
    back_to_products: "Ürünlere Geri Dön",
    fast_shipping: "Hızlı Gönderi",
    alternative_suggestions: "Alternatif Öneriler",
    alternative_suggestions_desc: "Resmi katalogda aynı kategorideki diğer ekipmanlar.",
    technical_informations_database: "Teknik Bilgiler",
    technical_informations_database_desc: "Resmi veri tabanından alınan teknik ürün kılavuzu.",
    select_size_alert: "Lütfen ürünü sepete eklemeden önce bir beden seçin."
  },
  ko: {
    reset: "초기화",
    filters: "필터",
    apply: "적용",
    compare: "비교하기",
    compared: "비교 중",
    join_elite_apex: "APEX 팀의 스포츠 엘리트에 합류하세요",
    field_name_label: "이름",
    field_email_label: "이메일 주소",
    field_password_label: "비밀번호",
    field_newsletter_label: "주간 기술 세부 사양 받기",
    btn_submit_account: "인증 및 회원가입",
    account_success_toast: "APEX에 오신 것을 환영합니다! 회원 공간이 생성되었습니다.",
    comparison_title: "APEX 전문가 비교",
    comparison_desc: "현명하게 선택하세요. 같은 카테고리의 제품을 최대 3개까지 나란히 비교하여 가격, 후기, 사이즈를 즉시 확인해보세요.",
    comparison_clean_all: "모두 비우기",
    comparison_remove_all: "모든 제품 제거",
    comparison_remove_item: "이 제품 제거",
    comparison_view_details: "제품 상세 정보 보기",
    comparison_public_price: "공식 판매가",
    comparison_best_price: "최저가",
    comparison_rider_reviews: "사용자 평점",
    comparison_top_rated: "최고 평점",
    comparison_sizes_available: "선택 가능한 사이즈",
    comparison_choose_size: "사이즈 선택",
    comparison_add_product: "제품 추가",
    comparison_click_to_select: "클릭하여 모델 선택",
    comparison_click_to_select_catalog: "클릭하여 분석 카탈로그 열기",
    comparison_spec: "기술 사양",
    comparison_quick_action: "빠른 구매",
    comparison_back_to_grid: "목록으로 돌아가기",
    comparison_no_models: "해당 모델이 없습니다",
    comparison_cleared_toast: "비교함이 초기화되었습니다",
    comparison_max_reached_toast: "최대로 비교할 수 있는 제품은 3개입니다.",
    comparison_added_toast: "제품이 비교함에 추가되었습니다",
    comparison_removed_toast: "제품이 비교함에서 제거되었습니다",
    technical_info: "기술 사양 정보",
    specifications_guide: "공식 카탈로그 데이터베이스 사양 가이드.",
    category: "카테고리",
    base_price: "기준 가격",
    sizes: "사이즈",
    score: "점수",
    returns_30_days: "30일 이내 반품 보장",
    shipping_guarantee: "50€ 이상 무료 배송",
    official_gear_guarantee: "APEX 공식 컬렉션",
    compare_product_tooltip: "이 제품 비교하기",
    products_label: "제품",
    reviews_label: "개의 리뷰",
    comparison_reminder_tip: "팁: 항목별 비교를 시작하려면 추천 항목이나 검색창에서 같은 카테고리의 두 번째 제품을 추가하세요!",
    comparison_select_slot: "제품 선택 (슬롯 #{slot})",
    comparison_select_slot_sub: "비교 분석을 진행할 동일 카테고리의 모델을 선택하세요.",
    comparison_search_in_category: "카테고리 검색: {category}...",
    comparison_search_all: "모델명, 카테고리, 사양으로 검색...",
    comparison_smart_filter: "스마트 필터: 비교의 일관성을 위해 \"{category}\" 카테고리의 제품만 표시됩니다.",
    comparison_no_models_sub: "검색어를 수정하거나 지워서 사용 가능한 모든 제품을 확인해보세요.",
    comparison_incoherent_toast: "카테고리 불일치: 동일한 카테고리의 제품만 비교할 수 있습니다 (예: {category}).",

    create_account: "회원가입",
    cart: "장바구니",
    search_placeholder: "상품을 검색해 보세요...",
    free_shipping: "50€ 이상 구매 시 무료 배송",
    nav_velo: "사이클링",
    nav_randonnee: "하이킹",
    nav_fitness: "피트니스",
    nav_running: "러닝",
    nav_nutrition: "스포츠 영양식",
    nav_accessoires: "액세서리",
    hero_tag: "900 시리즈 • 프로 성능",
    hero_title: "APEX와 함께 한계를 넘어서십시오.",
    hero_desc: "최상의 속도와 극강의 인내심을 위해 설계된 새로운 고기능성 로드 자전거 컬렉션을 만나보세요.",
    view_collection: "컬렉션 보기",
    learn_more: "자세히 알아보기",
    categories_title: "카테고리",
    discover: "더 알아보기",
    featured_title: "대표 추천 상품",
    featured_desc: "선수들에게 가장 신뢰받는 프리미엄 에센셜 기어.",
    view_all: "전체 보기",
    tag_bike: "자전거 장비",
    tag_tech: "스마트 기기",
    in_stock: "재고 있음",
    low_stock: "재고 소량 남음",
    brand_title: "성능을 지휘하는 완벽한 기술력.",
    brand_desc: "모든 Apex 기어는 극한의 환경에서 프로 선수들에 의해 실전 테스트를 완료하여 절대적인 신뢰성을 자랑합니다.",
    stat_engineers: "전문 엔지니어",
    stat_satisfaction: "고객 만족도",
    footer_about: "철저한 전문가 기준의 고성능 기술력. Gear Engineered for Winners.",
    customer_service: "고객센터",
    company: "기업 소개",
    footer_cs: "고객 서비스 지원",
    footer_shipping: "배송 및 배송지 정보",
    footer_returns: "교환 및 반품",
    footer_stores: "오프라인 매장 찾기",
    footer_contact: "이메일/문의하기",
    footer_privacy: "개인정보 처리방침",
    newsletter_desc: "최신 전문가 스펙과 테크니컬 소식을 메일로 받아보세요.",
    newsletter_placeholder: "이메일을 입력해 주세요",
    rights: "All rights reserved.",
    all_products: "전체 제품 목록",
    sort_by: "정렬 기준",
    sort_relevance: "추천순",
    sort_price_asc: "낮은 가격순",
    sort_price_desc: "높은 가격순",
    sort_rating: "평점 높은순",
    size_label: "사이즈/옵션",
    add_to_cart: "장바구니 담기",
    no_products: "검색 결과와 매칭되는 상품이 없습니다.",
    no_category_products_title: "신상품 입고 예정!",
    no_category_products_desc: "현재 최고의 퍼포먼스를 내기 위한 새로운 프리미엄 추천 제품 라인업을 구성 중입니다: ",
    no_category_products_button: "추천 상품으로 가기",
    cart_title: "장바구니",
    cart_empty: "장바구니가 비어 있습니다.",
    cart_total: "합계",
    cart_checkout: "결제하기",
    continue_shopping: "쇼핑 계속하기",
    checkout_success_title: "주문이 완료되었습니다!",
    checkout_success_desc: "주문 내용에 대한 확인 이메일이 발송되었습니다. APEX SPORTS를 선택해 주셔서 감사합니다!",
    checkout_success_btn: "닫기",
    item_removed: "장바구니에서 상품이 삭제되었습니다",
    item_added: "상품이 장바구니에 추가되었습니다",
    quantity: "수량",
    order_summary: "주문 요약",
    subtotal: "소계",
    shipping_cost: "배송비",
    free: "무료",
    shipping_note: "50 € 이상 주문 시 무료 배송!",
    newsletter_success: "감사합니다! APEX SPORTS 기술 뉴스레터 구독이 성공적으로 등록되었습니다.",
    about_us_title: "APEX 소개",
    quick_view: "미리보기",
    select_size: "사이즈를 선택해 주세요",
    close: "닫기",
    home: "홈",
    back_to_products: "제품 목록으로 돌아가기",
    fast_shipping: "빠른 배송",
    alternative_suggestions: "다른 추천 상품",
    alternative_suggestions_desc: "카탈로그 내 동일 카테고리 공식 프로 장비입니다.",
    technical_informations_database: "기술 정보",
    technical_informations_database_desc: "공식 데이터베이스 제품 상세 사양 일람.",
    select_size_alert: "장바구니에 아이템을 담기 전에 사이즈를 먼저 선택해 주세요."
  },
  zh: {
    reset: "重置",
    filters: "筛选",
    apply: "应用",
    compare: "对比",
    compared: "已对比",
    join_elite_apex: "加入 APEX 团队运动精英",
    field_name_label: "姓名 / 昵称",
    field_email_label: "电子邮件地址",
    field_password_label: "密码",
    field_newsletter_label: "订阅每周技术规范",
    btn_submit_account: "确认并创建我的空间",
    account_success_toast: "欢迎来到 APEX！您的会员空间已创建。",
    comparison_title: "APEX 专业对比",
    comparison_desc: "做出明智的选择。并排比较同一类别的最多 3 件商品，以立即评估价格、客户评价和尺寸。",
    comparison_clean_all: "清空全部",
    comparison_remove_all: "移除所有产品",
    comparison_remove_item: "移除此商品",
    comparison_view_details: "查看完整产品详情",
    comparison_public_price: "官方售价",
    comparison_best_price: "最佳价格",
    comparison_rider_reviews: "骑手评价",
    comparison_top_rated: "评分最高",
    comparison_sizes_available: "可选尺寸",
    comparison_choose_size: "选择尺码",
    comparison_add_product: "添加产品",
    comparison_click_to_select: "点击选择产品",
    comparison_click_to_select_catalog: "点击打开分析目录选择产品",
    comparison_spec: "规格参数",
    comparison_quick_action: "快速操作",
    comparison_back_to_grid: "返回表格",
    comparison_no_models: "未找到任何型号",
    comparison_cleared_toast: "对比已清空",
    comparison_max_reached_toast: "您最多只能同时对比 3 件产品。",
    comparison_added_toast: "产品已成功加入对比栏",
    comparison_removed_toast: "产品已从对比栏移除",
    technical_info: "技术信息",
    specifications_guide: "官方目录数据库规格指南。",
    category: "类别",
    base_price: "基本价格",
    sizes: "尺码",
    score: "评分",
    returns_30_days: "30天无忧退货",
    shipping_guarantee: "满50欧元免运费",
    official_gear_guarantee: "APEX 官方精选系列",
    compare_product_tooltip: "对比此商品",
    products_label: "产品",
    reviews_label: "条评价",
    comparison_reminder_tip: "提示：要开始并排对比分析，请从上面的推荐行或搜索框中添加相同类别的第二件产品！",
    comparison_select_slot: "选择对比商品 (卡槽 #{slot})",
    comparison_select_slot_sub: "选择相同类别的型号并进行分析。",
    comparison_search_in_category: "在类目 {category} 中搜索...",
    comparison_search_all: "按品牌、类目或参数搜索商品型号...",
    comparison_smart_filter: "智能过滤：仅显示来自类别“{category}”的商品，以提供真实、合理的对比。",
    comparison_no_models_sub: "更改输入的关键词或清空搜索文字，即可查看所有现有商品。",
    comparison_incoherent_toast: "类别不符：您只能对比相同品类的商品（例如：{category}）。",
    about_us_title: "关于 APEX",
    quick_view: "快速浏览",
    select_size: "请选择尺码",
    close: "关闭",
    home: "首页",
    back_to_products: "返回商品列表",
    fast_shipping: "快速配送",
    alternative_suggestions: "其他推荐商品",
    alternative_suggestions_desc: "该大类目录内的官方专业系列推荐产品。",
    technical_informations_database: "技术参数",
    technical_informations_database_desc: "由官方品牌产品数据库提供的核心规格指引。",
    select_size_alert: "在将商品加入购物车之前，请先选择一个首选尺码。"
  },
  ar: {
    reset: "إعادة ضبط",
    filters: "تصفية",
    apply: "تطبيق",
    compare: "مقارنة",
    compared: "تمت المقارنة",
    join_elite_apex: "انضم إلى نخبة الرياضيين في فريق APEX",
    field_name_label: "الاسم الكامل",
    field_email_label: "البريد الإلكتروني",
    field_password_label: "كلمة المرور",
    field_newsletter_label: "الاشتراك في المواصفات الفنية الأسبوعية",
    btn_submit_account: "تأكيد وإنشاء حسابي",
    account_success_toast: "مرحباً بك في APEX! تم إنشاء مساحتك الخاصة.",
    comparison_title: "مقارنة خبراء APEX",
    comparison_desc: "اتخذ قرارات مدروسة. قارن حتى 3 منتجات من نفس الفئة جنباً إلى جنب لتقييم الأسعار والمراجعات والمقاسات فوراً.",
    comparison_clean_all: "مسح الكل",
    comparison_remove_all: "إزالة كل المنتجات",
    comparison_remove_item: "إزالة هذا المنتج",
    comparison_view_details: "عرض كامل تفاصيل المنتج",
    comparison_public_price: "السعر الرسمي",
    comparison_best_price: "أفضل سعر",
    comparison_rider_reviews: "مراجعات الدراجين",
    comparison_top_rated: "الأعلى تقييماً",
    comparison_sizes_available: "المقاسات المتوفرة",
    comparison_choose_size: "اختر المقاس",
    comparison_add_product: "إضافة منتج",
    comparison_click_to_select: "اضغط هنا لاختيار موديل",
    comparison_click_to_select_catalog: "اضغط هنا لفتح كتالوج التحليل الفني",
    comparison_spec: "المواصفات",
    comparison_quick_action: "شراء سريع",
    comparison_back_to_grid: "العودة للجدول",
    comparison_no_models: "لم يتم العثور على أي موديلات",
    comparison_cleared_toast: "تم مسح مقارنة المنتجات",
    comparison_max_reached_toast: "يمكنك مقارنة 3 منتجات كحد أقصى.",
    comparison_added_toast: "تم إضافة المنتج للمقارنة",
    comparison_removed_toast: "تم إزالة المنتج من المقارنة",
    technical_info: "المعلومات الفنية",
    specifications_guide: "الدليل الإرشادي الموحد للمواصفات من قاعدة البيانات الرسمية.",
    category: "الفئة",
    base_price: "السعر الأساسي",
    sizes: "المقاسات",
    score: "التقييم",
    returns_30_days: "إمكانية الإرجاع خلال 30 يوماً",
    shipping_guarantee: "شحن مجاني للطلبات فوق 50€",
    official_gear_guarantee: "معدات ومجموعة APEX الرسمية",
    compare_product_tooltip: "قارن هذا المنتج",
    products_label: "منتجات",
    reviews_label: "تقييمات",
    comparison_reminder_tip: "نصيحة: لبدء المقارنة الفنية التفصيلية جنباً إلى جنب، أضف منتجاً ثانياً من نفس الفئة من الاقتراحات السريعة أعلاه!",
    comparison_select_slot: "تحديد منتج للمقارنة (الموقع رقم {slot})",
    comparison_select_slot_sub: "يرجى اختيار موديل من نفس الفئة الفنية لإجراء المقارنة.",
    comparison_search_in_category: "البحث في فئة: {category}...",
    comparison_search_all: "البحث بالاسم، الفئة، أو التقنيات المستخدمة...",
    comparison_smart_filter: "تصفية ذكية: يتم عرض منتجات فئة \"{category}\" فقط لضمان تكافؤ وموضوعية المقارنة.",
    comparison_no_models_sub: "يرجى تعديل كلمة البحث أو مسح الخانة لرؤية المنتجات المتوفرة.",
    comparison_incoherent_toast: "تنبيه: يمكنك فقط مقارنة المنتجات التي تنتمي لنفس الفئة الفنية (مثل: {category}).",

    create_account: "أنشئ حساباً",
    cart: "سلة التسوق",
    search_placeholder: "البحث عن منتج...",
    free_shipping: "شحن مجاني للطلبات فوق 50€",
    nav_velo: "الدراجات",
    nav_randonnee: "المشي والتخييم",
    nav_fitness: "اللياقة البدنية",
    nav_running: "الجري",
    nav_nutrition: "التغذية الرياضية",
    nav_accessoires: "الإكسسوارات",
    hero_tag: "فئة 900 • الأداء الفائق",
    hero_title: "تجاوز حدودك مع APEX.",
    hero_desc: "اكتشف مجموعتنا الجديدة لدراجات الطرق عالية الأداء. صُممت للسرعة، واختُبرت لقدرة التحمل.",
    view_collection: "شاهد المجموعة",
    learn_more: "معرفة المزيد",
    categories_title: "الفئات",
    discover: "اكتشف",
    featured_title: "المنتجات المميزة",
    featured_desc: "المعدات الأكثر تفضيلاً واختياراً من قبل رياضيينا.",
    view_all: "عرض الكل",
    tag_bike: "معدات دراجات",
    tag_tech: "إكسسوارات تقنية",
    in_stock: "متوفر في المخزن",
    low_stock: "كمية محدودة",
    brand_title: "الهندسة في خدمة الأداء الرياضي.",
    brand_desc: "كل منتج من منتجات Apex يتم اختباره بواسطه محترفين في أقسى الظروف لضمان موثوقية لا تشوبها شائبة.",
    stat_engineers: "مهندسونا",
    stat_satisfaction: "نسبة الرضا",
    footer_about: "الخبرة التقنية للرياضيين المتطلبين. معدات مصممة للفائزين.",
    customer_service: "خدمة العملاء",
    company: "الشركة",
    footer_cs: "خدمة العملاء",
    footer_shipping: "معلومات الشحن",
    footer_returns: "المرتجعات والبدائل",
    footer_stores: "مواقع الفروع",
    footer_contact: "اتصل بنا",
    footer_privacy: "سياسة الخصوصية",
    newsletter_desc: "اشترك للحصول على أحدث المواصفات التقنية والعروض.",
    newsletter_placeholder: "بريدك الإلكتروني",
    rights: "جميع الحقوق محفوظة.",
    all_products: "جميع المنتجات",
    sort_by: "ترتيب حسب",
    sort_relevance: "الأفضل مطابقة",
    sort_price_asc: "السعر: من الأقل إلى الأكثر",
    sort_price_desc: "السعر: من الأكثر إلى الأقل",
    sort_rating: "الأعلى تقييماً",
    size_label: "المقاس / الخيار",
    add_to_cart: "أضف إلى السلة",
    no_products: "لم يتم العثور على منتجات مطابقة لبحثك.",
    no_category_products_title: "قريباً جداً!",
    no_category_products_desc: "نعمل حالياً على تجهيز مجموعتنا الجديدة من المنتجات الرياضية الاحترافية للفئة",
    no_category_products_button: "العودة للمنتجات المميزة",
    cart_title: "سلتك",
    cart_empty: "السلة فارغة حالياً",
    cart_total: "الإجمالي",
    cart_checkout: "إتمام الشراء",
    continue_shopping: "مواصلة التسوق",
    checkout_success_title: "تم تأكيد الطلب بنجاح!",
    checkout_success_desc: "تم إرسال بريد إلكتروني يحتوي على تفاصيل الطلب ومعلومات الشحن. شكراً لثقتكم في APEX SPORTS!",
    checkout_success_btn: "إغلاق",
    item_removed: "تم إزالة المنتج من السلة",
    item_added: "تم إضافة المنتج إلى السلة",
    quantity: "الكمية",
    order_summary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    shipping_cost: "الشحن",
    free: "مجاني",
    shipping_note: "شحن مجاني للطلبات فوق 50 €!",
    newsletter_success: "شكراً لك! تم تسجيل اشتراكك في نشرة الأخبار التقنية لـ APEX SPORTS.",
    about_us_title: "عن APEX",
    quick_view: "عرض سريع",
    select_size: "يرجى تحديد المقاس",
    close: "إغلاق",
    home: "الرئيسية",
    back_to_products: "العودة للمنتجات",
    fast_shipping: "شحن سريع",
    alternative_suggestions: "اقتراحات بديلة",
    alternative_suggestions_desc: "معدات رسمية مطابقة لهذه الفئة في الكتالوج.",
    technical_informations_database: "المعلومات الفنية",
    technical_informations_database_desc: "دليل المواصفات الموحد من قاعدة البيانات الرسمية.",
    select_size_alert: "يرجى اختيار المقاس قبل إضافة المنتج إلى السلة."
  }
};

const currencyRates: Record<string, { symbol: string; rate: number; pos: 'left' | 'right' }> = {
  EUR: { symbol: "€", rate: 1, pos: 'right' },
  USD: { symbol: "$", rate: 1.1, pos: 'left' },
  GBP: { symbol: "£", rate: 0.85, pos: 'left' },
  JPY: { symbol: "¥", rate: 160, pos: 'left' },
  CAD: { symbol: "C$", rate: 1.5, pos: 'left' },
  CHF: { symbol: "CHF", rate: 0.95, pos: 'right' },
  SEK: { symbol: "kr", rate: 11.5, pos: 'right' },
  PLN: { symbol: "zł", rate: 4.3, pos: 'right' },
  TRY: { symbol: "₺", rate: 35.0, pos: 'left' },
  CNY: { symbol: "¥", rate: 8.0, pos: 'left' },
  KRW: { symbol: "₩", rate: 1500, pos: 'left' },
  AED: { symbol: "د.إ", rate: 4.0, pos: 'left' }
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
  { lang: 'pt', currency: 'EUR', flag: 'https://flagcdn.com/w40/pt.png', label: 'PT/EUR' },
  { lang: 'nl', currency: 'EUR', flag: 'https://flagcdn.com/w40/nl.png', label: 'NL/EUR' },
  { lang: 'sv', currency: 'SEK', flag: 'https://flagcdn.com/w40/se.png', label: 'SE/SEK' },
  { lang: 'pl', currency: 'PLN', flag: 'https://flagcdn.com/w40/pl.png', label: 'PL/PLN' },
  { lang: 'zh', currency: 'CNY', flag: 'https://flagcdn.com/w40/cn.png', label: 'CN/CNY' },
  { lang: 'tr', currency: 'TRY', flag: 'https://flagcdn.com/w40/tr.png', label: 'TR/TRY' },
  { lang: 'ko', currency: 'KRW', flag: 'https://flagcdn.com/w40/kr.png', label: 'KR/KRW' },
  { lang: 'ar', currency: 'AED', flag: 'https://flagcdn.com/w40/ae.png', label: 'AR/AED' },
  { lang: 'en', currency: 'CAD', flag: 'https://flagcdn.com/w40/ca.png', label: 'CA/CAD' },
  { lang: 'de', currency: 'CHF', flag: 'https://flagcdn.com/w40/ch.png', label: 'CH/CHF' }
];

const catSubcategories: Record<string, { id: string; label: Record<string, string>; match: (p: Product) => boolean }[]> = {
  'vélo': [
    { id: 'vtt', label: { fr: 'VTT', en: 'MTB', es: 'VTT', de: 'MTB', it: 'VTT', ja: 'マウンテンバイク (MTB)', pt: 'BTT', nl: 'MTB', sv: 'MTB', pl: 'Górskie', zh: '山地车', tr: 'Dağ Bisikleti', ko: 'MTB', ar: 'دراجات جبلية' }, match: (p) => p.title.toLowerCase().includes('vtt') },
    { id: 'vtc', label: { fr: 'VTC', en: 'VTC / Hybrid', es: 'VTC / Híbrida', de: 'Trekkingrad', it: 'VTC / Trekking', ja: 'クロスバイク', pt: 'Estrada / Híbrida', nl: 'Hybride', sv: 'Hybrids', pl: 'Trekkingowe', zh: '混合动力', tr: 'Trekking', ko: '하이브리드', ar: 'دراجات هجينة' }, match: (p) => p.title.toLowerCase().includes('vtc') || p.title.toLowerCase().includes('tout chemin') || p.title.toLowerCase().includes('gravel') },
    { id: 'route', label: { fr: 'Route', en: 'Road Bike', es: 'Carretera', de: 'Rennrad', it: 'Corsa', ja: 'ロードバイク', pt: 'Ciclismo de Estrada', nl: 'Wielrennen', sv: 'Landsväg', pl: 'Szosowe', zh: '公路车', tr: 'Yol Bisikleti', ko: '로드바이크', ar: 'دراجات طريق' }, match: (p) => p.title.toLowerCase().includes('route') || p.title.toLowerCase().includes('rc120') || p.title.toLowerCase().includes('van rysel') },
    { id: 'electrique', label: { fr: 'Électrique', en: 'Electric Bike', es: 'Eléctrica', de: 'E-Bike', it: 'Elettrica', ja: '電動アシسٹ自転車', pt: 'Elétrica', nl: 'Elektrische fiets', sv: 'Elcykel', pl: 'Elektryczne', zh: '电动自行车', tr: 'Elektrikli', ko: '전기자전거', ar: 'دراجات كهربائية' }, match: (p) => p.title.toLowerCase().includes('électrique') || p.title.toLowerCase().includes('e-expl') || p.title.toLowerCase().includes('e-actv') },
  ],
  'randonnée': [
    { id: 'baton', label: { fr: 'Bâtons', en: 'Hiking Poles', es: 'Bastones', de: 'Wanderstöcke', it: 'Bastoncini', ja: 'トレッキングポール', pt: 'Bastões de Caminhada', nl: 'Wandelstokken', sv: 'Vandringsstavar', pl: 'Kijki trekkingowe', zh: '登山杖', tr: 'Bastonlar', ko: '등산 스ティック', ar: 'عصي المشي وتجول' }, match: (p) => p.title.toLowerCase().includes('bâton') || p.title.toLowerCase().includes('compact') },
    { id: 'cuisine', label: { fr: 'Cuisine & Gourdes', en: 'Cooksets & Bottles', es: 'Cocina y Cantimploras', de: 'Kochen & Flaschen', it: 'Borraccia e Gavetta', ja: 'クッカー＆ボトル', pt: 'Cozinha & Garrafas', nl: 'Kookgerei & Flessen', sv: 'Kök & Flaskor', pl: 'Naczynia i Bidony', zh: '餐具与水壶', tr: 'Yemek ve Suluklar', ko: '식기 및 물병', ar: 'أواني طبخ ومطرات' }, match: (p) => p.title.toLowerCase().includes('popote') || p.title.toLowerCase().includes('gourde') || p.title.toLowerCase().includes('lyophilisé') || p.title.toLowerCase().includes('repas') },
    { id: 'high-tech', label: { fr: 'Montres & Éclairage', en: 'Watches & Lighting', es: 'Relojes y Linternas', de: 'Uhren & Stirnlampen', it: 'Orologi e Frontali', ja: '時計＆ヘッドライト', pt: 'Relógios & Lanternas', nl: 'Horloges & Verlichting', sv: 'Klockor & Belysning', pl: 'Zegarki i Oświetlenie', zh: '手表与照明设备', tr: 'Saatler ve Aydınlatma', ko: '시계 및 헤드램프', ar: 'ساعات وإضاءة' }, match: (p) => p.title.toLowerCase().includes('montre') || p.title.toLowerCase().includes('gps') || p.title.toLowerCase().includes('lampe') || p.title.toLowerCase().includes('frontale') },
    { id: 'accessoires', label: { fr: 'Hydratation', en: 'Hydration', es: 'Hydratación', de: 'Trinkblasen', it: 'Sacca idrica', ja: 'ハイドレーション', pt: 'Hydratação', nl: 'Hydratatie', sv: 'Vätskesystem', pl: 'Hydratacja', zh: '补水系统', tr: 'Sıvı Desteği', ko: '수분 보충', ar: 'مستلزمات ترطيب' }, match: (p) => p.title.toLowerCase().includes('poche à eau') },
  ],
  'fitness': [
    { id: 'tapis', label: { fr: 'Tapis & Protections', en: 'Treadmills & Mats', es: 'Cintas y Alfombras', de: 'Laufbänder & Matten', it: 'Tapis roulant e Tappetini', ja: 'トレッドミル＆ヨガマット', pt: 'Passadeiras & Tapetes', nl: 'Loopbanden & Matten', sv: 'Mattor & Skydd', pl: 'Maty i Ochrona', zh: '瑜伽垫与地垫', tr: 'Koşu Bandı ve Minderler', ko: '매트 및 보호 패드', ar: 'أجهزة جري وسجاد رياضي' }, match: (p) => p.title.toLowerCase().includes('tapis') || p.title.toLowerCase().includes('marche') || p.title.toLowerCase().includes('course') || p.title.toLowerCase().includes('sol') },
    { id: 'velos', label: { fr: 'Vélos d\'Appartement', en: 'Stationary Bikes', es: 'Bicicletas Estáticas', de: 'Heimtrainer', it: 'Cyclette da camera', ja: 'エアロバイク', pt: 'Bicicletas Estáticas', nl: 'Hometrainers', sv: 'Träningscyklar', pl: 'Rowerki Stacjonarne', zh: '健身车', tr: 'Dikey Bisikletler', ko: '실내 자전거', ar: 'دراجات تمارين ثابتة' }, match: (p) => p.title.toLowerCase().includes('vélo d\'appartement') || p.title.toLowerCase().includes('elliptique') },
    { id: 'rameurs', label: { fr: 'Rameurs & Autre', en: 'Rowing Machines', es: 'Vogadores', de: 'Rudergeräte', it: 'Rameurs & Altro', ja: 'ローイングマシン', pt: 'Remos & Outros', nl: 'Roeitrainers', sv: 'Rodmaskiner', pl: 'Wioślarze', zh: '划船机', tr: 'Kürek Aletleri', ko: '로잉 머신', ar: 'أجهزة تجديف وأجهزة أخرى' }, match: (p) => p.title.toLowerCase().includes('rameur') },
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
    const activeCurrency = currencyRates[currency] || currencyRates['EUR'];
    const priceTitleMap: Record<string, string> = {
      fr: 'PRIX',
      en: 'PRICE',
      es: 'PRECIO',
      de: 'PREIS',
      it: 'PREZZO',
      ja: '価格',
      pt: 'PREÇO',
      nl: 'PRIJS',
      sv: 'PRIS',
      pl: 'CENA',
      zh: '价格',
      tr: 'FİYAT',
      ko: '가격',
      ar: 'السعر'
    };
    const formatFilterValue = (eurValue: number): string => {
      const amount = eurValue * activeCurrency.rate;
      const rounded = Math.round(amount);
      if (activeCurrency.pos === 'right') {
        return `${rounded} ${activeCurrency.symbol}`;
      } else {
        return `${activeCurrency.symbol}${rounded}`;
      }
    };

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
              {`${priceTitleMap[lang] || 'PRICE'} (${currency})`}
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
                <span>{formatFilterValue(0)}</span>
                <span>{formatFilterValue(5000)}</span>
              </div>
            </div>

            {/* Direct inputs for min and max price */}
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <input 
                  type="number" 
                  value={Math.round(minPrice * activeCurrency.rate)} 
                  min="0"
                  max={Math.round(5000 * activeCurrency.rate)}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setMinPrice(Math.max(0, val / activeCurrency.rate));
                  }}
                  className="w-full bg-white border border-outline-variant/80 px-2 py-1.5 rounded-sm text-sm text-[13px] text-center font-technical-data text-on-surface focus:outline-none focus:border-primary"
                  placeholder="Min"
                />
              </div>
              <span className="text-outline text-xs font-semibold">-</span>
              <div className="relative flex-grow">
                <input 
                  type="number" 
                  value={Math.round(maxPrice * activeCurrency.rate)} 
                  min="0"
                  max={Math.round(5000 * activeCurrency.rate)}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setMaxPrice(Math.max(0, val / activeCurrency.rate));
                  }}
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

  // S'assurer que le HTML utilise la bonne langue et orientation (RTL pour l'arabe)
  useEffect(() => {
    document.documentElement.lang = lang;
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [lang]);

  // Bloquer le défilement de l'arrière-plan quand un modal/drawer est ouvert
  useEffect(() => {
    const isAnyOverlayOpen = isCompareModalOpen || isCartOpen || isAccountOpen || isMobileFilterOpen || dropdownActive;
    if (isAnyOverlayOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCompareModalOpen, isCartOpen, isAccountOpen, isMobileFilterOpen, dropdownActive]);

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
                  className="absolute left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 mt-2 w-48 max-h-[350px] overflow-y-auto origin-top-right rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 block animate-in fade-in slide-in-from-top-2 duration-150" 
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
              <p className="text-body-sm text-outline mt-1">{t('join_elite_apex')}</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setIsAccountOpen(false);
              showToast(t('account_success_toast'));
            }} className="space-y-4">
              <div>
                <label className="block text-body-sm font-label-bold text-on-surface mb-1">{t('field_name_label')}</label>
                <input 
                  type="text" 
                  required 
                  className="w-full bg-surface-container border border-outline-variant p-2.5 rounded-md text-body-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Raphaël"
                />
              </div>
              
              <div>
                <label className="block text-body-sm font-label-bold text-on-surface mb-1">{t('field_email_label')}</label>
                <input 
                  type="email" 
                  required 
                  className="w-full bg-surface-container border border-outline-variant p-2.5 rounded-md text-body-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="votre.email@gmail.com"
                />
              </div>

              <div>
                <label className="block text-body-sm font-label-bold text-on-surface mb-1">{t('field_password_label')}</label>
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
                  {t('field_newsletter_label')}
                </label>
              </div>

              <button 
                type="submit" 
                className="w-full bg-secondary hover:bg-tertiary-container text-white py-3 rounded-md font-label-bold text-body-sm uppercase tracking-wide cursor-pointer focus:outline-none transition-colors"
              >
                {t('btn_submit_account')}
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
                  {t('comparison_title')}
                </h3>
                <p className="text-body-sm text-slate-muted mt-2 leading-relaxed">
                  {t('comparison_desc')}
                </p>
              </div>

              {comparedProducts.length > 0 && (
                <div className="flex items-center gap-3 self-start md:self-end bg-slate-50 border border-outline-variant/35 rounded-xl px-4 py-2.5">
                  <span className="text-xs font-black uppercase text-primary tracking-wider">
                    {comparedProducts.length} / 3 {t('products_label')}
                  </span>
                  <div className="w-px h-4 bg-outline-variant/60"></div>
                  <button
                    type="button"
                    onClick={() => {
                      setComparedProducts([]);
                      setSlotQueries(['', '', '']);
                      setToastMessage(t('comparison_cleared_toast'));
                      setTimeout(() => setToastMessage(''), 2500);
                    }}
                    className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-650 border border-red-200 rounded font-label-bold text-[10.5px] uppercase tracking-wide transition-all duration-150 cursor-pointer flex items-center gap-1 shrink-0"
                    title={t('comparison_remove_all')}
                  >
                    <span className="material-symbols-outlined text-[13px]">delete_sweep</span>
                    <span>{t('comparison_clean_all')}</span>
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
                                    title={t('comparison_remove_item')}
                                  >
                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                  </button>
                                </div>

                                {/* Product Image and Title */}
                                <div className="text-center pt-1">
                                  <div 
                                    className="aspect-square w-full max-w-[110px] mx-auto bg-surface-container rounded-xl overflow-hidden border border-outline-variant/40 shadow-inner group cursor-pointer hover:border-secondary hover:shadow-md transition-all duration-200"
                                    onClick={() => { setSelectedProduct(p); setIsCompareModalOpen(false); }}
                                    title={t('comparison_view_details')}
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
                                        {t('comparison_public_price')}
                                      </span>
                                      {isCheapestOnTable && (
                                        <span className="text-[8px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5 shadow-3xs">
                                          <span className="material-symbols-outlined text-[10px]">payments</span>
                                          {t('comparison_best_price')}
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
                                        {t('comparison_rider_reviews')}
                                      </span>
                                      {isBestRatedOnTable && (
                                        <span className="text-[8px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5 shadow-3xs">
                                          <span className="material-symbols-outlined text-[10px]">workspace_premium</span>
                                          {t('comparison_top_rated')}
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
                                      {t('comparison_sizes_available')}
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
                                    <span>{t('comparison_choose_size')}</span>
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
                                    {t('comparison_add_product')}
                                  </span>
                                  <span className="text-[9px] text-slate-muted block font-medium max-w-[140px] mx-auto leading-normal">
                                    {t('comparison_click_to_select')}
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
                              <span>{t('comparison_spec')}</span>
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
                                    title={t('comparison_remove_item')}
                                  >
                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                  </button>

                                  <div 
                                    className="aspect-square w-full max-w-[125px] mx-auto bg-surface-container rounded-lg overflow-hidden border border-outline-variant/40 shadow-inner group cursor-pointer hover:border-secondary hover:shadow-md transition-all duration-200" 
                                    onClick={() => { setSelectedProduct(p); setIsCompareModalOpen(false); }}
                                    title={t('comparison_view_details')}
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
                                      {t('comparison_add_product')}
                                    </span>
                                    <span className="text-[9px] text-slate-muted block font-medium max-w-[130px] mx-auto leading-normal">
                                      {t('comparison_click_to_select_catalog')}
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
                            {t('comparison_public_price')}
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
                                        <span>{t('comparison_best_price')}</span>
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
                            {t('comparison_rider_reviews')}
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
                                      ({p.reviews.count} {t('reviews_label')})
                                    </span>
                                    {isBestRatedOnTable && (
                                      <span className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full shadow-xs mt-1">
                                        <span className="material-symbols-outlined text-[11px]">workspace_premium</span>
                                        <span>{t('comparison_top_rated')}</span>
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
                            {t('category')}
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
                            {t('comparison_sizes_available')}
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
                            {t('comparison_quick_action')}
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
                                  <span>{t('comparison_choose_size')}</span>
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
                        {t('comparison_reminder_tip')}
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
                          title={t('comparison_back_to_grid')}
                        >
                          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        </button>
                        <div>
                          <h4 className="font-extrabold text-[15px] sm:text-headline-xs text-primary uppercase tracking-tight flex items-center gap-2">
                            <span>
                              {t('comparison_select_slot').replace('{slot}', (pickingSlotIndex + 1).toString())}
                            </span>
                          </h4>
                          <p className="text-[11px] text-slate-muted">
                            {t('comparison_select_slot_sub')}
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
                              ? t('comparison_search_in_category').replace('{category}', activeCategory)
                              : t('comparison_search_all')
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
                                {t('comparison_no_models')}
                              </p>
                              <p className="text-[11px] text-slate-muted max-w-xs">
                                {t('comparison_no_models_sub')}
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
                                    setToastMessage(t('comparison_added_toast'));
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
