import React, { Component } from 'react'; 
/* global google */

function loadJS(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}

class GoogleMAP extends Component{


  componentDidMount() {

    // this.setMap();

        window.initMap = this.initMap;
        // Asynchronously load the Google Maps script, passing in the callback reference
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDr201yRMYExEEWJyWfOaq11muqvmUfb00&callback=initMap')
    
  }

  componentWillReceiveProps(nextProps) {

    this.initMap(nextProps);
    
  }

  initMap = coordinate => {

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

  render () {

    return (
  
        <div
            ref="map" 
            style = { {width:250,  height: 100} }
        />

    );

  }

}

export default GoogleMAP;

