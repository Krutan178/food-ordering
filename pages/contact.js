import React from 'react'; // get the React object from the react module
// import { fitBounds } from 'google-map-react/utils';
import GoogleMapReact from 'google-map-react';
import styles from "../styles/contact.module.css";

class contact extends React.Component {
  render() {

    const defaultProps = {
      center: {
        lat: 10.99835602,
        lng: 77.01502627
      },
      zoom: 11
    };

    const AnyReactComponent = ({ text }) => <div>{text}</div>;


    // // const bounds = {
    // //     nw: {
    // //       lat: 50.01038826014866,
    // //       lng: -118.6525866875,
    // //      },
    // //      se: {
    // //       lat: 32.698335045970396,
    // //       lng: -92.0217273125,
    // //      },
    // //   };
    
    // //   const size = {
    // //     width: 640, // Map width in pixels
    // //     height: 380, // Map height in pixels
    // //   };
    
    //   const {center, zoom} = fitBounds({nw, se}, size);
    return (
     <div>
       <div>
           <h1 align="center">contact us</h1>
       </div>
       <div className={styles.map}>
       {/* <GoogleMap  onGoogleApiLoaded={({map, maps}) => console.log(map, maps)} /> */}

       <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>

       </div>
       <br/>
     </div>
    );
  }
}

export default contact;