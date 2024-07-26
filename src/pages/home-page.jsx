import { Button } from "components/button";

// image imports
import bruschettaImage from "src/assets/bruschetta.jpg";
import greekSaladImage from "src/assets/greek-salad.jpg";
import heroImage from "src/assets/hero-image.jpg";
import lemonDessertImage from "src/assets/lemon-dessert.jpg";

import sarahJohnsonImage from "src/assets/sarah-johnson.jpg";
import michaelThompsonImage from "src/assets/michael-thompson.jpg";
import emilyDavisImage from "src/assets/emily-davis.jpg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const specials = [
  {
    name: "Greek Salad",
    desc: "The famous greek salad of crispy lettuce, peppers, olives, and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    price: 12.99,
    img: greekSaladImage,
  },
  {
    name: "Bruschetta",
    desc: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
    price: 5.99,
    img: bruschettaImage,
  },
  {
    name: "Lemon Dessert",
    desc: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    price: 4.99,
    img: lemonDessertImage,
  },
];

const testimonials = [
  {
    img: sarahJohnsonImage,
    name: "Sarah Johnson",
    rating: 5,
    review:
      "Little Lemon is a gem in Chicago! The salads are a perfect blend of flavors and textures, and the cheese is simply to die for. The ambiance is warm and welcoming, making it a great spot for family dinners. Highly recommend!",
  },
  {
    img: michaelThompsonImage,
    name: "Michael Thompson",
    rating: 4,
    review:
      "I had a wonderful experience at Little Lemon. The appetizers were crispy and flavorful, just like how they should be. The modern twist on traditional Mediterranean dishes is a delightful touch. My only complaint is that it gets a bit crowded on weekends, but it's worth the wait!",
  },
  {
    img: emilyDavisImage,
    name: "Emily Davis",
    rating: 5,
    review:
      "Little Lemon's desserts are an absolute must-try! They reminded me of my grandmother's desserts, so authentic and delicious. The staff is friendly, and the service is excellent. I can't wait to come back and try more dishes!",
  },
];

function SpecialCard({ special }) {
  return (
    <article className="special-card">
      <div className="special-card-content">
        <hgroup className="special-card-header">
          <h3 className="special-card-name">{special.name}</h3>
          <p className="special-card-price">{special.price}</p>
        </hgroup>
        <p className="special-card-copy">{special.desc}</p>
        <Button className="special-card-cta">Order a delivery</Button>
      </div>
      <div className="special-card-image">
        <img src={special.img} alt={"Image of " + special.name} />
      </div>
    </article>
  );
}

function SpecialsSection() {
  const ref = useRef();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#specials") {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <section ref={ref} id="specials" className="specials outer-wrapper">
      <div className="inner-wrapper">
        <hgroup>
          <div className="specials-header-row inner-wrapper">
            <h2 className="header">Specials</h2>
            <Button className="specials-cta">Online Menu</Button>
          </div>
        </hgroup>
        <div className="specials-item-row">
          {specials.map((special) => (
            <SpecialCard key={special.name} special={special} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#about") {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <section ref={ref} id="about" className="about outer-wrapper">
      <div className="inner-wrapper">
        <div>
          <hgroup className="about-header">
            <h1 className="about-title">Little Lemon</h1>
            <h2 className="about-subtitle">Chicago</h2>
          </hgroup>
          <p>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </p>
        </div>
        <div>{/* About Image */}</div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero outer-wrapper">
        <div className="inner-wrapper">
          <hgroup className="hero-header">
            <h1 className="hero-title">Little Lemon</h1>
            <h2 className="hero-subtitle">Chicago</h2>
          </hgroup>
          <div className="hero-content">
            <p className="hero-copy">
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </p>
            <Button className="hero-cta">
              <Link style={{ textDecoration: "none" }} to="booking">
                Reserve a Table
              </Link>
            </Button>
          </div>
          <div className="hero-image">
            <img src={heroImage} alt="Hero Image" />
          </div>
        </div>
      </section>

      {/* Highlights and specials */}
      <SpecialsSection />

      {/* Testimonials */}
      <section className="testimonials outer-wrapper">
        <div className="inner-wrapper">
          <h2 className="header">Testimonials</h2>
          <div className="testimonial-row">
            {testimonials.map((testimonial) => (
              <article className="testimonial" key={testimonial.name}>
                <div className="testimonial-contributor-image">
                  <img
                    src={testimonial.img}
                    alt={"Photo of " + testimonial.name}
                  />
                </div>
                <div className="testimonial-contributor-name">
                  {testimonial.name}
                </div>
                <div className="testimonial-rating">
                  {testimonial.rating}
                  {"⭐".repeat(testimonial.rating)}
                </div>
                <p className="testimonial-review">{testimonial.review}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Little Lemon */}
      <AboutSection />
    </>
  );
}
