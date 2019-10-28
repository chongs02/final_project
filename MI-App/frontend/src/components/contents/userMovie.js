import React, { useEffect, useState, memo, useRef } from "react";
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

  const userMovie = async searchInfo => {
    let url = "/movieInfo/";
    url = url + "?search=" + searchInfo;
    await axios
      .get(url)
      .then(response => {
        setUserMovieInfo(prevState => {
          return update(prevState, { $push: response.data });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

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
  };

  const details = () => {
    return (
      <StyledContent>
        {selected.map(info => {
          return (
            <MovieDetailsInfo
              user={props.username}
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
    return (
      <StyledContent>
        <StyledContentTitle>내가 본 영화</StyledContentTitle>
        <StyledMovieList>
          {userMovieInfo.map((info, i) => {
            // console.log(props);
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

  return (
    <div style={{ flex: 1 }}>
      <div>
        {isDetails ? (
          <Route exact path="/myPage/:title" component={details} />
        ) : (
          <div></div>
        )}
      </div>
      <div>{userMoviecomponent()}</div>
    </div>
  );
});

export default UserMovie;
