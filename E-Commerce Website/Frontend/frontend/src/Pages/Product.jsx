import React, { useContext } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams

// Import ShopContext from correct path
import { ShopContext } from '../Context/ShopContext';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import Productdisplay from '../Components/ProductDisplay/Productdisplay';
import DescriptionBox from '../Components/Descriptionbox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';



const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams(); // Use useParams

  // Find the product by ID
  const product = all_product.find((e) => e.id === Number(productId));

  return (
    <div>
      <Breadcrum product={product}/>
      <Productdisplay product={product} />
      <DescriptionBox/>
      <RelatedProducts/>

    </div>
  );
};

export default Product;
