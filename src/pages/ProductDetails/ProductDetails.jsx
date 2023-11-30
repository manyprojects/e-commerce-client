import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './ProductDetails.scss';

const ProductDetails = ({ addToCart }) => {
    const { id } = useParams();
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const [ productDetails, setProductDetails ] = useState([]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productDetails  = await axios
                .get(`${SERVER_URL}/products/${id}`);
                setProductDetails(productDetails.data[0]);
            } catch(err) {
                return (<p>{`ProductDetails: ${err.message}`} </p>);
            }
        }
        fetchProductDetails();
        // eslint-disable-next-line 
    }, []);

    const handleItemClick = () => {
        addToCart(productDetails);
    }

    return (
        <div className="center">
            <div className="details">
                <p className="details__title">{`${productDetails.title}`}</p>
                <img className='details__image' src={`${productDetails.image}`} alt='product' />
                <article className='details__description'>{`${productDetails.description}`}</article>
                <p className='details__rating'>{`Rating: ${productDetails.rate}/5`}</p>
                <p className='details__quantity'>{`Quantity: [ ${productDetails.count} ]`}</p>
                <button className='details__btn' onClick={handleItemClick}>Add to cart</button>
            </div>
        </div>
    );
};

export default ProductDetails;