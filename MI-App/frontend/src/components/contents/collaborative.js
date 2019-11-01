import React, { useEffect } from "react";
import { getConfig } from "./movieInfo";
import axios from "axios";

const watchedMovie = async () => {
  const config = getConfig();

  await axios.get("/api/watched/", config).then(res => console.log(res));
};
const likeMovie = async () => {
  const config = getConfig();

  await axios.get("/api/like/", config).then(res => console.log(res));
};
const hateMovie = async () => {
  const config = getConfig();

  await axios.get("/api/hate/", config).then(res => console.log(res));
};

const Collaborative = () => {
  useEffect(() => {
    watchedMovie();
    likeMovie();
    hateMovie();
  });
  return <div>여기에 디스플레이</div>;
};

export default Collaborative;
