import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

import { removeSpace } from "../../utils/uIControl";
import Main from "./Main";

class MenuList extends Component {
  menuBoard = menu => {
    const { items } = this.props.controlData;

    return _.map(menu, menuItems => {
      const { id, name } = menuItems;

      const className = `col ${removeSpace(name)}BgColor border 
               border-danger justify-content-center ml-2 mr-2 round`;

      const menuColor = {
        menuItems: menuItems
      };

      let backgroundColor = "";

      _.each(items, item => {
        if (item.name === removeSpace(name)) {
          backgroundColor = "#FAFAD2";
        }
      });

      return (
        <div
          key={id}
          id={name}
          className={className}
          style={{ backgroundColor: `${backgroundColor}` }}
        >
          <Main
            dataControl={this.props.controlData}
            menuColorControl={menuColor}
            refreshAction={this.props.refreshAction}
            setRefresh={this.props.setRefresh}
          />
        </div>
      );
    });
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.controlData.items.length === 0) return false;

  //   return true;
  // }

  render() {
    if (!this.props) return <div />;

    const { firstRow, secondRow, thirdRow, forthRow } = this.props;

    return (
      <div className="row justify-content-center mb-2 mt-3 border border-success text-center">
        {this.menuBoard(firstRow)}

        <div className="w-100" style={{ border: "1px solid #333" }} />

        {this.menuBoard(secondRow)}

        <div className="w-100" style={{ border: "1px solid #333" }} />

        {this.menuBoard(thirdRow)}

        <div className="w-100" style={{ border: "1px solid #333" }} />

        {this.menuBoard(forthRow)}
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
