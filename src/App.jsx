import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import { cargarBDD, getProductos} from './firebase/firebase';
import { CarritoProvider } from './context/CarritoContext';
import Checkout from './components/Checkout/Checkout';

function App() {
  // cargarBDD();
  //getProductos();
 

  return (
    <>
     <BrowserRouter>
     <CarritoProvider>
        <Navbar/>
        <Routes>         
          <Route path='/' element={<ItemListContainer />} />
          <Route path='/item/:id' element={<ItemDetailContainer/>} /> 
          <Route path='/category/:idCategoria' element={<ItemListContainer />} />    
          <Route path='/cart' element={<Cart/>} />      
          <Route path='/Checkout' element={<Checkout/>} />
        </Routes>
        <ToastContainer/>
        </CarritoProvider>
     </BrowserRouter>
     
    </>    
  );
}

export default App;