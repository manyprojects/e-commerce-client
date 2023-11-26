import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Header.scss';


const Header = ( { cartCount, handleSearch, isSignedIn, setIsSignedIn, user } ) => {

    const navigate = useNavigate();
    const handleSignOut = () => {
        sessionStorage.removeItem('token');
        setIsSignedIn(false);
        navigate("/");
    }

    
    return (
        <div>
            <nav className='nav'>
                <NavLink to='/' className='nav__logo'>
                    <img className='nav__image' src alt='company logo' />
                </NavLink>
                <div className='nav__div'>
                    <NavLink to='/' className='nav__about'>
                        Home
                    </NavLink>

                    <div>
                        <input type='text' placeholder='Search' onChange={(e) => handleSearch(e.target.value)} />
                    </div>
                    

                    {isSignedIn ? <p className='nav__user'>{`${user.email}`}</p> : <NavLink to='/signin' className='nav__about'>
                        Sign in
                    </NavLink>}
                    {isSignedIn ? <p onClick={handleSignOut}>Sign out</p> : <NavLink to='/signup' className='nav__about'>
                        Sign up
                    </NavLink>}
                    <NavLink to='/cart' className='nav__about'>
                        Cart ({cartCount})
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};

export default Header;