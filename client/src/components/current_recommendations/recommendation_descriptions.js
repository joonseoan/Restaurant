import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { fetchGuesbookLists } from '../../actions';

class RecommendationDescriptions extends Component {

    state = {

        foodId:''

    }


    componentDidMount() {

        this.props.fetchGuesbookLists();

    }

    // componentWillUpdate(nextProps) {

    //     console.log(nextProps)
    // }

    picList() {

        return this.props.theOthers.map(pic => {
    
            return [
                
                <td key = { pic.name }>

                    <p>{pic.name} (${pic.price})</p>

                    <Link key = { pic.id } to = {`/description/${ pic.name }`} >
                        
                        Check Detail

                        <img src = {`../images/${ pic.file }` } alt= {pic.name} width = "200" height = "150" />
                            
                    </Link>

                </td>  
            
            ];
            
                    
        });             

    }

    isSpicy() {

        const { name, spicy } = this.props.selectedMenu;

        if(spicy) {

            return <img src = { `../images/${spicy}` } alt = { name } width ='100' height = '80' />
    
        }
    }

    foodGuestbooks(guestbooks) {

        const { name } = this.props.selectedMenu;

        const guestbookList = _.map(guestbooks);

        let countNumber = 1;

        return guestbookList.reverse().map(guestbook => {

            if(guestbook.food === name && guestbook.like && countNumber < 5) {

                return (

                    <li key = { guestbook._id } >

                        <h3>{ countNumber++ }. { guestbook.title }</h3>
                        <p>{ guestbook.comments }</p>
                        <p>- I was here at { guestbook.visitedAt}</p>                       

                    </li>

                );

            } else {

                return <div key = { guestbook._id }/>;

            }

        });

    }

    displayDescription = (selectedMenu, menu) => {

        const menuList = _.mapKeys(menu, menu => menu);
        console.log(menuList);
        
        // _.each(menu, menuType => {

        //     _.each(menuType, menuItem => {

        //         let selectedMenu;
        //         let selectedMenuType;
                
        //         if (menuItem.name === name) {
                                        
        //                 selectedMenu = menuItem;
        //                 selectedMenuType = menuType;

        //         }

        //     });

        // });

        console.log(selectedMenu, menu);


    }

    render() {

        if(!this.props.guestbooks) return <div/>

        const { guestbooks, foodName, menu } = this.props;

        console.log(foodName);

        const path = '../images/';

        return <div>
            { this.props.foodName }

            { this.displayDescription(foodName, menu) }
        </div>


       // const { name, description, file, price, spicy, carlorie } = this.props.selectedMenu;

        // return (

        //     <div>
        
        //         <div>

        //             <h3>
        //                 { name } (${ price })
        //             </h3> 
                    
        //             <img src = { path + file } alt = { spicy } width = '500' height = '300'/>
            
        //             <p>
                    
        //                 { description } ({ carlorie } cal) { this.isSpicy() }                      

        //             </p>

        //             <div>

        //                 <h4> 
                            
        //                     CUSTOMER'S REVIEW 
                        
        //                 </h4>

        //                 <ul>

        //                     { this.foodGuestbooks(guestbooks) }

        //                 </ul>

        //             </div>
                                
        //         </div>
                    
        //             <div>

        //                 <div>

        //                     <div>
        //                         <h3>Other Choices</h3>
        //                     </div>
                        
        //                 </div>
        //                 <table>

        //                     <tbody>

        //                         <tr>
        //                             { this.picList() }
        //                         </tr>
                                    
        //                     </tbody>
                        
        //                 </table>    
                        
        //             </div>

        //             <div>
            
        //                 <Link to = {'/'} >
            
        //                     Back to the main page
            
        //                 </Link>
            
        //             </div>
        
        //         </div>

        //     );

    }

}

// function mapStateToProps ({ menu, guestbooks }, ownProps) {

//     //console.log('desc 00000000000000', this.props)

//     console.log(this.ownProps);

//     let selectedMenu;
//     let selectedMenuType;
    
//     _.each(menu, menuType => {

//         _.each(menuType, menuItem => {
            
//          // if (menuItem.name === ownProps.match.params.id) {
                                
//                 selectedMenu = menuItem;
//                 selectedMenuType = menuType;

//          //}

//         });

//     });

//     const theOthers = selectedMenuType.filter(item => item !== selectedMenu);
    
//     return { 
        
//         selectedMenu,
//         theOthers,
//         guestbooks
        
//     };

// }

function mapStateToProps ({ guestbooks }) {

    //console.log('desc 00000000000000', this.props)

   //  console.log(this.ownProps);

    // let selectedMenu;
    // let selectedMenuType;
    
    // _.each(menu, menuType => {

    //     _.each(menuType, menuItem => {
            
    //      // if (menuItem.name === ownProps.match.params.id) {
                                
    //             selectedMenu = menuItem;
    //             selectedMenuType = menuType;

    //      //}

    //     });

    // });

 //   console.log(selectedMenu);

    //const theOthers = selectedMenuType.filter(item => item !== selectedMenu);
    
    return { 
        
        guestbooks
        
    };

}

export default connect(mapStateToProps, { fetchGuesbookLists })(RecommendationDescriptions);