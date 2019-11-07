import React, { useState, useEffect } from "react";
import axios from "axios";
import ScrollArea from "react-scrollbar";
import EmotionGraph from "./emotionChart";

import { StyledMovieDetailPoster, StyledContentTitle } from "./styleComponent";

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
          // padding: "20px 20px",
          // boxShadow:
          //   "0 13px 27px -5px rgba(50,50,93,0.25), 0 8px 16px rgba(0,0,0,0.3), 0 -6px 16px -6px rgba(0,0,0,0.025)",
          // boxShadow:
          //   "0 2px 20px -5px rgba(50, 50, 93, 0.25) inset, 0 4px 16px rgba(0, 0, 0, 0.3) inset, 0 0px 16px -6px rgba(0, 0, 0, 0.025) inset",
          borderRadius: "5px", // 없엇음
          height: "750px",
          overflow: "hidden"
        }}
      >
        <ScrollArea>
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
                      padding: "0px 20px",
                      paddingTop: "15px", // 없엇음
                      transition:
                        "transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955)",
                      marginBottom: "20px",

                      boxShadow:
                        "0 4px 15px -5px rgba(50, 50, 93, 0.25), 0 5px 16px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025)", // 없엇음
                      borderRadius: "5px"
                    }}
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
                          // boxShadow:
                          //   "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025)",
                          margin: "10px 15px",
                          borderRadius: "5px"
                        }}
                      >
                        <EmotionGraph
                          movieCd={item.movieCd}
                          width={190}
                          height={170}
                          Radius={55}
                          Legend={true}
                          cy={"52%"}
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
        </ScrollArea>
      </div>
    </div>
  );
};

export default ItemBasedView;

const Card = props => {
  const { movieNm, poster } = props.data;
  // repGenre, repNation, openDt

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "nanumB"
        }}
      >
        {movieNm}
      </div>
      <div
        style={{
          margin: "10px 15px"
        }}
      >
        <StyledMovieDetailPoster
          src={poster}
          alt={movieNm}
          title={movieNm}
          width="100px"
        />
      </div>
    </div>
  );
};

const Arrow = ({ direction, clickFunction, glyph }) => (
  <div className={`slide-arrow ${direction}`} onClick={clickFunction}>
    {glyph}
  </div>
);

// <div>
//   <StyledContentTitle
//     style={{
//       marginBottom: "30px",
//       display: "flex",
//       justifyContent: "center",
//       color: "rgba(55, 66, 250, 0.75)"
//     }}
//   >
//     감성 추천
//   </StyledContentTitle>
//   <div
//     style={{
//       padding: "5px 5px",
//       boxShadow:
//         "0 13px 27px -5px rgba(50,50,93,0.25), 0 8px 16px rgba(0,0,0,0.3), 0 -6px 16px -6px rgba(0,0,0,0.025)",
//       // boxShadow:
//       //   "0 2px 20px -5px rgba(50, 50, 93, 0.25) inset, 0 4px 16px rgba(0, 0, 0, 0.3) inset, 0 0px 16px -6px rgba(0, 0, 0, 0.025) inset",
//       borderRadius: "5px",
//       height: "750px",
//       overflow: "hidden"
//     }}
//   >
//     <ScrollArea>
//       {data[current] ? (
//         data.map(item => {
//           return (
//             <div
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "center"
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   position: "relative",
//                   padding: "0px 20px",
//                   paddingTop: "15px",
//                   transition:
//                     "transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955)",
//                   marginBottom: "20px",
//                   boxShadow:
//                     "0 4px 15px -5px rgba(50, 50, 93, 0.25), 0 5px 16px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025)",
//                   borderRadius: "5px"
//                   // margin: "10px 15px"
//                 }}
//               >
//                 <Card data={item}></Card>
//                 <div>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       fontFamily: "nanumB",
//                       color: "#fc427b"
//                     }}
//                   >
//                     {" "}
//                   </div>
//                   <div
//                     style={{
//                       // boxShadow:
//                       //   "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025)",
//                       margin: "10px 15px",
//                       borderRadius: "5px"
//                     }}
//                   >
//                     <EmotionGraph
//                       movieCd={item.movieCd}
//                       width={190}
//                       height={170}
//                       Radius={55}
//                       Legend={true}
//                       cy={"52%"}
//                       isSideGraph={true}
//                     ></EmotionGraph>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <div></div>
//       )}
//     </ScrollArea>
//   </div>
// </div>
