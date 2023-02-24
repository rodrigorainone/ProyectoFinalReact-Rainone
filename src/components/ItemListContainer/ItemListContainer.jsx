import {useState,useEffect}  from 'react'
import { useParams } from 'react-router-dom'
import Itemlist from '../ItemList/Itemlist';
import { getProductos } from '../../firebase/firebase';


const ItemListContainer = () => {    
    
        const [productos,setProductos] = useState([]);
        
        const {idCategoria} = useParams()
        useEffect(()=>{ 
            if (idCategoria){
                let aux;
                switch (idCategoria) {
                    case 'Autos':
                        aux=1;
                      break;
                    case 'SUV':
                        aux=2;
                    break;                        
                    case 'Camionetas':
                        aux=3;
                      break;
                    case 'Utilitarios':
                        aux=4;
                    break;
                    default:
                        console.log('esta mal');
                }
                getProductos()
                .then(items => {                    
                    const products = items.filter(prod => prod.idCategoria ===aux)                
                    const productsList =  <Itemlist products={products} plantilla={'item'}/>
                    setProductos(productsList)               
                })
            }        
            else{
                getProductos()
                .then(products => {                                
                    const productsList = <Itemlist products={products} plantilla={'item'}/>
                    setProductos(productsList)               
                })
            }
        },[idCategoria]);   
        
    return (        
        <div className='row cardProductos'>
            {productos}
        </div>
    );
}

export default ItemListContainer;
