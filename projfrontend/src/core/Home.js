import React, {useState, useEffect} from "react";

import { getProducts } from "./helper/coreapicalls";

export default function Home() {

    const [products, setProducts] = useState([]);//product is like name of box, what we insert inside box is
    //get products. first [] in useState is empty. that tells products is empty. setProducts is managed by setState

    const [error, setError] = useState(false);// false because initial value of error is false.

    const loadAllProducts = () => {
        getProducts()
          .then((data) => {
            if (data && data?.error) {
              setError(data.error);
              console.log(error);
            } else {
              setProducts(data);
            }
          });
      };

        useEffect(() => {
            loadAllProducts();
        }, []);
//useeffects will run loadallproducts function

    return ( 
        <div>
            <h1>
                Home Component
            </h1>
            <div className="row">
                {products && products.map( (product, index) => {
                    return(
                        <div key={index}>
                            <h1>
                                {product.name}
                            </h1>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}