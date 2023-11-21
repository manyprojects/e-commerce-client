import '../Card/Card.scss';

const Card = ( props ) => {
    console.log("card.....", props);

    const {
        id,
        category,
        count,
        rate,
        description,
        image,
        price,
        title
    } = props;
    
    
    return (
        <div className="card">
            <img src={image} alt='item image' className='card__item' data-testid='img' />
            <section className='card__text'>
                <p className='card__title'>{title}</p>
                <p>{`$${price}`}</p>
                <button>Add to cart</button>
            </section>
        </div>
    );
};

export default Card;