import { createContext, useContext, useEffect, useState } from "react"
import { useNotification } from "../Notification/NotificationService"
import Swal from "sweetalert2"
import { getCartFromLocalStorage } from "../services/localStorage/localStorageServece"

const CartContext = createContext({
    cart: [],
    addItem: () => { },
    removeItem: () => { },
    totalQuantity: 0,
    totalPrice: 0,
    clearCart: () => { }
})

export const CartProvider = ({ children }) => {

    const { showNotification } = useNotification()

    const [cart, setCart] = useState([])

    useEffect(() => {
        const cartFromLocalStorage = getCartFromLocalStorage()
        setCart(cartFromLocalStorage)
    }, [])

    const addItem = (productToAdd) => {
        if (!isInCart(productToAdd.id)) {
            setCart(prev => [...prev, productToAdd])
            showNotification('success', 'Agregado correctamente.')
        } else {
            showNotification('error', `El producto ya está en el carrito.`)
        }
    }

    const isInCart = (id) => {
        return cart.some(prod => prod.id === id)
    }

    const removeItem = (id) => {
        const cartUpdate = cart.filter(prod => prod.id !== id)
        console.log(`id del prod: ${id}`)
        setCart(cartUpdate)
    }

    const getTotalQuantity = () => {
        let accu = 0

        cart.forEach(prod => {
            accu += prod.quantity
        })

        return accu
    }

    const totalQuantity = getTotalQuantity()

    const getTotalPrice = () => {
        let accu = 0

        cart.forEach(prod => {
            accu += prod.price * prod.quantity
        })

        return accu
    }

    const totalPrice = getTotalPrice()

    const clearCart = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas vaciar el carrito?',
            icon: 'warning',
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: 'Sí, vaciar',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'button confirm',
                cancelButton: 'button cancel',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setCart([])
            }
        });
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, totalQuantity, totalPrice, clearCart }}>
            {children}
        </CartContext.Provider>

    )
}

export const useCart = () => {
    return useContext(CartContext)
}
