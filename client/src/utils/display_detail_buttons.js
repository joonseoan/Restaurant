import React, { Component } from "react";
import _ from "lodash";

import RecommendDescriptions from "../components/Current_recommendations/Recommendation_descriptions";

class DisplayDetailButtons extends Component {
  handleDescription = e => {
    const {
      clickedMenu,
      menuItems: { name, price }
    } = this.props;

    clickedMenu(name, price);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.descriptionNamePrice.price ===
        nextProps.descriptionNamePrice.price &&
      this.props.descriptionNamePrice.name ===
        nextProps.descriptionNamePrice.name
    )
      return false;

    return true;
  }

  render() {
    const {
      descriptionNamePrice: { name, price }
    } = this.props;

    return (
      <div>
        <div
          className="btn btn-sm btn-info mt-3"
          data-toggle="modal"
          data-target="#detail_food"
          onClick={this.handleDescription}
          name={name}
          value={price}
        >
          Check Detail
        </div>

        <div className="modal" id="detail_food">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">
                  {name} ($
                  {price})
                </h3>
                <button className="close btn btn-danger" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <RecommendDescriptions foodName={name} />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayDetailButtons;
