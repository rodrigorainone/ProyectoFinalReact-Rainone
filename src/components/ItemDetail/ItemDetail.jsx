import { ItemCount } from "../ItemCount/ItemCount";
import { useCarritoContext } from "../../context/CarritoContext";
import { Link } from "react-router-dom";

const ItemDetail = ({item}) => { 
    const {addItem} = useCarritoContext()

    const onAdd = (cantidad)=>{
        addItem(item,cantidad)
    }

    
   
    return (
    <div className="row g-0">
        <div className="col-md-4">
                <img src={item.img} alt={`imagen de ${item.nombre}`} className="img-fluid rounded-star"/>

        </div>
        <div className="col-md-8">
            <div className="card-body">
                <h5 className="card-title">{item.nombre} {item.modelo}</h5>                          
                <p className="card-text">Marca : {item.marca}</p>
                <p className="card-text">Precio : ${new Intl.NumberFormat('de-DE').format(item.precio)}</p>
                <p className="card-text">Stock : {item.stock}</p>
                <ItemCount valInicial={1} stock={item.stock} precio={item.precio} onAdd={onAdd} />   
                <Link className="iconCar" aria-current="page"  to={"/cart"}><button className='btn btn-dark mt-3'>Finalizar Compra</button></Link>                      
            </div>
        </div>            
    </div>
    );
}

export default ItemDetail;
