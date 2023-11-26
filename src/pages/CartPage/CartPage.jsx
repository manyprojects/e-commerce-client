import axios from 'axios';
import { useState, useEffect } from 'react';
import CartCard from '../../components/CartCard/CartCard';

const CartPage = ({ cartItems, user, isSignedIn, deletFromCart }) => {

    // console.log(user.email);
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const [ userDetails, setUserDetails ] = useState({});
    const [ userItems, setUserItems ] = useState([]);

    // const fetchCartItems = async () => {
    //     try {
    //         const data = await axios
    //         .get(`${SERVER_URL}/cart/${userDetails.user_id}`);
    //         setUserItems(data.data[0]);
    //     } catch(err) {
    //         return (<p>{`CartPage: ${err.message}`} </p>); 
    //     }
    // };

    // const fetchUserDetails = async () => {
    //     try {
    //         const data  = await axios
    //         .get(`${SERVER_URL}/${user.email}`);
    //         setUserDetails(data.data[0]);

    //         const fetchCartItems = async () => {
    //             try {
    //                 const data = await axios
    //                 .get(`${SERVER_URL}/cart/${userDetails.user_id}`);
    //                 setUserItems(data.data[0]);
    //             } catch(err) {
    //                 return (<p>{`CartPage: ${err.message}`} </p>); 
    //             }
    //         };
    //         fetchCartItems();

    //     } catch(err) {
    //         return (<p>{`CartPage: ${err.message}`} </p>);
    //     }
    // };



    // useEffect(() => {
    //     fetchUserDetails();
    // }, [ isSignedIn ]);

    // useEffect(() => {
    //     fetchCartItems();
    // }, [ userDetails ]);


    // console.log(userItems);




    
    return (
        <div className='cart'>
            {cartItems.map((item) => {
                return (
                    <CartCard 
                        key={item.id}
                        id={item.id}
                        category={item.category}
                        count={item.count}
                        rate={item.rate}
                        description={item.description}
                        image={item.image}
                        price={item.price}
                        title={item.title}
                        deletFromCart={deletFromCart}
                    />
                );
            })}
        </div>
    );
};

export default CartPage;