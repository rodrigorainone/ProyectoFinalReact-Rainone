import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { useCarritoContext } from '../../context/CarritoContext';


const CartWidget = () => {
    const {getItemQuantity} = useCarritoContext()
    return (
        <div className='d-flex align-items-start'>
             <Link className="iconCar" aria-current="page"  to={"/cart"}><FontAwesomeIcon  icon={faCartShopping} />      
            </Link> 
             {getItemQuantity() > 0 && <span className="cantCarrito">{getItemQuantity()}</span>} 
        </div>
    );
}

export default CartWidget;
