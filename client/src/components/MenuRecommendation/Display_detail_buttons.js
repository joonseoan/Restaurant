import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import MainDescriptions from "../Current_recommendations/Main_descriptions";

class DisplayDetailButtons extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      // name: "",
      // price: 0,
      showModal: false
    };
  }

  handleDetailButton = e => {
    this.setState({
      // name: e.target.name,
      // price: e.target.value,
      showModal: true
    });
  };

  handleModalClose = e => {
    this.setState({
      showModal: false
    });
  };
  render() {
    const { name, price } = this.props.namePrice;

    return (
      <div>
        <button
          className="btn btn-sm btn-info"
          onClick={this.handleDetailButton}
          value={price}
          name={name}
        >
          Check Detail
        </button>

        <Modal
          className="text-center"
          show={this.state.showModal}
          onHide={this.handleModalClose}
        >
          <Modal.Header>
            <Modal.Title className="clearfix">
              <span className="mr-auto display-4">
                {name}
                ($
                {price})
              </span>
            </Modal.Title>
            <span
              className="btn btn-sm btn-danger ml-auto"
              onClick={this.handleModalClose}
            >
              X
            </span>
          </Modal.Header>
          <Modal.Body>
            <MainDescriptions foodName={name} />
          </Modal.Body>
          <Modal.Footer>
            <div
              className="btn btn-sm btn-danger"
              onClick={this.handleModalClose}
            >
              Close
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default DisplayDetailButtons;

// import React, { Component } from "react";
// import _ from "lodash";

// import RecommendDescriptions from "../components/Current_recommendations/Recommendation_descriptions";

// class DisplayDetailButtons extends Component {
//   handleDescription = e => {
//     const {
//       clickedMenu,
//       menuItems: { name, price }
//     } = this.props;

//     clickedMenu(name, price);
//   };

//   shouldComponentUpdate(nextProps, nextState) {
//     if (
//       this.props.descriptionNamePrice.price ===
//         nextProps.descriptionNamePrice.price &&
//       this.props.descriptionNamePrice.name ===
//         nextProps.descriptionNamePrice.name
//     )
//       return false;

//     return true;
//   }

//   render() {
//     const {
//       descriptionNamePrice: { name, price }
//     } = this.props;

//     return (
//       <div>
//         <div
//           className="btn btn-sm btn-info mt-3"
//           data-toggle="modal"
//           data-target="#detail_food"
//           onClick={this.handleDescription}
//           name={name}
//           value={price}
//         >
//           Check Detail
//         </div>

//         <div className="modal" id="detail_food">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h3 className="modal-title">
//                   {name} ($
//                   {price})
//                 </h3>
//                 <button className="close btn btn-danger" data-dismiss="modal">
//                   &times;
//                 </button>
//               </div>

//               <div className="modal-body">
//                 <RecommendDescriptions foodName={name} />
//               </div>

//               <div className="modal-footer">
//                 <button className="btn btn-secondary" data-dismiss="modal">
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default DisplayDetailButtons;
