import React from 'react'
import './Shop.css'
import AnimatedHeader from './AnimatedHeader'
import ImageModal from './ImageModal'

// Stripe Payment Links: create products in Stripe Dashboard, then create a Payment Link
// for each product and paste the link below. Format: https://buy.stripe.com/xxxxx
// Optional: medium, dimensions, year, description (use \n\n for paragraph breaks), soldOut: true
function itemGallery(item) {
  if (Array.isArray(item.images) && item.images.length > 0) return item.images
  if (item.image) return [item.image]
  return []
}

function itemThumbnail(item) {
  const g = itemGallery(item)
  return g[0] || ''
}

const SHOP_ITEMS = [
  {
    id: 6,
    title: 'McFries',
    image: '/images/McFries.JPG',
    price: 30000, // $300.00 — keep in sync with Stripe
    paymentLink: 'https://buy.stripe.com/3cI4greOP39k3k4bHI5AQ00',
    medium: 'Oil on panel',
    dimensions: '5 × 7 in',
    description:
      'Still life of a classic fry box and golden fries. Click the image to view larger.',
  },
  {
    id: 1,
    title: 'Night 2',
    image: '/images/night-2.JPG',
    price: 70000, // $700.00 — keep in sync with Stripe
    paymentLink: 'https://buy.stripe.com/dRmfZ94abaBM9Is8vw5AQ03',
    medium: 'Oil on canvas',
    dimensions: '—',
    description: 'Click the image to view larger.',
  },
  {
    id: 2,
    title: 'Acidum Fortuna',
    image: '/images/acidum-fortuna.JPG',
    price: 66000, // set cents to match Stripe, e.g. 30000 = $300
    paymentLink: 'https://buy.stripe.com/3cI00b0XZ9xI07SaDE5AQ02',
    medium: 'Oil on canvas panel',
    dimensions: '16 × 20 in',
    description: 'Click the image to view larger.',
  },
  {
    id: 5,
    title: 'Conducktor',
    image: '/images/Conducktor.JPG',
    price: 30000, // $300.00 — keep in sync with Stripe
    paymentLink: 'https://buy.stripe.com/eVq5kv0XZ6lw4o8eTU5AQ01',
    medium: 'Oil on panel',
    dimensions: '5 × 7 in',
    description:
      'Rubber duck in a conductor’s cap and bandana, set against deep purple with water suggested below. Click the image to view larger.',
  },
  {
    id: 4,
    title: 'Friday Night Special',
    image: '/images/Friday_Night_Special.JPG',
    images: [
      '/images/Friday_Night_Special.JPG',
      '/images/Friday_Night_Special_detail.JPG',
      '/images/Friday_Night_Special_detail2.JPG',
    ],
    price: 66000, // $500.00 — cents; keep in sync with Stripe
    paymentLink: 'https://buy.stripe.com/00w14f223fW6f2MdPQ5AQ05',
    medium: 'Oil on canvas',
    dimensions: '16 × 20 in',
    year: '2025',
  },
  {
    id: 7,
    title: 'Donuts',
    image: '/images/donuts.JPG',
    soldOut: true,
    price: 0,
    medium: 'Oil on canvas',
    dimensions: '16 × 20 in',
    description: 'This work has sold.',
  },
]

const SHOP_ITEM_QUERY = 'item'

function readSelectedIdFromSearch() {
  if (typeof window === 'undefined') return null
  const raw = new URLSearchParams(window.location.search).get(SHOP_ITEM_QUERY)
  if (raw == null || raw === '') return null
  const id = Number(raw)
  if (!Number.isFinite(id)) return null
  return SHOP_ITEMS.some((i) => i.id === id) ? id : null
}

function pathnameSearchHashWithItem(itemId) {
  const u = new URL(window.location.href)
  if (itemId == null) u.searchParams.delete(SHOP_ITEM_QUERY)
  else u.searchParams.set(SHOP_ITEM_QUERY, String(itemId))
  return u.pathname + u.search + u.hash
}

function isStripePaymentLink(link) {
  if (!link || typeof link !== 'string') return false
  return (
    (link.startsWith('https://buy.stripe.com/') ||
      link.startsWith('https://checkout.stripe.com/')) &&
    !link.includes('REPLACE_WITH_YOUR_LINK')
  )
}

