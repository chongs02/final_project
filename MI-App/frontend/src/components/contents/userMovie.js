import React, { useEffect, useState, memo, useRef, useMemo } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import update from "react-addons-update";

import { MovieDetailsInfo, MovieSearchInfo } from "./movieInfo";

import {
  StyledMovieList,
  StyledContent,
  StyledContentTitle
} from "./styleComponent";

const UserMovie = memo(props => {
  const [userMovieInfo, setUserMovieInfo] = useState([]);
  const [isDetails, setIsDetails] = useState(false);
  const [selected, setSelected] = useState([]);

  let title = "내가 본 영화";
  if (props.name === "home") {
    title = "내가 본 영화";
  } else if (props.name === "like") {
    title = "내가 좋아한 영화";
  } else if (props.name === "hate") {
    title = "내가 싫어한 영화";
  }

  useEffect(() => {
    loadProfile();
    setIsDetails(false);
    setUserMovieInfo([]);
  }, [props.pageChange, props.name]);

  const loadProfile = () => {
    props.profile.forEach(async element => {
      if (props.name === "like") {
        await userMovie(element.like);
      } else if (props.name === "hate") {
        await userMovie(element.hate);
      } else {
        await userMovie(element.watchedMovie);
      }
    });
    // }
    return () => {
      setUserMovieInfo([]);
      setIsDetails(false);
    };
  };

  let query = [];
  const userMovie = async searchInfo => {
    let isExist = query.indexOf(searchInfo) !== -1;
    query.push(searchInfo);

    if (!isExist) {
      let url = "/movieInfo/";
      url = url + "?search=" + searchInfo;
      try {
        const fetchedData = await axios.get(url);

        setUserMovieInfo(prevState => {
          return update(prevState, { $push: fetchedData.data });
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClick = i => {
    setIsDetails(true);
    setSelected([userMovieInfo[i]]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const details = props => {
    return (
      <StyledContent>
        {selected.map(info => {
          return (
            <MovieDetailsInfo
              width="85%"
              key={info.movieCd}
              movieCd={info.movieCd}
              info={info}
              from={props.location.pathname}
            />
          );
        })}
      </StyledContent>
    );
  };

  const userMoviecomponent = () => {
    let uniqueInfo = Array.from(new Set(userMovieInfo.map(s => s.movieCd))).map(
      movieCd => {
        return {
          actors: userMovieInfo.find(s => s.movieCd === movieCd).actors,
          actors_en: userMovieInfo.find(s => s.movieCd === movieCd).actors_en,
          cast: userMovieInfo.find(s => s.movieCd === movieCd).cast,
          cast_en: userMovieInfo.find(s => s.movieCd === movieCd).cast_en,
          companyCd: userMovieInfo.find(s => s.movieCd === movieCd).companyCd,
          companyNm: userMovieInfo.find(s => s.movieCd === movieCd).companyNm,
          companyNmEn: userMovieInfo.find(s => s.movieCd === movieCd)
            .companyNmEn,
          companyPartNm: userMovieInfo.find(s => s.movieCd === movieCd)
            .companyPartNm,
          directors: userMovieInfo.find(s => s.movieCd === movieCd).directors,
          genre: userMovieInfo.find(s => s.movieCd === movieCd).genre,
          id: userMovieInfo.find(s => s.movieCd === movieCd).id,
          movieCd: movieCd,
          movieNm: userMovieInfo.find(s => s.movieCd === movieCd).movieNm,
          movieNmEn: userMovieInfo.find(s => s.movieCd === movieCd).movieNmEn,
          nations: userMovieInfo.find(s => s.movieCd === movieCd).nations,
          openDt: userMovieInfo.find(s => s.movieCd === movieCd).openDt,
          poster: userMovieInfo.find(s => s.movieCd === movieCd).poster,
          prdtStatNm: userMovieInfo.find(s => s.movieCd === movieCd).prdtStatNm,
          prdtYear: userMovieInfo.find(s => s.movieCd === movieCd).prdtYear,
          repGenre: userMovieInfo.find(s => s.movieCd === movieCd).repGenre,
          repNation: userMovieInfo.find(s => s.movieCd === movieCd).repNation,
          showTm: userMovieInfo.find(s => s.movieCd === movieCd).showTm,
          typeNm: userMovieInfo.find(s => s.movieCd === movieCd).typeNm,
          userRating: userMovieInfo.find(s => s.movieCd === movieCd).userRating,
          watchGradeNm: userMovieInfo.find(s => s.movieCd === movieCd)
            .watchGradeNm
        };
      }
    );

    return (
      <StyledContent>
        <StyledContentTitle>{title}</StyledContentTitle>
        <StyledMovieList>
          {uniqueInfo.map((info, i) => {
            return (
              <MovieSearchInfo
                page={`/myPage`}
                key={i}
                info={info}
                onClick={() => handleClick(i)}
              ></MovieSearchInfo>
            );
          })}
        </StyledMovieList>
      </StyledContent>
    );
  };

  const noResult = (
    <StyledContent>
      <StyledContentTitle>{title}</StyledContentTitle>
      <div
        style={{
          display: "flex",
          height: "188.6px",
          margin: "30px 0px",
          paddingLeft: "20px"
        }}
      >
        본 영화가 없습니다
      </div>
    </StyledContent>
  );

  return (
    <div>
      {isDetails ? (
        <Route exact path={`/myPage/:title`} component={details} />
      ) : (
        <div></div>
      )}
      <div>{props.profile.length > 0 ? userMoviecomponent() : noResult}</div>
    </div>
  );
});

export default UserMovie;
