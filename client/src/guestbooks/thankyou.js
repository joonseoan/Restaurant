import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

function ThankYou(props) {
  const path = "/guestbookAllPosted";
  const name = "FIND GUESTBOOK LIST";
  return (
    <div className="mt-3">
      <Modal
        className="text-center"
        show={props.thankyou}
        style={{ top: "30%" }}
      >
        <Modal.Body>
          <h3 className="text-info">Thank you for joining our survey</h3>
          <p className="blink font-weight-bold font-italic">
            We will do our best to improve the food and service quality.
          </p>
          <div>
            <div className="mt-3">
              <Link className="btn btn-success" to="/">
                BACK TO MAIN MENU
              </Link>
              <Link className="btn btn-primary ml-5" to={path}>
                {name}
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ThankYou;
