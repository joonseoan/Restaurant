import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouAndGuestbook = (props) => {
	
	return(
		<div> 

			<h3>
			
				Thank you for your order!!!
			
			</h3>

			<h5> Enjoy foods and Have a great time!</h5>

			<Link to = '/guestbookNewCreated'>
			
				<div>

					Would you like to join our survey?

				</div>

			</Link>

			<br />
			
			<Link to = '/'>

				<div> 

		            Skip this survey

		        </div>
	        
	        </Link>

		</div> );

}

export default ThankYouAndGuestbook;
		