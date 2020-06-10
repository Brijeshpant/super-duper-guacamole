import React, { useState, useEffect, useContext } from "react";
import { getProducts, createProduct } from "./apoloClient";
import style from './styles/app.module.css'
import {useForm} from 'react-hook-form'
import { ProductCreationContext } from './ProductCreationContext'
export const App = () => {
  const [showCreateProduct, setShowCreateProduct] = useState(false)
  const toggleShowCreateProduct = () => {
    setShowCreateProduct(!showCreateProduct)
  }
  const CreateProduct = () => {
   const {register: formData, handleSubmit} = useForm();
    const productCreationContext = useContext(ProductCreationContext)

   const createForm = async (product) => {

    try {
      const createdProduct = await createProduct(product);
       console.log('created product ', createdProduct)
      productCreationContext.toggleShowCreateProduct()
    }catch(error) {
       console.log('error', error)
      productCreationContext.toggleShowCreateProduct()
    }

   }
   
    return productCreationContext.showCreateProduct ? (
      <div>
        <h1 className={style.heading} > Create product </h1>
        <form onSubmit={handleSubmit(createForm)} className={style.form}>
          <label> Name:      </label>
          <input type="text" name="name" ref={formData} />

          <label> brand:      </label>
          <input type="text" name="brand" ref={formData} />

          <label> category:      </label>
          <input type="text" name="category" ref={formData} />

          <label> price: </label>
          <input type="number" name="price" ref={formData} />

          <input type="submit" value="Create" />
        </form>
      </div>
    ) : null

  }
  const ProductDashboard = () => {
    const productCreationContext = useContext(ProductCreationContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
      if (!productCreationContext.showCreateProduct) {
        const fetchProducts = async () => {
          const response = await getProducts();
          console.log('response', response)
          setProducts(response.data.products)
        }
        fetchProducts(); 
      }

    }, [productCreationContext])

    return (!productCreationContext.showCreateProduct && products != null && products.length > 0) ?
      (<div >
        <h1 className={style.heading} > Products </h1>
        <table className={style.contantTable}>
          <thead><tr>
            {Object.keys(products[0]).map(item => (<th>{item}</th>))}
          </tr>
          </thead>
          <tbody>
            {
              products.map(item => (
                <tr>
                  {
                    Object.values(item).map(pr => <td>{pr}</td>)
                  }
                </tr>))}
          </tbody>
        </table>
        <button type="button" onClick={() => productCreationContext.toggleShowCreateProduct()} className={style.createProd}>Create product</button>

      </div>) : null
  }
  
  return (<div>
    <ProductCreationContext.Provider value = {{showCreateProduct, toggleShowCreateProduct}} >
      <ProductDashboard />
      <CreateProduct />
    </ProductCreationContext.Provider>
  </div>)
}