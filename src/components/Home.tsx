import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Layout, Button } from "antd";
import * as actions from "../actions";
import logo from "../logo.svg";
import landing from "../assets/landing.png";
import "./App.css";
import { Store, PSGame } from "../types";
import { withRouter, RouteComponentProps } from "react-router-dom";

type Props = RouteComponentProps & {
  message: string;
  sampleAPI: () => void;
  data: PSGame[];
};

const App = (props: Props) => {
  useEffect(() => {
    props.sampleAPI();
  }, []);
  console.log("data", props.data[0]?.title);

  const onExploreClick = () => {
    console.log("clicked");
    props.history.push("games");
  };
  return (
    <div className="row justify-content-between">
      <div className="col-sm-12 col-md-6 p-5 h-100 ps-mt-5">
        <div className="ps-sub h1">
          Enjoy unlimited access to
          <br />{" "}
          <span className="h1 font-weight-bold ps-primary-color mt-2">
            2000+
          </span>{" "}
          games.
        </div>
        <div>
          Explore through the details about your favourite games and start
          gaming.
        </div>
        <Button
          className="mt-3 ps-primary-btn"
          onClick={onExploreClick}
          type="primary"
        >
          Explore now
        </Button>
      </div>
      <div className="col-sm-12 col-md-6 p-5">
        <img src={landing} className="w-100" alt="" />
      </div>
    </div>
  );
};

const mapStateToProps = (store: Store) => {
  return {
    message: store.games.apiStatus,
    data: store.games.data,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    sampleAPI: () => actions.fetchGamesAction.request(),
  })(App)
);
