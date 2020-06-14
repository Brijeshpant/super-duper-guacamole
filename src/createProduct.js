import React, { useContext } from "react";
import { createProduct } from "./apoloClient";
import style from './styles/app.module.css'
import { useForm } from 'react-hook-form'
import { ProductCreationContext } from './ProductCreationContext'
export const CreateProduct = () => {
    const { register: formData, handleSubmit, formState } = useForm();

    const productCreationContext = useContext(ProductCreationContext)

    const createForm = async (product) => {
        try {
            const createdProduct = await createProduct(product);
            console.log('created product ', createdProduct)
            productCreationContext.toggleShowCreateProduct()
        } catch (error) {
            console.log('error', error)
            productCreationContext.toggleShowCreateProduct()
        }
    }

    return productCreationContext.showCreateProduct ? (
        <div>
            <h1 className={style.heading} > Create product </h1>
            <form onSubmit={handleSubmit(createForm)} className={style.form}>
                <label> Name:      </label>
                <input type="text" name="name" ref={formData({ required: true })} required={true} />

                <label> brand:      </label>
                <input type="text" name="brand" ref={formData({ required: true })} />

                <label> category: </label>
                <input type="text" name="category" ref={formData({ required: true })} />

                <label> price: </label>
                <input type="number" name="price" ref={formData({ required: true })} />

                <input type="submit" value="Create product" disabled={!formState.isValid} />
            </form>
        </div>
    ) : null
}