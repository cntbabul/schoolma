"use client"
import Image from 'next/image';
import React from 'react';
import { ResponsiveContainer, Rectangle, CartesianGrid, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const AttendanceChart = () => {
    const data = [
        {
            name: "Mon",
            present: 40,
            absent: 60,
        },
        {
            name: "Tue",
            present: 30,
            absent: 70,
        },
        {
            name: 'Tues',
            present: 40,
            absent: 60,
        },
        {
            name: 'Wed',
            present: 20,
            absent: 80,
        },
        {
            name: 'Thur',
            present: 27,
            absent: 73,
        },
        {
            name: 'Fri',
            present: 85,
            absent: 15,
        },
    ]

    return (
        <div className='bg-white rounded-lg p-4 h-full'>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold' >Attendance Chart</h1>
                <Image src="/moreDark.png" alt="more" width={20} height={20} />
            </div>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={data} width={500} height={300} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
                    <XAxis axisLine={false} dataKey="name" tickLine={false} tick={{ fill: "#717572" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#717572" }} />
                    <Tooltip />
                    <Legend align="left" verticalAlign="top" wrapperStyle={{ paddingTop: "5px", paddingBottom: "20px", fontSize: "12px", fontWeight: "bold" }} />
                    <Bar dataKey="present" fill="#25CCF7" activeBar={<Rectangle fill="#25CCF7" stroke="blue" />} />
                    <Bar dataKey="absent" fill="#FAE27C" activeBar={<Rectangle fill="#FAE27C" stroke="blue" />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AttendanceChart