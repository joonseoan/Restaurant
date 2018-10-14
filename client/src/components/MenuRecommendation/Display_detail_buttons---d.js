// import React, { Component } from "react";
// import _ from "lodash";

// import RecommendDescriptions from "../Current_recommendations/Recommendation_descriptions";

// class DisplayDetailButtons extends Component {
//   state = {
//     name: "",
//     price: 0
//   };

//   handleDescription = e => {
//     console.log(e.target.value, e.target.name);

//     this.setState({
//       name: e.target.name,
//       price: e.target.value
//     });

//     // console.log(this.props, "dddddddddddddddddddddddddddd");
//     // if (this.props.tags) {
//     //   const {
//     //     allclickedMenu,
//     //     allmenuItems: { name, price }
//     //   } = this.props;

//     //   allclickedMenu(name, price);
//     // }

//     // if (this.props.reco) {
//     //   const {
//     //     clickedMenu,
//     //     menuItems: { name, price }
//     //   } = this.props;

//     //   clickedMenu(name, price);
//   };

//   //   shouldComponentUpdate(nextProps, nextState) {
//   //     if (
//   //       this.props.descriptionNamePrice.price ===
//   //         nextProps.descriptionNamePrice.price &&
//   //       this.descriptionNamePrice.name === nextProps.descriptionNamePrice.name
//   //     )
//   //       return false;

//   //     return true;
//   //   }

//   /*

//             {_.map(selectedMenu, menu => {
//               const { name, id, price, file } = menu;

//               return (
//                 <div
//                   key={id}
//                   className="col border border-warning rounded mx-2 pb-5"
//                 >
//                   <div className="mb-2 bg-warning"> {name} </div>

//                   <DisplayDetailButtons
//                     menuItems={{ name, price }}
//                     clickedMenu={(nameSent, priceSent) => {
//                       this.setState({
//                         toDescriptionName: nameSent,
//                         toDescriptionPrice: priceSent
//                       });
//                     }}
//                     descriptionNamePrice={{
//                       name: this.state.toDescriptionName,
//                       price: this.state.toDescriptionPrice
//                     }}
//                     reco={"dfaf"}
//                   />

//                   <DisplayOthers menuItems={{ name, file, price }} />
//                 </div>
//               );
//             })}

//           */

//   render() {
//     console.log("this.props: ", this.props);
//     const { menuList } = this.props;

//     return (
//       <div>
//         {_.map(menuList, menu => {
//           const { name, id, price, file } = menu;
//           return (
//             <button
//               key={id}
//               className="btn btn-sm btn-info"
//               name={name}
//               value={price}
//               onClick={this.handleDescription}
//             >
//               Check Detail
//             </button>
//           );
//         })}
//         {/*

//         */}
//         <RecommendDescriptions foodName={this.state.name} />
//       </div>
//     );

//     //const { tags, reco } = this.props;

//     // let id;
//     // let nameValue;
//     // let priceValue;

//     // if (tags) {
//     //   console.log(this.props);
//     //   const {
//     //     alldescriptionNamePrice: { name, price }
//     //   } = this.props;

//     //   nameValue = name;
//     //   priceValue = price;
//     //   // when have same id
//     //   id = "allDescription";
//     // }

//     //console.log(nameValue, priceValue, "dddddddddddddddddddddddddddddddddddd");

//     // console.log(this.props);

//     // const {
//     //   descriptionNamePrice: { name, price }
//     // } = this.props;

//     // nameValue = name;
//     // priceValue = price;
//     // id = "recoDescription";

//     // return (
//     //   <div>
//     //     <div
//     //       className="btn btn-sm btn-info mt-3"
//     //       data-toggle="modal"
//     //       data-target="#detail_food"
//     //       onClick={this.handleDescription}
//     //     >
//     //       Check Detail
//     //     </div>

//     //     <div className="modal" id="detail_food">
//     //       <div className="modal-dialog">
//     //         <div className="modal-content">
//     //           <div className="modal-header">
//     //             <h3 className="modal-title">
//     //               {name} ($
//     //               {price})
//     //             </h3>
//     //             <button className="close btn btn-danger" data-dismiss="modal">
//     //               &times;
//     //             </button>
//     //           </div>

//     //           <div className="modal-body">
//     //             <RecommendDescriptions foodName={name} />
//     //           </div>

//     //           <div className="modal-footer">
//     //             <button className="btn btn-secondary" data-dismiss="modal">
//     //               Close
//     //             </button>
//     //           </div>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // );
//   }
// }

// export default DisplayDetailButtons;
