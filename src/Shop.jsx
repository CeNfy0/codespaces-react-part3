import './Shop.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Item=(props)=>{
    return(
        <div key={props.id} onClick={()=>props.callback(props)}>
            <img src={props.img} width={200} height={200}/><br/>
            Id: {props.id}<br/>
            Name: {props.name}<br/>
            Price: {props.price}<br/>
        </div>
    );
}

export default function Shop(){
    const [products,setProducts]=useState([]);
    const URL="https://legendary-eureka-4jj4vxg6vj6xfprp-5000.app.github.dev"
    useEffect(()=>{
        axios.get(URL+'/api/products')
        .then(response=>{
            setProducts(response.data);
        })
        .catch(error=>{
            console.log("error!");
        })
        return ()=>{

        }}
    ,[]);

    const [cart,setCart] = useState([]);
    function addCart(item){
        setCart([...cart,{id:item.id,name:item.name,price:item.price,img:item.img}]);
    }

    const productsList=products.map(item=><Item {...item} callback={addCart}/>);
    const priceCart=cart.map(item=>item.price)
    const cartList=cart.map((item,index)=><li> {item.id} {item.name} {item.price} <button onClick={()=>setCart(cart.filter((i,iindex)=>index!=iindex))}>del</button>
        </li>)


    const totalPrice=(priceCart)=>{
        let sum=0
        priceCart.forEach(price=>{
            sum+=price
        })
        return sum
    }

    const clearCart =()=>{
        setCart([]);
    }


    return(<>
        <div className='grid-container'>{productsList}</div>
        <h1>Cart</h1>
        <ol>{cartList}
            
        </ol>
        <div>
            <h3>Total Price: {totalPrice(priceCart)} </h3>
            <button onClick={clearCart} >Clear All</button>
        </div>
        </>
    );
}