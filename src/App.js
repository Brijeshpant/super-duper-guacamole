import React, { useState } from "react";
import { CreateProduct } from './createProduct'
import { ProductDashboard } from './productDashboard'
import { SearchBar } from './searchBar'
import style from './styles/app.module.css'
import { ProductCreationContext } from './ProductCreationContext'
export const App = () => {
  const [showCreateProduct, setShowCreateProduct] = useState(false)
  const toggleShowCreateProduct = () => {
    setShowCreateProduct(!showCreateProduct)
  }
  return (<div className= {style.root}>
    <SearchBar />
    <div className={style.app}>
      <ProductCreationContext.Provider value={{ showCreateProduct, toggleShowCreateProduct }} >
        <ProductDashboard />
        <CreateProduct />
      </ProductCreationContext.Provider>
    </div>
  </div>)
}