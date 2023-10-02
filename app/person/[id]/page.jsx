"use client"
import React, { useEffect, useState } from 'react';
import Table from '@/app/components/personTable';
import Navbar from "@/app/components/navbar";
import axios from 'axios';
import { API_URL } from '@/app/apiConfig';
"august 12"

export default function page({ params }) {
    const fingerID = params.id
    const [personData, setPersonData] = useState([]);
    useEffect(() => {
        (async function () {
            const { data } = await axios.get(`${API_URL}/api/attendance/staff/${fingerID}`);
            setPersonData(data);
        })();
    }, []);
    return (
        <div>
            <Navbar headingName={"Samandar Yusupov"} />
            <br />
            {
                personData.length > 0 ?
                    <Table rows={personData} />
                    : <h4 style={{ textAlign: "center" }} >no data to display</h4>
            }

        </div>
    )
}
