import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import EmotionGraph from "./emotionChart";
import { collaboToDetail } from "../../actions/movieInfo";
import { StyledMovieDetailPoster, StyledContentTitle } from "./styleComponent";

const ItemBasedView = props => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    requestItemCollaborative();
  }, []);

  const movieInfo = async searchInfo => {
    let url = "/movieInfo/";
    url = url + "?search=" + searchInfo;
    try {
      let result = await axios.get(url);
      dispatch(collaboToDetail(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = i => {
    movieInfo(data[i].movieCd);
  };

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
      <StyledContentTitle
        style={{
          marginBottom: "30px",
          display: "flex",
          justifyContent: "center",
          color: "rgba(55, 66, 250, 0.75)"
        }}
      >
        맞춤 감성 영화
      </StyledContentTitle>
      <div
        style={{
          padding: "5px 5px",
          border: "1px solid rgba(37, 40, 47, 0.1)",
          borderRadius: "5px",
          height: "810px"
        }}
      >
        {data && data.length > 0 ? (
          <div
            style={{
              overflow: "hidden",
              height: "100%",
              width: "100%",
              position: "relative"
            }}
          >
            <div
              style={{
                overflowY: "scroll",
                height: "99%",
                width: "100%",
                position: "absolute",
                background: "transparent",
                padding: "8px",
                marginRight: "-50px" /* maximum width of scrollbar */,
                paddingRight: "50px" /* maximum width of scrollbar */
              }}
            >
              {data[current] ? (
                data.map((item, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
                      <div
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          position: "relative",
                          padding: "0px 20px",
                          paddingTop: "15px",
                          transition:
                            "transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955)",
                          marginBottom: "20px",

                          boxShadow:
                            "0 4px 15px -5px rgba(50, 50, 93, 0.25), 0 5px 16px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025)", // 없엇음
                          borderRadius: "5px"
                        }}
                        onClick={() => handleClick(i)}
                      >
                        <Card data={item}></Card>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              fontFamily: "nanumB",
                              color: "#fc427b"
                            }}
                          >
                            {" "}
                          </div>
                          <div
                            style={{
                              margin: "10px 15px",
                              borderRadius: "5px"
                            }}
                          >
                            <EmotionGraph
                              movieCd={item.movieCd}
                              width={190}
                              height={220}
                              Radius={65}
                              Legend={true}
                              cx={"53%"}
                              cy={"55%"}
                              isSideGraph={true}
                            ></EmotionGraph>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              padding: "0px 20px",
              paddingTop: "15px",
              marginBottom: "20px"
            }}
          >
            <p>감정 정보가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemBasedView;

const Card = props => {
  const { movieNm, poster, repGenre, repNation, openDt } = props.data;
  let openYear = openDt.slice(0, 4);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          fontFamily: "nanumB",
          marginLeft: "15px"
        }}
      >
        {movieNm}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: "15px",
          width: "50px",
          marginTop: "2px",
          marginBottom: "10px"
        }}
      >
        <div
          style={{
            color: "grey",
            fontSize: "15px",
            width: "200px",
            whiteSpace: "nowrap"
          }}
        >
          {openYear}・{repNation}・{repGenre}
        </div>
      </div>
      <div
        style={{
          margin: "10px 15px",
          marginBottom: "20px"
        }}
      >
        <StyledMovieDetailPoster
          src={poster}
          alt={movieNm}
          title={movieNm}
          width="120px"
        />
      </div>
    </div>
  );
};
