import React, { useState, useEffect, useRef } from 'react';

const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// SVG Icons to replace emojis
const Icons = {
  Star: () => <svg className="w-4 h-4 text-yp-gold fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Phone: () => <svg className="w-5 h-5 text-yp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>,
  Message: () => <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>,
  Mail: () => <svg className="w-5 h-5 text-yp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  MapPin: () => <svg className="w-5 h-5 text-yp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  Ring: () => <svg className="w-10 h-10 text-yp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1"><circle cx="12" cy="14" r="6" /><path d="M10 8l2-3 2 3h-4z" /></svg>,
  Palette: () => <svg className="w-10 h-10 text-yp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.16-.62-1.58-.33-.35-.55-.83-.55-1.35 0-1.07.87-1.95 1.95-1.95h2.15c2.6 0 4.75-2.15 4.75-4.75C22 7.03 17.52 2 12 2z" /></svg>,
  Clipboard: () => <svg className="w-10 h-10 text-yp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isMenuOpen]);

  const faqs = [
    { q: "Do you only plan weddings?", a: "No - while weddings are our specialty, we also plan corporate events, engagements, birthdays, and other celebrations." },
    { q: "Do you provide decor services?", a: "Yes, our in-house design team handles everything from concept to execution, including florals, lighting, and themed setups." },
    { q: "Can you manage destination events?", a: "Absolutely. We have extensive experience managing destination weddings across India and internationally." }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-cream-bg text-gray-800">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-cream-bg/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <div className="flex-shrink-0 cursor-pointer">
              <h1 className={`text-2xl font-bold tracking-widest font-[Playfair_Display] transition-colors duration-300 ${scrolled || isMenuOpen ? 'text-yp-gold' : 'text-white'}`}>MAANGALAM</h1>
            </div>
            
            <div className="hidden lg:flex space-x-8">
              {['Home', 'Services', 'Portfolio', 'Concepts', 'About Us', 'Contact Us'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className={`text-xs uppercase tracking-widest font-medium transition-colors duration-300 ${scrolled ? 'text-gray-800 hover:text-yp-gold' : 'text-white hover:text-yp-gold'}`}>
                  {item}
                </a>
              ))}
            </div>

            <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="flex flex-col space-y-1.5">
                <span className={`block w-6 h-[2px] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2 bg-white' : (scrolled ? 'bg-gray-800' : 'bg-white')}`}></span>
                <span className={`block w-6 h-[2px] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : (scrolled ? 'bg-gray-800' : 'bg-white')}`}></span>
                <span className={`block w-6 h-[2px] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2 bg-white' : (scrolled ? 'bg-gray-800' : 'bg-white')}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}></div>
      <div className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-yp-dark z-50 transform transition-transform duration-500 lg:hidden flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-8 pt-24 pb-8 flex flex-col h-full">
          <div className="space-y-6 flex flex-col">
            {['Home', 'Services', 'Portfolio', 'Concepts', 'About Us', 'Contact Us'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setIsMenuOpen(false)} className="text-white hover:text-yp-gold text-lg font-[Playfair_Display] tracking-wider transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="mt-12 space-y-4">
            <button className="w-full border border-green-500 text-green-400 py-3 rounded flex items-center justify-center space-x-2"><Icons.Message /><span>Chat with us</span></button>
            <button className="w-full bg-yp-gold text-white py-3 rounded">Get a Quote</button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black">
          <img src="/images/hero.jpg" alt="Luxury Wedding" className="w-full h-full object-cover opacity-60" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <FadeInSection delay={0}>
            <h2 className="text-4xl md:text-6xl font-bold text-white font-[Playfair_Display] mb-6 leading-tight">Creating Extraordinary Celebrations, End To End</h2>
          </FadeInSection>
          <FadeInSection delay={200}>
            <p className="text-sm md:text-lg text-gray-200 mb-10 tracking-wide font-light">From planning and design to flawless execution, we manage every detail so you can focus on making memories.</p>
          </FadeInSection>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-yp-gold py-8 relative z-20 -mt-10 mx-6 lg:mx-24 rounded shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-center text-white px-8">
           <div className="text-center"><div className="text-3xl font-[Playfair_Display]">1000+</div><div className="text-[10px] uppercase tracking-widest mt-2">Events Done</div></div>
           <div className="hidden md:block w-px h-10 bg-white/30"></div>
           <div className="text-center"><div className="text-3xl font-[Playfair_Display]">12+</div><div className="text-[10px] uppercase tracking-widest mt-2">Years</div></div>
           <div className="hidden md:block w-px h-10 bg-white/30"></div>
           <div className="text-center"><div className="text-3xl font-[Playfair_Display]">100+</div><div className="text-[10px] uppercase tracking-widest mt-2">Trusted Vendors</div></div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
        <FadeInSection><div className="text-center mb-16">
          <h3 className="text-xs uppercase tracking-widest text-yp-gold mb-4 font-semibold">Services</h3>
          <h2 className="text-4xl font-[Playfair_Display] text-gray-900">Everything You Need, Under One Roof</h2>
        </div></FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeInSection delay={0}><div className="bg-white p-10 text-center border border-gray-100 rounded shadow-sm hover:shadow-xl transition-shadow h-full">
            <div className="flex justify-center mb-6"><Icons.Ring /></div>
            <h4 className="text-xl font-[Playfair_Display] text-yp-gold mb-4 font-bold">Wedding Planning</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Turning your vision into a celebration that feels uniquely yours.</p>
          </div></FadeInSection>
          <FadeInSection delay={150}><div className="bg-white p-10 text-center border border-gray-100 rounded shadow-sm hover:shadow-xl transition-shadow h-full">
            <div className="flex justify-center mb-6"><Icons.Palette /></div>
            <h4 className="text-xl font-[Playfair_Display] text-yp-gold mb-4 font-bold">Decor & Design</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Creating immersive experiences through thoughtful design and storytelling.</p>
          </div></FadeInSection>
          <FadeInSection delay={300}><div className="bg-white p-10 text-center border border-gray-100 rounded shadow-sm hover:shadow-xl transition-shadow h-full">
            <div className="flex justify-center mb-6"><Icons.Clipboard /></div>
            <h4 className="text-xl font-[Playfair_Display] text-gray-900 mb-4 font-bold">Event Management</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Ensuring every moment unfolds seamlessly from start to finish.</p>
          </div></FadeInSection>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 bg-white px-6 border-y border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <FadeInSection><h2 className="text-4xl font-[Playfair_Display] text-gray-900 mb-16">Your Journey With Us</h2></FadeInSection>
          <div className="flex flex-col md:flex-row justify-between items-center relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 border-dashed border-t-2 -z-10"></div>
            {[
              { step: 1, title: 'Share Your Vision', desc: 'Tell us about your dream event.' },
              { step: 2, title: 'We Plan It All', desc: 'Detailed design and logistics.' },
              { step: 3, title: 'Relive the Magic', desc: 'Flawless execution on the day.' }
            ].map((item, idx) => (
              <FadeInSection key={idx} delay={idx * 200} className="bg-white px-6 py-4 flex flex-col items-center z-10 mb-8 md:mb-0">
                <div className="w-16 h-16 bg-cream-bg border border-yp-gold rounded-full flex items-center justify-center text-yp-gold font-bold text-xl mb-4 shadow-sm">{item.step}</div>
                <h4 className="text-lg font-[Playfair_Display] font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500 text-center max-w-[200px]">{item.desc}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions Gallery */}
      <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
        <FadeInSection><div className="text-center mb-16">
          <h3 className="text-xs uppercase tracking-widest text-yp-gold mb-4 font-semibold">What We Plan</h3>
          <h2 className="text-4xl font-[Playfair_Display] text-gray-900">Every Occasion, Made Extraordinary</h2>
        </div></FadeInSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="relative h-[400px] group overflow-hidden bg-black rounded">
            <img src="/images/hero.jpg" alt="Weddings" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-8 left-8">
              <h4 className="text-white text-xs uppercase tracking-widest mb-2 font-bold">Weddings</h4>
              <h2 className="text-3xl text-white font-[Playfair_Display] font-bold">Weddings & Celebrations</h2>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative h-[192px] group overflow-hidden bg-black rounded">
              <img src="/images/corporate.jpg" alt="Corporate" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-6 left-6">
                <h4 className="text-white text-xs uppercase tracking-widest mb-1 font-bold">Corporate</h4>
                <h2 className="text-2xl text-white font-[Playfair_Display] font-bold">Corporate Events & Galas</h2>
              </div>
            </div>
            <div className="relative h-[192px] group overflow-hidden bg-yp-gold rounded p-8 flex items-center">
              <div>
                <h4 className="text-white/80 text-xs uppercase tracking-widest mb-1 font-bold">Social</h4>
                <h2 className="text-2xl text-white font-[Playfair_Display] font-bold mb-2">Social Celebrations</h2>
                <p className="text-sm text-white/90">Anniversaries, birthdays, baby showers, and milestones.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white border-t border-gray-100 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInSection><div className="text-center mb-16">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold">Clients Love</h3>
            <h2 className="text-4xl font-[Playfair_Display] text-yp-gold font-bold">Words from our Happy Couple</h2>
          </div></FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <FadeInSection key={i} delay={i * 150}>
                <div className="bg-cream-bg p-8 rounded border border-gray-100 h-full">
                  <div className="flex space-x-1 mb-6">
                    <Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"We cannot express enough how thrilled we are with the planning services. From the very beginning, your team went above and beyond to ensure our dream came to life."</p>
                  <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Esha & Karthik</h4>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-cream-bg px-6 max-w-4xl mx-auto">
        <FadeInSection><h2 className="text-4xl font-[Playfair_Display] text-yp-gold font-bold text-center mb-12">Frequently Asked Questions</h2></FadeInSection>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 bg-white rounded overflow-hidden">
              <button 
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-bold text-gray-800">{faq.q}</span>
                <span className="text-yp-gold font-bold text-xl">{openFaq === i ? '-' : '+'}</span>
              </button>
              {openFaq === i && <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-us" className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <FadeInSection>
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold">Lets Connect</h3>
            <h2 className="text-5xl font-[Playfair_Display] text-yp-gold font-bold mb-6">Start Planning your Dream Event</h2>
            <p className="text-gray-600 mb-10 leading-relaxed">Tell us your vision and we'll take it from there. No hard sell — just a conversation about your big day.</p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4"><Icons.Phone /><div><p className="text-xs text-gray-500 uppercase font-bold">Phone Number</p><p className="font-bold text-gray-900">+91 - 987654321</p></div></div>
              <div className="flex items-center space-x-4"><Icons.Mail /><div><p className="text-xs text-gray-500 uppercase font-bold">Email Address</p><p className="font-bold text-gray-900">hello@maangalamevents.com</p></div></div>
              <div className="flex items-center space-x-4"><Icons.MapPin /><div><p className="text-xs text-gray-500 uppercase font-bold">Based In</p><p className="font-bold text-gray-900">Hyderabad, India</p></div></div>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <form className="bg-cream-bg p-8 rounded border border-gray-100 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Your Name</label><input type="text" className="w-full bg-white border border-gray-200 px-4 py-3 rounded text-sm focus:outline-none focus:border-yp-gold" placeholder="Enter your name" /></div>
                <div><label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Phone Number</label><input type="text" className="w-full bg-white border border-gray-200 px-4 py-3 rounded text-sm focus:outline-none focus:border-yp-gold" placeholder="Enter your phone number" /></div>
              </div>
              <div><label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Email Address</label><input type="email" className="w-full bg-white border border-gray-200 px-4 py-3 rounded text-sm focus:outline-none focus:border-yp-gold" placeholder="Enter your email address" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Tell us about your vision</label><textarea rows="4" className="w-full bg-white border border-gray-200 px-4 py-3 rounded text-sm focus:outline-none focus:border-yp-gold" placeholder="Theme, guest count, vibe, location..."></textarea></div>
              <button type="button" className="w-full bg-yp-gold text-white font-bold tracking-widest uppercase py-4 rounded hover:bg-yellow-600 transition">Send My Enquiry</button>
            </form>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-yp-gold text-white pt-16 pb-8 border-t-[12px] border-yp-dark">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-widest font-[Playfair_Display]">MAANGALAM</h1>
            <p className="text-[10px] uppercase tracking-widest text-white/80">Est. 2014 • Hyderabad</p>
            <p className="text-xs mt-4 text-white/90 leading-loose pr-4">4th Floor, 1-64/K/2, Opposite Kakatiya Hills Arch, Kavuri Hills Phase 3, Madhapur Rd, Jubilee Hills, Hyderabad, Telangana, 500033</p>
            <p className="text-xs font-bold italic mt-2">Crafting moments into memories since 2014.</p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Services</h4>
            <ul className="space-y-3 text-xs font-medium text-white/90">
              <li><a href="#" className="hover:text-white hover:underline transition">Weddings & Celebrations</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition">Corporate Events & Galas</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition">Social Celebrations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-3 text-xs font-medium text-white/90">
              <li><a href="#" className="hover:text-white hover:underline transition">About Us</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition">Portfolio</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Quick Contact</h4>
            <div className="flex items-center space-x-3 mb-6"><Icons.Phone /><a href="tel:+91987654321" className="text-base font-bold tracking-wider hover:underline">+91-987654321</a></div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Office Hours</h4>
            <p className="text-xs text-white/90">Mon - Sat: 10 Am to 8 Pm</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-white/80">
          <p>&copy; {new Date().getFullYear()} Maangalam Events.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
