import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_product = async () => {
        let responseData;
        let product = { ...productDetails }; // Create a copy to avoid mutating state directly

        // Create a FormData object and append the image file
        let formData = new FormData();
        formData.append('product', image);

        try {
            // Send a POST request to upload the image
            const response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData
            });

            // Parse the JSON response
            responseData = await response.json();

            // If the upload was successful, update the product image URL
            if (responseData.success) {
                product.image = responseData.image_url;
            } else {
                console.error('Image upload failed:', responseData.error);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }

        console.log(product); // Log the product details

        await fetch('http://localhost:4000/addproduct',{
            method: 'POST',
            headers:{
                Accept:'application/json',
                'content-Type':'application/json',
            },
            body:JSON.stringify(product),
        }).then((resp)=>resp.json()).then((data)=>{
            data.success?alert("Product Added"):alert("Failed")
        })
    };

    return (
        <div className='addproduct'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type Here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>OfferPrice</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type Here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={Add_product} className='addproduct-btn'>ADD</button>
        </div>
    );
};

export default AddProduct;
