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
        <div className="font-sans bg-[#FAFAFA] relative overflow-x-hidden w-full min-h-screen selection:bg-[#BF953F] selection:text-white">
            
            {/* Header (Premium Glassmorphism) */}
            <header className="fixed w-full top-0 z-40 bg-[#FAFAFA]/90 backdrop-blur-lg border-b border-neutral-200/50 shadow-sm transition-all">
                <div className="w-full px-6 md:px-12 py-4 flex justify-between items-center">
                    <img src="img/logo.png" alt="Zoom Cars" className="h-12 md:h-16 object-contain" />
                    <nav className="hidden md:flex space-x-10 font-medium text-neutral-800 tracking-wide uppercase text-sm">
                        <a href="#home" className="hover:text-[#BF953F] transition-colors">Home</a>
                        <a href="#packages" className="hover:text-[#BF953F] transition-colors">Packages</a>
                        <a href="#contact" className="hover:text-[#BF953F] transition-colors">Contact Us</a>
                    </nav>
                    <a href="tel:+919667597460" className="bg-gradient-to-r from-neutral-900 to-black text-[#BF953F] border border-[#BF953F]/30 px-6 py-2.5 md:px-8 md:py-3 rounded-none font-medium uppercase tracking-wider shadow-lg hover:shadow-xl hover:border-[#BF953F] hover:-translate-y-0.5 transition-all duration-300">Call Now</a>
                </div>
            </header>

            {/* Hero (Full Width, Luxury Dark Gradient) */}
            <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-[#050505] via-[#111111] to-[#0a0a0a] w-full pt-20">
                <div className="w-full px-6 md:px-16 relative z-10 text-white flex flex-col md:flex-row items-center justify-between">
                    <div className="w-full md:w-1/2 text-center md:text-left py-16">
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight tracking-tight">
                            Welcome To <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#F3E5AB] to-[#BF953F]">Zoom Cars</span>
                        </h1>
                        <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-lg mx-auto md:mx-0 font-light tracking-wide leading-relaxed">
                            Experience the luxury of freedom. Reliable and premium car rental services across Delhi NCR.
                        </p>
                        <a href="#packages" className="inline-block bg-gradient-to-r from-[#BF953F] to-[#997328] text-white px-10 py-4 rounded-none font-medium uppercase tracking-wider shadow-[0_0_20px_rgba(191,149,63,0.2)] hover:shadow-[0_0_30px_rgba(191,149,63,0.4)] hover:-translate-y-1 transition-all duration-300">
                            Explore Fleet
                        </a>
                    </div>
                </div>
            </section>

            {/* Packages (Full Width Container, High-End Cards) */}
            <section id="packages" className="py-24 bg-[#FAFAFA] w-full">
                <div className="w-full px-6 md:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-neutral-900">Our <span className="text-[#BF953F]">Premium Fleet</span></h2>
                        <div className="w-24 h-0.5 bg-[#BF953F] mx-auto mt-6"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {carsList.map((car, index) => (
                            <div key={index} className="group bg-white border border-neutral-200/60 overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500">
                                <div className="h-56 bg-[#f5f5f5] overflow-hidden flex items-center justify-center p-4">
                                    <img src={car.image} alt={car.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out" />
                                </div>
                                <div className="p-8 text-center border-t border-neutral-100">
                                    <h4 className="text-xl font-bold text-neutral-900 mb-6 tracking-wider uppercase">{car.name}</h4>
                                    <button onClick={() => openBookingModal(car.name)} className="w-full bg-neutral-900 text-[#BF953F] border border-neutral-900 px-6 py-3 text-sm font-medium uppercase tracking-widest hover:bg-[#BF953F] hover:border-[#BF953F] hover:text-white transition-colors duration-300">
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

            {/* Contact Form (Luxury Glassmorphism on Dark) */}
            <section id="contact" className="py-24 bg-[#0a0a0a] w-full relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#BF953F] rounded-full blur-[120px]"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-neutral-600 rounded-full blur-[120px]"></div>
                </div>

                <div className="w-full px-6 md:px-12 relative z-10">
                    <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/5 p-10 md:p-16 shadow-2xl">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-serif font-bold text-white">Feel free <span className="text-[#BF953F]">to connect</span></h2>
                            <p className="text-neutral-400 mt-4 font-light tracking-wide">Have a special request? Drop us a message.</p>
                        </div>
                        
                        <form onSubmit={submitContact} className="space-y-6 max-w-4xl mx-auto">
                            <div className="flex flex-col md:flex-row gap-6">
                                <input type="text" placeholder="First Name" required className="w-full md:w-1/2 p-4 bg-black/50 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition-all rounded-none" onChange={e => setContactForm({...contactForm, firstName: e.target.value})} />
                                <input type="text" placeholder="Last Name" required className="w-full md:w-1/2 p-4 bg-black/50 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition-all rounded-none" onChange={e => setContactForm({...contactForm, lastName: e.target.value})} />
                            </div>
                            <textarea placeholder="How can we help you?" required rows="4" className="w-full p-4 bg-black/50 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition-all resize-none rounded-none" onChange={e => setContactForm({...contactForm, query: e.target.value})}></textarea>
                            
                            <button type="submit" className="w-full md:w-auto md:px-16 bg-gradient-to-r from-[#BF953F] to-[#997328] text-white py-4 font-medium uppercase tracking-widest hover:shadow-[0_0_20px_rgba(191,149,63,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 mx-auto rounded-none">
                                <i className="fa-brands fa-whatsapp text-xl"></i> Send via WhatsApp
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Extended Multi-Column Footer */}
            <footer className="bg-[#050505] text-neutral-400 pt-16 pb-8 border-t border-white/5 w-full relative z-10">
                <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                        {/* Column 1: Brand & Description */}
                        <div>
                            <img src="img/logo.png" alt="Zoom Cars" className="h-12 mb-6 object-contain brightness-0 invert opacity-90" />
                            <p className="font-light leading-relaxed text-sm max-w-sm tracking-wide">
                                Experience the luxury of freedom. Reliable and premium car rental services across Delhi NCR. We provide top-tier vehicles for all your travel needs.
                            </p>
                        </div>
                        
                        {/* Column 2: Address */}
                        <div>
                            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-sm">Our Location</h4>
                            <p className="font-light text-sm flex items-start gap-4 leading-relaxed tracking-wide">
                                <i className="fa-solid fa-location-dot mt-1 text-[#BF953F]"></i>
                                <span>
                                    123 Premium Drive, Connaught Place,<br />
                                    New Delhi, Delhi 110001,<br />
                                    India
                                </span>
                            </p>
                        </div>

                        {/* Column 3: Contact Details */}
                        <div>
                            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-sm">Contact Us</h4>
                            <ul className="space-y-4 font-light text-sm tracking-wide">
                                <li>
                                    <a href="tel:+919667597460" className="flex items-center gap-4 hover:text-[#BF953F] transition-colors w-fit">
                                        <i className="fa-solid fa-phone text-[#BF953F]"></i>
                                        +91 96675 97460
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:info@zoomcars.com" className="flex items-center gap-4 hover:text-[#BF953F] transition-colors w-fit">
                                        <i className="fa-solid fa-envelope text-[#BF953F]"></i>
                                        info@zoomcars.com
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4">
                                        <i className="fa-solid fa-clock text-[#BF953F]"></i>
                                        24/7 Premium Support
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Copyright & Secret Admin Link */}
                    <div className="text-center border-t border-white/5 pt-8 mt-8">
                         <p className="font-light tracking-widest text-xs uppercase text-neutral-500">
                             <span onClick={handleAdminClick} className="cursor-default select-none hover:text-white transition-colors">Copyright</span> © 2026 Zoom Cars. All Rights Reserved.
                         </p>
                    </div>
                </div>
            </footer>

            {/* Booking Modal (Luxury Styling) */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-md p-10 relative shadow-2xl animate-[fadeIn_0.3s_ease-out] rounded-none border border-[#BF953F]/20">
                        <button onClick={() => setModalOpen(false)} className="absolute top-5 right-6 text-4xl font-light text-neutral-400 hover:text-neutral-900 transition-colors">&times;</button>
                        <h3 className="text-3xl font-serif font-bold mb-8 text-neutral-900">Book <span className="text-[#BF953F]">{selectedCar}</span></h3>
                        <form onSubmit={submitBooking} className="space-y-5">
                            <input type="text" required placeholder="Full Name" className="w-full p-4 bg-[#f9f9f9] border border-neutral-200 focus:outline-none focus:border-[#BF953F] transition-colors rounded-none placeholder-neutral-400" onChange={e => setBookingForm({...bookingForm, name: e.target.value})} />
                            <input type="tel" required placeholder="Phone Number" className="w-full p-4 bg-[#f9f9f9] border border-neutral-200 focus:outline-none focus:border-[#BF953F] transition-colors rounded-none placeholder-neutral-400" onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} />
                            <div className="relative">
                                <label className="text-xs text-neutral-500 absolute -top-2 left-3 bg-white px-2 font-medium tracking-wide uppercase">Pick-up Date</label>
                                <input type="date" required className="w-full p-4 bg-[#f9f9f9] border border-neutral-200 focus:outline-none focus:border-[#BF953F] transition-colors text-neutral-700 rounded-none" onChange={e => setBookingForm({...bookingForm, date: e.target.value})} />
                            </div>
                            <input type="number" required placeholder="Number of Days" className="w-full p-4 bg-[#f9f9f9] border border-neutral-200 focus:outline-none focus:border-[#BF953F] transition-colors rounded-none placeholder-neutral-400" onChange={e => setBookingForm({...bookingForm, days: e.target.value})} />
                            <button type="submit" className="w-full bg-gradient-to-r from-[#BF953F] to-[#997328] text-white font-medium uppercase tracking-widest py-4 shadow-lg hover:shadow-[0_0_15px_rgba(191,149,63,0.4)] hover:-translate-y-0.5 transition-all duration-300 mt-4 flex items-center justify-center gap-3 rounded-none">
                                <i className="fa-brands fa-whatsapp text-xl"></i> Confirm Booking
                            </button>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Notification Toast */}
            {showNotification && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl p-10 shadow-[0_30px_60px_rgba(0,0,0,0.15)] z-50 text-center w-[90%] max-w-sm border-t-4 border-[#BF953F] rounded-none">
                    <button onClick={() => setShowNotification(false)} className="absolute top-4 right-5 text-3xl font-light text-neutral-400 hover:text-neutral-900">&times;</button>
                    <h4 className="font-serif font-bold text-neutral-900 text-2xl mb-3">Need help booking?</h4>
                    <p className="text-neutral-500 mb-8 font-light tracking-wide text-sm">Speak directly with our premium support team.</p>
                    <a href="tel:+919667597460" className="inline-block bg-neutral-900 text-[#BF953F] border border-neutral-900 w-full py-4 uppercase tracking-widest font-medium hover:bg-[#BF953F] hover:border-[#BF953F] hover:text-white transition-all duration-300">Call Us Now</a>
                </div>
            )}
        </div>
    );
}