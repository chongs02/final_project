import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
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
  const [userEmotion, setUserEmotion] = useState({});
  const [err, setErr] = useState(null);
  const [movieData, setMovieData] = useState([]);
  const scoreLoaded = useSelector(state => state.getScore.scoreLoaded);
  const user = useSelector(state => state.auth.user);
  let score = movieData;

  let data;

  if (score) {
    // B는 내가 선호하는 감정스테이트 정보로 넣을 예정임
    data = [
      {
        subject: "감동",
        A: score.impression,
        B: userEmotion.impression
      },
      {
        subject: "공포",
        A: score.fear,
        B: userEmotion.fear
      },
      {
        subject: "분노",
        A: score.anger,
        B: userEmotion.anger
      },
      {
        subject: "지루함",
        A: score.boredom,
        B: userEmotion.boredom
      },
      {
        subject: "슬픔",
        A: score.sadness,
        B: userEmotion.sadness
      },
      {
        subject: "유쾌",
        A: score.fun,
        B: userEmotion.fun
      }
    ];
  } else {
    data = [
      {
        subject: "감동",
        A: 0,
        B: userEmotion.impression
      },
      {
        subject: "공포",
        A: 0,
        B: userEmotion.fear
      },
      {
        subject: "분노",
        A: 0,
        B: userEmotion.anger
      },
      {
        subject: "지루함",
        A: 0,
        B: userEmotion.boredom
      },
      {
        subject: "슬픔",
        A: 0,
        B: userEmotion.sadness
      },
      {
        subject: "유쾌",
        A: 0,
        B: userEmotion.fun
      }
    ];
  }

  useEffect(() => {
    const getScore = async movieCd => {
      let url = "/movie-api/";
      url = url + "?search=" + movieCd;
      try {
        const response = await axios.get(url);
        setMovieData(response.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getScore(props.movieCd);

    const userMovieEmotion = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      if (token) {
        config.headers["Authorization"] = `Token ${token}`;
      }
      let url = "/api/userMovieEmotion/";
      try {
        const response = await axios.get(url, config);
        setUserEmotion(response.data[0]);
      } catch (e) {
        setErr(e);
      }
    };
    userMovieEmotion();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        fontFamily: "nanumB"
      }}
    >
      {scoreLoaded && userEmotion ? (
        <RadarChart
          cx={props.cx ? props.cx : "50%"}
          cy={props.cy ? props.cy : "50%"}
          outerRadius={props.Radius ? props.Radius : 85}
          width={props.width ? props.width : 300}
          height={props.height ? props.height : 300}
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
            fillOpacity={0.4}
          />
          {props.isSideGraph ? (
            <></>
          ) : (
            <Radar
              name={user.username ? user.username : "정보가 없습니다"}
              dataKey="B"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.4}
            />
          )}
          {props.Legend ? (
            <></>
          ) : (
            <Legend
              verticalAlign="bottom"
              iconType="square"
              font-family="nanumB"
            />
          )}
        </RadarChart>
      ) : (
        <div />
      )}
    </div>
  );
};

export default EmotionGraph;
