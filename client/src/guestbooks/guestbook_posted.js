// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import _ from "lodash";

// import {
//   setGuestbook,
//   fetchGuesbookLists,
//   deleteLoginUserGuestbook
// } from "../actions/index";

// import { guestbookPosted } from "../utils/guestbookUtilities/guestbook_posted";

// class GuestbookPosted extends Component {
//   state = {
//     authenticated: false,
//     id: ""
//   };

//   static getDerivedStateFromProps(nextProps, prevState) {
//     if (prevState.id !== nextProps.postStateControl) {
//       return {
//         id: nextProps.postStateControl
//       };
//     }

//     return null;
//   }

//   // componentDidMount() {
//   //   const prePath = "/emailPasswordInput";

//   //   if (this.props.history.location.state === prePath) {
//   //     this.setState({ authenticated: true });
//   //   }
//   // }

//   deleteButton() {
//     if (window.sessionStorage.id) {
//       return (
//         <button onClick={this.deletePost} className="btn btn-sm btn-danger">
//           DELETE THIS POST
//         </button>
//       );
//     } else {
//       return <div />;
//     }
//   }

//   deletePost = async e => {
//     const { id } = this.state;
//     const response = await this.props.deleteLoginUserGuestbook(id);
//     const { data } = response.payload;
//     const { userGuestbooks } = this.props;

//     try {
//       if (data) {
//         const newUserGuestbooks = _.filter(
//           userGuestbooks,
//           guestbook => guestbook._id !== data.post._id
//         );

//         this.props.setGuestbook(newUserGuestbooks);
//         //this.props.showPostController(false);
//         // this.props.displayModal();
//       }
//     } catch (e) {
//       console.log("Unexpected error occurred.");
//     }
//     // const { _id } = this.props.guestbook;

//     // this.props.deleteLoginUserGuestbook(_id, () => {
//     //   this.props.history.push({
//     //     pathname: "/emailPasswordInput",
//     //     state: "false"
//     //   });
//     // });
//   };

//   render() {
//     /*
//       const { showPost, guestbooks, userGuestbooks } = this.props;

//     let books;
//     if (!this.state.authenticated) {
//       books = guestbooks;
//     } else {
//       this.books = userGuestbooks;
//     }

//     if (!books || !this.state.id || books.length === 0) return <div />;

//     const post = _.filter(books, guestbook => guestbook._id === this.state.id);

//     if (post.length === 0) return <div />;

//     const { food, title, comments, visitedAt } = post[0];

//     */

//     console.log('this.props: ', this.props)

//     return <div/>

//     // const { food, title, comments, visitedAt } = this.props.guestbook;

//     // if (!this.props) return <div>Loading....</div>;

//     // return (
//     //   <div>
//     //     <div className="card card-content">
//     //       <h3 className="card-title blue lighten-2 white-text">
//     //         <center>I ate {food}!</center>
//     //       </h3>
//     //       <h5 style={{ marginLeft: "10px" }}>{title}</h5>
//     //       <p style={{ marginLeft: "10px" }}>{comments}</p>
//     //       <p
//     //         style={{
//     //           textAlign: "right",
//     //           fontStyle: "italic",
//     //           marginRight: "10px"
//     //         }}
//     //       >
//     //         {visitedAt}
//     //       </p>
//     //     </div>

//     //     <Link
//     //       to={{
//     //         pathname: this.state.authenticated
//     //           ? "/emailPasswordInput"
//     //           : "/guestbookAllPosted",
//     //         state: "false"
//     //       }}
//     //       className="btn pink"
//     //     >
//     //       {this.state.authenticated
//     //         ? "Back to YOUR Guestbook List"
//     //         : "Back to Guestbook List"}
//     //     </Link>

//     //     {this.state.authenticated ? this.deleteButton() : null}
//     //   </div>
//     // );
//   }
// }

// function mapStateToProps({ postStateControl, showPostController }) {
//   return {
//     postStateControl,
//     showPostController
//   };
// }

// export default connect(
//   mapStateToProps,
//   {
//     setGuestbook,
//     fetchGuesbookLists,
//     deleteLoginUserGuestbook
//   }
// )(GuestbookPosted);

// function mapStateToProps({ guestbooks }, ownProps) {
//   // Must get to /guestbookPosted/:id from guestbookAllPosted!!
//   return {
//     guestbook: guestbooks[ownProps.match.params.id]
//   };
// }

// export default connect(
//   mapStateToProps,
//   {
//     //fetchGuestbook,
//     fetchGuesbookLists,
//     deleteLoginUserGuestbook
//     //fetchLoginUserGuestbooks
//   }
// )(GuestbookPosted);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";

// import {
//   fetchGuestbook,
//   fetchGuesbookLists,
//   deleteLoginUserGuestbook,
//   fetchLoginUserGuestbooks
// } from "../actions/index";

// class GuestbookPosted extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       authenticated: false
//     };
//   }

//   componentDidMount() {
//     const prePath = "/emailPasswordInput";

//     if (this.props.history.location.state === prePath) {
//       this.setState({ authenticated: true });
//     }
//   }

//   deleteButton() {
//     return <div onClick={this.deletePost.bind(this)}>Delete this post</div>;
//   }

//   deletePost() {
//     const { _id } = this.props.guestbook;

//     this.props.deleteLoginUserGuestbook(_id, () => {
//       this.props.history.push({
//         pathname: "/emailPasswordInput",
//         state: "false"
//       });
//     });
//   }

//   render() {
//     const { food, title, comments, visitedAt } = this.props.guestbook;

//     if (!this.props) return <div>Loading....</div>;

//     return (
//       <div>
//         <div>
//           <h3>
//             <center>I ate {food}!</center>
//           </h3>
//           <h5>{title}</h5>
//           <p>{comments}</p>
//           <p>{visitedAt}</p>
//         </div>

//         <Link
//           to={{
//             pathname: this.state.authenticated
//               ? "/emailPasswordInput"
//               : "/guestbookAllPosted",
//             state: "false"
//           }}
//         >
//           {this.state.authenticated
//             ? "Back to YOUR Guestbook List"
//             : "Back to Guestbook List"}
//         </Link>

//         {this.state.authenticated ? this.deleteButton() : null}
//       </div>
//     );
//   }
// }

// function mapStateToProps({ guestbooks }, ownProps) {
//   return {
//     guestbook: guestbooks[ownProps.match.params.id]
//   };
// }

// export default connect(
//   mapStateToProps,
//   {
//     fetchGuestbook,
//     fetchGuesbookLists,
//     deleteLoginUserGuestbook,
//     fetchLoginUserGuestbooks
//   }
// )(GuestbookPosted);
