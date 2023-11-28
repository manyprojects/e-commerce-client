import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Header.scss';
import cart from '../../assets/icons/cart.svg';


const Header = ( { cartCount, handleSearch, isSignedIn, setIsSignedIn, user } ) => {

    const navigate = useNavigate();
    const handleSignOut = () => {
        sessionStorage.removeItem('token');
        setIsSignedIn(false);
        navigate("/");
    }

    return (
        <div className='header'>
            <nav className='nav'>
                    <section className='nav__status'>
                        <section className='nav__account'>
                            {isSignedIn ? 
                            <p className='nav__user'>{`Hi, ${user.email}`}</p>
                             : <NavLink to='/signin' className='nav__about'>
                                Sign in
                            </NavLink>}

                            {isSignedIn ? 
                            <button className='nav__signout' onClick={handleSignOut}>Sign out</button>
                             : <NavLink to='/signup' className='nav__about'>
                                Sign up
                            </NavLink>}
                        </section>

                        <NavLink to='/cart' className='nav__cart'>
                            <div className='nav__cart-count'>{cartCount}</div>
                            <img className='nav__cart-img' src={cart} alt='cart' />
                        </NavLink>
                    </section>

                    <section className='nav__brand'>
                        <NavLink to='/' className='nav__logo'>
                            E-COMMERCE
                        </NavLink>

                        <div className='nav__search'>
                            <input className='nav__input' type='text' placeholder='Search' onChange={(e) => handleSearch(e.target.value)} />
                        </div>
                    </section>
            </nav>
        </div>
    );
};

export default Header;