function formatPrice(cents) {
  if (!cents) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

function ShopDetail({ item }) {
  const gallery = React.useMemo(() => itemGallery(item), [item])
  const [galleryIndex, setGalleryIndex] = React.useState(0)
  const [lightboxOpen, setLightboxOpen] = React.useState(false)

  React.useEffect(() => {
    setGalleryIndex(0)
    setLightboxOpen(false)
  }, [item.id])

  const index =
    gallery.length === 0 ? 0 : Math.min(galleryIndex, gallery.length - 1)
  const currentSrc = gallery[index] || ''
  const hasMultiple = gallery.length > 1

  const soldOut = item.soldOut === true
  const canPurchase = !soldOut && isStripePaymentLink(item.paymentLink)

  return (
    <div className="page-content shop-page shop-page--detail">
      <div className="shop-detail">
        <div
          className={`shop-detail-image-wrap${hasMultiple ? ' shop-detail-image-wrap--gallery' : ''}`}
        >
          <div className="shop-detail-gallery">
            {currentSrc ? (
              <button
                type="button"
                className="shop-detail-image-trigger"
                onClick={() => setLightboxOpen(true)}
                aria-label={
                  hasMultiple
                    ? `View larger — image ${index + 1} of ${gallery.length}`
                    : 'View larger'
                }
              >
                <img
                  src={currentSrc}
                  alt={`${item.title}${hasMultiple ? ` — image ${index + 1} of ${gallery.length}` : ''}`}
                  loading="lazy"
                  draggable={false}
                />
              </button>
            ) : null}
            {hasMultiple ? (
              <div className="shop-detail-gallery-dots" role="tablist" aria-label="Preview images">
                {gallery.map((src, i) => (
                  <button
                    key={`${i}-${src}`}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show image ${i + 1} of ${gallery.length}`}
                    className={`shop-detail-gallery-dot${i === index ? ' shop-detail-gallery-dot--active' : ''}`}
                    onClick={() => setGalleryIndex(i)}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
        {lightboxOpen && currentSrc ? (
          <ImageModal
            images={gallery}
            imageAlt={item.title}
            initialIndex={index}
            onClose={() => setLightboxOpen(false)}
          />
        ) : null}
        <div className="shop-detail-panel">
          <h1 className="shop-detail-title">{item.title}</h1>
          <p className="shop-detail-price">
            {soldOut ? <span className="shop-detail-sold-label">Sold</span> : formatPrice(item.price)}
          </p>
          <dl className="shop-detail-meta">
            {item.medium ? (
              <>
                <dt>Medium</dt>
                <dd>{item.medium}</dd>
              </>
            ) : null}
            {item.dimensions ? (
              <>
                <dt>Dimensions</dt>
                <dd>{item.dimensions}</dd>
              </>
            ) : null}
            {item.year ? (
              <>
                <dt>Year</dt>
                <dd>{item.year}</dd>
              </>
            ) : null}
          </dl>
          {item.description ? (
            <div className="shop-detail-description">
              {item.description.split(/\n\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ) : null}
          <div className="shop-detail-actions">
            {soldOut ? (
              <span className="shop-buy-button shop-buy-button--sold" aria-disabled="true">
                Sold
              </span>
            ) : canPurchase ? (
              <a
                href={item.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="shop-buy-button shop-buy-button--primary"
              >
                Purchase with Stripe
              </a>
            ) : (
              <span className="shop-buy-button shop-buy-button--disabled" aria-disabled="true">
                Coming soon
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Shop({ onDetailNavChange, shopResetKey = 0 }) {
  const [selectedId, setSelectedId] = React.useState(() => readSelectedIdFromSearch())
  const selected = SHOP_ITEMS.find((i) => i.id === selectedId)

  const syncSelectionFromUrl = React.useCallback(() => {
    setSelectedId(readSelectedIdFromSearch())
  }, [])

  React.useEffect(() => {
    window.addEventListener('popstate', syncSelectionFromUrl)
    return () => window.removeEventListener('popstate', syncSelectionFromUrl)
  }, [syncSelectionFromUrl])

  const openItem = React.useCallback((id) => {
    window.history.pushState({ shopItem: id }, '', pathnameSearchHashWithItem(id))
    setSelectedId(id)
  }, [])

  const clearItemFromUrl = React.useCallback(() => {
    const path = pathnameSearchHashWithItem(null)
    window.history.replaceState(window.history.state, '', path)
  }, [])

  const backToList = React.useCallback(() => {
    clearItemFromUrl()
    setSelectedId(null)
  }, [clearItemFromUrl])

  React.useEffect(() => {
    if (!shopResetKey) return
    clearItemFromUrl()
    setSelectedId(null)
  }, [shopResetKey, clearItemFromUrl])

  React.useEffect(() => {
    if (!onDetailNavChange) return
    if (selected) {
      onDetailNavChange({ title: selected.title, onBack: backToList })
      return () => onDetailNavChange(null)
    }
    onDetailNavChange(null)
  }, [selected, onDetailNavChange, backToList])

  if (selected) {
    return <ShopDetail item={selected} />
  }

  return (
    <div className="page-content shop-page">
      <AnimatedHeader>Shop</AnimatedHeader>
      <div className="shop-title-spacer" />
      <div className="shop-grid">
        {SHOP_ITEMS.map((item) => {
          const soldOut = item.soldOut === true
          return (
            <button
              key={item.id}
              type="button"
              className="shop-tile"
              onClick={() => openItem(item.id)}
              aria-labelledby={`shop-tile-title-${item.id}`}
            >
              <div className="shop-tile-image">
                <img src={itemThumbnail(item)} alt="" loading="lazy" />
              </div>
              <div className="shop-tile-caption">
                <span id={`shop-tile-title-${item.id}`} className="shop-tile-title">
                  {item.title}
                </span>
                <span className="shop-tile-price">
                  {soldOut ? <span className="shop-tile-sold">Sold</span> : formatPrice(item.price)}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Shop
