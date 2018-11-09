import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { removeSpace } from "../../utils/uIControl";
import Main from "./Main";

class MenuList extends Component {
  state = {
    keystroke: ""
  };

  menuBoard = menu => {
    const { items } = this.props.controlData;

    return _.map(menu, menuItems => {
      const { id, name } = menuItems;
      if (name.toLowerCase().indexOf(this.state.keystroke.toLowerCase()) > -1) {
        const className = `col col-sm ${removeSpace(name)}BgColor border 
            border-secondary justify-content-center ml-2 mr-2 mb-2 rounded menuBoard`;

        const menuColor = {
          menuItems: menuItems
        };

        let backgroundColor = "";
        let backgroundImage = "url(../images/menuBoard.PNG)";
        let color = null;

        _.each(items, item => {
          if (item.name === removeSpace(name)) {
            backgroundColor = "#263238";
            backgroundImage = "";
            color = "white";
          }
        });

        return (
          <div
            key={id}
            id={name}
            className={`${className} text-${color}`}
            style={{
              backgroundColor: backgroundColor,
              backgroundImage: backgroundImage
            }}
          >
            <Main
              color={color}
              dataControl={this.props.controlData}
              menuColorControl={menuColor}
              refreshAction={this.props.refreshAction}
              setRefresh={this.props.setRefresh}
              selectedMenu={this.props.selectedMenu}
              setCountIsZero={this.props.setCountIsZero}
            />
          </div>
        );
      } else {
        return;
      }
    });
  };

  handleKeystroke = e => {
    this.setState({
      keystroke: e.target.value
    });
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.controlData.items.length === 0) return false;

  //   return true;
  // }

  render() {
    if (!this.props) return <div />;

    let display;
    const { firstRow, secondRow, thirdRow, forthRow } = this.props;

    const firstItems = _.filter(this.menuBoard(firstRow), item => item);
    const secondItems = _.filter(this.menuBoard(secondRow), item => item);
    const thirdItems = _.filter(this.menuBoard(thirdRow), item => item);
    const forthItems = _.filter(this.menuBoard(forthRow), item => item);

    if (
      firstItems.length === 0 &&
      secondItems.length === 0 &&
      thirdItems.length === 0 &&
      forthItems.length === 0
    ) {
      display = "block";
    } else {
      display = "none";
    }

    return (
      <div>
        <div
          className="wrapper text-right mr-5"
          style={{ fontFamily: "ubuntu" }}
        >
          <label className="mr-4" style={{ fontSize: "22px" }}>
            FIND YOUR FOODS:
          </label>
          <input
            id="textName"
            className="form-control w-25 d-inline"
            placeholder="Search by Name"
            type="textName"
            value={this.state.keystroke}
            onChange={this.handleKeystroke}
          />
          <span className="text-danger btn btn-primary fa fa-search search-span mb-1" />
        </div>

        <div className="row justify-content-center mx-5 mb-2 mt-3 text-center">
          {this.menuBoard(firstRow)}

          <div className="w-100" />

          {this.menuBoard(secondRow)}

          <div className="w-100" />

          {this.menuBoard(thirdRow)}

          <div className="w-100" />

          {this.menuBoard(forthRow)}
        </div>
        <p className="display-3 text-center" style={{ display: display }}>
          Can't find the meal!
        </p>
      </div>
    );
  }
}

function mapStateToProps({ menu }) {
  let firstRow = [];
  let secondRow = [];
  let thirdRow = [];
  let forthRow = [];

  _.each(menu, menuType => {
    firstRow = [...firstRow, menuType[0]];
    secondRow = [...secondRow, menuType[1]];
    thirdRow = [...thirdRow, menuType[2]];
    forthRow = [...forthRow, menuType[3]];
  });

  return {
    firstRow,
    secondRow,
    thirdRow,
    forthRow
  };
}

export default connect(mapStateToProps)(MenuList);
