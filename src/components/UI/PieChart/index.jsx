import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { PieChart } from "./styles";

const index = (props) => {
  const { results } = props;
  const [corrects, setCorrects] = useState(0);
  const [questions, setQuestions] = useState(0);

  const state = {
    options: {
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {},
              value: {},
            },
          },
        },
      },
      labels: ["Corrects", "Wrongs"],
      colors: ["#3b77d0", "red"],
      fill: {
        colors: ["#3b77d0", "#f44336"],
      },
    },
    series: [corrects, questions],
  };

  useEffect(() => {
    const c = results.reduce((acc, cur) => {
      return acc + Number(cur.amount_of_corrects);
    }, 0);
    const q = results.reduce((acc, cur) => {
      return (
        acc + Number(cur.amount_of_questions) - Number(cur.amount_of_corrects)
      );
    }, 0);
    setCorrects(c);
    setQuestions(q);
  }, [results]);

  return (
    <PieChart>
      <Chart options={state.options} series={state.series} type="donut" />
    </PieChart>
  );
};

export default index;
