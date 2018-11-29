import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { fetchGuesbookLists } from "../../actions";
import {sortGuestbooks,  removeSpace, insertSpaces, timeInfo } from "../../utils/uIControl";

class MainDescriptions extends Component {
  state = {
    menuItem: "",
    theOthers: ""
  };

  componentDidMount() {
    const { menu, foodName } = this.props;
    _.each(menu, menuType => {
      _.each(menuType, menuItem => {
        if (menuItem.name === foodName) {
          this.setState({
            menuItem,
            theOthers: menuType.filter(menu => menu.name !== foodName)
          });
        }
      });
    });
    this.props.fetchGuesbookLists();
  }

  picList() {
    const { menuItem, theOthers } = this.state;

    return theOthers.map(pic => {
      return [
        <div className="col col-sm border rounded" key={pic.name}>
          <div>{pic.name}</div>
          <div>
            ($
            {pic.price})
          </div>

          <button
            className="btn btn-sm btn-info mt-3"
            key={pic.id}
            onClick={() => {
              const newOthers = _.concat(theOthers, menuItem).filter(
                menu => menu.name !== pic.name
              );

              this.setState({
                menuItem: pic,
                theOthers: newOthers
              });
            }}
          >
            CHECK DETAIL
          </button>

          <img
            src={`../images/${pic.file}`}
            className="img img-fluid img-thumbnail mt-3"
            alt={pic.name}
            style={{ width: "120px", height: "70px" }}
          />
        </div>
      ];
    });
  }

  isSpicy() {
    const { name, spicy } = this.state.menuItem;

    if (spicy) {
      return (
        <img
          className="mr-5 pr-2 align-self-center"
          src={`../images/${spicy}`}
          alt={name}
          style={{ width: "44px", height: "40px" }}
        />
      );
    }
  }

  foodGuestbooks(guestbooks) {
    let { name } = this.state.menuItem;
    const guestbookList = _.map(guestbooks);
    const getGuestbooks = _.filter(
      guestbookList,
      guestbook =>
        (guestbook.food === removeSpace(name) ||
          guestbook.food === insertSpaces(name)) &&
        guestbook.like
    );

    let countNumber = 0;

    const sortedGuestbooks = sortGuestbooks(getGuestbooks);

    if (getGuestbooks.length === 0) {
      return (
        <div className="text-info font-weight-bold">
          Still Waiting For Customer's Review...
        </div>
      );
    } else {
      return (
        <div id="accordion">
          {sortedGuestbooks.map(guestbook => {
            if (
              guestbook.food === removeSpace(name) ||
              guestbook.food === insertSpaces(name)
            ) {
              countNumber++;
              if (countNumber < 4) {
                return (
                  <div key={countNumber} className="card">
                    <div className="card-header">
                      <h4 className="text-left">
                        <a
                          href={`#collapse${countNumber}`}
                          data-parent="#accordion"
                          data-toggle="collapse"
                        >
                          {countNumber}. {guestbook.title}
                        </a>
                      </h4>
                    </div>
                    <div id={`collapse${countNumber}`} className="collapse">
                      <div className="card-body">
                        <p className="text-left">{guestbook.comments}</p>
                        <p className="text-right">
                          --- at {timeInfo(guestbook.visitedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            } else {
              return null;
            }
          })}
        </div>
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.foodName) return false;
    return true;
  }

  render() {
    if (!this.state.menuItem) return <div />;

    const { menuItem } = this.state;
    const { guestbooks } = this.props;
    const path = "../images/";
    const { description, file, spicy, carlorie } = menuItem;

    return (
      <div>
        <div>
          <div>
            <img
              src={path + file}
              className="img img-fluid img-thumbnail mt-3"
              alt={spicy}
              style={{ width: "300px", height: "200px" }}
            />
          </div>
          <div className="media">
            <div className="media-body ml-2">
              <p className="text-left ml-5">
                {description} ({carlorie} cal)
              </p>
            </div>
            {this.isSpicy()}
          </div>
          <hr />
          <div>
            <h3>CUSTOMER'S REVIEW</h3>
            {this.foodGuestbooks(guestbooks)}
          </div>
        </div>
        <hr />
        <div className="mx-2">
          <div>
            <div>
              <h3>OTHER OPTIONS</h3>
            </div>
          </div>
          <div className="row">{this.picList()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ guestbooks, menu }) {
  return {
    guestbooks,
    menu
  };
}

export default connect(
  mapStateToProps,
  { fetchGuesbookLists }
)(MainDescriptions);
