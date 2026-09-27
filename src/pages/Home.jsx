import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PricingTable from "../components/PricingTable";

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
    const [rates, setRates] = useState([]);
    const [loadingRates, setLoadingRates] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState('Car');
    const [showNotification, setShowNotification] = useState(false);
    const [adminClicks, setAdminClicks] = useState(0);
    const [preloaderOpen, setPreloaderOpen] = useState(true);

    // Form State
    const [bookingForm, setBookingForm] = useState({ name: '', phone: '', date: '', days: '' });
    const [contactForm, setContactForm] = useState({ firstName: '', lastName: '', query: '', city: '', state: '', zipCode: '' });

    // Effects
    useEffect(() => {
        // Handle Preloader
        setTimeout(() => setPreloaderOpen(false), 1700);

        // Fetch Rates
        fetch('/rates.json')
            .then(res => res.json())
            .then(data => { setRates(data); setLoadingRates(false); })
            .catch(() => setLoadingRates(false));

        // 5-second notification
        setTimeout(() => setShowNotification(true), 5000);
    }, []);

    // Handlers
    const handleAdminClick = () => {
        const newCount = adminClicks + 1;
        setAdminClicks(newCount);
        if (newCount === 5) navigate('/admin');
        setTimeout(() => setAdminClicks(0), 2000); // reset after 2s
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
        <div className="font-sans bg-white relative overflow-x-hidden">
            
            {/* Preloader */}
            {preloaderOpen && (
                <div className="fixed inset-0 z-[99999] bg-[#0F172A] flex items-center justify-center transition-opacity duration-700">
                    <img src="img/transparent-car.png" alt="Loading..." className="animate-[driveAcross_4s_infinite] w-64 md:w-80 absolute" />
                </div>
            )}

            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-40">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <img src="img/logo.png" alt="Zoom Cars" className="h-12 md:h-16 object-contain" />
                    <nav className="hidden md:flex space-x-8 font-semibold text-gray-800">
                        <a href="#home" className="hover:text-[#D4AF37]">Home</a>
                        <a href="#packages" className="hover:text-[#D4AF37]">Packages</a>
                        <a href="#contact" className="hover:text-[#D4AF37]">Contact Us</a>
                    </nav>
                    <a href="tel:+919667597460" className="bg-[#0F172A] text-white px-4 py-2 md:px-8 md:py-3 rounded-md font-bold shadow hover:bg-gray-800">Call Now</a>
                </div>
            </header>

            {/* Hero */}
            <section id="home" className="h-[600px] flex items-center relative overflow-hidden bg-[#0F172A]">
                {/* Add your inline styles for hero-bg here or keep in index.css */}
                <div className="container mx-auto px-6 relative z-10 text-white">
                    <h1 className="text-5xl font-serif font-bold mb-4 leading-tight">Welcome To <br />Zoom Cars</h1>
                    <p className="text-lg text-gray-200 mb-8 max-w-lg">Reliable and affordable car rental services in Delhi NCR.</p>
                </div>
            </section>

            {/* Packages */}
            <section id="packages" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-serif font-bold text-center mb-16 text-[#0F172A]">Our <span className="text-[#D4AF37]">Packages</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {carsList.map((car, index) => (
                            <div key={index} className="bg-white rounded border border-gray-200 overflow-hidden shadow-sm hover:-translate-y-3 hover:shadow-xl transition-all duration-300">
                                <div className="h-48 bg-gray-200"><img src={car.image} alt={car.name} className="w-full h-full object-cover" /></div>
                                <div className="p-6 text-center">
                                    <h4 className="text-lg font-bold text-[#0F172A] mb-4">{car.name}</h4>
                                    <button onClick={() => openBookingModal(car.name)} className="bg-[#0F172A] text-white px-6 py-2 rounded text-sm hover:bg-gray-800">Book Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Table */}
            {/* Packages Section */}
            <section id="packages" className="py-20 bg-gray-50">
               {/* ... existing packages code ... */}
            </section>

            {/* Imported Systematic Pricing Table */}
            <PricingTable />

            {/* Contact Form */}
            <section id="contact" className="py-20 bg-gray-50">
               {/* ... existing contact code ... */}
            </section>

            {/* Contact Form */}
            <section id="contact" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-4xl bg-[#0F172A] p-8 text-white rounded shadow-xl">
                    <h2 className="text-3xl font-serif font-bold text-center mb-8">Feel free <span className="text-[#D4AF37]">to connect</span></h2>
                    <form onSubmit={submitContact} className="space-y-4 text-black">
                        <div className="flex gap-4">
                            <input type="text" placeholder="First Name" required className="w-1/2 p-2 rounded" onChange={e => setContactForm({...contactForm, firstName: e.target.value})} />
                            <input type="text" placeholder="Last Name" required className="w-1/2 p-2 rounded" onChange={e => setContactForm({...contactForm, lastName: e.target.value})} />
                        </div>
                        <input type="text" placeholder="Query" required className="w-full p-2 rounded" onChange={e => setContactForm({...contactForm, query: e.target.value})} />
                        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded font-bold hover:bg-green-600 mt-4">Send via WhatsApp</button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0B1320] text-gray-300 py-12 text-center">
                 <p><span onClick={handleAdminClick} className="cursor-default select-none">Copyright</span> © 2026 Zoom Cars All Rights Reserved</p>
            </footer>

            {/* Booking Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-white rounded-lg w-[90%] max-w-md p-6 relative">
                        <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black">&times;</button>
                        <h3 className="text-2xl font-serif font-bold mb-4">Book <span className="text-[#D4AF37]">{selectedCar}</span></h3>
                        <form onSubmit={submitBooking} className="space-y-4">
                            <input type="text" required placeholder="Full Name" className="w-full p-2 border rounded" onChange={e => setBookingForm({...bookingForm, name: e.target.value})} />
                            <input type="tel" required placeholder="Phone Number" className="w-full p-2 border rounded" onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} />
                            <input type="date" required className="w-full p-2 border rounded" onChange={e => setBookingForm({...bookingForm, date: e.target.value})} />
                            <input type="number" required placeholder="Days" className="w-full p-2 border rounded" onChange={e => setBookingForm({...bookingForm, days: e.target.value})} />
                            <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded">Confirm on WhatsApp</button>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Notification Toast */}
            {showNotification && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-2xl z-50 text-center w-[90%] max-w-sm border-t-4 border-[#D4AF37]">
                    <button onClick={() => setShowNotification(false)} className="absolute top-2 right-4 text-xl">&times;</button>
                    <h4 className="font-bold text-[#0F172A] text-xl mb-2">Need help booking?</h4>
                    <a href="tel:+919667597460" className="inline-block bg-[#0F172A] text-white w-full py-3 rounded font-bold">Call Us Now</a>
                </div>
            )}
        </div>
    );
}