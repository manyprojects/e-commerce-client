import CartCard from '../../components/CartCard/CartCard';

const CartPage = ({ cartItems, deletFromCart }) => {

    const subTotal = cartItems.reduce((sum, item) => (sum + parseFloat(item.price)), 0);
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
            <hr />
            <section className='cart__total'>
                <p>Total</p>
                <p>{`C$${subTotal}`}</p>
            </section>
            <button>Proceed to checkout</button>
        </div>
    );
};

export default CartPage;