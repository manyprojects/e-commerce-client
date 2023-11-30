import CartCard from '../../components/CartCard/CartCard';
import axios from 'axios';
import './CartPage.scss';
import { useState } from 'react';

const CartPage = ({ cartItems, deletFromCart, stripeProducts }) => {

    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const [ response, setResponse ] = useState("");

    const subTotal = cartItems.reduce((sum, item) => (
        sum + parseFloat(item.price)), 0)
        .toFixed(2);

    const filteredProducts =[];
    for (let i = 0; i < cartItems.length; i++) {
        for (let j = 0; j < stripeProducts.length; j++){
            if (stripeProducts[j].title === cartItems[i].title) {
                filteredProducts.push(stripeProducts[j]);
            }
        }
    }
    
    // setCheckoutProducts(filteredProducts);
    const checkout = async () => {
        try {
          const response = await axios.post(`${SERVER_URL}/checkout`, {
            items: filteredProducts,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.data.url) {
            window.location.assign(response.data.url);
          }
        } catch (error) {
          console.error('Error during checkout:', error);
        }
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        const data = {"user-question": event.target[0].value, "cart-items": [...cartItems]};
        const resp = await axios.post(`${SERVER_URL}/completions`, data);
        setResponse(resp.data.choices[0].text);

      } catch (error) {
        return (<p>{`CartPage: ${error.message}`} </p>);
      }
    }

    return (
        <div className='cart-page'>
            <div className='cart'>
                <div className='cart__div'>
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
                    <hr className='cart__divider' />
                </div>
                
                <section className='cart__total'>
                    <p>Total</p>
                    <hr className='cart__divider' />
                    <p>{`$${subTotal}`}</p>
                    <hr className='cart__divider' />
                    <button onClick={checkout} className='cart__btn'>Proceed to checkout</button>

                    <form className='cart__form' onSubmit={handleSubmit}>
                      <textarea className='cart__input'/>
                      <br />
                      <button type='submit' className='cart__btn'>Ask ChatGPT</button>
                    </form>
                    <br />
                    {response ? <div className='cart__response'>{response}</div> : <div></div>}
                </section>
            </div>
        </div>
    );
};

export default CartPage;