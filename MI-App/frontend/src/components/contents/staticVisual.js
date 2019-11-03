import React, { useCallback } from "react";

const StaticVisual = props => {
  const { likeInfo, watchInfo } = props;
  console.log(likeInfo);

  const pickInfo = (arr, instance) => {
    let array = [];
    arr.map(data => {
      array.push(data[instance]);
    });
    return array;
  };

  //string => list => flatten
  const stringToList = str => {
    let arr = str.map(data =>
      data
        .replace(/['"]+/g, "")
        .replace(/[\[\]']+/g, "", "")
        .split(",")
    );
    arr = arr.flat();
    return arr;
  };

  // array 속 가장 카운트가 많이된 value를 뽑아줌
  const mode = arr => {
    return arr
      .sort(
        (a, b) =>
          arr.filter(v => v === a).length - arr.filter(v => v === b).length
      )
      .pop();
  };

  // let arr = ["a", "b", "a", "a", "b", "c", "d", "e", "b", "a", "h"];
  // let arr_data = mode(arr);
  // console.log(arr_data)

  //좋아하는 감독
  let favoriteDirector = mode(pickInfo(likeInfo, "directors"));
  console.log(favoriteDirector);
  //좋아하는 배우
  let actors = mode(stringToList(pickInfo(likeInfo, "actors")));
  // let favoriteActor = mode(pickInfo(likeInfo, "actors"));
  console.log(actors);
  //좋아하는 장르
  const gen = () => {
    let arr = pickInfo(likeInfo, "genre").map(data => {
      return data.split(",");
    });
    arr = arr.flat();
    return arr;
  };
  let genre = mode(gen());

  console.log(genre);

  return <div>하이</div>;
};
export default StaticVisual;
