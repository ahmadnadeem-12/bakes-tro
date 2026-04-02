import React, { useState, useEffect } from 'react'
import { FaTag } from 'react-icons/fa'
import ProductCard from '../ProductCard/ProductCard'
import { dealsAPI, productAPI } from '../../services/api'
import './DealsSection.css'

const DealsSection = () => {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        // Try to fetch from API, fallback to mock data if API fails
        try {
          const { data } = await dealsAPI.getDeals()
          setDeals(data)
        } catch (apiError) {
          console.log('Using mock deals data')
          // Mock data fallback
          const mockDeals = [
            {
              _id: '1',
              name: "Premium Nan Khatai - Badam",
              price: 1400,
              discountPrice: 1050,
              discount: 25,
              category: "speciality",
              image: "/images/product 1.png",
              description: "Crunchiest Nan Khatai ever with loaded almonds",
              rating: 4.8
            },
            {
              _id: '2',
              name: "Chocolate Party Cupcakes",
              price: 500,
              discountPrice: 375,
              discount: 25,
              category: "cupcakes",
              image: "/images/product 4.png",
              description: "Pack of 6 delicious chocolate cupcakes",
              rating: 4.9
            },
            {
              _id: '3',
              name: "Vanilla Donuts - QT 6",
              price: 600,
              discountPrice: 420,
              discount: 30,
              category: "donuts",
              image: "/images/product 5.png",
              description: "Soft and fluffy donuts with vanilla glaze",
              rating: 4.6
            },
            {
              _id: '4',
              name: "Fudge Brownies",
              price: 650,
              discountPrice: 455,
              discount: 30,
              category: "brownies",
              image: "/images/product 9.png",
              description: "Rich, gooey Belgian chocolate brownies",
              rating: 5.0
            },
            {
              _id: '5',
              name: "Chocolate Chip Cookies",
              price: 450,
              discountPrice: 315,
              discount: 30,
              category: "cookies",
              image: "/images/product 7.png",
              description: "Chunkier chocolate chips in every bite",
              rating: 4.7
            }
          ]
          setDeals(mockDeals)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDeals()
  }, [])

  if (loading) return null

  return (
    <section className="deals-section container">
      <div className="deals-header">
        <div className="deals-title-wrapper">
          <FaTag className="deals-icon" />
          <h2 className="section-title">Hot Deals</h2>
        </div>
        <p className="section-subtitle">Limited time offers on your favorite products</p>
      </div>

      <div className="deals-grid">
        {deals.map((deal) => (
          <div key={deal._id} className="deal-card-wrapper">
            <div className="deal-badge">
              <span className="discount-percent">{deal.discount}%</span>
              <span className="discount-label">OFF</span>
            </div>
            <ProductCard 
              product={{
                ...deal,
                price: deal.discountPrice
              }} 
            />
            <div className="original-price">
              Rs. {deal.price.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DealsSection
