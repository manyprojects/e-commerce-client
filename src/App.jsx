import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import SignupPage from './pages/SignupPage/SignupPage';
import SigninPage from './pages/SigninPage/SigninPage';
import CartPage from './pages/CartPage/CartPage';
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
            const itemsNumber  = await axios
            .post(`${SERVER_URL}/insertItems`, insertItem);
          }
        } catch(err) {
            return (<p>{`App: ${err.message}`} </p>);
        }
    }
    sendItems();
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
  }, [ deleteCount ]);


  // when users click "add to cart"
  const addToCart = (item) => {
    setCount( count + 1 );
    setCartItems(( prevItems ) => [ ...prevItems, item ]);
  };

  // when users delete item from cart
  const deletFromCart = (item) => {
    setCount( count - 1 );
    setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
    setDeleteCount( item.id );
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
  }, [ user ]);

  // after users sign in, update cart items
  useEffect(() => {
    if( userItems.length !== 0 ) {
      upDateCart();
    }
  }, [ userItems ]);

  // console.log([ ...userItems, ...cartItems ]);
  // console.log(newCount);
  // console.log(newCount);
  // console.log(cartItems[cartItems.length-1]);
  // console.log(userItems);

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
    <div>
      <BrowserRouter>
        <Header 
        cartCount={count + newCount} 
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
          />} />

        </Routes>

      </BrowserRouter>
    </div>
  );
};

export default App;