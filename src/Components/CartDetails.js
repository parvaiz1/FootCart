import React, { useEffect } from 'react';
import "./cartStyle.css"
import { useSelector } from 'react-redux';
import { addToCart, removeCart,cartDecrement, clearCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import toast from 'react-hot-toast';


function CartDetails() {
  const carts = useSelector((state) => state.allCart.cart)

  let dispatch=useDispatch()
  // increment in cart
  const handleIncrement=(inc)=>{
    dispatch(addToCart(inc))
  }
  //cart Decrement
  const handleSingleDecrement=(dec)=>{
    dispatch(cartDecrement(dec))
  }
  //delete one from cart
  const handleDecrement=(del)=>{
    dispatch(removeCart(del));
    toast.success("item Removed from Your Cart")

  }
  // clear cart
  const clearAllCart=()=>{
    dispatch(clearCart())
    toast.success("Your Cart is Empty")

  }

// set total amount

  const[totalPrice, setTotalPrice] =useState(0)

  const handleTotalPrice=()=>{
    let totalprice=0
    carts.map((item, i)=>{
      totalprice=item.qnty*item.price+totalprice
    })
    setTotalPrice(totalprice)
  }

  useEffect(()=>{
    handleTotalPrice()
  },[handleTotalPrice])
  
// set total Count
const[totalQuantity, setTotalQuantity] =useState(0)

const handleTotalQunantity=()=>{
  let totalquantity=0
  carts.map((item, i)=>{
    totalquantity=item.qnty+totalquantity
  })
  setTotalQuantity(totalquantity)
}

useEffect(()=>{
  handleTotalQunantity()
},[handleTotalQunantity])

  return (
    <>
      <div className='row justify-content-center m-0' >
        <div className='col-md-8 mt-5 mb-5 cardsdetails' style={{position:"static"}}>
          <div className="card" style={{position:"static"}} >
            <div className="card-header bg-dark p-3">
              <div className='card-header-flex'  >
                <h5 className='text-white m-0'>Cart Calculation {carts.length>0?`(${carts.length})`:""}</h5>
                {
                  carts.length > 0 ?
                    <button className='btn btn-danger mt-0 btn-sm' onClick={()=>clearAllCart()}>
                      <i className='fa fa-trash-alt mr-2'></i><span>EmptyCart</span>
                    </button>
                    : ""
                }

              </div>
            </div>

            <div className="card-body p-0">
              {
                carts.length === 0 ? <table className='table cart-table mb-0'>
                  <tbody>
                    <tr>
                      <td colSpan={6}>
                        <div className='cart-empty'>
                          <i className='fa fa-shopping-cart'></i>
                          <p>Your Cart Is Empty</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table> :
                  <table className='table cart-table mb-0 table-responsive-sm'>
                    <thead>
                      <tr>
                        <th>Action</th>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th className='text-right'> <span id="amount" className='amount'>Total Amount</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        carts.map((data, index) => {
                          return (
                            <>
                              <tr>
                                <td>
                                  <button className='prdct-delete'
                                  onClick={()=>handleDecrement(data.id)}
                                  ><i className='fa fa-trash-alt'></i></button>
                                </td>
                                <td><div className='product-img'><img src={data.imgdata} alt="" /></div></td>
                                <td><div className='product-name'><p>{data.dish}</p></div></td>
                                <td>{data.price}</td>
                                <td>
                                  <div className="prdct-qty-container">
                                    <button className='prdct-qty-btn' type='button'
                                    onClick={data.qnty>1?()=>handleSingleDecrement(data):()=>handleDecrement(data.id)}
                                    >
                                      <i className='fa fa-minus'></i>
                                    </button>
                                    <input type="text" className='qty-input-box' value={data.qnty} disabled name="" id="" />
                                    <button className='prdct-qty-btn' type='button'
                                    onClick={()=>handleIncrement(data)}
                                    >
                                      <i className='fa fa-plus'></i>
                                    </button>
                                  </div>
                                </td>
                                <td className='text-right'>₹ {data.qnty * data.price}</td> 
                              </tr>
                            </>
                          )
                        })
                      }
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>&nbsp;</th>
                        <th colSpan={3}>&nbsp;</th>
                        <th>Items In Cart <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalQuantity} </span></th>  
                        <th className='text-right'>Total Price<span className='ml-2 mr-2'>:</span><span className='text-danger'>₹{totalPrice} </span></th>
                      </tr>
                    </tfoot>
                  </table>
              }
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default CartDetails