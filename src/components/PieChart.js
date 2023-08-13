import React, { Component } from 'react';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import '../style/PieChart.css';

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

export default function PieChart(){


    return(
        <div className='chart'>
             
      <Line data={data} />
   
        </div>
    )
}