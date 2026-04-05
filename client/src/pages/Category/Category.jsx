import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PRODUCTS, CATEGORIES } from '../../constants/data'
import { productAPI } from '../../services/api'
import ProductCard from '../../components/ProductCard/ProductCard'
import { FaChevronRight } from 'react-icons/fa'
import './Category.css'

const Category = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');

  const category = CATEGORIES.find(c => c.id === categoryId);
  const categoryName = category?.name || categoryId?.charAt(0).toUpperCase() + categoryId?.slice(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await productAPI.getProducts();
        if (data && data.length > 0) {
          setAllProducts(data);
        } else {
          setAllProducts(PRODUCTS);
        }
      } catch (error) {
        setAllProducts(PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = allProducts;
    
    if (categoryId === 'deals') {
      filtered = allProducts.filter(p => p.isFeatured || p.discount);
    } else if (categoryId === 'speciality') {
      filtered = allProducts.filter(p => p.category === 'nankhatai' || p.category === 'speciality');
    } else if (categoryId !== 'all') {
      filtered = allProducts.filter(p => p.category === categoryId);
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    setProducts(filtered);
  }, [allProducts, categoryId, sortBy]);

  return (
    <div className="category-page">
      <div className="category-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <FaChevronRight />
            <span>{categoryName}</span>
          </div>
          <h1 className="category-page-title">{categoryName}</h1>
          <p className="category-page-subtitle">
            {categoryId === 'deals' && 'Exclusive discounts on your favorite baked goods!'}
            {categoryId === 'nankhatai' && 'Traditional hand-baked Nan Khatai with premium ingredients.'}
            {categoryId === 'cookies' && 'Freshly baked cookies in a variety of flavors.'}
            {categoryId === 'biscuits' && 'Crunchy, crispy biscuits perfect for tea time.'}
            {categoryId === 'cupcakes' && 'Artisan cupcakes with rich frosting and unique flavors.'}
            {categoryId === 'cakes' && 'Custom and ready-made cakes for every occasion.'}
            {categoryId === 'brownies' && 'Rich, fudgy brownies made with Belgian chocolate.'}
            {categoryId === 'donuts' && 'Soft, fluffy donuts with delicious glazes and toppings.'}
            {categoryId === 'speciality' && 'Our signature items crafted with love and tradition.'}
          </p>
        </div>
      </div>

      <div className="container category-content">
        <div className="category-toolbar">
          <span className="results-count">{products.length} products found</span>
          <div className="sort-wrapper">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="products-grid">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="product-skeleton clay-card">
                <div className="skeleton" style={{ height: '200px', borderRadius: 'var(--radius) var(--radius) 0 0' }}></div>
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="skeleton" style={{ height: '20px', width: '70%' }}></div>
                  <div className="skeleton" style={{ height: '16px', width: '40%' }}></div>
                  <div className="skeleton" style={{ height: '40px', marginTop: '8px' }}></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-category">
            <div className="empty-icon">🍰</div>
            <h3>No Products Yet</h3>
            <p>We're preparing fresh batches for this category. Check back soon!</p>
            <Link to="/" className="clay-button">Browse All Products</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Category
