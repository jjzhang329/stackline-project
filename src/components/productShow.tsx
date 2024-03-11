import React, { useEffect } from 'react'; 
import { useDispatch,useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchProduct } from '../actions/productActions';
import ProductSalesTable from './producSalesTable';
import '../styles/product.css'

const ProductComponent: React.FC<{ productId: string }> = ({ productId }) => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchProduct(productId));
    }, [dispatch, productId]); 

    const product = useSelector((state: RootState) => state.product.product);
    

    return (
        <div className="product">
            {product ? (
                <>
                    <div className="product-details">
                        <img className='product-image'src={product.image} alt={product.title} />
                        <h2>{product.title}</h2>
                        <p>{product.subtitle}</p>
                        <div className='product-tags'>
                            {product.tags.map((tag, index) => (
                                <div key={index}>{tag}</div>
                            ))}
                        </div>
                    </div>
                    <ProductSalesTable salesData={product.sales}/>
                </>
            ) : (
                <p>Loading product...</p>
            )}
        </div>
    );
};

export default ProductComponent;