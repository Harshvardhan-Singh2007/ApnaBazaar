export const SHIPPING_FEE = 79
export const FREE_SHIPPING_THRESHOLD = 1499
export const getSubtotal = (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
export const getShipping = (subtotal) => subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
export const getTotal = (items) => { const subtotal = getSubtotal(items); return subtotal + getShipping(subtotal) }
export const getItemCount = (items) => items.reduce((sum, item) => sum + item.quantity, 0)
