import React from 'react'
import { FaTruck, FaLeaf, FaSmile, FaClock } from 'react-icons/fa'
import './WhyChooseUs.css'

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaTruck className="feature-icon" />,
      title: "Fast Delivery",
      description: "Same-day delivery available in Faisalabad for orders placed before 2 PM"
    },
    {
      id: 2,
      icon: <FaLeaf className="feature-icon" />,
      title: "Premium Ingredients",
      description: "We use only the finest, freshest ingredients sourced locally and internationally"
    },
    {
      id: 3,
      icon: <FaSmile className="feature-icon" />,
      title: "Customer Satisfaction",
      description: "Over 10,000+ happy customers trust us for their special occasions"
    },
    {
      id: 4,
      icon: <FaClock className="feature-icon" />,
      title: "Fresh Baked Daily",
      description: "All items are freshly baked daily in our certified kitchen"
    }
  ]

  return (
    <section className="why-choose-us container">
      <div className="section-header">
        <h2 className="section-title">Why Choose Bakestro?</h2>
        <p className="section-subtitle">We're committed to excellence in every bite</p>
      </div>

      <div className="features-grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card clay-card">
            <div className="feature-icon-wrapper">
              {feature.icon}
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WhyChooseUs
