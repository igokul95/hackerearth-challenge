import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Store, APIStatus, PSGame } from "../types";
import * as actions from "../actions";
import cardCover from "../assets/card-pattern.png";
import gamePad from "../assets/gamepad.png";
import sort from "../assets/sort.png";
import "./App.css";
import {
  Divider,
  Card,
  Pagination,
  AutoComplete,
  Skeleton,
  Result,
  Tag,
  Rate,
} from "antd";
import { SelectValue } from "antd/lib/select";
import { RadioChangeEvent } from "antd/lib/radio";

type Props = {
  apiStatus: APIStatus;
  data: PSGame[];
  fetchAllGames: () => void;
};

const Games = (props: Props) => {
  const [currentListingGames, setCurrentListingGames] = useState<PSGame[]>([]);
  const [totalGames, setTotalGames] = useState<PSGame[]>([]);
  const [autoSearchNameOptions, setAutoSearchNameOptions] = useState<string[]>(
    []
  );
  const [gameNames, setGameNames] = useState<string[]>([]);

  useEffect(() => {
    props.fetchAllGames();
  }, []);

  useEffect(() => {
    setCurrentListingGames(props.data.slice(0, 12));
    setTotalGames(props.data);
    setGameNames(props.data.map((game) => game.title.toString()).slice(0, 200));
  }, [props.data]);

  useEffect(() => {
    setCurrentListingGames(totalGames.slice(0, 12));
  }, [totalGames]);

  const onPaginationChange = (page: number, pageSize?: number | undefined) => {
    const size = pageSize ? pageSize : 12;
    console.log("pagination change", page, pageSize, props.data);
    const endIndex = page * size;
    const startIndex = endIndex - size;
    setCurrentListingGames(totalGames.slice(startIndex, endIndex));
  };

  const listGames = () => {
    if (props.apiStatus === APIStatus.progress) {
      return (
        <div className="col-sm-12 mt-3">
          <Skeleton className="w-100" />
        </div>
      );
    }
    if (props.apiStatus === APIStatus.failed) {
      return (
        <div className="col-sm-12 mt-3">
          <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
          />
        </div>
      );
    }
    const games = currentListingGames;
    const getStarCount = (count: number) => {
      return count / 2;
    };
    const list = games.map((game, index) => (
      <div className="col-sm-6 col-md-3 mt-3" key={index}>
        <Card
          hoverable
          className="ps-card"
          cover={<img alt="example" src={cardCover} />}
        >
          <div className="mb-2">
            {game.editors_choice ? (
              <Tag color="#F52D58">Editors choice</Tag>
            ) : (
              ""
            )}
          </div>
          <Card.Meta
            title={game.title}
            description={`Release year: ${game.release_year}`}
          />
          <div className="mt-3">
            <span>
              <img
                src={gamePad}
                style={{ width: "20px", marginRight: "10px" }}
                alt=""
              />
            </span>
            {game.url}
          </div>
          <Rate disabled defaultValue={getStarCount(game.score)} allowHalf /> (
          {getStarCount(game.score)})
        </Card>
      </div>
    ));
    return (
      <>
        {list}
        <Pagination
          className="w-100 mt-5"
          pageSize={12}
          onChange={onPaginationChange}
          total={totalGames.length}
        />
      </>
    );
  };
  const onSearch = (searchText: string) => {
    if (searchText) {
      setAutoSearchNameOptions(
        gameNames.filter((name) =>
          name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } else {
      setTotalGames(props.data);
    }
    console.log("searcb", searchText);
  };
  const onChangeSearchText = (value: SelectValue) => {
    console.log("changesearchtext", value.toString().toLowerCase());
    setTotalGames(
      props.data.filter((game) => {
        return game.title
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      })
    );
  };
  const onChangeSort = (e: RadioChangeEvent) => {
      const sortValue = e.target.value;
      switch(sortValue) {
          case 'scorelow': {
              setTotalGames(
                  totalGames.sort((game1, game2) => {
                    console.log('onCHangesort' , game1.score - game2.score)
                      return game1.score - game2.score;
                  }) 
              )
              break;
          }
          case 'scorehigh': {
            setTotalGames(
                props.data.sort((game1, game2) => {
                    return parseFloat(game2.score.toString()) - parseFloat(game1.score.toString());
                }) 
            )
            break;
        }
      }
  }
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-sm-12 pt-5 text-center">
          <div className="h2 ps-font">
            Explore through the massive collection of games.
          </div>
        </div>
        <div className="col-sm-12 text-center">
          <AutoComplete
            className="w-50"
            dataSource={autoSearchNameOptions}
            onSelect={onChangeSearchText}
            onSearch={onSearch}
            placeholder="Search games (Eg: Age of empires)"
          />
        </div>
        {/* <div className="col-sm-12 mt-3">
          <div className="float-right">
            <span>
              <img src={sort} style={{ width: "30px" }} alt="" />
            </span>
            <Radio.Group onChange={onChangeSort} buttonStyle="solid">
              <Radio.Button value="scorelow">Score: Low to high</Radio.Button>
              <Radio.Button value="scorehigh">Score: High to low</Radio.Button>
            </Radio.Group>
          </div>
        </div> */}
        <Divider />
        <div className="col-sm-12 px-5 mb-5">
          <div className="row">{listGames()}</div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (store: Store) => {
  return {
    apiStatus: store.games.apiStatus,
    data: store.games.data,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    fetchAllGames: () => actions.fetchGamesAction.request(),
  })(Games)
);
