import React,{useEffect} from 'react';
import {connect} from "react-redux";
import {fetchItems} from "../actions";
import {deleteProduct} from "../actions/product";



const Products = ({items,fetchItems,deleteProduct}) => {
    useEffect(()=> {
        fetchItems()
    },[items,fetchItems])
    const deleteProductItem = id => {
        deleteProduct(id);
    }
    const  renderItem = items && items.items.map(item=>{
        
        return(
            <tbody  key={item._id} >
            
                <tr>
                <th scope="row">1</th>
                <td>{item.title}</td>
                <td>Price: {item.price}$</td>
                
                <td>
                    
                <button className="btn btn-danger" onClick={() => deleteProductItem(item._id)}>delete</button>
                </td>
              
                </tr>
     
         </tbody>

        )
    })
    return (
        <div>
             <table className="table">
                <caption>List of Product</caption>
                    <thead>
                        <tr>
                    
                        <th scope="col">Name</th>
                        <th scope="col">price</th>
                        <th scope="col">action</th>
                        <th scope="col">action</th>
                      
                        </tr>
                    </thead>
                 {renderItem} 
                </table>
        </div>
    );
};
const mapStateToProps = state =>{
  
    return {
        items:state.items,
      
    }
}
export default connect(mapStateToProps,{fetchItems,deleteProduct})(Products);