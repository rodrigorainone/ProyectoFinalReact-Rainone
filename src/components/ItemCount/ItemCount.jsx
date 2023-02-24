import { useState } from "react"
import {toast} from 'react-toastify'

export const ItemCount = ({valInicial, stock,precio,onAdd}) => {
    
  const [contador, setContador] = useState(valInicial)
            //Var       //Modificar var     //Estado inicial
 
    const sumar = () =>    (contador < stock) && setContador(contador + 1)//contador = contador + 1
    const restar = () => (contador > valInicial)  && setContador(contador - 1)  //Operador ternario sin else  
    
    const agregarCarrito = () => {
      onAdd(contador)
      toast(`🦄 Agregaste ${contador} productos al carrito!`) 
    }  
    
 
  return (
    <div className="d-flex flex-column">
        <div>
          <button className="btn btn-dark btn-sm me-2" onClick={() =>restar()}>-</button>
            {contador}
            <button className="btn btn-dark btn-sm me-2 ms-2" onClick={() =>sumar()}>+</button>  
        </div>  
        <p className="mt-3" style={{display: contador>1? 'block' : 'none'}} >El valor final es : ${new Intl.NumberFormat('de-DE').format(contador*precio)}</p>
        <button className="btn btn-dark  mt-3" onClick={() => agregarCarrito()}>Agregar al carrito</button>
    </div>
  )
}
