import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getScore } from "../../actions/movieScore";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend
} from "recharts";

const EmotionGraph = props => {
  const score = props.movieData[0];

  let data;

  if (score) {
    // B는 내가 선호하는 감정스테이트 정보로 넣을 예정임
    data = [
      {
        subject: "감동",
        A: score.impression
        // B: 110,
      },
      {
        subject: "공포",
        A: score.fear
        // B: 130,
      },
      {
        subject: "분노",
        A: score.anger
        // B: 130,
      },
      {
        subject: "지루함",
        A: score.boredom
        // B: 100,
      },
      {
        subject: "슬픔",
        A: score.sadness
        // B: 90,
      },
      {
        subject: "유쾌",
        A: score.fun
        // B: 85,
      }
    ];
  } else {
    data = [
      {
        subject: "감동",
        A: 0
        // B: 110,
      },
      {
        subject: "공포",
        A: 0
        // B: 130,
      },
      {
        subject: "분노",
        A: 0
        // B: 130,
      },
      {
        subject: "지루함",
        A: 0
        // B: 100,
      },
      {
        subject: "슬픔",
        A: 0
        // B: 90,
      },
      {
        subject: "유쾌",
        A: 0
        // B: 85,
      }
    ];
  }

  useEffect(() => {
    props.getScore(props.movieCd);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        color: "#551a8b",
        fontFamily: "nanumB"
      }}
    >
      {props.scoreLoaded ? (
        <RadarChart
          cx={"50%"}
          cy={"50%"}
          outerRadius={100}
          width={300}
          height={300}
          data={data}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis
            type="number"
            angle={60}
            axisLine={false}
            tick={true}
          />
          <Radar
            name={score ? score.movieNm : "정보가 없습니다"}
            dataKey="A"
            stroke="#FC427B"
            fill="#FC427B"
            fillOpacity={0.6}
          />
          <Legend
            verticalAlign="bottom"
            iconType="square"
            font-family="nanumB"
          />
        </RadarChart>
      ) : (
        <div />
      )}
    </div>
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
