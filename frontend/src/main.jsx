import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Sunday Table home">
        <span className="brand-mark">S</span> sunday table
      </a>
      <nav aria-label="Main navigation">
        <a href="#menu">Menu</a>
        <a href="#reserve">Reservations</a>
        <a href="#contact">Contact</a>
        <a href="#story">Our table</a>
        <a className="nav-button" href="#menu">Explore dishes <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><span /> FRESH FROM OUR LITTLE KITCHEN</p>
        <h1>Good food.<br /><em>Good mood.</em></h1>
        <p className="hero-description">A cozy corner for colorful plates, comforting favorites, and the joy of sharing a meal.</p>
        <a className="primary-button" href="#menu">See what's cooking <span aria-hidden="true">↓</span></a>
        <div className="hero-note"><span className="note-icon">✳</span><span>Made with care,<br />served with a smile.</span></div>
      </div>
      <div className="hero-art" role="img" aria-label="Illustration of a sunny plate of food">
        <div className="sun" /><div className="plate-shadow" />
        <div className="plate"><div className="plate-center"><span className="leaf leaf-one" /><span className="leaf leaf-two" /><span className="tomato tomato-one" /><span className="tomato tomato-two" /><span className="pasta">〰</span></div></div>
        <span className="art-spark spark-one">✳</span><span className="art-spark spark-two">✦</span>
        <div className="art-caption">a little bit<br />of sunshine</div>
      </div>
    </section>
  );
}

function DishCard({ dish }) {
  return (
    <article className={`dish-card dish-${dish.color}`}>
      <div className="dish-art" aria-hidden="true"><span>{dish.emoji}</span></div>
      <div className="dish-info">
        <div><p className="dish-type">{dish.category}</p><h3>{dish.name}</h3></div>
        <span className="price">${dish.price}</span>
      </div>
      <p className="dish-description">{dish.description}</p>
    </article>
  );
}

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/dishes")
      .then((response) => {
        if (!response.ok) throw new Error("The menu could not be loaded.");
        return response.json();
      })
      .then(setDishes)
      .catch(() => setError("The menu couldn't load. Make sure the Python server is running."));
  }, []);

  return (
    <section className="menu-section" id="menu">
      <div className="section-heading">
        <div><p className="eyebrow">THE CROWD PLEASERS</p><h2>A seat at our table</h2></div>
        <p>Simple ingredients, happy plates.<br />Pick your next favorite.</p>
      </div>
      {error ? <p className="menu-message">{error}</p> : dishes.length === 0 ? <p className="menu-message">Loading the menu…</p> : (
        <div className="menu-grid">{dishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}</div>
      )}
    </section>
  );
}

function Story() {
  return (
    <section className="story" id="story">
      <div className="story-stamp">✳<br /><small>EST.<br />WITH LOVE</small></div>
      <div><p className="eyebrow">A NOTE FROM OUR KITCHEN</p><h2>Food tastes better<br />when we share it.</h2></div>
      <p>Sunday Table is a little reminder to slow down, gather around, and make room for one more bite—and one more friend.</p>
    </section>
  );
}

function Contact() {
  const [message, setMessage] = useState("");

  async function sendMessage(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      setMessage(result.message);
      if (response.ok) form.reset();
    } catch {
      setMessage("Could not reach the Python server. Make sure it is running.");
    }
  }

  return (
    <section className="forms-section" id="contact">
      <div className="form-intro"><p className="eyebrow">SAY HELLO</p><h2>We'd love to hear from you.</h2><p>Questions, ideas, or just want to say hi? Send us a note.</p></div>
      <form className="site-form" onSubmit={sendMessage}>
        <label>Your name<input name="name" required placeholder="Alex" /></label>
        <label>Email address<input name="email" type="email" required placeholder="alex@example.com" /></label>
        <label>Your message<textarea name="message" required rows="4" placeholder="Write your note here…" /></label>
        <button className="primary-button" type="submit">Send message <span aria-hidden="true">↗</span></button>
        <p className="form-message" aria-live="polite">{message}</p>
      </form>
    </section>
  );
}

function Reservation() {
  const [message, setMessage] = useState("");

  async function requestTable(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      setMessage(result.message);
      if (response.ok) form.reset();
    } catch {
      setMessage("Could not reach the Python server. Make sure it is running.");
    }
  }

  return (
    <section className="reservation-section" id="reserve">
      <div><p className="eyebrow">SAVE YOURSELF A SEAT</p><h2>Gather around<br />the table.</h2><p>Choose a day and time to request a table.</p></div>
      <form className="site-form reservation-form" onSubmit={requestTable}>
        <label>Your name<input name="name" required placeholder="Alex" /></label>
        <div className="form-row"><label>Date<input name="date" type="date" required /></label><label>Time<input name="time" type="time" required /></label></div>
        <label>Number of guests<select name="guests" defaultValue="2" required><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option><option value="6">6 guests</option></select></label>
        <button className="primary-button" type="submit">Request a table <span aria-hidden="true">↗</span></button>
        <p className="form-message" aria-live="polite">{message}</p>
      </form>
    </section>
  );
}

function App() {
  return <><Header /><main><Hero /><Menu /><Story /><Reservation /><Contact /></main><footer><a className="brand" href="#top"><span className="brand-mark">S</span> sunday table</a><p>Come hungry. Leave happy. <span>© 2026 Sunday Table</span></p></footer></>;
}

createRoot(document.getElementById("root")).render(<App />);
