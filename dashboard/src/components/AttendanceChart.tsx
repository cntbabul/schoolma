"use client"
import Image from 'next/image';
import React from 'react';
import { ResponsiveContainer, Rectangle, CartesianGrid, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';


const AttendanceChart = ({ data }: { data: { name: string; present: number; absent: number; }[] }) => {

    return (

        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} width={500} height={300} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
                <XAxis axisLine={true} dataKey="name" tickLine={false} tick={{ fill: "#717572" }} />
                <YAxis axisLine={true} tickLine={false} tick={{ fill: "#717572" }} domain={[0, 'auto']} />
                <Tooltip />
                <Legend align="left" verticalAlign="top" wrapperStyle={{ paddingTop: "5px", paddingBottom: "20px", fontSize: "12px", fontWeight: "bold" }} />
                <Bar dataKey="present" fill="#25CCF7" activeBar={<Rectangle fill="#25CCF7" stroke="blue" />} />
                <Bar dataKey="absent" fill="#FAE27C" activeBar={<Rectangle fill="#FAE27C" stroke="blue" />} />
            </BarChart>
        </ResponsiveContainer>

    )
}

export default AttendanceChart