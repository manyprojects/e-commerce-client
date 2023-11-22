import { useNavigate } from 'react-router-dom';
import '../Card/Card.scss';

const Card = ( props ) => {

    const navigate = useNavigate();

    const {
        id,
        title,
        price,
        description,
        category,
        image,
        rate,
        count,
        updataCart
    } = props;

    const handleItemClick = () => {
        const product = {
            id: id,
            title: title,
            price: price,
            description: description,
            category: category,
            image: image,
            rate: rate,
            count: count
        }
        updataCart(product);
    }

    const handleCardClick = (e) => {
        console.log(e);
        navigate(`/products/${id}`);
    }
    
    return (
        <div className="card">
            <div onClick={handleCardClick}>
                <img src={image} alt='item' className='card__item' data-testid='img' />
                <section className='card__text'>
                    <p className='card__title'>{title}</p>
                    <p>{`$${price}`}</p>
                </section>
            </div>
            <button onClick={handleItemClick}>Add to cart</button>
        </div>
    );
};

export default Card;