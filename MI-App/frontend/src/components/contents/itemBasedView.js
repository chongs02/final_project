import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyledMovieDetailPoster, StyledMovieTitle } from "./styleComponent";
import EmotionGraph from "./emotionChart";

const ItemBasedView = props => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState({});

  useEffect(() => {
    requestItemCollaborative();
  }, []);

  const requestItemCollaborative = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    const url = `/api/CollaborativeEmotion/?movieCd=${props.movieCd}`;
    const recommendList = await axios.get(url, config);
    if (recommendList.data[0]) {
      setData(recommendList.data);
      setCurrent(recommendList.data[0].index);
    }
  };

  return (
    <div>
      <StyledMovieTitle>ItemBased</StyledMovieTitle>
      <div style={{ overflowY: "scroll", height: "100%" }}>
        {data[current] ? (
          data.map(item => {
            return (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    transition:
                      "transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955)"
                  }}
                >
                  <Card data={item}></Card>
                  <EmotionGraph
                    movieCd={item.movieCd}
                    Radius={60}
                    Legend={true}
                    cy={"45%"}
                  ></EmotionGraph>
                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
export default ItemBasedView;

const Card = props => {
  console.log(props);
  const { movieNm, poster } = props.data;

  return (
    <div>
      <div>{movieNm}</div>
      <div
        style={{
          marginRight: "5%"
        }}
      >
        <StyledMovieDetailPoster src={poster} alt={movieNm} title={movieNm} />
      </div>
    </div>
  );
};

const Arrow = ({ direction, clickFunction, glyph }) => (
  <div className={`slide-arrow ${direction}`} onClick={clickFunction}>
    {glyph}
  </div>
);
