import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { Product } from '../data/products';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onSelectProduct: (p: Product) => void;
  addToCartAction: (product: Product, size: string, qty: number) => void;
  formatPrice: (priceInEur: number) => string;
  t: (key: string) => string;
  lang: string;
  isCompared: boolean;
  comparedProducts: Product[];
  onToggleCompare: (product: Product) => void;
  autoFocusSize?: boolean;
  onClearAutoFocusSize?: () => void;
}

export default function ProductDetailPage({
  product,
  allProducts,
  onBack,
  onSelectProduct,
  addToCartAction,
  formatPrice,
  t,
  lang,
  isCompared,
  comparedProducts,
  onToggleCompare,
  autoFocusSize,
  onClearAutoFocusSize
}: ProductDetailPageProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [sizeError, setSizeError] = useState<boolean>(false);

  const getCategoryLabel = (cat: string): string => {
    const cleanCat = cat.toLowerCase().trim();
    if (cleanCat === 'vélo' || cleanCat === 'velo') return t('nav_velo') || t('tag_bike');
    if (cleanCat === 'randonnée' || cleanCat === 'randonnee') return t('nav_randonnee');
    if (cleanCat === 'nutrition') return t('nav_nutrition');
    if (cleanCat === 'fitness') return t('nav_fitness');
    if (cleanCat === 'running') return t('nav_running');
    if (cleanCat === 'accessoires') return t('nav_accessoires');
    return cat;
  };

  const hasPhysicalSizes = useMemo(() => {
    return (
      product.sizes &&
      product.sizes.length > 0 &&
      product.sizes[0] !== "Sans taille" &&
      product.sizes[0] !== "Sans taille." &&
      product.sizes[0] !== "UNIQUE" &&
      product.sizes[0] !== "NO SIZE"
    );
  }, [product]);

  // Remonter en haut de page lors d'un changement de produit
  useEffect(() => {
    window.scrollTo({ top: 0 });
    setActiveImageIdx(0);
    setSelectedQty(1);
    setSizeError(false);

    // Ne pas choisir de taille par défaut s'il s'agit de tailles réelles (S, M, L, etc.)
    if (hasPhysicalSizes) {
      setSelectedSize('');
    } else {
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard');
    }
  }, [product, hasPhysicalSizes]);

  // Gérer l'éventuelle auto-sélection/focus de la taille
  useEffect(() => {
    if (autoFocusSize && hasPhysicalSizes) {
      setSizeError(true);
      setTimeout(() => {
        const element = document.getElementById('selected-product-sizes-config');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
      onClearAutoFocusSize?.();
    }
  }, [autoFocusSize, hasPhysicalSizes, onClearAutoFocusSize]);

  // Trouver d'autres produits de la même catégorie pour les recommandations (excluant le produit actuel)
  const recommendedProducts = useMemo(() => {
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [allProducts, product]);

  const handleAddToCart = () => {
    if (hasPhysicalSizes && !selectedSize) {
      setSizeError(true);
      return false;
    }
    setSizeError(false);
    addToCartAction(product, selectedSize, selectedQty);
    return true;
  };

  // Condition dynamique du niveau de stock
  const isLowStock = useMemo(() => {
    return product.reviews.count % 10 < 3;
  }, [product]);

  return (
    <div className="bg-surface py-6 animate-in fade-in duration-200" id="apex-product-page-view">
      <div className="max-w-max-width mx-auto px-margin-desktop">
        
        {/* Navigation Breadcrumb Trace & Back Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 mb-8 border-b border-outline-variant/30" id="product-page-breadcrumb">
          <div className="text-body-sm font-medium text-slate-muted flex items-center gap-1.5 flex-wrap">
            <span className="hover:text-primary cursor-pointer transition-colors" onClick={onBack}>
              {t('home')}
            </span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="capitalize">{getCategoryLabel(product.category)}</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-bold line-clamp-1 max-w-[200px] sm:max-w-xs">{product.title}</span>
          </div>
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 border border-outline-variant hover:border-primary text-primary hover:text-white hover:bg-primary font-label-bold text-body-sm rounded-md transition-all duration-150 cursor-pointer shadow-xs"
            id="back-to-catalog-top-btn"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>{t('back_to_products')}</span>
          </button>
        </div>

        {/* 2-Column Split Details Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4 bg-white border border-outline-variant p-6 sm:p-8 rounded-xl shadow-xs" id="product-main-split">
          
          {/* Left Column: Media Presentation and Carousels */}
          <div className="space-y-6 flex flex-col justify-start" id="product-media-gallery">
            <div className="aspect-square bg-surface-container rounded-lg overflow-hidden border border-outline-variant flex items-center justify-center relative group shadow-inner">
              <img 
                src={product.images[activeImageIdx] || product.images[0]} 
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              {isLowStock && (
                <div className="absolute top-3 left-3">
                  <span className="bg-warning text-on-surface text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-sm animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-on-surface rounded-full"></span>
                    <span>{t('low_stock')}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-3 overflow-x-auto py-1" id="product-thumbnails-list">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIdx(index)}
                  className={`w-20 h-20 bg-surface-container rounded-md overflow-hidden border transition-all duration-150 flex-shrink-0 cursor-pointer ${
                    activeImageIdx === index 
                      ? 'border-primary ring-2 ring-primary/20 scale-[0.98]' 
                      : 'border-outline-variant hover:border-slate-muted'
                  }`}
                  id={`media-thumb-${index}`}
                >
                  <img src={img} alt="thumbnail detailed view" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Purchasing Configuration Details */}
          <div className="flex flex-col justify-between space-y-6" id="product-configuration-panel">
            <div className="space-y-4">
              
              <div className="flex items-center gap-2">
                <span className="bg-secondary text-white text-[11px] font-technical-data font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                  APEX PERFORMANCE
                </span>
              </div>

              <h2 className="font-headline-lg text-[22px] sm:text-headline-lg text-primary font-black uppercase tracking-tight leading-tight mb-1" id="selected-product-title-text">
                {product.title}
              </h2>

              {/* Reviews & Star Rating visual representation */}
              <div className="flex items-center gap-1 text-warning py-1 border-y border-outline-variant/30" id="selected-product-rating-stars">
                {Array.from({ length: 5 }).map((_, i) => {
                  const fillVal = i + 1 <= Math.round(product.reviews.notation) ? '1' : '0';
                  return (
                    <span 
                      key={i} 
                      className="material-symbols-outlined text-[16px]" 
                      style={{ fontVariationSettings: `'FILL' ${fillVal}` }}
                    >
                      star
                    </span>
                  );
                })}
                <span className="text-slate-muted text-body-sm font-semibold ml-1.5">
                  {product.reviews.notation} / 5 ({product.reviews.count} {t('reviews_label')})
                </span>
              </div>

              {/* Price block representation */}
              <div className="bg-surface-container-low p-4 rounded-lg my-4 border border-outline-variant flex items-center justify-between" id="selected-product-price-block">
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-technical-data text-slate-muted mb-0.5">
                    {lang === 'fr' ? "TARIF APEX" : 
                     lang === 'es' ? "TARIFA APEX" : 
                     lang === 'de' ? "APEX-PREIS" : 
                     lang === 'it' ? "PREZZO APEX" : 
                     lang === 'ja' ? "APEX価格" :
                     lang === 'ko' ? "APEX 특별가" :
                     lang === 'zh' ? "APEX 价格" :
                     lang === 'ar' ? "سعر APEX" :
                     "APEX PRICE"}
                  </p>
                  <span className="font-headline-xl text-[26px] sm:text-headline-xl text-primary font-black leading-none block">
                    {formatPrice(product.price.price)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-success font-technical-data text-[12px] font-bold flex items-center gap-1 justify-end">
                    <span className="w-2.5 h-2.5 bg-success rounded-full animate-ping"></span>
                    <span>{t('in_stock').toUpperCase()}</span>
                  </span>
                  <p className="text-[10px] text-slate-muted mt-1">
                    {t('fast_shipping')}
                  </p>
                </div>
              </div>

              {/* Size Selection block */}
              {hasPhysicalSizes && (
                <div className="space-y-2 mt-4 animate-in fade-in duration-200" id="selected-product-sizes-config">
                  <label className="block text-body-sm font-bold text-on-surface uppercase tracking-wider">
                    {t('size_label')} : <span className="text-secondary font-black text-sm">{selectedSize || t('select_size')}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => {
                      const isSelected = selectedSize === sz;
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => {
                            setSelectedSize(sz);
                            setSizeError(false);
                          }}
                          className={`px-4 py-2.5 border rounded-md text-body-sm font-label-bold transition-all transform hover:scale-[1.02] cursor-pointer min-w-[50px] text-center ${
                            isSelected 
                              ? 'bg-primary border-primary text-white shadow-sm font-extrabold' 
                              : sizeError
                                ? 'bg-red-50 border-red-500 text-red-900 ring-2 ring-red-500/20 animate-pulse'
                                : 'bg-white border-outline-variant text-on-surface hover:bg-surface-container-low'
                          }`}
                          id={`size-choice-btn-${sz}`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                  {sizeError && (
                    <div className="text-red-600 font-bold text-[13px] flex items-center gap-1.5 mt-2 bg-red-50 border border-red-100 px-3 py-2 rounded-lg" id="size-not-selected-error">
                      <span className="material-symbols-outlined text-[16px] leading-none text-red-600">error</span>
                      <span>{t('select_size_alert')}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity modify triggers */}
              <div className="space-y-2 mt-4" id="selected-product-qty-config">
                <label className="block text-body-sm font-bold text-on-surface uppercase tracking-wider">
                  {t('quantity').toUpperCase()} :
                </label>
                <div className="inline-flex items-center border border-outline-variant rounded-md overflow-hidden bg-white shadow-xs" id="product-qty-widget">
                  <button 
                    type="button"
                    onClick={() => setSelectedQty(prev => prev > 1 ? prev - 1 : 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-low text-on-surface font-black transition-colors cursor-pointer text-[18px]"
                  >
                    −
                  </button>
                  <span className="px-4 font-technical-data font-black text-body-md text-primary min-w-[36px] text-center block">
                    {selectedQty}
                  </span>
                  <button 
                    type="button"
                    onClick={() => setSelectedQty(prev => prev + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-low text-on-surface font-black transition-colors cursor-pointer text-[18px]"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Direct CTA actions */}
            <div className="pt-6 border-t border-outline-variant/40 space-y-4" id="selected-product-purchase-action-container">
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-secondary hover:bg-tertiary-container text-white py-3.5 px-6 rounded-md font-label-bold text-label-bold flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] cursor-pointer shadow-md shadow-secondary/15"
                  id="product-page-add-to-cart-btn"
                >
                  <span className="material-symbols-outlined font-bold">add_shopping_cart</span>
                  <span>{t('add_to_cart').toUpperCase()}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleCompare(product)}
                  className={`px-5 py-3.5 rounded-md font-label-bold text-label-bold flex items-center justify-center gap-2 border transition-all duration-150 cursor-pointer shadow-sm ${
                    isCompared 
                      ? 'bg-primary text-white border-primary hover:bg-primary-container' 
                      : 'bg-white border-outline-variant text-primary hover:bg-surface-container-low hover:border-slate-muted'
                  }`}
                  id="product-page-compare-btn"
                  title={t('compare_product_tooltip')}
                >
                  <span className="material-symbols-outlined">
                    {isCompared ? 'check_circle' : 'compare_arrows'}
                  </span>
                  <span>
                    {isCompared 
                      ? t('compared').toUpperCase() 
                      : t('compare').toUpperCase()}
                  </span>
                </button>
              </div>

              {/* Guarantees checklist representation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] text-slate-muted font-medium pt-2" id="reassurance-grid">
                <div className="flex items-center gap-1.5 bg-surface-container-low/40 p-2 rounded-md border border-outline-variant/45">
                  <span className="material-symbols-outlined text-success text-[16px]">local_shipping</span>
                  <span>{t('shipping_guarantee')}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-surface-container-low/40 p-2 rounded-md border border-outline-variant/45">
                  <span className="material-symbols-outlined text-success text-[16px]">verified</span>
                  <span>{t('official_gear_guarantee')}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-surface-container-low/40 p-2 rounded-md border border-outline-variant/45">
                  <span className="material-symbols-outlined text-success text-[16px]">sync_alt</span>
                  <span>{t('returns_30_days')}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* --- CARACTÉRISTIQUES (REAL AND RELEVANT INFO BENTO GRID) --- */}
        <section className="mt-12 text-left" id="selected-product-technical-specs">
          <div className="mb-6">
            <h3 className="font-headline-lg text-[22px] sm:text-headline-lg text-primary uppercase font-extrabold tracking-tight">
              {t('technical_informations_database')}
            </h3>
            <p className="text-body-sm text-slate-muted mt-1">
              {t('technical_informations_database_desc')}
            </p>
            <div className="w-16 h-1 bg-secondary mt-1.5"></div>
          </div>

          {/* JSON Base Properties Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 my-6" id="json-base-metadata-bento">

            <div className="bg-white border border-outline-variant rounded-xl p-4 flex flex-col justify-between hover:border-slate-muted transition-colors text-left shadow-xs">
              <div className="flex items-center gap-1.5 text-slate-muted mb-2">
                <span className="material-symbols-outlined text-[16px] text-primary">category</span>
                <span className="text-[10px] font-bold uppercase tracking-wider font-sans">
                  {t('category')}
                </span>
              </div>
              <span className="font-sans text-body-sm text-primary font-bold capitalize">{getCategoryLabel(product.category)}</span>
            </div>

            <div className="bg-white border border-outline-variant rounded-xl p-4 flex flex-col justify-between hover:border-slate-muted transition-colors text-left shadow-xs">
              <div className="flex items-center gap-1.5 text-slate-muted mb-2">
                <span className="material-symbols-outlined text-[16px] text-primary">payments</span>
                <span className="text-[10px] font-bold uppercase tracking-wider font-sans">
                  {t('base_price')}
                </span>
              </div>
              <span className="font-mono text-body-sm text-primary font-bold">{product.price.price} €</span>
            </div>

            <div className="bg-white border border-outline-variant rounded-xl p-4 flex flex-col justify-between hover:border-slate-muted transition-colors text-left shadow-xs">
              <div className="flex items-center gap-1.5 text-slate-muted mb-2">
                <span className="material-symbols-outlined text-[16px] text-primary">straighten</span>
                <span className="text-[10px] font-bold uppercase tracking-wider font-sans">
                  {t('sizes')}
                </span>
              </div>
              <span className="font-mono text-[11px] text-primary font-semibold truncate" title={product.sizes.join(', ')}>
                {product.sizes.join(' · ')}
              </span>
            </div>

            <div className="bg-white border border-outline-variant rounded-xl p-4 flex flex-col justify-between hover:border-slate-muted transition-colors text-left shadow-xs col-span-2 md:col-span-1">
              <div className="flex items-center gap-1.5 text-slate-muted mb-2">
                <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                <span className="text-[10px] font-bold uppercase tracking-wider font-sans">
                  {t('score')}
                </span>
              </div>
              <span className="font-sans text-body-sm text-primary font-bold flex items-center gap-1">
                <span className="text-amber-500 font-extrabold">{product.reviews.notation}</span>
                <span className="text-[10px] text-slate-muted">/ 5 ({product.reviews.count})</span>
              </span>
            </div>
          </div>
        </section>

        {/* --- RECOMMANDATIONS : RELATED PRODUCTS --- */}
        {recommendedProducts.length > 0 && (
          <section className="mt-16 mb-8" id="product-page-recommended-carousel">
            <div className="mb-8">
              <h3 className="font-headline-lg text-[22px] sm:text-headline-lg text-primary uppercase font-extrabold tracking-tight">
                {t('alternative_suggestions')}
              </h3>
              <p className="text-body-sm text-slate-muted mt-1">
                {t('alternative_suggestions_desc')}
              </p>
              <div className="w-16 h-1 bg-secondary mt-1.5"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-md">
              {recommendedProducts.map((p) => {
                const isProdLowStock = p.reviews.count % 10 < 3;
                return (
                  <div 
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      window.scrollTo({ top: 0 });
                    }}
                    className="bg-white border border-outline-variant p-4 product-card-hover hover:border-primary transition-all duration-300 rounded-lg cursor-pointer flex flex-col justify-between group"
                    id={`recommended-card-${p.id}`}
                  >
                    <div>
                      {/* media thumbnail representation */}
                      <div className="aspect-square bg-surface-container rounded-md overflow-hidden relative mb-3">
                        <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                        <div className="absolute top-1.5 left-1.5">
                          <span className="bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 uppercase rounded-xs">
                            PRO GEAR
                          </span>
                        </div>

                      </div>
                      
                      <span className="text-[10px] uppercase font-technical-data text-slate-muted tracking-wider block">
                        {getCategoryLabel(p.category)}
                      </span>
                      <h4 className="font-label-bold text-body-sm text-on-surface line-clamp-1 group-hover:text-primary transition-colors mt-0.5 mb-1">
                        {p.title}
                      </h4>

                      {/* Stars reviews representation */}
                      <div className="flex items-center gap-0.5 text-warning py-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span 
                            key={i} 
                            className="material-symbols-outlined text-[12px]" 
                            style={{ fontVariationSettings: `'FILL' ${i + 1 <= Math.round(p.reviews.notation) ? '1' : '0'}` }}
                          >
                            star
                          </span>
                        ))}
                        <span className="text-slate-muted text-[10px] ml-1">({p.reviews.count})</span>
                      </div>
                    </div>

                    <div className="pt-2 mt-2 border-t border-outline-variant/30 flex justify-between items-center bg-white">
                      <span className="font-bold text-primary text-body-sm">
                        {formatPrice(p.price.price)}
                      </span>
                      <div className="flex items-center gap-2">
                        {isProdLowStock ? (
                          <span className="text-warning text-[10px] font-bold uppercase">{t('low_stock')}</span>
                        ) : (
                          <span className="text-success text-[10px] font-bold uppercase">{t('in_stock')}</span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleCompare(p);
                          }}
                          className={`w-7 h-7 flex items-center justify-center rounded-md border transition-all duration-150 cursor-pointer outline-none ${
                            comparedProducts.some((item) => item.id === p.id)
                              ? 'bg-secondary border-secondary text-white'
                              : 'bg-white border-outline-variant text-primary hover:bg-surface-container-low'
                          }`}
                          title={t('compare')}
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            {comparedProducts.some((item) => item.id === p.id) ? 'check' : 'compare_arrows'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
