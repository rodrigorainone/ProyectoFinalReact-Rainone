import React from 'react';
import { Link } from 'react-router-dom';
import Itemlist from '../ItemList/Itemlist';
import { useCarritoContext } from '../../context/CarritoContext';

const Cart = () => {
    const {carrito,totalPrice,emptyCart} =useCarritoContext()
    return (
        <>
        { carrito.length === 0 
          ? //Si carrito esta vacio
            <>
                <div className='text-center mt-5'>
                    <h2>Carrito vacio</h2>
                    <Link className="nav-link mt-5" to={'/'}><button className="btn btn-dark">Continuar comprando</button></Link> 
                </div>
            </>
          : //Si carrito tiene productos
            <div className="container cartContainer">
                {<Itemlist products={carrito} plantilla={'itemCart'}/>}
                <div className="divButtons d-flex flex-column align-items-end">
                    <p>Resumen de la compra: $ {new Intl.NumberFormat('de-DE').format(totalPrice())}</p>
                    <button className="btn btn-danger btn-sm mt-3" onClick={() => emptyCart()}>Vaciar carrito</button>
                    <Link className="nav-link" to={'/'}><button className="btn btn-dark btn-sm mt-3 ">Continuar Comprando</button></Link> 
                    <Link className="nav-link" to={'/checkout'}><button className="btn btn-dark btn-sm mt-3 ">Finalizar compra</button></Link> 
                </div>
            </div>
        }
    </>
    );
}

export default Cart;
