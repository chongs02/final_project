import React, { useEffect, useState, memo, useRef } from "react";
import axios from "axios";
import update from "react-addons-update";
import {
  StyledMoviePoster,
  StyledMovieTitle,
  StyledMovieList,
  StyledMovieSearch
} from "./styleComponent";
import { MovieDetailsInfo } from "./movieInfo";

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

  const detail = (
    <div>
      {selected.map(info => {
        return (
          <MovieDetailsInfo
            key={info.movieCd}
            movieCd={info.movieCd}
            info={info}
          />
        );
      })}
    </div>
  );

  const userMoviecomponent = () => {
    return (
      <StyledMovieList>
        {userMovieInfo.map((item, i) => {
          // console.log(props);
          return (
            <StyledMovieSearch key={i} onClick={() => handleClick(i)}>
              <StyledMoviePoster
                src={item.poster}
                alt={item.movieNm}
                title={item.movieCd}
              />
              <StyledMovieTitle>{item.movieNm}</StyledMovieTitle>
            </StyledMovieSearch>
          );
        })}
      </StyledMovieList>
    );
  };

  return (
    <React.Fragment>
      <div style={{ flex: 1 }}>
        <div>{isDetails ? detail : <div></div>}</div>
        <div>{userMoviecomponent()}</div>
      </div>
    </React.Fragment>
  );
});

export default UserMovie;
