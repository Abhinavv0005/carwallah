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
        <div className="font-sans bg-gray-50 relative overflow-x-hidden w-full">
            
            {/* Header (Premium Glassmorphism) */}
            <header className="fixed w-full top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
                <div className="w-full max-w-[1600px] mx-auto px-6 py-4 flex justify-between items-center">
                    <img src="img/logo.png" alt="Zoom Cars" className="h-12 md:h-16 object-contain" />
                    <nav className="hidden md:flex space-x-10 font-medium text-gray-700">
                        <a href="#home" className="hover:text-[#D4AF37] transition-colors">Home</a>
                        <a href="#packages" className="hover:text-[#D4AF37] transition-colors">Packages</a>
                        <a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact Us</a>
                    </nav>
                    <a href="tel:+919667597460" className="bg-gradient-to-r from-[#0F172A] to-slate-800 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">Call Now</a>
                </div>
            </header>

            {/* Hero (Full Width, Premium Gradient) */}
            <section id="home" className="min-h-[80vh] flex items-center relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1a2333] to-[#0F172A] w-full pt-20">
                <div className="w-full max-w-[1600px] mx-auto px-6 relative z-10 text-white flex flex-col md:flex-row items-center justify-between">
                    <div className="w-full md:w-1/2 text-center md:text-left py-16">
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight tracking-tight">
                            Welcome To <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">Zoom Cars</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg mx-auto md:mx-0 font-light tracking-wide leading-relaxed">
                            Experience the luxury of freedom. Reliable and premium car rental services across Delhi NCR.
                        </p>
                        <a href="#packages" className="inline-block bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-[#0F172A] px-10 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:-translate-y-1 transition-all duration-300">
                            Explore Fleet
                        </a>
                    </div>
                </div>
            </section>

            {/* Packages (Full Width Container, High-End Cards) */}
            <section id="packages" className="py-24 bg-gray-50 w-full">
                <div className="w-full max-w-[1600px] mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-[#0F172A]">Our <span className="text-[#D4AF37]">Premium Fleet</span></h2>
                        <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {carsList.map((car, index) => (
                            <div key={index} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-md hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
                                <div className="h-56 bg-gray-100 overflow-hidden flex items-center justify-center p-4">
                                    <img src={car.image} alt={car.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="p-8 text-center border-t border-gray-50">
                                    <h4 className="text-xl font-bold text-[#0F172A] mb-6 tracking-wide">{car.name}</h4>
                                    <button onClick={() => openBookingModal(car.name)} className="w-full bg-[#0F172A] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#D4AF37] hover:text-[#0F172A] transition-colors duration-300 shadow-md">
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

            {/* Contact Form (Full Width Glassmorphism) */}
            <section id="contact" className="py-24 bg-[#0F172A] w-full relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#D4AF37] rounded-full blur-[100px]"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600 rounded-full blur-[100px]"></div>
                </div>

                <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
                    <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-10 md:p-16 rounded-[2rem] shadow-2xl">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-serif font-bold text-white">Feel free <span className="text-[#D4AF37]">to connect</span></h2>
                            <p className="text-gray-400 mt-3 font-light">Have a special request? Drop us a message.</p>
                        </div>
                        
                        <form onSubmit={submitContact} className="space-y-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <input type="text" placeholder="First Name" required className="w-full md:w-1/2 p-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" onChange={e => setContactForm({...contactForm, firstName: e.target.value})} />
                                <input type="text" placeholder="Last Name" required className="w-full md:w-1/2 p-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" onChange={e => setContactForm({...contactForm, lastName: e.target.value})} />
                            </div>
                            <textarea placeholder="How can we help you?" required rows="4" className="w-full p-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none" onChange={e => setContactForm({...contactForm, query: e.target.value})}></textarea>
                            
                            <button type="submit" className="w-full md:w-auto md:px-12 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
                                <i className="fa-brands fa-whatsapp text-xl"></i> Send via WhatsApp
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#070b14] text-gray-400 py-8 text-center border-t border-slate-800 w-full">
                 <p className="font-light tracking-wide text-sm">
                     <span onClick={handleAdminClick} className="cursor-default select-none">Copyright</span> © 2026 Zoom Cars. All Rights Reserved.
                 </p>
            </footer>

            {/* Booking Modal (Premium Styling) */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/80 backdrop-blur-md p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl animate-[fadeIn_0.3s_ease-out]">
                        <button onClick={() => setModalOpen(false)} className="absolute top-5 right-5 text-3xl text-gray-400 hover:text-gray-800 transition-colors">&times;</button>
                        <h3 className="text-3xl font-serif font-bold mb-6 text-[#0F172A]">Book <span className="text-[#D4AF37]">{selectedCar}</span></h3>
                        <form onSubmit={submitBooking} className="space-y-5">
                            <input type="text" required placeholder="Full Name" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors" onChange={e => setBookingForm({...bookingForm, name: e.target.value})} />
                            <input type="tel" required placeholder="Phone Number" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors" onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} />
                            <div className="relative">
                                <label className="text-xs text-gray-500 absolute -top-2 left-3 bg-white px-1">Pick-up Date</label>
                                <input type="date" required className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors text-gray-700" onChange={e => setBookingForm({...bookingForm, date: e.target.value})} />
                            </div>
                            <input type="number" required placeholder="Number of Days" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors" onChange={e => setBookingForm({...bookingForm, days: e.target.value})} />
                            <button type="submit" className="w-full bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-[#0F172A] font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mt-2 flex items-center justify-center gap-2">
                                <i className="fa-brands fa-whatsapp text-xl"></i> Confirm Booking
                            </button>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Notification Toast */}
            {showNotification && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.2)] z-50 text-center w-[90%] max-w-sm border-t-4 border-[#D4AF37]">
                    <button onClick={() => setShowNotification(false)} className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-800">&times;</button>
                    <h4 className="font-bold text-[#0F172A] text-2xl mb-3">Need help booking?</h4>
                    <p className="text-gray-600 mb-6 font-light">Speak directly with our premium support team.</p>
                    <a href="tel:+919667597460" className="inline-block bg-gradient-to-r from-[#0F172A] to-slate-800 text-white w-full py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">Call Us Now</a>
                </div>
            )}
        </div>
    );
}