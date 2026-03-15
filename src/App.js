import { useState, useEffect, useRef } from "react";
import './App.css';

function useVisible() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Fade({ children, className = "" }) {
  const [ref, visible] = useVisible();
  return (
    <div ref={ref} className={`fade ${visible ? "fade-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Modal({ onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", service: "Wash & Fold", date: "" });
  const [done, setDone] = useState(false);
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = () => {
    if (!form.name || !form.phone || !form.address || !form.date) return alert("Please fill all fields!");
    setDone(true);
  };
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        {done ? (
          <div className="done">
            <div className="done-icon">🎉</div>
            <h2>Booking Confirmed!</h2>
            <p>Hi <b>{form.name}</b>! We'll call <b>{form.phone}</b> to confirm your pickup on <b>{form.date}</b>.</p>
            <p className="done-sub">Sit back and relax — we'll handle the rest! 😊</p>
            <button className="btn" onClick={onClose}>Done ✅</button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>📅 Book a Pickup</h2>
              <p>We'll come to you. Fill in your details below.</p>
            </div>
            <div className="form-group">
              <label>👤 Full Name</label>
              <input placeholder="e.g. John Kamau" value={form.name} onChange={e => update("name", e.target.value)} />
            </div>
            <div className="form-group">
              <label>📞 Phone Number</label>
              <input placeholder="e.g. 0712 345 678" value={form.phone} onChange={e => update("phone", e.target.value)} />
            </div>
            <div className="form-group">
              <label>📍 Pickup Address</label>
              <input placeholder="e.g. Westlands, Nairobi" value={form.address} onChange={e => update("address", e.target.value)} />
            </div>
            <div className="form-group">
              <label>🧺 Service</label>
              <select value={form.service} onChange={e => update("service", e.target.value)}>
                <option>Wash & Fold</option>
                <option>Wash & Iron</option>
                <option>Dry Cleaning</option>
                <option>Premium Package</option>
              </select>
            </div>
            <div className="form-group">
              <label>🗓️ Pickup Date</label>
              <input type="date" value={form.date} onChange={e => update("date", e.target.value)} />
            </div>
            <button className="btn full" onClick={submit}>Confirm Booking 🚀</button>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [modal, setModal] = useState(false);
  const open = () => setModal(true);
  const close = () => setModal(false);

  const ticker = ["👕 Wash & Fold", "👔 Wash & Iron", "✨ Dry Cleaning", "🏠 Bedding & Linen", "🚚 Free Pickup & Delivery", "⚡ 24hr Turnaround", "🌍 Serving Nairobi", "📱 SMS Updates", "⭐ 5 Star Service", "💧 Eco Friendly"];

  return (
    <div className="app">
      {modal && <Modal onClose={close} />}

      <a href="https://wa.me/254792570400?text=Hi%20Spin%20Laundry!%20I%20would%20like%20to%20book%20a%20pickup." className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
        <span>Book via WhatsApp</span>
      </a>

      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>

      <nav className="nav">
        <div className="nav-logo">
          <div className="logo-stack">
            <span className="logo-top">SPIN</span>
            <span className="logo-bottom">LAUNDRY</span>
          </div>
        </div>
        <ul className="nav-menu">
          <li className="nav-phone"><a href="tel:+254792570400">📞 0792 570 400</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><button className="btn" onClick={open}>Book Now</button></li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <span className="pill">🌍 Serving Nairobi & Beyond</span>
          <div className="hero-rating">
            <span>⭐⭐⭐⭐⭐</span>
            <span className="rating-text">Rated 4.9/5 by over 2,000 Nairobi customers</span>
          </div>
          <h1>Laundry Done.<br /><span className="accent">Delivered Fresh.</span></h1>
          <p>Drop the stress, not your standards. We pick up your clothes, clean them professionally, and deliver them back fresh — all within 24 hours.</p>
          <div className="hero-actions">
            <button className="btn lg pulse" onClick={open}>📅 Schedule a Pickup — It's Free!</button>
            <a href="#how" className="link-btn">See how it works →</a>
          </div>
          <div className="trust-bar">
            <div className="trust-item">
              <span className="trust-num">2,000+</span>
              <span>Happy Customers</span>
            </div>
            <div className="divider" />
            <div className="trust-item">
              <span className="trust-num">24hrs</span>
              <span>Turnaround Time</span>
            </div>
            <div className="divider" />
            <div className="trust-item">
              <span className="trust-num">4.9 ⭐</span>
              <span>Average Rating</span>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <img src="https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=700&q=80" alt="Laundry Service" />
          <div className="hero-float">✅ Free Pickup & Delivery</div>
        </div>
      </section>

      <section className="how" id="how">
        <Fade className="section-title">
          <span className="pill">Simple Process</span>
          <h2>How It Works</h2>
          <p>Three easy steps to fresh, clean clothes</p>
        </Fade>
        <div className="steps">
          {[
            { n: "01", icon: "📅", title: "Schedule Pickup", desc: "Book online in seconds. Choose your date, time and address. We come to you." },
            { n: "02", icon: "🧺", title: "We Clean", desc: "We collect your clothes and clean them professionally using eco-friendly detergents." },
            { n: "03", icon: "🚚", title: "Delivered Fresh", desc: "Clean, fresh clothes delivered back to your door within 24 hours. SMS updates included." },
          ].map((s, i) => (
            <Fade key={i} className="step">
              <div className="step-num">{s.n}</div>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Fade>
          ))}
        </div>
      </section>

      <section className="services" id="services">
        <Fade className="section-title">
          <span className="pill">What We Offer</span>
          <h2>Our Services</h2>
          <p>Professional care for every type of clothing</p>
        </Fade>
        <div className="service-grid">
          {[
            { icon: "🫧", title: "Wash & Fold", desc: "Machine washed, tumble dried and neatly folded for you.", img: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&q=80" },
            { icon: "👔", title: "Wash & Iron", desc: "Washed and pressed to perfection. Ready to wear.", img: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400&q=80" },
            { icon: "✨", title: "Dry Cleaning", desc: "Specialist care for suits, dresses and delicate fabrics.", img: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&q=80" },
            { icon: "🏠", title: "Bedding & Linen", desc: "Duvets, bedsheets and towels cleaned and freshened up.", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80" },
          ].map((s, i) => (
            <Fade key={i} className="service-card">
              <img src={s.img} alt={s.title} />
              <div className="service-body">
                <span className="service-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <button className="outline-btn" onClick={open}>Book Now →</button>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      <section className="pricing" id="pricing">
        <Fade className="section-title">
          <span className="pill">Transparent Pricing</span>
          <h2>Simple, Fair Pricing</h2>
          <p>No hidden charges. Pay only for what you need.</p>
        </Fade>
        <div className="price-grid">
          {[
            { name: "Basic", price: "Ksh 500", kg: "Up to 5kg", features: ["Wash & Fold", "Free Pickup", "Free Delivery", "24hr Turnaround"], popular: false },
            { name: "Standard", price: "Ksh 900", kg: "Up to 10kg", features: ["Wash & Iron", "Free Pickup", "Free Delivery", "Priority Service", "SMS Updates"], popular: true },
            { name: "Premium", price: "Ksh 1,500", kg: "Unlimited", features: ["Full Service", "Dry Cleaning", "Bedding Included", "Same Day Option", "SMS Updates"], popular: false },
          ].map((p, i) => (
            <Fade key={i} className={`price-card ${p.popular ? "popular" : ""}`}>
              {p.popular && <div className="popular-tag">Most Popular ⭐</div>}
              <h3>{p.name}</h3>
              <div className="price-amount">{p.price}</div>
              <div className="price-kg">{p.kg}</div>
              <ul className="price-features">
                {p.features.map((f, j) => (
                  <li key={j}><span className="check">✓</span> {f}</li>
                ))}
              </ul>
              <button className={p.popular ? "btn full" : "outline-btn full"} onClick={open}>Get Started</button>
            </Fade>
          ))}
        </div>
      </section>

      <Fade className="why-us">
        <div className="why-text">
          <span className="pill">Why Choose Us</span>
          <h2>We Make Laundry<br /><span className="accent">Effortless</span></h2>
          <div className="why-list">
            {[
              { icon: "⚡", title: "Fast 24hr Turnaround", desc: "Your clothes cleaned and back at your door within 24 hours guaranteed." },
              { icon: "🌿", title: "Eco Friendly Products", desc: "We use green, safe detergents that are kind to your clothes and the environment." },
              { icon: "🔒", title: "Safe & Insured", desc: "Every item in our care is fully tracked and insured for your peace of mind." },
              { icon: "📱", title: "SMS Order Updates", desc: "Get real time SMS updates at every stage — pickup, cleaning and delivery." },
            ].map((w, i) => (
              <div key={i} className="why-item">
                <span className="why-icon">{w.icon}</span>
                <div>
                  <h4>{w.title}</h4>
                  <p>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="why-image">
          <img src="https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&q=80" alt="Why choose us" />
        </div>
      </Fade>

      <section className="reviews" id="reviews">
        <Fade className="section-title">
          <span className="pill">Customer Reviews</span>
          <h2>What Nairobi Is Saying</h2>
          <p>Real feedback from real customers across Nairobi</p>
        </Fade>
        <div className="review-grid">
          {[
            { name: "Amina Wanjiru", location: "Westlands, Nairobi", text: "Spin Laundry has completely changed my week! My clothes came back spotless and perfectly ironed. The pickup was on time and the driver was very professional.", stars: 5 },
            { name: "Brian Otieno", location: "Kilimani, Nairobi", text: "I was skeptical at first but wow — these guys are serious. My work suits came back looking brand new. Fast, reliable and very affordable for the quality.", stars: 5 },
            { name: "Grace Muthoni", location: "Kasarani, Nairobi", text: "As a busy mum of three, Spin Laundry has been a lifesaver. I book on Monday and by Tuesday evening everything is back clean and folded. Highly recommend!", stars: 5 },
          ].map((r, i) => (
            <Fade key={i} className="review-card">
              <div className="stars">{"⭐".repeat(r.stars)}</div>
              <p>"{r.text}"</p>
              <div className="reviewer">
                <div className="avatar">{r.name[0]}</div>
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.location}</span>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      <Fade className="cta-banner">
        <h2>Ready for Fresh Clothes? 🧺</h2>
        <p>Join thousands of Nairobi customers who trust Spin Laundry every week</p>
        <button className="btn lg white" onClick={open}>Book Your First Pickup 🚀</button>
      </Fade>

      <footer className="footer" id="contact">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo-stack">
              <span className="logo-top">SPIN</span>
              <span className="logo-bottom-footer">LAUNDRY</span>
            </div>
            <p>Nairobi's most trusted on-demand laundry service. Fresh clothes, zero effort.</p>
          </div>
          <div>
            <h4>Services</h4>
            <a href="#services">Wash & Fold</a>
            <a href="#services">Wash & Iron</a>
            <a href="#services">Dry Cleaning</a>
            <a href="#services">Bedding & Linen</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#how">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#reviews">Reviews</a>
          </div>
          <div>
            <h4>Contact</h4>
            <p>📍 Nairobi, Kenya</p>
            <p>📞 0792 570 400</p>
            <p>✉️ nimoh@spinlaundry.co.ke</p>
            <p>🕐 Mon–Sat, 7am–8pm</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Spin Laundry. All rights reserved. Made with ❤️ in Nairobi</p>
        </div>
      </footer>
    </div>
  );
}