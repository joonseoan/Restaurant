import React from "react";
import { Link } from "react-router-dom";

const ThankYouAndGuestbook = props => {
  const { referrer } = props.location.state;

  const waitPerson =
    referrer === "cash" ? (
      <div>
        <img
          src="https://media1.tenor.com/images/9330a8b90ab850b26b6d3e6c80f91912/tenor.gif?itemid=5676061"
          alt="waitress"
        />
        <h4>Waitor/Waitress is comming soon</h4>
      </div>
    ) : null;

  return (
    <div>
      <h3>Thank you for your order!!!</h3>

      <h4> Enjoy foods and Have a great time!</h4>

      {waitPerson}

      <Link to="/guestbookNewCreated">
        <div>Would you like to join our survey?</div>
      </Link>

      <br />

      <Link to="/">
        <div>Skip this survey</div>
      </Link>
    </div>
  );
};

export default ThankYouAndGuestbook;
