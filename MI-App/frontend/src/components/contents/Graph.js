import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getScore } from "../../actions/movieScore";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

const data = [
  {
    subject: "Math",
    A: 120
  },
  {
    subject: "Chinese",
    A: 98
  },
  {
    subject: "English",
    A: 86
  },
  {
    subject: "Geography",
    A: 99
  },
  {
    subject: "Physics",
    A: 85
  },
  {
    subject: "History",
    A: 65
  }
];

const EmotionGraph = props => {
  console.log(props);
  useEffect(() => {
    props.getScore();
  }, []);
  return (
    <RadarChart
      cx={"50%"}
      cy={"50%"}
      outerRadius={75}
      width={200}
      height={200}
      data={data}
      margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar
        name="Mike"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
};

const mapStateToProps = state => {
  return {
    movieData: state.getScore.movieData,
    scoreLoaded: state.getScore.scoreLoaded
  };
};

export default connect(
  mapStateToProps,
  { getScore }
)(EmotionGraph);
