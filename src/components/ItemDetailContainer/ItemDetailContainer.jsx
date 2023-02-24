import {useState,useEffect} from 'react'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'
import { getProductos,getProducto } from '../../firebase/firebase'

export const ItemDetailContainer = () => {
    const [producto, setProducto] = useState([])
    const {id} = useParams()
    useEffect(() => {
        getProducto(id)
        .then(item => {            
            setProducto(item)
        })
    }, [])
    return (
        <div className='card mb-3 container itemDetail'>
            <ItemDetail item={producto}/>
        </div>
    )
}

export default ItemDetailContainer;
