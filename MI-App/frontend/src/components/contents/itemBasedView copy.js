import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { StyledMoviePoster, StyledMovieTitle } from "./styleComponent";
import Slider from "react-slick";

//스크롤 애니메이션 0.5초.
const ANIM_DURATION = 300;
const FRAME_TIME = 10;

const ItemBasedView = props => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState({});
  const mSliderRef = useRef();
  const [location, setLocation] = useState({
    isHideLeft: true,
    isHideRight: false
  });
  let mScrolled = 0;

  useEffect(() => {
    requestItemCollaborative();
    refreshButtonHide();
  }, []);

  //슬라이더 내부의 양옆 패딩 값을 가져오기.
  const getSliderPadding = () => {
    return mSliderRef.current.firstChild.offsetLeft;
  };

  //페이징할 스크롤 양을 계산하기. 양옆에 padding 만큼을 빼준다
  const getPageSize = () => {
    const padding = getSliderPadding() * 2;
    return mSliderRef.current.offsetWidth - padding;
  };
  //진행률에 따라 속도를 늦춰주는 양을 계산하기.
  const getRecorrectScrollByProgress = (stepSize, pageSize, scrolled) => {
    const progress = scrolled / pageSize;
    if (progress > 0.98) {
      return Math.ceil(stepSize * 0.02);
    } else if (progress > 0.96) {
      return Math.ceil(stepSize * 0.06);
    } else if (progress > 0.93) {
      return Math.ceil(stepSize * 0.12);
    } else if (progress > 0.9) {
      return Math.ceil(stepSize * 0.2);
    } else if (progress > 0.8) {
      return Math.ceil(stepSize * 0.4);
    } else if (progress > 0.7) {
      return Math.ceil(stepSize * 0.6);
    } else if (progress > 0.6) {
      return Math.ceil(stepSize * 0.8);
    } else {
      return stepSize;
    }
  };

  // 오른쪽으로 버튼.
  const clickRight = () => {
    //우측으로 총 이동해야 할 값
    let pageSize = getPageSize();

    //스크롤할 수 있는 최대 한도
    const limit =
      mSliderRef.current.scrollWidth - mSliderRef.current.offsetWidth;

    //pageSize 만큼 이동했을 때, 위치 예상값.
    let target = pageSize + mSliderRef.current.scrollLeft;
    //만약, 예상값이 liimt 보다 크다면, pageSize 에서 그 차이만큼 빼준다.
    if (target > limit) {
      // console.log("한도보다 목표값이 더 커서 pageSize 를 조정한다.")
      const dist = target - limit;
      pageSize = pageSize - dist;
      target = limit;
      console.log("보정된 pageSize ", pageSize);
    }

    //pageSize 를 프레임으로 나눠서, 한프레임에 얼만큼 이동해야할지 계산한다.
    const stepSize = Math.ceil(pageSize / (ANIM_DURATION / FRAME_TIME));
    console.log("프레임 시간 당 움직일값. ", stepSize);

    //mScrolled 를 초기화한다.
    mScrolled = 0;
    smoothScrollToRight(stepSize, target, pageSize);
  };

  const smoothScrollToRight = (stepSize, target, pageSize) => {
    //아직 목표치까지 도달하지 않았다면, 이동해준다.
    if (mSliderRef.current.scrollLeft < target) {
      const scroll = getRecorrectScrollByProgress(
        stepSize,
        pageSize,
        mScrolled
      );
      const posX = mSliderRef.current.scrollLeft + scroll;
      // this.mSliderRef.current.scrollTo(posX, 0);
      mSliderRef.current.scrollLeft = posX;
      mScrolled += scroll;

      //재귀함수 호출.
      setTimeout(() => {
        smoothScrollToRight(stepSize, target, pageSize);
      }, FRAME_TIME);
    } else {
      //목표에 도달했다면, 좌우 버튼을 refresh
      refreshButtonHide();
    }
  };

  const clickLeft = () => {
    //좌측으로 총 이동해야 할 값은?
    let pageSize = 0 - getPageSize();

    //스크롤할 수 있는 최대 한도
    const limit = 0;
    //pageSize 만큼 이동했을 때, 위치 예상값.
    let target = pageSize + mSliderRef.current.scrollLeft;

    //만약, 예상값이 liimt 보다 적다면, limit 로 보정해준다.
    if (target < limit) {
      const dist = limit - target;
      pageSize = pageSize + dist;
      target = limit;
    }

    //프레임당 이동해야할 양 계산. 소수점 올림을 했는데, 좌측으로 이동해야 하므로, -1 해준다.
    const stepSize = Math.ceil(pageSize / (ANIM_DURATION / FRAME_TIME)) - 1;
    mScrolled = 0;
    smoothScrollToLeft(stepSize, target, pageSize);
  };

  const smoothScrollToLeft = (stepSize, target, pageSize) => {
    //아직 목표까지 도달하지 않았다면, 이동해준다.
    if (mSliderRef.current.scrollLeft > target) {
      // 이때 얻어온 scroll은 반올림한것이므로 -1 해준다.
      const scroll =
        getRecorrectScrollByProgress(stepSize, pageSize, mScrolled) - 1;
      const posX = mSliderRef.current.scrollLeft + scroll;
      // this.mSliderRef.current.scrollTo(posX, 0);
      mSliderRef.current.scrollLeft = posX;
      mScrolled += scroll;

      //재귀함수 호출.
      setTimeout(() => {
        smoothScrollToLeft(stepSize, target, pageSize);
      }, FRAME_TIME);
    } else {
      //도달했다면, 버튼 refresh
      refreshButtonHide();
    }
  };

  const refreshButtonHide = () => {
    const scrollLeft = mSliderRef.current.scrollLeft;
    const isHideLeft = scrollLeft === 0;
    const isHideRight =
      scrollLeft + mSliderRef.current.offsetWidth >=
      mSliderRef.current.scrollWidth;
    setLocation({ isHideLeft: isHideLeft, isHideRight: isHideRight });
  };

  const requestItemCollaborative = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    const url = `/api/CollaborativeEmotion/?movieCd=${props.movieCd}`;
    const recommendList = await axios.get(url, config);
    setData(recommendList.data);
    setCurrent(recommendList.data[0].index);
  };

  //   const nextItem = () => {
  //     const lastIdx = data.length - 1;
  //     const shouldResetIdx = current === lastIdx;
  //     const idx = shouldResetIdx ? 0 : current + 1;
  //     setCurrent(idx);
  //   };
  //   const prevItem = () => {
  //     const lastIdx = data.length - 1;
  //     const shouldResetIdx = current === 0;
  //     const idx = shouldResetIdx ? lastIdx : current - 1;
  //     setCurrent(idx);
  //   };

  return (
    <div>
      <StyledMovieTitle>ItemBased</StyledMovieTitle>
      {/* <Arrow direction="left" clickFunction={prevItem} glyph="&#9664;" /> */}

      {data[current] ? (
        data.map(item => {
          return (
            <div>
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  transition:
                    "transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955)"
                }}
              >
                <Card data={item}></Card>
              </div>
            </div>
          );
        })
      ) : (
        <div></div>
      )}
      {/* 우 슬라이더 버튼. */}
      <button onClick={clickRight} className="slider-btn">
        우
      </button>
      {/* 좌 슬라이더 버튼. */}
      <button onClick={clickLeft} className="slider-btn">
        좌
      </button>

      {/* <Arrow direction="right" clickFunction={nextItem} glyph="&#9654;" /> */}
    </div>
  );
};
export default ItemBasedView;

const Card = props => {
  console.log(props);
  const { movieNm, poster } = props.data;

  return (
    <div>
      <div>{movieNm}</div>
      <div
        style={{
          width: "150px",
          height: "100%",
          marginRight: "5%"
        }}
      >
        <StyledMoviePoster src={poster} alt={movieNm} title={movieNm} />
      </div>
    </div>
  );
};

const Arrow = ({ direction, clickFunction, glyph }) => (
  <div className={`slide-arrow ${direction}`} onClick={clickFunction}>
    {glyph}
  </div>
);
