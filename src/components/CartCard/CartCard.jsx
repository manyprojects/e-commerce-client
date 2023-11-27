import { useNavigate } from 'react-router-dom';
import './CartCard.scss';

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
        deletFromCart
    } = props;

    const handleDelete = () => {
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
        deletFromCart(product);
    }

    const handleCardClick = (e) => {
        // console.log(e);
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
            <button className='card__button' onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default Card;