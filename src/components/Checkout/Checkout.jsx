import { useCarritoContext } from "../../context/CarritoContext"
import { Link } from "react-router-dom"
import  React  from "react"
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import { createOrdenCompra, getProducto, updateProducto } from "../../firebase/firebase"
import { useState } from "react"

const Checkout = () => {

    const [auxErrorNombre,setauxErrorNombre] = useState(true)       // va a estar en true si hay nombre y apellido
    const [auxMail,setauxMail] = useState("")                       // guarda el primer mail
    const [auxMailRepeat,setauxMailRepeat] = useState("") 
    const [auxErrorMail,setauxErrorMail] = useState(true)           // para habilitado el span 
    const {carrito, emptyCart, totalPrice} = useCarritoContext()
    const datosFormulario = React.useRef()
    let navigate = useNavigate()

    const consultarFormulario = (e) => {
        e.preventDefault()
        
        if (auxErrorNombre===true && auxErrorMail===true){            // si el campo nombre esta bien escrito y si los 2 mails son iguales ejecuta 
            const datForm = new FormData(datosFormulario.current)
            const cliente = Object.fromEntries(datForm)
            
            const aux = [...carrito]
    
            aux.forEach(prodCarrito => {
                getProducto(prodCarrito.id).then(prodBDD => {
                    prodBDD.stock -= prodCarrito.cant //Descuento del stock la cantidad comprada
                    updateProducto(prodCarrito.id, prodBDD)
                })
            })
    
            createOrdenCompra(cliente, aux, totalPrice(), new Date().toISOString()).then(ordenCompra =>{
                toast.success(`¡Muchas gracias por comprar con nosotros!, su orden de compra con el ID: ${ordenCompra.id
                } por un total de $ ${new Intl.NumberFormat('de-DE').format(totalPrice())} fue realizada con exito`)
                emptyCart()
                e.target.reset()
                navigate("/")
            })  
        }
    }

    function checkTexto (valor) {                                   // para checkear que sea texto
        if (/^[a-zA-Z]+\s[a-zA-Z]+$/.test(valor)){               
            return true
        }
        return false
    }
    
   

    

   return (
    <>
        {carrito.length === 0 
         ? 
          <>
                <h2>No posee productos en el carrito</h2>
                <Link className="nav-link" to={'/'}><button className="btn btn-dark">Continuar comprando</button></Link> 
          </>
          :
            <div className="container" style={{marginTop:"20px"}}>
            <form onSubmit={consultarFormulario} ref={datosFormulario}>
                <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre y apellido</label>
                <input type="text" className="form-control border border-secondary" name="nombre"  required onChange={(event)=>{
                    setauxErrorNombre(checkTexto(event.target.value))
                    if (event.target.value===""){
                        setauxErrorNombre(true)
                    }             
                }}/>
                  <span style={{display: auxErrorNombre===false? 'block' : 'none'}} className="errorTexto">Debe Escribir solo texto nombre y apellido separado por 1 espacio </span>
            </div>
                <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control border border-secondary" name="email" required onChange={(event)=>{                    
                    setauxMail(event.target.value)
                    if (event.target.value===auxMailRepeat){
                        setauxErrorMail(true)
                    }    
                    else{
                        setauxErrorMail(false)
                    }     
                    }}/>
            </div>
            <div className="mb-3">
                <label htmlFor="repEmail" className="form-label">Repetir Email</label>
                <input type="email" className="form-control border border-secondary" name="repEmail" required onChange={(event)=>{  
                    setauxMailRepeat(event.target.value)   
                    if (event.target.value===auxMail){
                        setauxErrorMail(true)
                    }    
                    else{
                        setauxErrorMail(false)
                    }               
                }}/>
                <span style={{display: auxErrorMail===false? 'block' : 'none'}} className="errorRepMail">Debe escribir el mismo mail </span>
            </div>
            <div className="mb-3">
                <label htmlFor="celular" className="form-label">Numero telefonico</label>
                <input type="number" className="form-control border border-secondary" name="celular" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="direccion" className="form-label">Direccion</label>
                <input type="text" className="form-control border border-secondary" name="direccion" required/>
            </div>

            <button type="submit" className="btn btn-primary">Finalizar Compra</button>
            </form>
        </div>
        }
    
    </>
          
   )
}

export default Checkout;
