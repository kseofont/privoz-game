import React from 'react';

const Product = ({ product }) => {
    // Check if product exists and has the necessary properties
    if (!product || !product.image) {
        // Return null or a placeholder if product data is incomplete
        return null;
    }
    console.log('product', product);

    return (
        <div className="card">
            {/* Check if image exists before rendering */}
            {product.image && (
                <img src={`img/${product.image}`} className="card-img-top" alt={product.name} />
            )}
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Description: {product.description}</p>
                <p className="card-text">Price: ${product.buy_price}</p>
                <p className="card-text">Sector: {product.sector.name}</p>
                <p className="card-text">Quantity: {product.qty}</p>
                {/* Add more details as needed */}
            </div>
        </div>
    );
};

export default Product;
