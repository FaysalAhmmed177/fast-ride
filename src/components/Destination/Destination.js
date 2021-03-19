import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
class Destination extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-lg-6">

                </div>
                <div className="map">
                    <Map google={this.props.google} zoom={14}>

                        <Marker onClick={this.onMarkerClick}
                            name={'Current location'} />

                        <InfoWindow onClose={this.onInfoWindowClose}>

                        </InfoWindow>
                    </Map>
                </div>
            </div>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: ("AIzaSyCaUJI3zgtqz1Wqi-ghmO4LS1dQzctCmOc")
})(Destination)