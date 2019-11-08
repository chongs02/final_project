import React, { useCallback, useMemo, useEffect } from "react";
import {
  pickInfo,
  stringToList,
  sorted,
  arrayStringToNumber,
  calAverage,
  getYear,
  getMinNumber
} from "./utils";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { StyledContentTitle } from "./styleComponent";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie
} from "recharts";

const StaticVisual = props => {
  const { likeInfo, watchInfo } = props;

  const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 700
    }
  }));

  const classes = useStyles();
  const table = useCallback(() => {
    const StyledTableCell = withStyles(theme => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
      },
      body: {
        fontSize: 14
      }
    }))(TableCell);

    const StyledTableRow = withStyles(theme => ({
      root: {
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.background.default
        }
      }
    }))(TableRow);

    // 좋아하는 영화들의 평균 평점, 최소 평점
    let userRating = arrayStringToNumber(pickInfo(likeInfo, "userRating"));
    let avgRating = calAverage(userRating).avg;
    avgRating = avgRating.toFixed(1);

    let minRating = getMinNumber(userRating);
    minRating = minRating.toFixed(1);

    //좋아하는 영화의 평균 제작년도, 최소 제작년도

    let openDt = pickInfo(likeInfo, "openDt");

    openDt = getYear(openDt);
    openDt = arrayStringToNumber(openDt);
    let openDtAvg = calAverage(openDt).avg;
    openDtAvg = Math.floor(openDtAvg);

    let minDt = getMinNumber(openDt);
    minDt = Math.floor(minDt);

    function createData(avgRating, minRating, openDtAvg, minDt) {
      return { avgRating, minRating, openDtAvg, minDt };
    }

    const rows = [createData(avgRating, minRating, openDtAvg, minDt)];

    return (
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">평균 평점</StyledTableCell>
              <StyledTableCell align="center">최소 평점</StyledTableCell>
              <StyledTableCell align="center">평균 제작년도</StyledTableCell>
              <StyledTableCell align="center">최소 제작년도</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                {/* <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell> */}
                <StyledTableCell align="center">
                  {row.avgRating}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.minRating}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.openDtAvg}
                </StyledTableCell>
                <StyledTableCell align="center">{row.minDt}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }, [likeInfo]);

  //본영화의 총 상영시간
  const showTmChart = useCallback(() => {
    let showTm = pickInfo(watchInfo, "showTm");
    showTm = arrayStringToNumber(showTm);
    showTm = calAverage(showTm);

    const data = [
      {
        name: "총 영화 관람 시간",
        Total: showTm.sum
      }
    ];

    return (
      <BarChart
        width={1150}
        height={100}
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, "dataMax + 1000"]} />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Total" fill="#82ca9d" />
      </BarChart>
    );
  }, [watchInfo]);
  //좋아하는 배우
  const actorChart = useCallback(() => {
    let actors = sorted("descend", stringToList(pickInfo(likeInfo, "actors")));
    let actorObj = Object.entries(actors);
    let data = actorObj
      .map(data => {
        return {
          name: data[0],
          value: data[1]
        };
      })
      .slice(0, 5);
    const getPath = (x, y, width, height) => {
      return `M${x},${y + height}
                C${x + width / 3},${y + height} ${x + width / 2},${y +
        height / 3} ${x + width / 2}, ${y}
                C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y +
        height} ${x + width}, ${y + height}
                Z`;
    };

    const TriangleBar = props => {
      const { fill, x, y, width, height } = props;

      return (
        <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
      );
    };

    const color = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

    return (
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Bar
          dataKey="value"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={color[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    );
  }, [likeInfo]);

  //좋아하는 감독
  const directorChart = useCallback(() => {
    let favoriteDirector = sorted(
      "descend",
      stringToList(pickInfo(likeInfo, "directors"))
    );
    let directorObj = Object.entries(favoriteDirector);
    let data = directorObj
      .map(data => {
        return {
          name: data[0],
          value: data[1]
        };
      })
      .slice(0, 5);
    const getPath = (x, y, width, height) => {
      return `M${x},${y + height}
                C${x + width / 3},${y + height} ${x + width / 2},${y +
        height / 3} ${x + width / 2}, ${y}
                C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y +
        height} ${x + width}, ${y + height}
                Z`;
    };

    const TriangleBar = props => {
      const { fill, x, y, width, height } = props;

      return (
        <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
      );
    };

    const color = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

    return (
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Bar
          dataKey="value"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={color[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    );
  }, [likeInfo]);

  //좋아하는 장르
  const genreChart = useCallback(() => {
    const gen = () => {
      let arr = pickInfo(likeInfo, "genre").map(data => {
        return data.split(",");
      });
      arr = arr.flat();
      return arr;
    };
    let genre = sorted("descend", gen());

    let genreObj = Object.entries(genre);
    let data = genreObj
      .map(data => {
        return {
          name: data[0],
          value: data[1]
        };
      })
      .slice(0, 5);

    const COLORS = ["#d62728", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
      name
    }) => {
      const radius = 25 + innerRadius + (outerRadius - innerRadius);
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="#8884d8"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`} {name}
        </text>
      );
    };

    return (
      <PieChart width={600} height={400}>
        <Pie
          data={data}
          cx={300}
          cy={150}
          labelLine={true}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    );
  }, [likeInfo]);

  //좋아하는 영화 국가
  const repNationChart = useCallback(() => {
    let repNation = sorted("descend", pickInfo(likeInfo, "repNation"));
    let repNationObj = Object.entries(repNation);
    let temp = {};
    let data = [];
    repNationObj.forEach(function(x) {
      temp["name"] = x[0];
      temp["value"] = x[1];
      data.push(temp);
      temp = {};
    });

    const colors = ["#8884d8", "#82ca9d", "#ffc658"];

    return (
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" barSize={50}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Bar>
      </BarChart>
    );
  }, [likeInfo]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: "30px",
        marginRight: "30px"
      }}
    >
      <div style={{ borderBottom: "1px solid rgba(37, 40, 47, 0.1)" }}>
        <StyledContentTitle>평점 및 제작년도</StyledContentTitle>
        <div
          style={{
            marginBottom: "30px"
          }}
        >
          {table()}
        </div>
      </div>

      <div
        style={{
          borderBottom: "1px solid rgba(37, 40, 47, 0.1)"
        }}
      >
        <StyledContentTitle>총 영화 관람 시간</StyledContentTitle>
        <div
          style={{
            marginTop: "30px",
            marginBottom: "30px"
          }}
        >
          {showTmChart()}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          borderBottom: "1px solid rgba(37, 40, 47, 0.1)"
        }}
      >
        <div sytle={{ flex: 1 }}>
          <StyledContentTitle>배우 TOP 5</StyledContentTitle>
          <div
            style={{
              marginTop: "30px",
              marginBottom: "30px"
            }}
          >
            {actorChart()}
          </div>
        </div>
        <div sytle={{ flex: 1 }}>
          <StyledContentTitle>감독 TOP 5</StyledContentTitle>

          <div
            style={{
              marginTop: "30px",
              marginBottom: "30px"
            }}
          >
            {directorChart()}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          borderBottom: "1px solid rgba(37, 40, 47, 0.1)",
          marginBottom: "30px"
        }}
      >
        <div sytle={{ flex: 1 }}>
          <StyledContentTitle>좋아하는 장르</StyledContentTitle>
          <div
            style={{
              marginTop: "30px"
            }}
          >
            {genreChart()}
          </div>
        </div>
        <div sytle={{ flex: 1 }}>
          <StyledContentTitle>국가별 통계</StyledContentTitle>
          <div
            style={{
              marginTop: "30px"
            }}
          >
            {repNationChart()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticVisual;
