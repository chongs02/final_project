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
              from={props.location.pathname}
            />
          );
        })}
      </StyledContent>
    );
  };

  const userMoviecomponent = () => {
    return (
      <StyledContent>
        <StyledContentTitle>내가 본 영화</StyledContentTitle>
        <StyledMovieList>
          {userMovieInfo.map((info, i) => {
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
