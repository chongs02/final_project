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
  const profile = usePrevious(props.profile);
  const [userMovieInfo, setUserMovieInfo] = useState([]);
  const [isDetails, setIsDetails] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setIsDetails(false);
  }, [props.pageChange]);

  useEffect(() => {
    if (profile !== props.profile && props.profile) {
      props.profile.forEach(async element => {
        await userMovie(element.watchedMovie);
      });
    }
    return () => {
      setUserMovieInfo([]);
      setIsDetails(false);
    };
  }, [props.profile]);

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

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  }

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
              width={"73%"}
              key={info.movieCd}
              movieCd={info.movieCd}
              info={info}
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
        <StyledContentTitle>내가 본 영화</StyledContentTitle>
        <StyledMovieList>
          {uniqueInfo.map((info, i) => {
            return (
              <MovieSearchInfo
                page={"/myPage"}
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
      <StyledContentTitle>내가 본 영화</StyledContentTitle>
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
      {!props.isHome ? (
        <div />
      ) : (
        <div>
          {isDetails ? (
            <Route exact path="/myPage/:title" component={details} />
          ) : (
            <div></div>
          )}
          <div>
            {props.profile.length > 0 ? userMoviecomponent() : noResult}
          </div>
        </div>
      )}
    </div>
  );
});

export default UserMovie;
