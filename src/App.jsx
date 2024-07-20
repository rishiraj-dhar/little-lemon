import bruschettaImage from "src/assets/bruschetta.jpg";
import greekSaladImage from "src/assets/greek-salad.jpg";
import heroImage from "src/assets/hero-image.jpg";
import lemonDessertImage from "src/assets/lemon-dessert.jpg";

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

function App() {
  return (
    <>
      {/* Navigation bar */}
      <header>
        <span>
          <img src="/little-lemon-wordmark.svg" alt="Little Lemon Logo" />
        </span>
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Menu</li>
            <li>Reservations</li>
            <li>Order online</li>
            <li>Login</li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section>
        <div>
          <hgroup>
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
          </hgroup>
          <p>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </p>
          <button>Reserve a Table</button>
        </div>
        <div>
          <img src={heroImage} alt="Hero Image" />
        </div>
      </section>

      {/* Highlights and specials */}
      <section>
        <hgroup>
          <h2>Specials</h2>
          <button>Online Menu</button>
        </hgroup>
        <div>
          {specials.map((special, index) => (
            <article key={index}>
              <div>
                <hgroup>
                  <h3>{special.name}</h3>
                  <p>{special.price}</p>
                </hgroup>
                <p>{special.desc}</p>
                <button>Order a delivery</button>
              </div>
              <div>
                <img src={special.img} alt={"Image of " + special.name} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h2>Testimonials</h2>
        <div>
          <article>
            <h3>Rating 01</h3>
            <div>
              <span>Image here</span>
              <span>Name 01</span>
            </div>
            <p>
              Review goes here... Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </article>
          <article>
            <h3>Rating 02</h3>
            <div>
              <span>Image here</span>
              <span>Name 02</span>
            </div>
            <p>
              Review goes here... Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </article>
          <article>
            <h3>Rating 03</h3>
            <div>
              <span>Image here</span>
              <span>Name 03</span>
            </div>
            <p>
              Review goes here... Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </article>
        </div>
      </section>

      {/* About Little Lemon */}
      <section>
        <div>
          <hgroup>
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
          </hgroup>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div>{/* About Image */}</div>
      </section>

      {/* Footer */}
      <footer>
        <div>
          <img src="/little-lemon-wordmark.svg" alt="Little Lemon Logo" />
        </div>
        <div>
          <div>
            <h3>Doormat Links</h3>
            <nav>
              <ul>
                <li>Home</li>
                <li>About</li>
                <li>Menu</li>
                <li>Reservations</li>
                <li>Order online</li>
                <li>Login</li>
              </ul>
            </nav>
          </div>
          <div>
            <h3>Contact Us</h3>
            <p>Address</p>
            <p>Phone Number</p>
            <p>Email</p>
          </div>
          <div>
            <h3>Social Media Links</h3>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>X</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
