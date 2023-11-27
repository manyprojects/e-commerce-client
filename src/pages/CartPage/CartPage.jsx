import CartCard from '../../components/CartCard/CartCard';
import './CartPage.scss';

const CartPage = ({ cartItems, deletFromCart }) => {

    const subTotal = cartItems.reduce((sum, item) => (
        sum + parseFloat(item.price)), 0)
        .toFixed(2);

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
                    <p>{`C$${subTotal}`}</p>
                    <hr className='cart__divider' />
                    <button className='cart__btn'>Proceed to checkout</button>
                </section>
            </div>
        </div>
    );
};

export default CartPage;