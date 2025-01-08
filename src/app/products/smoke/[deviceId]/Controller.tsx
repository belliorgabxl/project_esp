"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
export default function Controller() {
  const chartA = 50;
  const chartB = 0;
  const chartC = 50;
  // if (dirtValue.startsWith("value")){
  //   Dvalue = dirtValue.split(": ")[1];
  //   chartB = parseInt(Dvalue, 10);
  // }
  const data = [
    {
      label: "air",
      value: chartA - (chartB - 20),
      color: "rgba(83, 217, 217, 1)",
      cutout: "50%",
    },
    {
      label: "ค่าควัน",
      value: chartB * 0.4,
      color: "rgba(0, 103, 160, 1)",
      cutout: "50%",
    },
    {
      label: "อุณหภูมิ",
      value: chartC - chartA * 0.05,
      color: "rgba(0, 43, 73, 1)",
      cutout: "50%",
    },
  ];
  const options: any = {
    plugins: {
      responsive: true,
    },
    cutout: data.map((item) => item.cutout),
  };
  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => Math.round(item.value)),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
        dataVisibility: new Array(data.length).fill(true),
      },
    ],
  };

  return (
    <div>
      <div className="bg-black rounded-lg grid place-items-center my-2 ">
        <Doughnut data={finalData} options={options} />
      </div>
    </div>
  );
}
