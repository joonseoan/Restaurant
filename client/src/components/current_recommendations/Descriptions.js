import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { fetchGuesbookLists } from "../../actions";

class Descriptions extends Component {
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
        <td key={pic.name}>
          <p>
            {pic.name} ($
            {pic.price})
          </p>

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
            Check Detail
          </button>

          <img
            src={`../images/${pic.file}`}
            className="img img-fluid img-thumbnail mt-3"
            alt={pic.name}
            style={{ width: "180px", height: "110px" }}
          />
        </td>
      ];
    });
  }

  isSpicy() {
    const { name, spicy } = this.state.menuItem;

    if (spicy) {
      return (
        <img src={`../images/${spicy}`} alt={name} width="100" height="80" />
      );
    }
  }

  foodGuestbooks(guestbooks) {
    const { name } = this.state.menuItem;

    const guestbookList = _.map(guestbooks);

    let countNumber = 1;

    return guestbookList.reverse().map(guestbook => {
      if (guestbook.food === name && guestbook.like && countNumber < 5) {
        return (
          <li key={guestbook._id}>
            <h3>
              {countNumber++}. {guestbook.title}
            </h3>
            <p>{guestbook.comments}</p>
            <p>- I was here at {guestbook.visitedAt}</p>
          </li>
        );
      } else {
        return <div key={guestbook._id} />;
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.menuItem.name !== nextState.menuItem.name) return true;
    if (this.props.foodName === nextProps.foodName) return false;
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
          <img
            src={path + file}
            className="img img-fluid img-thumbnail mt-3"
            alt={spicy}
            style={{ width: "350px", height: "250px" }}
          />

          <p>
            {description} ({carlorie} cal) {this.isSpicy()}
          </p>

          <div>
            <h4>CUSTOMER'S REVIEW</h4>

            <ul>{this.foodGuestbooks(guestbooks)}</ul>
          </div>
        </div>

        <div>
          <div>
            <div>
              <h3>Other Choices</h3>
            </div>
          </div>

          <table className="table">
            <tbody>
              <tr>{this.picList()}</tr>
            </tbody>
          </table>
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
)(Descriptions);
