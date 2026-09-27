import React, { useState, useEffect } from 'react';

export default function PricingTable() {
    const [ratesData, setRatesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/rates')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then(data => {
                setRatesData(Array.isArray(data) ? data : []);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching rates:", err);
                setIsLoading(false);
            });
    }, []);

    return (
        <section className="py-16 md:py-24 bg-[#FDFBF7] w-full overflow-hidden">
            <div className="w-full max-w-[1200px] mx-auto px-4 md:px-12">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2C2926]">Tariff <span className="text-[#D4AF37]">Plans</span></h2>
                    <div className="w-20 md:w-24 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full"></div>
                    {/* Visual cue for mobile swipe */}
                    <p className="md:hidden text-xs text-[#8A847A] mt-3 flex items-center justify-center gap-1.5 font-medium">
                        <span>←</span> Swipe table to view all rates <span>→</span>
                    </p>
                </div>
                
                {/* Scroll container with proper touch action to prevent screen lockups */}
                <div className="rounded-2xl border border-[#E8E3DA] shadow-[0_8px_40px_rgba(0,0,0,0.03)] bg-white overflow-x-auto [touch-action:pan-x] [-webkit-overflow-scrolling:touch]">
                    <table className="w-full text-left border-collapse min-w-[650px] md:min-w-[800px]">
                        <thead>
                            <tr className="bg-[#EAE4D8] text-[#2C2926] text-xs md:text-sm uppercase tracking-wider">
                                <th className="p-4 md:p-5 border-b border-[#D9D3C7] font-bold sticky left-0 bg-[#EAE4D8] z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none">Car Models</th>
                                <th className="p-4 md:p-5 border-b border-[#D9D3C7] font-bold whitespace-nowrap">01 To 04 Days</th>
                                <th className="p-4 md:p-5 border-b border-[#D9D3C7] font-bold whitespace-nowrap">05 To 10 Days</th>
                                <th className="p-4 md:p-5 border-b border-[#D9D3C7] font-bold whitespace-nowrap">11 To 20 Days</th>
                                <th className="p-4 md:p-5 border-b border-[#D9D3C7] font-bold whitespace-nowrap">01 Month</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#5C5751] text-xs md:text-sm bg-white">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-[#8A847A] font-medium">
                                        Loading premium fleet pricing...
                                    </td>
                                </tr>
                            ) : ratesData.length > 0 ? (
                                ratesData.map((rate, index) => (
                                    <tr key={index} className="border-b border-[#E8E3DA] hover:bg-[#F5F2EB] transition-colors duration-200">
                                        <td className="p-4 md:p-5 font-bold text-[#2C2926] sticky left-0 bg-white hover:bg-[#F5F2EB] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none">
                                            {rate.model}
                                        </td>
                                        <td className="p-4 md:p-5 whitespace-nowrap">₹{rate.days_1_4}</td>
                                        <td className="p-4 md:p-5 whitespace-nowrap">₹{rate.days_5_10}</td>
                                        <td className="p-4 md:p-5 whitespace-nowrap">₹{rate.days_11_20}</td>
                                        <td className="p-4 md:p-5 whitespace-nowrap">₹{rate.month}</td>
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