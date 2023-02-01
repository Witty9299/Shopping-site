import axios, { Axios } from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadallProducts } from "../apicalls/Productfeed";

const Productfeed = () => {
    const [products, setProducts] = useState([]);
    const [cartinfo, setcartinfo] = useState({})
    const navigate = useNavigate();

    const loadProducts = async () => {
        try {
            const res = await LoadallProducts();
            setProducts(res.data.data)
        } catch (error) {
            alert("error")
        }

    }
    const loadorCart = async () => {
        const cartid = localStorage.getItem("cartid");

        if (cartid) {
            axios({
                url: `https://api.chec.io/v1/carts/${cartid}`,
                method: "GET",
                headers:
                {
                    " X-Authorization": " pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b"
                }
            }).then((res) => {

                setcartinfo(res.data)

            }).catch(() => {

            })
        }
        else {
            axios({
                method: "GET",
                url: "https://api.chec.io/v1/carts",
                Headers: {
                    "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b"
                }

            }).then((res) => {

                if (res.status == 200) {
                    localStorage.setItem("cartid", res.data.id)
                }
            }).catch((error) => {

            })
        }

    }


    useEffect(() => {
        loadProducts()
    }, [])
    const handleLogout = () => {
        localStorage.setItem("ecommereAuthtoken", "")
        navigate("/login")


    }
    const handleAddCart = (product_id)=>{
        const cartID =localStorage.getItem("CartId")
        axios({
            method:"POST",
            url:`https://api.chec.io/v1/carts/${cartID}`,
            headers:{
               " X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b"

            },
            data:{
                id:product_id,
                quantity:""
            }
        }).then((res)=>{
            setcartinfo(res.data.cart)

        }).catch((err)=>{

        })
        

    }
    const addedProducts = cartinfo.line_items ?cartinfo.line_items.map((product)=>product.product_id):[];
        
        return (
        <>
            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                <h1>Ecommerce App</h1>
                <button className="btn btn-danger" onClick={() => { handleLogout() }}> log out</button>
                {
                    cartinfo &&(
                    <div>
                    <p>
                        Products Added -{cartinfo.total_items||0}
                    </p>
                    <p>
                        Grand total -{cartinfo.subtotal ? cartinfo.subtotal.formatted_with_code:"0 INR"}
                    </p>
                </div>
                    )
                }
                
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                {
                    products.map((product) => {
                        const id = product.id;
                        return (
                            <div className="card" style={{ width: 300, margin: 20 }}>
                                <img
                                    src={product.image.url}
                                    style={{ width: '100%', height: 300 }}
                                    className="card-img-top" alt="..."
                                />
                                <div className=" card- body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <h6 className="text-success">Price -{product.price.formatted_with_symbol}</h6>
                                    <p className="card-text">{product.description}</p>
                                </div>
                                {
                                    addedProducts.includes(product.id)?
                                    (<button className="btn btn-danger"> remove from cart</button>):(

                                         <button className="btn btn-primary" onClick={()=>{handleAddCart(product.id)}}>add to cart</button>
                                    )
                                }
                               
                            </div>
                        )
                    })
                }
            </div>
        </>
    )

}
export default Productfeed;