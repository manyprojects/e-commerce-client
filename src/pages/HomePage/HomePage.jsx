import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/Card/Card'
import './HomePage.scss';

const HomePage = ( { addToCart, filteredProducts } ) => {

    if( filteredProducts.length === 0 ) {
        return (
            <div>No matches...</div>
        );
    }

    return (
        <div className='home'>
            {filteredProducts.map((item) => {
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
                        addToCart={addToCart}
                    />
                );
            })}

        </div>
    );
};

export default HomePage;