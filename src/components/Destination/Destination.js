import React, { useEffect, useState } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { useParams } from 'react-router';
import fakeData from '../../data/data.json'

const Destination = (props) => {
    //const {id} = props.id;
    const {id} = useParams();
    const [click, setClick] = useState([]);
   // console.log(id);
    const vehicle = fakeData.find(vh => vh.id === id);
     console.log("Vehicle",vehicle);

    return (
        
        <div className="container">
            <h1>Destination: {id}</h1>
            <div className="row mt-5">
                <div className="col-lg-4 bg-secondary mr-3 rounded">
                    <form onSubmit="" >

                        <div className="form-group">
                            <label htmlFor="from" className="text-white">Pick From</label>
                            <input type="text" name="from" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="to" className="text-white">Pick To</label>
                            <input type="text" name="to" className="form-control" required />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary w-100">Search</button>
                        </div>
                    </form>
                </div>
                <div >
                    <Map google={props.google} zoom={14}>

                        <Marker onClick={props.onMarkerClick}
                            name={'Current location'} />

                        <InfoWindow onClose={props.onInfoWindowClose}>

                        </InfoWindow>
                    </Map>
                </div>
            </div>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCaUJI3zgtqz1Wqi-ghmO4LS1dQzctCmOc")
})(Destination);