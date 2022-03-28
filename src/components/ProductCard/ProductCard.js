import React from 'react';
import {CloseCircleOutlined} from "@ant-design/icons";
import './style.css';

const ProductCard = ({title, price, image, remove}) => {
  return (
    <div className='productCard'>
      <div className="imageContainer">
        <img src={image} alt="product"/>
      </div>
      <h3>{title}</h3>
      <p>Price: {price}</p>
      <CloseCircleOutlined
        className='removeBtn'
        onClick={remove}
        size='large'
        style={{color:'red'}}/>
    </div>
  );
};

export default ProductCard;
