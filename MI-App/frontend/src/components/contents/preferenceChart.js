import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getScore } from "../../actions/movieScore";

import { PieChart, Pie, Cell } from "recharts";
import { Legend, ResponsiveContainer, Label } from "recharts";

const COLORS = ["#ff7979", "#74b9ff"];

const PreferenceChart = props => {
  let renderLabel = entry => {
    return `${entry.value}%`;
  };

  //   onPieEnter = ele => {
  //     console.log(ele);
  //     // console.log(entry.activePayload[0].payload.value);
  //   };

  const score = props.movieData[0];

  let data;

  if (score) {
    data = [
      { name: "좋아요", value: score.positive },
      { name: "별로에요", value: score.negative }
    ];
  } else {
    data = [{ name: "좋아요", value: 50 }, { name: "별로에요", value: 50 }];
  }

  useEffect(() => {
    props.getScore(props.movieCd);
  }, []);

  return (
    <ResponsiveContainer height={280} width="100%">
      <PieChart>
        {/* onMouseEnter={onPieEnter} */}
        <Pie
          label={renderLabel}
          data={data}
          cx={"50%"}
          cy={"50%"}
          innerRadius={65}
          outerRadius={86}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          <Label
            value={score ? "선호도" : "정보가 없습니다"}
            position="center"
          />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" iconType="square" font-family="nanumB" />
      </PieChart>
    </ResponsiveContainer>
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
)(PreferenceChart);
