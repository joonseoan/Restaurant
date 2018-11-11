import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

function ThankYou(props) {
  return (
    <div className="mt-3">
      <Modal className="text-center" show={props.thankyou}>
        <Modal.Body>
          <h3 className="text-info">Thank you for joining our survey</h3>
          <p className="blink font-weight-bold font-italic">
            We will do our best to improve the food and service quality.
          </p>
          <div>
            <div className="mt-3">
              <Link className="btn btn-success ml-5" to="/">
                BACK TO MAIN MENU
              </Link>
              <Link className="btn btn-primary ml-5" to="/guestbookAllPosted">
                FIND GUESTBOOK LIST
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
  // }
}

export default ThankYou;
