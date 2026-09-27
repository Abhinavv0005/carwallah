import React from 'react';

// The exact data array, unchanged
const ratesData = [
    {
        "model": "ALTROZ",
        "days_1_4": "2000",
        "days_5_10": "1700",
        "days_11_20": "1500",
        "month": "1300"
    },
    {
        "model": "SWIFT",
        "days_1_4": "2000",
        "days_5_10": "1800",
        "days_11_20": "1600",
        "month": "1400"
    },
    {
        "model": "BALENO",
        "days_1_4": "2200",
        "days_5_10": "1900",
        "days_11_20": "1700",
        "month": "1500"
    },
    {
        "model": "FRONX",
        "days_1_4": "2500",
        "days_5_10": "2300",
        "days_11_20": "2100",
        "month": "1900"
    },
    {
        "model": "VENUE",
        "days_1_4": "2700",
        "days_5_10": "2500",
        "days_11_20": "2300",
        "month": "2100"
    },
    {
        "model": "BREZZA",
        "days_1_4": "2800",
        "days_5_10": "2600",
        "days_11_20": "2400",
        "month": "2200"
    },
    {
        "model": "GRAND VITARA",
        "days_1_4": "3500",
        "days_5_10": "3300",
        "days_11_20": "3100",
        "month": "2900"
    },
    {
        "model": "JEEP COMPAS",
        "days_1_4": "3700",
        "days_5_10": "3500",
        "days_11_20": "3300",
        "month": "3100"
    },
    {
        "model": "TATA SAFARI",
        "days_1_4": "4200",
        "days_5_10": "4000",
        "days_11_20": "3800",
        "month": "3600"
    },
    {
        "model": "THAR",
        "days_1_4": "4500",
        "days_5_10": "4300",
        "days_11_20": "4100",
        "month": "3900"
    },
    {
        "model": "SCORPIO CLASSIC",
        "days_1_4": "4500",
        "days_5_10": "4300",
        "days_11_20": "4100",
        "month": "3900"
    },
    {
        "model": "SCORPIO N",
        "days_1_4": "5000",
        "days_5_10": "4800",
        "days_11_20": "4600",
        "month": "4400"
    },
    {
        "model": "THAR ROX",
        "days_1_4": "5000",
        "days_5_10": "4800",
        "days_11_20": "4600",
        "month": "4400"
    },
    {
        "model": "Defender",
        "days_1_4": "80000",
        "days_5_10": "70000",
        "days_11_20": "60000",
        "month": "40000"
    },
    {
        "model": "Fortuner",
        "days_1_4": "12000",
        "days_5_10": "10000",
        "days_11_20": "9000",
        "month": "7000"
    }
];

export default function PricingTable() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-6 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-[#0F172A] text-white text-sm uppercase tracking-wider">
                            <th className="p-4 border-b border-gray-700">CARS MODELS</th>
                            <th className="p-4 border-b border-gray-700">01 TO 04 DAYS</th>
                            <th className="p-4 border-b border-gray-700">05 TO 10 DAYS</th>
                            <th className="p-4 border-b border-gray-700">11 TO 20 DAYS</th>
                            <th className="p-4 border-b border-gray-700">01 MONTH</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800 text-sm bg-[#fcfbf5]">
                        {ratesData.map((rate, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition">
                                <td className="p-4 font-bold">{rate.model}</td>
                                <td className="p-4">₹{rate.days_1_4}</td>
                                <td className="p-4">₹{rate.days_5_10}</td>
                                <td className="p-4">₹{rate.days_11_20}</td>
                                <td className="p-4">₹{rate.month}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}