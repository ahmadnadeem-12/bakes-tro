import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { HERO_SLIDES, PRODUCTS, CATEGORIES } from '../../constants/data'
import { productAPI } from '../../services/api'
import ProductCard from '../../components/ProductCard/ProductCard'
import DealsSection from '../../components/DealsSection/DealsSection'
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs'
import Testimonials from '../../components/Testimonials/Testimonials'
import Newsletter from '../../components/Newsletter/Newsletter'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef(null);

  const filterCategories = [
    { id: 'all', name: 'All Products' },
    { id: 'nankhatai', name: 'Nankhatai' },
    { id: 'cakes', name: 'Cakes' },
    { id: 'biscuits', name: 'Biscuits' },
    { id: 'brownies', name: 'Brownies' },
    { id: 'cupcakes', name: 'Cupcakes' },
    { id: 'cookies', name: 'Cookies' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await productAPI.getProducts();
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(PRODUCTS);
        }
      } catch (error) {
        console.log('Using local product data');
        setProducts(PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="hero-swiper"
        >
          {HERO_SLIDES.map((slide, index) => (
            <SwiperSlide key={index}>
              <div 
                className="hero-slide"
                style={{ backgroundImage: `linear-gradient(rgba(62, 31, 13, 0.4), rgba(62, 31, 13, 0.5)), url(${slide.image})` }}
              >
                <div className="container hero-content">
                  <span className="hero-tagline">{slide.tagline}</span>
                  <h1 className="hero-title">{slide.title}</h1>
                  <Link to={slide.link || '/'} className="clay-button hero-cta">
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Featured Products - Quick Showcase */}
      <section className="featured-showcase container">
        <div className="showcase-header">
          <div>
            <h2 className="section-title">Our Fresh Batch</h2>
            <p className="section-subtitle">Every item is sculpted by hand and baked to golden perfection using heritage grains.</p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="category-tabs" ref={sectionRef}>
          {filterCategories.map(cat => (
            <button
              key={cat.id}
              className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {loading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="product-skeleton clay-card">
                <div className="skeleton" style={{ height: '200px', borderRadius: 'var(--radius) var(--radius) 0 0' }}></div>
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="skeleton" style={{ height: '20px', width: '70%' }}></div>
                  <div className="skeleton" style={{ height: '16px', width: '40%' }}></div>
                  <div className="skeleton" style={{ height: '40px', marginTop: '8px' }}></div>
                </div>
              </div>
            ))
          ) : (
            filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="no-products">
            <p>No products found in this category yet.</p>
          </div>
        )}
      </section>

      {/* Deals Section */}
      <DealsSection />

      {/* Ad Banner */}
      <section className="ad-section container">
        <div className="ad-card-container clay-card">
          <div className="ad-image-side">
            <img src="/images/advertisement card.png" alt="Special Offer" className="ad-card-image" />
          </div>
          <div className="ad-content">
            <span className="ad-badge">🔥 Limited Time</span>
            <h3>Weekend Special Deals</h3>
            <p>Get exclusive discounts on our party cupcakes and premium donuts. Up to 30% off on selected items!</p>
            <Link to="/category/deals" className="clay-button">Shop Deals</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}

export default Home
