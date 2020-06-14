import React, { useState } from "react";
import { getProduct } from "./apoloClient"
import style from './styles/app.module.css'
import Modal from 'react-bootstrap/Modal'
import "bootstrap/dist/css/bootstrap.min.css";

export const SearchBar = () => {
    const [searchKey, setSearchKey] = useState('')
    const onChange = (event) => {
        setSearchKey(event.target.value)
    }
    const [product, setProduct] = useState({})
    const handleChange = async () => {
        const response = await getProduct(searchKey)
        console.log('response', response)
        setProduct(response.data.product)
        setLgShow(true)
        Promise.resolve()
    }
    const [lgShow, setLgShow] = useState(false);

    const ProductModel = () => (<div>
        <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Product
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {product && product.name ?
                    <table className={style.contantTable}>
                        <tbody>
                            {
                                Object.keys(product).map(item => (
                                    <tr key={item}>
                                        <td >{item}</td>
                                        <td>{product[item]}</td>

                                    </tr>))}
                        </tbody>
                    </table> : <span> No data</span>
                }
            </Modal.Body>
        </Modal>
    </div>
    );
    return (
            <div className={style.wrap}>
                <div className={style.search}>
                    <input type="text" className={style.searchTerm}
                        placeholder="Enter product key" onChange={onChange} />
                    <button type="submit" className={style.searchButton} onClick={handleChange}>
                        Search
             </button>
                </div>
            <ProductModel />    
            </div>
    )
}