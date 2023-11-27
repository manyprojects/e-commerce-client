import { useNavigate } from 'react-router-dom';
import './Card.scss';

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
        addToCart
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
        addToCart(product);
    }

    const handleCardClick = (e) => {
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
            <button className='card__btn' onClick={handleItemClick}>Add to cart</button>
        </div>
    );
};

export default Card;