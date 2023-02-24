import { Link } from "react-router-dom";
import React from "react";

const Categorias = React.memo(() => {
  
    return (        
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/category" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categorias 
            </a>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to={"/category/Autos"}>Autos</Link></li>
              <li><Link className="dropdown-item" to={"/category/SUV"}>SUV</Link></li>              
              <li><Link className="dropdown-item" to={"/category/Camionetas"}>Camionetas</Link></li>
              <li><Link className="dropdown-item" to={"/category/Utilitarios"}>Utilitarios</Link></li>
            </ul>
        </li>       
    );
})

export default Categorias;
