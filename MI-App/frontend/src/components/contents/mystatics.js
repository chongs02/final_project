import React, { memo, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import axios from "axios";
import StaticVisual from "./staticVisual";

const MyStatics = memo(props => {
  const profile = usePrevious(props.profile);
  const [isDetails, setIsDetails] = useState(false);
  const [likeLoaded, setLikeLoaded] = useState(false);
  const [watchLoaded, setWatchLoaded] = useState(false);
  const [likeMovieInfo, setLikeMovieInfo] = useState([]);
  const [watchedMovieInfo, setWatchedMovieInfo] = useState([]);

  useEffect(() => {
    if (profile !== props.profile && props.profile) {
      let watchMovie = sortingWatchedMovie();
      let likeMovie = sortingLikeMovie();
      watchMovie.forEach(async element => {
        await userMovie(element)
          .then(res =>
            setWatchedMovieInfo(prevState => {
              return [...prevState, res[0][0]];
            })
          )
          .then(res => setWatchLoaded(true));
      });
      likeMovie.forEach(async element => {
        await userMovie(element)
          .then(res =>
            setLikeMovieInfo(prevState => {
              return [...prevState, res[0][0]];
            })
          )
          .then(res => setLikeLoaded(true));
      });
    }
    return () => {
      setLikeMovieInfo([]);
      setWatchedMovieInfo([]);
    };
  }, [props.profile]);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  }
  const userMovie = async searchInfo => {
    let url = "/movieInfo/";
    url = url + "?search=" + searchInfo;
    let data = [];
    await axios
      .get(url)
      .then(response => {
        data.push(response.data);
      })
      .catch(err => {
        console.log(err);
      });
    return data;
  };

  const sortingWatchedMovie = () => {
    let watch = Array.from(
      new Set(props.profile.map(data => data.watchedMovie))
    ).map(watchedMovie => {
      return {
        watchedMovie: watchedMovie
      };
    });
    let watchedMovie = [];
    for (let i in watch) {
      if (
        watch[i].watchedMovie === null ||
        watch[i].watchedMovie === undefined
      ) {
      } else {
        watchedMovie.push(watch[i].watchedMovie);
      }
    }
    return watchedMovie;
  };

  const sortingLikeMovie = () => {
    let like = Array.from(new Set(props.profile.map(data => data.like))).map(
      like => {
        return {
          like: like
        };
      }
    );
    let likeMovie = [];
    for (let i in like) {
      if (like[i].like === null || like[i].like === undefined) {
      } else {
        likeMovie.push(like[i].like);
      }
    }
    return likeMovie;
  };

  return (
    <div>
      {likeLoaded ? (
        <StaticVisual
          likeInfo={likeMovieInfo}
          watchInfo={watchedMovieInfo}
        ></StaticVisual>
      ) : (
        <div></div>
      )}
    </div>
  );
});

const mapStateToProps = state => {
  return {
    profile: state.auth.profile
  };
};

export default connect(mapStateToProps)(MyStatics);
