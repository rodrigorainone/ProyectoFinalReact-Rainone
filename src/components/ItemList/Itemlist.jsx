
import Item from '../Item/Item';
import ItemCart from '../ItemCart/ItemCart';

const Itemlist = ({products,plantilla}) => {
  
    return (
        <>

             {
        plantilla === 'item' 
        ? 
        products.map(producto => <Item item={producto} key={producto.id}/>)
        :
        products.map(producto => <ItemCart item={producto} key={producto.id}/>)
      }
        </>
    );
}

export default Itemlist;
