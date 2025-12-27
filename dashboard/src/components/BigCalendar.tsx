"use client";
import React, { useState } from 'react';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
// css imported in layout

const localizer = momentLocalizer(moment);

type CalendarEvent = {
    title: string;
    start: Date;
    end: Date;
};

const BigCalendar = ({ data }: { data: CalendarEvent[] }) => {
    const [view, setView] = useState<View>(Views.WORK_WEEK);

    const handleViewChange = (selectedView: View) => {
        setView(selectedView);
    };

    return (
        <Calendar
            localizer={localizer}
            events={data}
            startAccessor="start"
            endAccessor="end"
            views={["work_week", "day"]}
            view={view}
            style={{ height: "98%" }}
            onView={handleViewChange}
            min={moment().set({ hour: 8, minute: 0 }).toDate()}
            max={moment().set({ hour: 17, minute: 0 }).toDate()}
        />
    );
};

export default BigCalendar;