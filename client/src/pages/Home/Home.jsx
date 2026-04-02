import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { HERO_SLIDES } from '../../constants/data'
import { productAPI } from '../../services/api'
import ProductCard from '../../components/ProductCard/ProductCard'
import './Home.css'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await productAPI.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          loop={true}
          className="hero-swiper"
        >
          {HERO_SLIDES.map((slide, index) => (
            <SwiperSlide key={index}>
              <div 
                className="hero-slide"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${slide.image})` }}
              >
                <div className="container hero-content">
                  <h4 className="hero-tagline fade-in">{slide.tagline}</h4>
                  <h1 className="hero-title fade-in">{slide.title}</h1>
                  <button className="clay-button hero-cta fade-in">
                    {slide.cta}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Categories / Deals Section */}
      <section className="featured-section container">
        <h2 className="section-title">Freshly Baked Essentials</h2>
        <p className="section-subtitle">Experience the authentic taste of Faisalabad's finest bakery.</p>
        
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Ad Section */}
      <section className="ad-section container">
        <div className="ad-card-container clay-card fade-in">
          <img src="/images/advertisement card.png" alt="Special Offer" className="ad-card-image" />
          <div className="ad-content">
            <h3>Weekend Special Deals</h3>
            <p>Get exclusive discounts on our party cupcakes and premium donuts. Limited time only!</p>
            <button className="clay-button">Shop Deals</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
