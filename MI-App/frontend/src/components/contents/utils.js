// object에서 특정한 key의 array 생성해줌
export const pickInfo = (arr, instance) => {
  let array = [];
  arr.map(data => {
    array.push(data[instance]);
  });
  return array;
};

//string => list => flatten
export const stringToList = str => {
  let arr = str.map(data =>
    data
      .replace(/['"]+/g, "")
      .replace(/[\[\]']+/g, "", "")
      .split(",")
  );
  arr = arr.flat();
  arr = arr.map(data => data.trim());
  // console.log(arr);
  return arr;
};

// array 속 가장 카운트가 많이된 value를 뽑아줌
export const sorted = (type, arr) => {
  let data = arr.reduce(function(acc, curr) {
    if (typeof acc[curr] == "undefined") {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }

    return acc;
  }, {});
  let sorted = Object.keys(data);
  let newObject = {};
  if (type === "descend") {
    sorted
      .sort(function(a, b) {
        return data[b] - data[a];
      })
      .map(key => (newObject[key] = data[key]));
  } else if (type === "ascend") {
    sorted
      .sort(function(a, b) {
        return data[a] - data[b];
      })
      .map(key => (newObject[key] = data[key]));
  }

  return newObject;
};

// array 속 string 을 number로 바꿔줌
export const arrayStringToNumber = arr => {
  let numbers = arr.map(Number);
  return numbers;
};

// 0값 제외하고 sum과 avg를 계산해줌
export const calAverage = arr => {
  const filtered = arr.filter(item => item !== 0);
  let sum = 0;
  let avg = 0;
  if (filtered.length) {
    sum = filtered.reduce((a, b) => a + b);
    avg = sum / filtered.length;
    return { avg, sum };
  }
};

// array의 string의 앞 4자리를 빼줌
export const getYear = arr => {
  let data = arr.map(date => {
    return date.slice(0, 4);
  });
  return data;
};

//array의 0제외하고 최소값을 찾아줌
export const getMinNumber = arr => {
  let data = arr.filter(item => item !== 0);
  data = data.sort(function(a, b) {
    return a - b;
  });
  let minValue = data.slice(0, 1);
  return minValue[0];
};
