import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import SignupPage from './pages/SignupPage/SignupPage';
import './styles/global.scss';

function App() {

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [ products, setProducts ] = useState([]);
  const [ count, setCount ] = useState(0);
  const [ cartItem, setCartItem ] = useState([]);
  const [ filteredProducts, setFilteredProducts ] = useState([]);


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

  const updataCart = (product) => {
    setCount(count + 1);
    setCartItem(product);
  }

  const handleSearch = (searched) => {
      const filteredItems = products.filter((product) => {
        return product.title.toLowerCase().includes(searched.toLowerCase());
      });
      setFilteredProducts(filteredItems);
  }

  // console.log(cartItem);
  // console.log(filteredProducts);

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
        />

        <Routes>
          <Route path='/' element={<HomePage 
            updataCart={ updataCart }
          // getProducts={ getProducts }  
            filteredProducts={filteredProducts}
          />}/>

          <Route path='/products/:id' element={<ProductDetails 
            updataCart={ updataCart }
          />} />

          <Route path='/signup' element={<SignupPage
          
          />} />

        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;