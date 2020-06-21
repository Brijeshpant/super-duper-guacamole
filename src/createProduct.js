import React, { useContext, useState } from "react";
import { createProduct } from "./apoloClient";
import style from './styles/app.module.css'
import { useForm } from 'react-hook-form'
import { Error } from './error'

import { ProductCreationContext } from './ProductCreationContext'
export const CreateProduct = () => {
    const { register: formData, handleSubmit } = useForm();
    const [errorMessage, setErrorMessage] = useState({})

    const productCreationContext = useContext(ProductCreationContext)

    const createForm = async (product) => {
        try {
            await createProduct(product);
            setErrorMessage({})
            productCreationContext.toggleShowCreateProduct()

        } catch (error) {
            console.log(`Error while creating product ${JSON.stringify(error)}`)
            if (error.graphQLErrors.length > 0) {
                setErrorMessage(error.graphQLErrors[0])
            } else {
                setErrorMessage(error.networkError.result.errors[0])
            }

        }
    }

    return productCreationContext.showCreateProduct ? (
        <div>
            {errorMessage && errorMessage.message ? <Error error={errorMessage} /> : null}

            <h1 className={style.heading} > Create product </h1>
            <form onSubmit={handleSubmit(createForm)} className={style.form}>
                <label> Name:      </label>
                <input type="text" name="name" ref={formData} />

                <label> brand:      </label>
                <input type="text" name="brand" ref={formData} />

                <label> category: </label>
                <input type="text" name="category" ref={formData} />

                <label> price: </label>
                <input type="number" name="price" ref={formData} />

                <input type="submit" value="Create product" />
            </form>
        </div>
    ) : null
}