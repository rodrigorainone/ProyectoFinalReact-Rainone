import React from 'react';
import { useCarritoContext } from '../../context/CarritoContext';

const ItemCart = ({item}) => {

    const {removeItem} = useCarritoContext()
   
    return (
        <div className="card mb-3 cardCart w-50 text-center">
        <div className="row g-0">
            <div className="col-md-4">
                <img src={item.img} alt={`Imagen de producto ${item.nombre}`} className="img-fluid  imagenCarrito" />
            </div>
            <div className="col-md-8">
                <div className="card-body d-flex flex-column align-items-start">
                    <h5 className="card-title align-self-center">{item.nombre} {item.modelo}</h5>
                    <p className="card-text float-left mt-4">Cantidad: {item.cant}</p>
                    <p className="card-text">Precio Unitario: $ {new Intl.NumberFormat('de-DE').format(item.precio)}</p>
                    <p className="card-text">Subtotal: $ {new Intl.NumberFormat('de-DE').format(item.precio * item.cant)}</p>
                    <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>Eliminar del Carrito</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ItemCart;
