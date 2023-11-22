import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = ({ updataCart }) => {
    // get product id
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
                return (<p>{`HomePage: ${err.message}`} </p>);
            }
        }
        fetchProductDetails();
        // eslint-disable-next-line 
    }, []);
    
    // console.log(productDetails);

    const handleItemClick = () => {
        updataCart(productDetails);
    }

    return (
        <div>
            <p>{`${productDetails.title}`}</p>
            <img src={`${productDetails.image}`} alt='product' />
            <article>{`${productDetails.description}`}</article>
            <p>{`Rating: ${productDetails.rate}/5`}</p>
            <p>{`Count: [ ${productDetails.count} ]`}</p>
            <button onClick={handleItemClick}>Add to cart</button>
        </div>
    );
};

export default ProductDetails;