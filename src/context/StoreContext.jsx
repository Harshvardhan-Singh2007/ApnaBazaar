import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getItemCount, getShipping, getSubtotal, getTotal } from '../utils/cartCalculations.js'
const StoreContext = createContext(null)
function readStorage(key, fallback) { try { const value = JSON.parse(localStorage.getItem(key)); return Array.isArray(value) ? value : fallback } catch { return fallback } }
function readCart() { return readStorage('apnabazaar-cart', []).filter(item => item && typeof item.id === 'string' && typeof item.name === 'string' && Number.isFinite(item.price) && item.price >= 0 && Number.isInteger(item.quantity) && item.quantity >= 1) }
function readWishlist() { return readStorage('apnabazaar-wishlist', []).filter(item => item && typeof item.id === 'string' && typeof item.name === 'string') }
function saveStorage(key, value) { try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* Keep the in-memory store usable when browser storage is unavailable. */ } }
export function StoreProvider({ children }) {
  const [cart, setCart] = useState(readCart)
  const [wishlist, setWishlist] = useState(readWishlist)
  useEffect(() => { saveStorage('apnabazaar-cart', cart) }, [cart])
  useEffect(() => { saveStorage('apnabazaar-wishlist', wishlist) }, [wishlist])
  const addToCart = (product, quantity = 1) => setCart(items => { const found = items.find(item => item.id === product.id); return found ? items.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...items, { ...product, quantity }] })
  const removeFromCart = id => setCart(items => items.filter(item => item.id !== id))
  const changeQuantity = (id, amount) => setCart(items => items.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item))
  const clearCart = () => setCart([])
  const toggleWishlist = product => setWishlist(items => items.some(item => item.id === product.id) ? items.filter(item => item.id !== product.id) : [...items, product])
  const isWishlisted = id => wishlist.some(item => item.id === id)
  const value = useMemo(() => ({ cart, wishlist, addToCart, removeFromCart, changeQuantity, clearCart, toggleWishlist, isWishlisted, itemCount: getItemCount(cart), subtotal: getSubtotal(cart), shipping: getShipping(getSubtotal(cart)), total: getTotal(cart) }), [cart, wishlist])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
export const useStore = () => useContext(StoreContext)
