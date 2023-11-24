import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

  // check if token exists
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    // console.log(token);
    setIsSignedIn(!!token);
  }, []);


  useEffect(() => {
    const fetchProductList = async () => {
        try {
            const productList  = await axios
            .get(`${SERVER_URL}`);
            setProducts(productList.data);
            setFilteredProducts(productList.data);
        } catch(err) {
            return (<p>{`HomePage: ${err.message}`} </p>);
        }
    }
    fetchProductList();
    // eslint-disable-next-line 
  }, []);

  const updataCart = (item) => {
    setCount(count + 1);
    setCartItems(( prevItems ) => [ ...prevItems, item ]);
  }

  console.log(cartItems);

  // const removeFromCart = (itemId) => {
  //   setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  // };


  const handleSearch = (searched) => {
      const filteredItems = products.filter((product) => {
        return product.title.toLowerCase().includes(searched.toLowerCase());
      });
      setFilteredProducts(filteredItems);
  }

  if( !products ) {
    return (
        <div>Loading items...</div>
    );
  }


  return (
    <div>
      <BrowserRouter>
        <Header 
        cartCount={count} 
        handleSearch={handleSearch}
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
        user={user}
        />

        <Routes>
          <Route path='/' element={<HomePage 
            updataCart={updataCart}
          // getProducts={ getProducts }  
            filteredProducts={filteredProducts}
          />}/>

          <Route path='/products/:id' element={<ProductDetails 
            updataCart={updataCart}
          />} />

          <Route path='/signup' element={<SignupPage
          
          />} />

          <Route path='/signin' element={<SigninPage
            setIsSignedIn={setIsSignedIn}
            setUser={setUser}
          />} />

          <Route path='/cart' element={<CartPage
            
          />} />

        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;