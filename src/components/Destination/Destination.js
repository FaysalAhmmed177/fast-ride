import React, { useEffect, useState } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { useParams } from 'react-router';
import fakeData from '../../data/data.json'
import './Destination.css'

const Destination = (props) => {
    //const {id} = props.id;
    const { id } = useParams();
    const [click, setClick] = useState(false);
    const [address, setAddress] = useState({
        from: '',
        to: ''
    });
    // console.log(id);
    //console.log(typeof (id));
    const vehicle = fakeData.find(vh => vh.id === parseInt(id));
    const { name, image, price, icon, capacity } = vehicle;
    //console.log("Vehicle", vehicle);

    const handleBlur = (e)=>{
     console.log(e.target.name, e.target.value);
     const newAddress = {...address};
     newAddress[e.target.name] = e.target.value;
     setAddress(newAddress);
    }

    const handleSubmit = (e) => {
        setClick(!click)
        e.preventDefault();
    }

    return (

        <div className="container">
            <div className="row mt-5">
                {click ? <div className="col-lg-4 bg-secondary mr-3 mb-5 rounded  p-3">
                    <div className="bg-warning p-3 rounded">
                        <h2>{address.from}</h2><br />
                        <p className="ml-3">To</p>
                        <h2>{address.to}</h2>
                    </div>
                    <div className="vehicle-details bg-white d-flex justify-content-center p-3 rounded mt-3">
                        <img className="vehicle-img ml-2" src={image} alt="" />
                        <h3 className="ml-3">{name}</h3>
                        <img className="ml-3 icon" src={icon} alt="" />
                        <h3 className="ml-3">{capacity}</h3>
                        <h3 className="ml-3">${price}</h3>
                    </div>
                    <div className="vehicle-details bg-white d-flex justify-content-center p-3 rounded mt-3">
                        <img className="vehicle-img ml-2" src={image} alt="" />
                        <h3 className="ml-3">{name}</h3>
                        <img className="ml-3 icon" src={icon} alt="" />
                        <h3 className="ml-3">{capacity}</h3>
                        <h3 className="ml-3">${price}</h3>
                    </div>
                    <div className="vehicle-details bg-white d-flex justify-content-center p-3 rounded mt-3">
                        <img className="vehicle-img ml-2" src={image} alt="" />
                        <h3 className="ml-3">{name}</h3>
                        <img className="ml-3 icon" src={icon} alt="" />
                        <h3 className="ml-3">{capacity}</h3>
                        <h3 className="ml-3">${price}</h3>
                    </div>
                </div> : <div className="col-lg-4 bg-secondary mr-3 mb-5 rounded  p-3">
                    <form onSubmit={handleSubmit} >

                        <div className="form-group">
                            <label htmlFor="from" className="text-white">Pick From</label>
                            <input type="text" name="from" onBlur={handleBlur} className="form-control" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="to" className="text-white">Pick To</label>
                            <input type="text" name="to" onBlur={handleBlur} className="form-control" required />
                        </div>

                        <div className="form-group">
                            <input type="submit" className="form-control bg-success" />
                        </div>
                    </form>
                </div>}
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