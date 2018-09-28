// import React from 'react';
// import { connect } from 'react-redux';

// // import TodayWeatherCoordinate from './today_weather_coordinate';

// const LocationCoordinate = (props) => {
    
//     if(!props.branchLocation)
//     return <div>Loading...</div>;

//     const { lat, lng } = props.branchLocation.results[0].geometry.location;
    
//     return(

//         <div>

//             <div>

//                 <TodayWeatherCoordinate
                
//                     lat = { lat }
//                     lng = { lng }
//                 />
            
//             </div>

//         </div>
//     );
// }

// function mapsPropsToState({ branchLocation }) {

//     return { branchLocation };
// }

// export default connect(mapsPropsToState)(LocationCoordinate);