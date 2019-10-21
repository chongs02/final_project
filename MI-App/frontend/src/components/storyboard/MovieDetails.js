import React from "react";
import MovieInfo from "../contents/MovieInfo";

const MovieDetails = ({ info }) => {
  console.log(info);
  return (
    <div>
      <h2>영화 상세 정보</h2>
      {/* {data.map(info => {
        return (
          <div>
            {info.movieNm} {info.movieCd}
          </div>
        );
      })} */}
    </div>
  );
};

// const MovieDetails = ({ keyword, data }) => {
//   data = data.filter(title => {
//     return title.movieNm.toLowerCase().indexOf(keyword) > -1;
//   });

//   return data.map((title, i) => {
//     return <MovieInfo title={title} key={title.id}></MovieInfo>;
//   });
// };

export default MovieDetails;
