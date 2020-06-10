import {createContext} from 'react'
export const ProductCreationContext = createContext({
    showCreateProduct: false,
    toggleShowCreateProduct: () => {}
})