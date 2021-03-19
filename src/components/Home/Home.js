import React, { useEffect, useState } from 'react';
import './Home.css';
import fakeData from '../../data/data.json'
import Card from './../Card/Card';
import backgroundImg from '../../images/Bg.png';

const Home = () => {
    const [vehiclesData, setVehiclesData] = useState([]);

    useEffect(() => {
        setVehiclesData(fakeData);
        console.log(fakeData);
    }, [])

    return (
        <div style={{ backgroundImage: `url(${backgroundImg})` }} className="bgImg">
            <div className="container">
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    {
                        vehiclesData.map((vehicle) => <div class="col-lg-3 col-sm-12"><Card vehicle={vehicle} id={vehicle.id}></Card></div>)
                    }
                </div>
            </div>
        </div>
    )
};

export default Home;