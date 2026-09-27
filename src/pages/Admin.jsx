import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const navigate = useNavigate();
    
    // State Management
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [rates, setRates] = useState([]);
    const [message, setMessage] = useState({ text: '', type: '' });

    // API Routes: Fetch initial rates
    useEffect(() => {
        if (isLoggedIn) {
            setIsLoading(true);
            // Points to a Cloudflare Pages Function (e.g., functions/api/rates.js)
            fetch('/api/rates')
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch');
                    return res.json();
                })
                .then(data => {
                    setRates(Array.isArray(data) ? data : []);
                    setIsLoading(false);
                })
                .catch(() => {
                    setMessage({ text: 'Could not load rates. Check API connection.', type: 'error' });
                    setIsLoading(false);
                });
        }
    }, [isLoggedIn]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'Nagar#@503') {
            setIsLoggedIn(true);
            setMessage({ text: '', type: '' });
        } else {
            setMessage({ text: 'Incorrect Password!', type: 'error' });
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setRates([]);
        navigate('/');
    };

    // Table Functionality: Edit, Add, and Delete Rows
    const handleRateChange = (index, field, value) => {
        const updatedRates = [...rates];
        updatedRates[index][field] = value;
        setRates(updatedRates);
    };

    const addCarRow = () => {
        setRates([...rates, { model: '', days_1_4: '', days_5_10: '', days_11_20: '', month: '' }]);
    };

    const removeCarRow = (indexToRemove) => {
        setRates(rates.filter((_, index) => index !== indexToRemove));
    };

    // API Routes: Save rates
    const handleSaveRates = async (e) => {
        e.preventDefault();
        
        // Filter out empty rows before saving
        const cleanedRates = rates.filter(rate => rate.model.trim() !== '');
        setRates(cleanedRates);

        try {
            const response = await fetch('/api/rates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cleanedRates)
            });

            if (response.ok) {
                setMessage({ text: 'Rates updated successfully!', type: 'success' });
            } else {
                setMessage({ text: 'API not connected. Could not save data.', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Network error. API not reachable.', type: 'error' });
        }
    };

    return (
        <div className="bg-[#FDFBF7] font-sans p-6 min-h-screen text-[#2C2926] flex flex-col items-center justify-center">
            <div className="w-full max-w-6xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-[#E8E3DA]">
                <div className="flex justify-between items-center mb-10 border-b border-[#E8E3DA] pb-6">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2C2926]">Pricing <span className="text-[#D4AF37]">Manager</span></h1>
                    {isLoggedIn && (
                        <button onClick={handleLogout} className="bg-white border border-[#D9D3C7] text-[#5C5751] px-5 py-2.5 rounded-xl hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all font-medium">Logout</button>
                    )}
                </div>

                {message.text && (
                    <p className={`p-4 rounded-xl mb-8 border text-sm font-medium ${message.type === 'error' ? 'bg-red-50/50 text-red-600 border-red-200' : 'bg-green-50/50 text-[#2BB741] border-[#2BB741]/30'}`}>
                        {message.text}
                    </p>
                )}

                {!isLoggedIn ? (
                    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-12 mb-12">
                        <label className="block mb-3 font-bold text-[#2C2926]">Admin Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-[#FDFBF7] border border-[#D9D3C7] p-4 rounded-xl mb-6 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-sm" placeholder="Enter secure password" />
                        <button type="submit" className="w-full bg-gradient-to-r from-[#38332E] to-[#24211D] text-[#FDFBF7] font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">Secure Login</button>
                    </form>
                ) : isLoading ? (
                    <div className="text-center py-12 text-[#8A847A] font-medium">Loading pricing data...</div>
                ) : (
                    <form onSubmit={handleSaveRates}>
                        <div className="overflow-x-auto rounded-xl border border-[#E8E3DA] shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#EAE4D8] text-[#2C2926] text-xs md:text-sm uppercase tracking-wider">
                                        <th className="p-4 border-b border-[#D9D3C7] font-bold">Car Model</th>
                                        <th className="p-4 border-b border-[#D9D3C7] font-bold">01 to 04 Days</th>
                                        <th className="p-4 border-b border-[#D9D3C7] font-bold">05 to 10 Days</th>
                                        <th className="p-4 border-b border-[#D9D3C7] font-bold">11 to 20 Days</th>
                                        <th className="p-4 border-b border-[#D9D3C7] font-bold">01 Month</th>
                                        <th className="p-4 border-b border-[#D9D3C7] font-bold text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rates.map((rate, index) => (
                                        <tr key={index} className="border-b border-[#E8E3DA] hover:bg-[#F5F2EB] transition-colors">
                                            <td className="p-3"><input type="text" value={rate.model} onChange={(e) => handleRateChange(index, 'model', e.target.value)} className="w-full p-3 bg-white border border-[#E8E3DA] rounded-lg font-bold text-[#2C2926] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" placeholder="E.g. SWIFT" /></td>
                                            <td className="p-3"><input type="number" value={rate.days_1_4} onChange={(e) => handleRateChange(index, 'days_1_4', e.target.value)} className="w-full p-3 bg-[#FDFBF7] border border-[#E8E3DA] rounded-lg text-[#5C5751] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" placeholder="₹" /></td>
                                            <td className="p-3"><input type="number" value={rate.days_5_10} onChange={(e) => handleRateChange(index, 'days_5_10', e.target.value)} className="w-full p-3 bg-[#FDFBF7] border border-[#E8E3DA] rounded-lg text-[#5C5751] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" placeholder="₹" /></td>
                                            <td className="p-3"><input type="number" value={rate.days_11_20} onChange={(e) => handleRateChange(index, 'days_11_20', e.target.value)} className="w-full p-3 bg-[#FDFBF7] border border-[#E8E3DA] rounded-lg text-[#5C5751] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" placeholder="₹" /></td>
                                            <td className="p-3"><input type="number" value={rate.month} onChange={(e) => handleRateChange(index, 'month', e.target.value)} className="w-full p-3 bg-[#FDFBF7] border border-[#E8E3DA] rounded-lg text-[#5C5751] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" placeholder="₹" /></td>
                                            <td className="p-3 text-center">
                                                <button type="button" onClick={() => removeCarRow(index)} className="text-red-400 hover:text-red-600 text-xl font-bold px-2 transition-colors" title="Delete Row">&times;</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {rates.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="text-center p-6 text-[#8A847A]">No cars available. Click below to add one.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-6">
                             <button type="button" onClick={addCarRow} className="w-full md:w-auto text-sm bg-[#F4EFE6] border border-[#D9D3C7] text-[#5C5751] font-bold px-6 py-3 rounded-xl hover:bg-[#EAE4D8] hover:text-[#2C2926] transition-colors">+ Add New Row</button>
                             
                             <button type="submit" className="w-full md:w-auto bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#FDFBF7] font-bold py-3 px-10 rounded-xl shadow-[0_8px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_12px_25px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300">
                                Save All Changes
                             </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}