import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchGuestbook,
		 fetchGuesbookLists,
		 deleteLoginUserGuestbook,
		 fetchLoginUserGuestbooks } from '../actions/index';

class GuestbookPosted extends Component {

	constructor(props) {

		super(props);

		this.state = {

			authenticated : false

		}
	}

	componentDidMount() {

		const prePath = '/emailPasswordInput';
		
		if(this.props.history.location.state === prePath) {

			this.setState({ authenticated : true });

		}

	}

	deleteButton() {

		return (

				<div 
					onClick = { this.deletePost.bind(this) }
				>

					Delete this post
				
				</div>

		);

	}

	deletePost() {

		const { _id } = this.props.guestbook;

		this.props.deleteLoginUserGuestbook(_id, () => {

			this.props.history.push({ pathname: '/emailPasswordInput', state : 'false' });

		});

	}

	render() {

		const { food, title, comments, visitedAt } = this.props.guestbook;
		
		if(!this.props) return <div>Loading....</div>;
		
		return(

			<div>

				<div>

					<h3><center>I ate { food }!</center></h3>
					<h5>{ title }</h5>
					<p>{ comments }</p>
					<p>{ visitedAt }</p>
						
				</div>

				<Link to = {{ pathname : this.state.authenticated ? '/emailPasswordInput' : '/guestbookAllPosted', state: 'false'}}>

					{ this.state.authenticated ? 'Back to YOUR Guestbook List' : 'Back to Guestbook List' }

				</Link>

				{ this.state.authenticated ? this.deleteButton() : null }

			</div>
				
		);
	}
}

function mapStateToProps({ guestbooks }, ownProps) {

	return { 

		guestbook : guestbooks[ownProps.match.params.id]

	};

}

export default connect(mapStateToProps, { 

	fetchGuestbook,
	fetchGuesbookLists,
	deleteLoginUserGuestbook,
	fetchLoginUserGuestbooks

	}

)(GuestbookPosted);