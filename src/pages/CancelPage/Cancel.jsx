import { useNavigate } from 'react-router-dom';
import './Cancel.scss';

const Cancel = () => {

    const navigate = useNavigate();
    
    setTimeout(() => {
        navigate('/cart');
    }, 1500);

    return (
        <div className='cancel'>
            Your purchase has been canceled.
        </div>
    );
};

export default Cancel;