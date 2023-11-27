import Card from '../../components/Card/Card'
import './HomePage.scss';

const HomePage = ( { addToCart, filteredProducts } ) => {

    if( filteredProducts.length === 0 ) {
        return (
            <div className='no-match'>
                <div className='no-match__div'>No matches...</div>
            </div>
        );
    }

    return (
        <div className='home'>
            <div className='home__div'>
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
        </div>
    );
};

export default HomePage;