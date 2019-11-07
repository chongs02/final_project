import React, { useEffect, useState, useCallback } from "react";
import { Route } from "react-router-dom";
import { getConfig } from "./movieInfo";
import axios from "axios";
import update from "react-addons-update";

import { MovieDetailsInfo, MovieSearchInfo } from "./movieInfo";

import {
  StyledMovieList,
  StyledContent,
  StyledContentTitle
} from "./styleComponent";

const Collaborative = props => {
  let data = [];
  const [title, setTitle] = useState("");
  const [collaborativeMovie, setCollaborativeMovie] = useState([]);
  const [isDetails, setIsDetails] = useState(false);
  const [selected, setSelected] = useState([]);

  const getMovieInfo = async searchInfo => {
    let url = "/movieInfo/";
    url = url + "?search=" + searchInfo;
    await axios
      .get(url)
      .then(response => {
        setCollaborativeMovie(prevState => {
          return update(prevState, { $push: response.data });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getCollaborative = () => {
    if (props.name === "collaborative-seen") {
      setTitle("볼 만한 영화");
      const watchedMovie = async () => {
        const config = getConfig();

        await axios
          .get("/api/watched/", config)
          .then(res => {
            data.push(res.data);
          })
          .then(res => {
            data[0].map(data => {
              getMovieInfo(data.movie_code);
            });
          });
      };
      watchedMovie();
      return title;
    } else if (props.name === "collaborative-like") {
      setTitle("좋아할 만한 영화");
      const likeMovie = async () => {
        const config = getConfig();

        await axios
          .get("/api/like/", config)
          .then(res => {
            data.push(res.data);
          })
          .then(res => {
            data[0].map(data => {
              getMovieInfo(data.movie_code);
            });
          });
      };
      likeMovie();
      return title;
    } else if (props.name === "collaborative-hate") {
      setTitle("싫어할 만한 영화");
      const hateMovie = async () => {
        const config = getConfig();

        await axios
          .get("/api/hate/", config)
          .then(res => {
            data.push(res.data);
          })
          .then(res => {
            data[0].map(data => {
              getMovieInfo(data.movie_code);
            });
          });
      };
      hateMovie();
      return title;
    }
  };

  useEffect(() => {
    getCollaborative();
    return () => {
      setCollaborativeMovie([]);
      setTitle("");
      setIsDetails(false);
    };
  }, [props.name]);

  const handleClick = i => {
    setIsDetails(true);
    setSelected([collaborativeMovie[i]]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const moviePostercomponent = () => {
    let SortedMovie = collaborativeMovie.slice(0, 10);
    return (
      <StyledContent>
        <StyledContentTitle>{title}</StyledContentTitle>
        <StyledMovieList>
          {SortedMovie.map((info, i) => {
            return (
              <MovieSearchInfo
                page={`/myPage/${props.name}`}
                key={i}
                info={info}
                onClick={() => handleClick(i)}
              />
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
        Loading...
      </div>
    </StyledContent>
  );

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

  return (
    <React.Fragment>
      <div>
        {isDetails ? (
          <Route
            exact
            path={`/myPage/${props.name}/:title`}
            component={details}
          />
        ) : (
          <div />
        )}
      </div>
      <div>
        {collaborativeMovie && collaborativeMovie !== []
          ? moviePostercomponent()
          : noResult}
      </div>
    </React.Fragment>
  );
};
export default Collaborative;
