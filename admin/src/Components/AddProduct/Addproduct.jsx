import React, { useState } from 'react'
import './Addproduct.css'
import upload_area from '../../assets/upload_area.svg'
const Addproduct = () => {
  const [image, setImage] = useState(false)
  const imageHandler = (e) => {
    setImage(e.target.files[0])
  }
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  })
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
  }
  const Add_Product = async () => {
    console.log(productDetails)
    let responseData
    let product = productDetails

    let formData = new FormData()
    formData.append('product', image) 

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) => {responseData=data})

    if (responseData.success) {
      product.image = responseData.image_url
      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type' : 'application/json',
        },
        body:JSON.stringify(product)
      })
    } else {
      console.log('FAILED')
    }
  }


  return (
    <div className='add-product'>
      <div className='addproduct-itemfield'>
        <p>Tiêu đề sản phẩm</p>
        <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
      </div>
      <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
          <p>Giá</p>
          <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here' />
        </div>
        <div className='addproduct-itemfield'>
          <p>Giá khuyến mãi</p>
          <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here' />
        </div>
      </div>
      <div className='addproduct-itemfield'>
        <p>Danh mục sản phẩm</p>
        <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
          <option value='men'>Men</option>
          <option value='women'>Women</option>
          <option value='kid'>Kid</option>
        </select>
      </div>
      <div className='addproduct-itemfield'>
        <label htmlFor='file-input'>
          <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' />
        </label>
        <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
      </div>
      <button onClick={() => { Add_Product() }} className='addproduct-btn'>Thêm</button>
    </div>
  )
}

export default Addproduct
