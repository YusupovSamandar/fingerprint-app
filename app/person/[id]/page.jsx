import React from 'react';
import Table from '@/app/components/personTable';

const personData = [
    {
        date: "August 12",
        timeOfArrival: "20:45",
        timeOfDeparture: "none"
    },
    {
        date: "August 13",
        timeOfArrival: "21:45",
        timeOfDeparture: "9:00"
    },
    {
        date: "August 14",
        timeOfArrival: "2:45",
        timeOfDeparture: "15:00"
    },
    {
        date: "August 15",
        timeOfArrival: "4:00",
        timeOfDeparture: "13:43"
    },
    {
        date: "August 16",
        timeOfArrival: "14:00",
        timeOfDeparture: "none"
    },
]

export default function page({ params }) {
    const personID = params.id
    return (
        <div>
            <Table rows={personData} />
        </div>
    )
}
