"use client"
import Image from 'next/image'
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const FinanceChart = () => {
    const data = [
        {
            name: "Jan",
            income: 75,
            expense: 15,
        },
        {
            name: "Feb",
            income: 55,
            expense: 14,
        },
        {
            name: 'Mar',
            income: 60,
            expense: 40,
        },
        {
            name: 'Apr',
            income: 85,
            expense: 80,
        },
        {
            name: 'May',
            income: 80,
            expense: 73,
        },
        {
            name: 'Jun',
            income: 85,
            expense: 55,
        },
        {
            name: 'Jul',
            income: 70,
            expense: 60,
        },
        {
            name: 'Aug',
            income: 90,
            expense: 80,
        },
        {
            name: 'Sep',
            income: 75,
            expense: 73,
        },
        {
            name: 'Oct',
            income: 85,
            expense: 75,
        },
        {
            name: 'Nov',
            income: 70,
            expense: 60,
        },
        {
            name: 'Dec',
            income: 90,
            expense: 80,
        },
    ]
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold' >Finance Chart</h1>
                <Image src="/moreDark.png" alt="more" width={20} height={20} />
            </div>
            <LineChart
                style={{ width: '100%', maxWidth: '700px', height: '80%', maxHeight: '75vh', aspectRatio: 1.618 }}
                responsive
                data={data}
                margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 20,
                }}
                className='bg-white rounded-lg p-4 h-full flex items-center justify-center'
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#717572" }} tickMargin={20} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#717572" }} tickMargin={20} />
                <Tooltip />
                <Legend align="center" verticalAlign="top" stroke="#C3EBFA" />
                <Line type="monotone" dataKey="income" stroke="#25CCF7" strokeWidth={5} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="expense" stroke="#FAE27C" strokeWidth={5} />
            </LineChart>
        </div>

    )
}

export default FinanceChart