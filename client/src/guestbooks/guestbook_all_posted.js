import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { fetchGuesbookLists } from '../actions/index';

class GuestbookAllPosted extends Component {

    componentDidMount() {

        this.props.fetchGuesbookLists();

    }

    renderGuestBooks() {
 
        let dislikeEvaluation = [];

        let countNumber = 1;

        const guestbooks = _.map(this.props.guestbooks, guestbook => guestbook);

        return ( guestbooks.reverse().map((guestbook) => {
            
            if(guestbook && guestbook.like && countNumber < 11) {

                return (

                    <div key = { guestbook._id } >

                        <div> { countNumber++ }. Customer: { guestbook.email.substring(0, 3) }xxx@Owl Korean Restaurant in {guestbook.city}</div>
                        <div><i>{ guestbook.visitedAt }</i></div>

                        <Link to = {`/guestbookPosted/${guestbook._id}`} >    
                        
                            <li> {guestbook.title} </li>

                        </Link>
        
                    </div>
                
                );       
            
            } else {

                dislikeEvaluation.push(guestbook);
                
                return <div key={ guestbook._id } />;
            }
                    
        }));

    }

    render() {

        return(

            <div>

                <div>
                    
                    <h3>
                        Customer's Best Choices
                    </h3>
                    
                    <h5>(Please, click on the list)</h5>

                </div>

                <div>

                    <ul>
                        { this.renderGuestBooks() }
                    </ul>
                
                </div>

                <div>
                    
                    <Link to = "/">
                    
                        Back to main page
                    
                    </Link>

                    <Link to = '/emailPasswordInput'>

                        Delete your post

                    </Link>


                </div>

            </div>


        );
    }
    
}

function mapStateToProps({ guestbooks }) {

    return ({ guestbooks });

}

export default connect(mapStateToProps, { fetchGuesbookLists })(GuestbookAllPosted);