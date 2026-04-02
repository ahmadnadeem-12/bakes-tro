import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa'
import './Testimonials.css'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Ayesha Khan",
      title: "Happy Customer",
      content: "The quality of Bakestro's baked goods is exceptional! I've been ordering for my family gatherings for over a year now. Their Nan Khatai is the best in Faisalabad.",
      rating: 5,
      image: "/images/avatar1.png"
    },
    {
      id: 2,
      name: "Muhammad Ali",
      title: "Corporate Client",
      content: "We order from Bakestro for all our office events. The delivery is always on time and the products are fresh. Highly recommend!",
      rating: 5,
      image: "/images/avatar2.png"
    },
    {
      id: 3,
      name: "Fatima Saeed",
      title: "Wedding Planner",
      content: "Bakestro provided custom cakes for my client's wedding. The presentation and taste were outstanding. They are very professional!",
      rating: 5,
      image: "/images/avatar3.png"
    },
    {
      id: 4,
      name: "Hassan Raza",
      title: "Regular Customer",
      content: "Love the variety of products. From traditional Khatai to modern cupcakes, everything is delicious. The customer service is excellent too.",
      rating: 4,
      image: "/images/avatar4.png"
    }
  ]

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="testimonials container">
      <div className="section-header">
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-subtitle">Real feedback from real customers who love Bakestro</p>
      </div>

      <div className="testimonials-carousel">
        <div className="testimonial-card clay-card fade-in">
          <div className="testimonial-stars">
            {[...Array(currentTestimonial.rating)].map((_, i) => (
              <FaStar key={i} className="star active" />
            ))}
          </div>
          
          <p className="testimonial-content">"{currentTestimonial.content}"</p>
          
          <div className="testimonial-author">
            <div className="author-image-placeholder"></div>
            <div className="author-info">
              <h4 className="author-name">{currentTestimonial.name}</h4>
              <p className="author-title">{currentTestimonial.title}</p>
            </div>
          </div>
        </div>

        <div className="carousel-controls">
          <button 
            className="carousel-btn prev" 
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>
          
          <div className="carousel-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            className="carousel-btn next" 
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
