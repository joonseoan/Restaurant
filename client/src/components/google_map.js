import React, { Component } from 'react';

class GoogleMAP extends Component{

  setMap(coordinate) {

    if (!coordinate)
      coordinate = this.props;

    // eslint-disable-next-line     
    new google.maps.Map(this.refs.map, {

      zoom: 12, //zoom level that will be displayed 

      center: {  
           //Where googlemap centers on..
          lat: coordinate.lat,
          lng: coordinate.lng //longtitude
     
      }

  });

  }

  componentDidMount() {

    this.setMap();
    
  }

  componentWillReceiveProps(nextProps) {

    this.setMap(nextProps);
    
  }

  render () {

    return (
  
        <div
            ref = "map" 
            style = { {width:250,  height: 100} }
        />

    );

  }

}

export default GoogleMAP;