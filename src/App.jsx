import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import SignupPage from './pages/SignupPage/SignupPage';
import SigninPage from './pages/SigninPage/SigninPage';
import CartPage from './pages/CartPage/CartPage';
import Footer from './components/Footer/Footer';
import Success from './pages/SuccessPage/Success';
import Cancel from './pages/CancelPage/Cancel';
import { stripeData } from './utils/data';
import './styles/global.scss';


function App() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [ products, setProducts ] = useState([]);
  const [ count, setCount ] = useState(0);
  const [ cartItems, setCartItems ] = useState([]);
  const [ filteredProducts, setFilteredProducts ] = useState([]);
  const [ isSignedIn, setIsSignedIn ] = useState(false);
  const [ user, setUser ] = useState({});
  const [ userItems, setUserItems ] = useState([]);
  const [ newCount, setNewCount ] = useState(0);
  const [ userDetails, setUserDetails ] = useState({});
  const [ deleteCount, setDeleteCount ] = useState('');
  const [ dCount, setDCount ] = useState(0);
  const [ stripeProducts, setStripeProducts ] = useState([]);


  // check if token exists
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsSignedIn(!!token);
  }, []);


  // fetch all products
  useEffect(() => {
    const fetchProductList = async () => {
        try {
            const productList  = await axios
            .get(`${SERVER_URL}`);
            setProducts(productList.data);
            setFilteredProducts(productList.data);
        } catch(err) {
            return (<p>{`App: ${err.message}`} </p>);
        }
    }
    fetchProductList();
    // eslint-disable-next-line 
  }, []);


  useEffect(() => {
    // deep copy of products array
    const stripeProductList = JSON.parse(JSON.stringify(products));
    for (let i = 0; i < stripeProductList.length; i++) {
      stripeProductList[i].id = stripeData[i];
    }
    setStripeProducts(stripeProductList);
  }, [ products ]);


  // send add-to-cart item to database if users signed in
  useEffect(() => {
    const sendItems = async () => {
        try {
          if( isSignedIn ) {
            const insertItem = {
              user_id: userDetails.user_id,
              id: cartItems[cartItems.length-1].id,
              quantity: 1
            }
            await axios
            .post(`${SERVER_URL}/insertItems`, insertItem);
          }
        } catch(err) {
            return (<p>{`App: ${err.message}`} </p>);
        }
    }
    sendItems();
    // eslint-disable-next-line 
  }, [ count ]);


  // delete item after users click delete
  useEffect(() => {
    const deleteItem = async () => {
        try {
          if( isSignedIn ) {
            await axios.delete(`${SERVER_URL}/cart/${userDetails.user_id}/${deleteCount}`);
          }
        } catch(err) {
            return (<p>{`App: ${err.message}`} </p>);
        }
    }
    deleteItem();
    // eslint-disable-next-line 
  }, [ deleteCount ]);


  // when users click "add to cart"
  const addToCart = (item) => {
    setCount( count + 1 );
    setCartItems(( prevItems ) => [ ...prevItems, item ]);
  };

  // when users delete item from cart
  const deletFromCart = (item) => {
    setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
    setDeleteCount( item.id );
    setDCount( dCount - 1 ); 
  };

  // updates cart after users sign in
  const upDateCart = () => {
    setNewCount( newCount + userItems.length );
    setCartItems(( prevItems ) => [ ...prevItems, ...userItems ]);
  };

  // fetch cart items after user sign in
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if( user.email !== '' && user.password !== '') {
          const data = await axios
          .get(`${SERVER_URL}/cart/${user.email}`);
          setUserItems(data.data);
        }
      } catch(err) {
          return (<p>{`App: ${err.message}`} </p>); 
      }
    };
    fetchCartItems();
    // eslint-disable-next-line 
  }, [ user ]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if( user ) {
          const data = await axios
          .get(`${SERVER_URL}/${user.email}`);
          setUserDetails(data.data[0]);
        }
      } catch(err) {
          return (<p>{`App: ${err.message}`} </p>); 
      }
    };
    fetchUser();
    // eslint-disable-next-line 
  }, [ user ]);

  // after users sign in, update cart items
  useEffect(() => {
    if( userItems.length !== 0 ) {
      upDateCart();
    }
    // eslint-disable-next-line 
  }, [ userItems ]);

  // when there's search input from header
  const handleSearch = (searched) => {
      const filteredItems = products.filter((product) => {
        return product.title.toLowerCase().includes(searched.toLowerCase());
      });
      setFilteredProducts(filteredItems);
  };

  if( !products ) {
    return (
        <div>Loading items...</div>
    );
  }


  return (
    <div className='app'>
      <BrowserRouter className='app__components'>

        <Header
          cartCount={count + newCount + dCount} 
          handleSearch={handleSearch}
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
          user={user}
        />

        <Routes>
          <Route path='/' element={<HomePage 
            addToCart={addToCart}
            filteredProducts={filteredProducts}
          />}/>

          <Route path='/products/:id' element={<ProductDetails 
            addToCart={addToCart}
          />} />

          <Route path='/signup' element={<SignupPage
          
          />} />

          <Route path='/signin' element={<SigninPage
            setIsSignedIn={setIsSignedIn}
            setUser={setUser}
            addToCart={addToCart}
            upDateCart={upDateCart}
          />} />

          <Route path='/cart' element={<CartPage
            cartItems={cartItems}
            user={user}
            isSignedIn={isSignedIn}
            deletFromCart={deletFromCart}
            stripeProducts={stripeProducts}
          />} />

          <Route path='/success' element={<Success
            
          />} />

          <Route path='/cancel' element={<Cancel
          
          />} />

        </Routes>
        
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;