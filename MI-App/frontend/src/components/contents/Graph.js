import React, { Component } from "react";
import Chart from "chart.js";

class Graph extends Component {
  chartRef;

  componentDidMount() {
    // Chart.defaults.global.defaultFontColor = 'white';
    let ctx = document.getElementById("myChart");

    let myRadarChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          "Sad",
          "Fear",
          "Gratifying",
          "Immersion",
          "Depress",
          "Lightness"
        ],
        datasets: [
          {
            label: this.props.movie_title,
            data: [
              this.props.sad,
              this.props.fear,
              this.props.gratifying,
              this.props.immersion,
              this.props.depress,
              this.props.lightness
            ],
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(255, 99, 132, 1)"
            ],
            borderWidth: 1
            // bodyFontColor:'black'
          }
        ]
      },
      options: {
        scales: {
          // Hides the scale
          display: false
        }
      }
    });

    this.chartRef = myRadarChart;
  }

  render() {
    return (
      <div>
        {this.props.match}
        {/* <div>{this.props.movie_title}</div>
        <canvas
          ref={this.chartRef}
          id="myChart"
          width="400"
          height="400"
        ></canvas> */}
      </div>
    );
  }
}
export default Graph;
