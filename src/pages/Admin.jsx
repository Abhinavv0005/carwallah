import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const navigate = useNavigate();
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [rates, setRates] = useState([]);
    const [message, setMessage] = useState({ text: '', type: '' }); // type: 'error' or 'success'

    // Fetch initial rates if logged in
    useEffect(() => {
        if (isLoggedIn) {
            fetch('/rates.json')
                .then(res => res.json())
                .then(data => setRates(data))
                .catch(() => setMessage({ text: 'Could not load rates.', type: 'error' }));
        }
    }, [isLoggedIn]);

    const handleLogin = (e) => {
        e.preventDefault();
        // Replace this with a secure authentication check API in production
        if (password === 'Nagar#@503') {
            setIsLoggedIn(true);
            setMessage({ text: '', type: '' });
        } else {
            setMessage({ text: 'Incorrect Password!', type: 'error' });
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleRateChange = (index, field, value) => {
        const updatedRates = [...rates];
        updatedRates[index][field] = value;
        setRates(updatedRates);
    };

    const addCarRow = () => {
        setRates([...rates, { model: '', days_1_4: '', days_5_10: '', days_11_20: '', month: '' }]);
    };

    const handleSaveRates = async (e) => {
        e.preventDefault();
        
        // Filter out empty rows
        const cleanedRates = rates.filter(rate => rate.model.trim() !== '');

        try {
            /* 
               CRITICAL NOTE: You cannot use file_put_contents in React.
               You MUST replace the URL below with a Cloudflare Worker API endpoint 
               that handles saving data to a Cloudflare KV store.
            */
            const response = await fetch('/api/save-rates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cleanedRates)
            });

            if (response.ok) {
                setMessage({ text: 'Rates updated successfully!', type: 'success' });
            } else {
                // Remove this else block once you have a real API connected.
                setMessage({ text: 'API not connected. Could not save to rates.json on Cloudflare Pages.', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Network error. API not connected.', type: 'error' });
        }
    };

    return (
        <div className="bg-gray-100 font-sans p-6 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white p-8 rounded shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">Pricing Manager</h1>
                    {isLoggedIn && (
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
                    )}
                </div>

                {message.text && (
                    <p className={`p-3 rounded mb-4 border ${message.type === 'error' ? 'bg-red-100 text-red-700 border-red-300' : 'bg-green-100 text-green-700 border-green-300'}`}>
                        {message.text}
                    </p>
                )}

                {!isLoggedIn ? (
                    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10">
                        <label className="block mb-2 font-bold">Admin Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border p-2 rounded mb-4 focus:ring-2 focus:ring-slate-800" />
                        <button type="submit" className="w-full bg-slate-800 text-white font-bold py-2 rounded">Login</button>
                    </form>
                ) : (
                    <form onSubmit={handleSaveRates}>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-800 text-white text-sm uppercase">
                                        <th className="p-3 border">Car Model</th>
                                        <th className="p-3 border">01 to 04 Days</th>
                                        <th className="p-3 border">05 to 10 Days</th>
                                        <th className="p-3 border">11 to 20 Days</th>
                                        <th className="p-3 border">01 Month</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rates.map((rate, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="p-2"><input type="text" value={rate.model} onChange={(e) => handleRateChange(index, 'model', e.target.value)} className="w-full p-2 border rounded font-bold" /></td>
                                            <td className="p-2"><input type="number" value={rate.days_1_4} onChange={(e) => handleRateChange(index, 'days_1_4', e.target.value)} className="w-full p-2 border rounded" /></td>
                                            <td className="p-2"><input type="number" value={rate.days_5_10} onChange={(e) => handleRateChange(index, 'days_5_10', e.target.value)} className="w-full p-2 border rounded" /></td>
                                            <td className="p-2"><input type="number" value={rate.days_11_20} onChange={(e) => handleRateChange(index, 'days_11_20', e.target.value)} className="w-full p-2 border rounded" /></td>
                                            <td className="p-2"><input type="number" value={rate.month} onChange={(e) => handleRateChange(index, 'month', e.target.value)} className="w-full p-2 border rounded" /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4">
                             <button type="button" onClick={addCarRow} className="text-sm bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">+ Add New Car</button>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button type="submit" className="bg-slate-800 text-white font-bold py-3 px-8 rounded shadow-lg">Save All Changes</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}