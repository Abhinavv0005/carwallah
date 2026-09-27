import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PricingTable from "../PricingTable";

const carsList = [
    { name: 'BALENO', image: 'img/BALENO.png' },
    { name: 'SWIFT', image: 'img/swifts.png' },
    { name: 'CRETA', image: 'img/creta.png' },
    { name: 'VENUE', image: 'img/VENUE.png' },
    { name: 'BREZZA', image: 'img/BREZZA.png' },
    { name: 'GRAND VITARA', image: 'img/GRAND VITARA.png' },
    { name: 'THAR', image: 'img/THAR.png' },
    { name: 'ERTIGA', image: 'img/ERTIGA.png' },
    { name: 'SCORPIO N', image: 'img/SCORPIO N.png' },
    { name: 'TATA SAFARI', image: 'img/TATA SAFARI.png' },
    { name: 'FORTUNER', image: 'img/fortuner.png' },
    { name: 'DEFENDER', image: 'img/Defender.png' }
];

export default function Home() {
    const navigate = useNavigate();
    
    // State Management
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState('Car');
    const [showNotification, setShowNotification] = useState(false);
    const [adminClicks, setAdminClicks] = useState(0);

    // Form State
    const [bookingForm, setBookingForm] = useState({ name: '', phone: '', date: '', days: '' });
    const [contactForm, setContactForm] = useState({ firstName: '', lastName: '', query: '', city: '', state: '', zipCode: '' });

    // Effects
    useEffect(() => {
        // 5-second notification
        setTimeout(() => setShowNotification(true), 5000);
    }, []);

    // Handlers
    const handleAdminClick = () => {
        const newCount = adminClicks + 1;
        setAdminClicks(newCount);
        if (newCount === 5) navigate('/admin');
        setTimeout(() => setAdminClicks(0), 2000); 
    };

    const openBookingModal = (carName) => {
        setSelectedCar(carName);
        setModalOpen(true);
    };

    const submitBooking = (e) => {
        e.preventDefault();
        const message = `Hello Zoom Cars! I want to book a car.%0A%0A🚘 *Car Model:* ${selectedCar}%0A👤 *Name:* ${bookingForm.name}%0A📞 *Contact:* ${bookingForm.phone}%0A📅 *Pick-up Date:* ${bookingForm.date}%0A⏳ *Duration:* ${bookingForm.days} Days`;
        window.open(`https://wa.me/919667597460?text=${message}`, '_blank');
        setModalOpen(false);
    };

    const submitContact = (e) => {
        e.preventDefault();
        const message = `Hello Zoom Cars! Here is my inquiry:%0A%0A*Name:* ${contactForm.firstName} ${contactForm.lastName}%0A*Query:* ${contactForm.query}%0A*Location:* ${contactForm.city}, ${contactForm.state} - ${contactForm.zipCode}`;
        window.open(`https://wa.me/919667597460?text=${message}`, '_blank');
    };

    return (
        <div className="font-sans bg-[#FDFBF7] relative overflow-x-hidden w-full min-h-screen text-[#2C2926]">
            
            {/* Header (Premium Glassmorphism) */}
            <header className="fixed w-full top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#E8E3DA] shadow-sm transition-all">
                <div className="w-full px-4 md:px-12 py-3 md:py-4 flex justify-between items-center">
                    <img src="img/logo.png" alt="Zoom Cars" className="h-10 md:h-16 object-contain" />
                    <nav className="hidden md:flex space-x-10 font-medium text-[#5C5751]">
                        <a href="#home" className="hover:text-[#D4AF37] transition-colors">Home</a>
                        <a href="#packages" className="hover:text-[#D4AF37] transition-colors">Packages</a>
                        <a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact Us</a>
                    </nav>
                    <a href="tel:+919667597460" className="bg-gradient-to-r from-[#38332E] to-[#24211D] text-[#FDFBF7] text-sm md:text-base px-5 py-2 md:px-8 md:py-3 rounded-full font-semibold shadow-[0_8px_20px_rgba(44,41,38,0.2)] hover:shadow-[0_12px_25px_rgba(44,41,38,0.3)] hover:scale-105 transition-all duration-300">Call Now</a>
                </div>
            </header>

            {/* Hero (Full Width, Premium Light Gradient with Background Image, Full Screen Height) */}
            <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-[url('img/hero-bg.jpg')] bg-cover bg-center bg-fixed w-full pt-20 md:pt-24 before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#FDFBF7]/95 before:via-[#F4EFE6]/85 before:to-[#FDFBF7]/95">
                <div className="w-full px-6 md:px-16 relative z-10 flex flex-col md:flex-row items-center justify-between">
                    <div className="w-full md:w-1/2 text-center md:text-left py-12 md:py-16">
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold mb-4 md:mb-6 leading-tight tracking-tight text-[#2C2926]">
                            Welcome To <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B89222]">Zoom Cars</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-[#5C5751] mb-8 md:mb-10 max-w-lg mx-auto md:mx-0 font-light tracking-wide leading-relaxed">
                            Experience the luxury of freedom. Reliable and premium car rental services across Delhi NCR.
                        </p>
                        <a href="#packages" className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#FDFBF7] text-sm md:text-base px-8 md:px-10 py-3 md:py-4 rounded-full font-bold shadow-[0_8px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_12px_30px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all duration-300">
                            Explore Fleet
                        </a>
                    </div>
                </div>
            </section>

            {/* Packages (Full Width Container, High-End Cards) */}
            <section id="packages" className="py-16 md:py-24 bg-[#FDFBF7] w-full">
                <div className="w-full px-4 md:px-12">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2C2926]">Our <span className="text-[#D4AF37]">Premium Fleet</span></h2>
                        <div className="w-20 md:w-24 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {carsList.map((car, index) => (
                            <div key={index} className="group bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(212,175,55,0.15)] transition-all duration-500">
                                <div className="h-48 md:h-56 bg-[#F5F2EB] overflow-hidden flex items-center justify-center p-4">
                                    <img src={car.image} alt={car.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="p-6 md:p-8 text-center border-t border-[#FDFBF7]">
                                    <h4 className="text-lg md:text-xl font-bold text-[#2C2926] mb-4 md:mb-6 tracking-wide">{car.name}</h4>
                                    <button onClick={() => openBookingModal(car.name)} className="w-full bg-[#38332E] text-[#FDFBF7] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#D4AF37] hover:text-[#FDFBF7] transition-colors duration-300 shadow-md">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Imported Systematic Pricing Table (Width controlled internally) */}
            <PricingTable />

            {/* Contact Form (Premium Light Glassmorphism) */}
            <section id="contact" className="py-16 md:py-24 bg-[#F4EFE6] w-full relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                    <div className="absolute -top-20 md:-top-40 -right-20 md:-right-40 w-64 md:w-96 h-64 md:h-96 bg-[#D4AF37] rounded-full blur-[80px] md:blur-[100px]"></div>
                    <div className="absolute -bottom-20 md:-bottom-40 -left-20 md:-left-40 w-64 md:w-96 h-64 md:h-96 bg-[#E8DCC4] rounded-full blur-[80px] md:blur-[100px]"></div>
                </div>

                <div className="w-full px-4 md:px-12 relative z-10">
                    <div className="bg-white/60 backdrop-blur-xl border border-white/70 p-6 sm:p-10 md:p-16 rounded-3xl md:rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
                        <div className="text-center mb-8 md:mb-12">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2C2926]">Feel free <span className="text-[#D4AF37]">to connect</span></h2>
                            <p className="text-[#5C5751] mt-2 md:mt-3 text-sm md:text-base font-light">Have a special request? Drop us a message.</p>
                        </div>
                        
                        <form onSubmit={submitContact} className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
                            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                                <input type="text" placeholder="First Name" required className="w-full md:w-1/2 p-3.5 md:p-4 bg-white/70 border border-[#D9D3C7] rounded-xl text-[#2C2926] placeholder-[#8A847A] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-sm" onChange={e => setContactForm({...contactForm, firstName: e.target.value})} />
                                <input type="text" placeholder="Last Name" required className="w-full md:w-1/2 p-3.5 md:p-4 bg-white/70 border border-[#D9D3C7] rounded-xl text-[#2C2926] placeholder-[#8A847A] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-sm" onChange={e => setContactForm({...contactForm, lastName: e.target.value})} />
                            </div>
                            <textarea placeholder="How can we help you?" required rows="4" className="w-full p-3.5 md:p-4 bg-white/70 border border-[#D9D3C7] rounded-xl text-[#2C2926] placeholder-[#8A847A] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none shadow-sm" onChange={e => setContactForm({...contactForm, query: e.target.value})}></textarea>
                            
                            <button type="submit" className="w-full md:w-auto md:px-12 bg-gradient-to-r from-[#2BB741] to-[#25A138] text-white py-3.5 md:py-4 rounded-xl font-bold shadow-[0_8px_20px_rgba(43,183,65,0.3)] hover:shadow-[0_12px_25px_rgba(43,183,65,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
                                <i className="fa-brands fa-whatsapp text-xl"></i> Send via WhatsApp
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Extended Multi-Column Footer (Light Theme) */}
            <footer className="bg-[#EAE4D8] text-[#5C5751] pt-12 pb-6 md:pt-16 md:pb-8 border-t border-[#D9D3C7] w-full relative z-10">
                <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-10 md:mb-12 text-center md:text-left">
                        {/* Column 1: Brand & Description */}
                        <div className="flex flex-col items-center md:items-start">
                            <img src="img/logo.png" alt="Zoom Cars" className="h-10 md:h-12 mb-4 md:mb-5 object-contain opacity-80" />
                            <p className="font-light leading-relaxed text-sm max-w-sm">
                                Experience the luxury of freedom. Reliable and premium car rental services across Delhi NCR. We provide top-tier vehicles for all your travel needs.
                            </p>
                        </div>
                        
                        {/* Column 2: Address */}
                        <div className="flex flex-col items-center md:items-start">
                            <h4 className="text-[#2C2926] font-bold mb-4 md:mb-5 uppercase tracking-wider text-sm">Our Location</h4>
                            <p className="font-light text-sm flex items-start gap-3 leading-relaxed text-left">
                                <i className="fa-solid fa-location-dot mt-1 text-[#D4AF37]"></i>
                                <span>
                                    123 Premium Drive, Connaught Place,<br />
                                    New Delhi, Delhi 110001,<br />
                                    India
                                </span>
                            </p>
                        </div>

                        {/* Column 3: Contact Details */}
                        <div className="flex flex-col items-center md:items-start">
                            <h4 className="text-[#2C2926] font-bold mb-4 md:mb-5 uppercase tracking-wider text-sm">Contact Us</h4>
                            <ul className="space-y-4 font-light text-sm flex flex-col items-center md:items-start">
                                <li>
                                    <a href="tel:+919667597460" className="flex items-center gap-3 hover:text-[#D4AF37] transition-colors w-fit">
                                        <i className="fa-solid fa-phone text-[#D4AF37]"></i>
                                        +91 96675 97460
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:info@zoomcars.com" className="flex items-center gap-3 hover:text-[#D4AF37] transition-colors w-fit">
                                        <i className="fa-solid fa-envelope text-[#D4AF37]"></i>
                                        info@zoomcars.com
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-clock text-[#D4AF37]"></i>
                                        24/7 Premium Support
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Copyright & Secret Admin Link */}
                    <div className="text-center border-t border-[#D9D3C7] pt-6 md:pt-8 mt-6 md:mt-8">
                         <p className="font-light tracking-wide text-xs md:text-sm">
                             <span onClick={handleAdminClick} className="cursor-default select-none hover:text-[#D4AF37] transition-colors">Copyright</span> © 2026 Zoom Cars. All Rights Reserved.
                         </p>
                    </div>
                </div>
            </footer>

            {/* Booking Modal (Premium Styling) */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C2926]/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-[95%] max-w-md p-6 md:p-8 relative shadow-[0_20px_60px_rgba(0,0,0,0.15)] animate-[fadeIn_0.3s_ease-out]">
                        <button onClick={() => setModalOpen(false)} className="absolute top-4 md:top-5 right-4 md:right-5 text-2xl md:text-3xl text-[#8A847A] hover:text-[#2C2926] transition-colors">&times;</button>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-[#2C2926]">Book <span className="text-[#D4AF37]">{selectedCar}</span></h3>
                        <form onSubmit={submitBooking} className="space-y-4 md:space-y-5">
                            <input type="text" required placeholder="Full Name" className="w-full p-3.5 bg-[#FDFBF7] border border-[#E8E3DA] rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors shadow-inner text-sm md:text-base" onChange={e => setBookingForm({...bookingForm, name: e.target.value})} />
                            <input type="tel" required placeholder="Phone Number" className="w-full p-3.5 bg-[#FDFBF7] border border-[#E8E3DA] rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors shadow-inner text-sm md:text-base" onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} />
                            <div className="relative">
                                <label className="text-[10px] md:text-xs text-[#8A847A] absolute -top-2 left-3 bg-white px-1">Pick-up Date</label>
                                <input type="date" required className="w-full p-3.5 bg-[#FDFBF7] border border-[#E8E3DA] rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors text-[#5C5751] shadow-inner text-sm md:text-base" onChange={e => setBookingForm({...bookingForm, date: e.target.value})} />
                            </div>
                            <input type="number" required placeholder="Number of Days" className="w-full p-3.5 bg-[#FDFBF7] border border-[#E8E3DA] rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors shadow-inner text-sm md:text-base" onChange={e => setBookingForm({...bookingForm, days: e.target.value})} />
                            <button type="submit" className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#FDFBF7] font-bold text-base md:text-lg py-3.5 md:py-4 rounded-xl shadow-[0_8px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_12px_25px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300 mt-2 flex items-center justify-center gap-2">
                                <i className="fa-brands fa-whatsapp text-xl"></i> Confirm Booking
                            </button>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Notification Toast */}
            {showNotification && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] z-50 text-center w-[90%] max-w-sm border-t-4 border-[#D4AF37]">
                    <button onClick={() => setShowNotification(false)} className="absolute top-2 right-3 md:top-3 md:right-4 text-2xl text-[#8A847A] hover:text-[#2C2926]">&times;</button>
                    <h4 className="font-bold text-[#2C2926] text-xl md:text-2xl mb-2 md:mb-3">Need help booking?</h4>
                    <p className="text-[#5C5751] text-sm md:text-base mb-5 md:mb-6 font-light">Speak directly with our premium support team.</p>
                    <a href="tel:+919667597460" className="inline-block bg-gradient-to-r from-[#38332E] to-[#24211D] text-[#FDFBF7] text-sm md:text-base w-full py-3.5 md:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">Call Us Now</a>
                </div>
            )}
        </div>
    );
}