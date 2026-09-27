import React, { useState, useEffect } from 'react';

export default function PricingTable() {
    const [ratesData, setRatesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch dynamic rates from your Cloudflare API instead of using hardcoded data
    useEffect(() => {
        fetch('/api/rates')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then(data => {
                // Ensure data is an array before setting it
                setRatesData(Array.isArray(data) ? data : []);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching rates:", err);
                setIsLoading(false);
            });
    }, []);

    return (
        <section className="py-24 bg-[#FDFBF7] w-full">
            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 overflow-x-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold text-[#2C2926]">Tariff <span className="text-[#D4AF37]">Plans</span></h2>
                    <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full"></div>
                </div>
                
                <div className="rounded-2xl border border-[#E8E3DA] shadow-[0_8px_40px_rgba(0,0,0,0.03)] overflow-hidden bg-white">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-[#EAE4D8] text-[#2C2926] text-sm uppercase tracking-wider">
                                <th className="p-5 border-b border-[#D9D3C7] font-bold">Car Models</th>
                                <th className="p-5 border-b border-[#D9D3C7] font-bold">01 To 04 Days</th>
                                <th className="p-5 border-b border-[#D9D3C7] font-bold">05 To 10 Days</th>
                                <th className="p-5 border-b border-[#D9D3C7] font-bold">11 To 20 Days</th>
                                <th className="p-5 border-b border-[#D9D3C7] font-bold">01 Month</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#5C5751] text-sm bg-white">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-[#8A847A] font-medium">
                                        Loading premium fleet pricing...
                                    </td>
                                </tr>
                            ) : ratesData.length > 0 ? (
                                ratesData.map((rate, index) => (
                                    <tr key={index} className="border-b border-[#E8E3DA] hover:bg-[#F5F2EB] transition-colors duration-300">
                                        <td className="p-5 font-bold text-[#2C2926]">{rate.model}</td>
                                        <td className="p-5">₹{rate.days_1_4}</td>
                                        <td className="p-5">₹{rate.days_5_10}</td>
                                        <td className="p-5">₹{rate.days_11_20}</td>
                                        <td className="p-5">₹{rate.month}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-[#8A847A] font-medium">
                                        No pricing data available at the moment.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}