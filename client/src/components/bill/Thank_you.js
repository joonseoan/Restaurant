import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

class ThankYou extends Component {
  handleReset(e) {
    window.location.reload();
  }
  render() {
    if (!this.props.fromWhere) return <div />;
    console.log(this.props.fromWhere);
    const waitPerson =
      this.props.fromWhere === "cash" ? (
        <div>
          <h4>Waitor / Waitress is comming soon</h4>
          <img
            className="img img-fluid"
            src="https://media1.tenor.com/images/9330a8b90ab850b26b6d3e6c80f91912/tenor.gif?itemid=5676061"
            alt="waitress"
          />
        </div>
      ) : null;

    return (
      <div className="mt-3">
        <Modal className="text-center" show={this.props.showThankYou}>
          <Modal.Body>
            {waitPerson}
            <h3 className="text-info blink">Thank you for your order!!!</h3>
            <div>
              <h3 className="font-weight-bold font-italic">
                Would you like to join our survey?
              </h3>
              <div className="mt-3">
                <button
                  className="btn border border-warning mr-5"
                  onClick={this.handleReset}
                >
                  SKIP
                </button>
                <Link
                  className="btn btn-primary ml-5"
                  to="/guestbookNewCreated"
                >
                  YES
                </Link>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ThankYou;
