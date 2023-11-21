import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/Card/Card'
import './HomePage.scss';

const HomePage = () => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const [ product, setProduct ] = useState([]);

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const productList  = await axios
                .get(`${SERVER_URL}`);
                setProduct(productList.data);
            } catch(err) {
                return (<p>{`HomePage: ${err.message}`} </p>);
            }
        }
        fetchProductList();
        // eslint-disable-next-line 
    }, []);

    if( !product ) {
        return (
            <div>Loading items...</div>
        );
    }

    return (
        <div className='home'>
            {product.map((item) => {
                return (
                    <Card 
                        key={item.id}
                        id={item.id}
                        category={item.category}
                        count={item.count}
                        rate={item.rate}
                        description={item.description}
                        image={item.image}
                        price={item.price}
                        title={item.title}
                    />
                );
            })}

        </div>
    );
};

export default HomePage;