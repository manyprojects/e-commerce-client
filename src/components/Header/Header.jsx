import { NavLink } from "react-router-dom";

const Header = ( {cart} ) => {
    return (
        <div>
            <nav className='nav'>
                <NavLink to='/' className='nav__logo'>
                    <img className src alt='company logo' />
                </NavLink>
                <div className='nav__div'>
                    <NavLink to='/' className='nav__about'>
                        Home
                    </NavLink>

                    

                    <NavLink to='/' className='nav__about'>
                        Sign in
                    </NavLink>
                    <NavLink to='/' className='nav__about'>
                        Sign up
                    </NavLink>
                    <NavLink to='/' className='nav__about'>
                        Cart ({cart.length})
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};

export default Header;