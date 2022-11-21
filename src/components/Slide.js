import React from 'react';
//import { LineChart } from 'recharts';
import MyLineChart from './LineChart.js';
import MyResponsivePie from './piechart/Chart.js'


export default function Slide({ Piedata = [], LineData = [] }) {


    return (
        <>

            <div style={{ width: '100%', height: '50%', }}>
                <MyResponsivePie data={Piedata} />
            </div>
            <div style={{ width: '100%', height: '50%', }}>
                <MyLineChart data={LineData} />
            </div>

        </>

    );

}

