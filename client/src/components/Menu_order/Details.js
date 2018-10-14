import React, { Component } from "react";
import MainDescriptions from "../Current_recommendations/Main_descriptions";

class Details extends Component {
  state = {
    name: "",
    price: 0,
    showModal: false
  };
  handleDetailButton = e => {
    // const {
    //   namePrice: { name, price },
    //   sendSelectedNamePrice
    // } = this.props;

    // sendSelectedNamePrice(name, price);

    this.setState({
      name: e.target.name,
      price: e.target.value,
      showModal: true
    });

    //console.log(this.props.namePrice, "dddd");
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     this.props.toDescriptions.toDescriptionPrice ===
  //       nextProps.toDescriptions.toDescriptionPrice &&
  //     this.props.toDescriptions.toDescriptionName ===
  //       nextProps.toDescriptions.toDescriptionName
  //   )
  //     return false;

  //   return true;
  // }
  render() {
    console.log(this.props);

    // if (this.state.price === 0) return <div />;
    // console.log(this.state.name, this.state.price);

    const { name, price } = this.props.namePrice;

    //const { toDescriptionName, toDescriptionPrice } = this.props.toDescriptions;
    //if (!toDescriptionName) return <div />;
    // console.log(name, price, "hhhhhhhhhh");
    //console.log(toDescriptionName);
    // const { toDescriptionName, toDescriptionPrice } = this.props.namePrice;

    return (
      <div>
        <button
          className="btn btn-sm btn-info"
          onClick={this.handleDetailButton}
          // data-toggle="modal"
          //data-target="#detail_food"
          value={price}
          name={name}
        >
          Check Detail
        </button>
        <MainDescriptions
          openStatus={this.state.showModal}
          foodName={this.state.name}
        />

        {/* 
  newPageStatus={() => {
    this.setState({ newPage: true });
  }}
 */}
      </div>
    );
  }
}

export default Details;

/*
<div className="modal" id="detail_food">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">
                
                 </h3>
                 <button className="close btn btn-danger" data-dismiss="modal">
                   &times;
                 </button>
               </div>
 
               <div className="modal-body">
                 <RecommendationDescriptions foodName={toDescriptionName} />
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

*/
