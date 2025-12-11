"use client"
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Image from 'next/image';

// #region Sample data
const data = [
    {
        name: 'Boys',
        value: 55,
        fill: '#25CCF7',
    },
    {
        name: 'Girls',
        value: 45,
        fill: '#FAE27C',
    },
];

// Custom label renderer to show percentage
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            className="font-bold text-sm"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const CountChart = () => {
    return (
        <div className='bg-white rounded-xl w-full h-full p-4'>
            {/* title  */}
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Students</h1>
                <Image src="/moreDark.png" width={20} height={20} alt="more" />
            </div>
            {/* chart  */}
            <div className='relative w-full h-[75%] flex items-center justify-center'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            innerRadius={40}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <Image
                    src="/maleFemale.png"
                    width={50}
                    height={50}
                    alt="maleFemale"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
            </div>
            {/* bottom  */}
            <div className='flex justify-center gap-16 mt-8'>
                <div className='flex flex-col gap-1'>
                    <div className='w-5 h-5 bg-lamaSky rounded-full ' />
                    <h1 className='font-bold'>1,234</h1>
                    <h2 className='text-xs text-gray-500'>Boys (55%)</h2>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='w-5 h-5 bg-lamaYellow rounded-full ' />
                    <h1 className='font-bold'>1,234</h1>
                    <h2 className='text-xs text-gray-500'>Girls (45%)</h2>

                </div>
            </div>
        </div>

    )
}

export default CountChart