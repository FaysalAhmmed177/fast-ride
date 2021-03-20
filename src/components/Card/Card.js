import React from 'react';
import { Link } from 'react-router-dom';
import Destination from '../Destination/Destination';
import './Card.css'

const Card = (props) => {
    const {id, name, image } = props.vehicle;
    console.log(id);
    return (
        <div className=" items">
            <Link to={`/destination/${id}`}>
                <div class="card h-100 align-items-center">
                    <img src={image} class="card-img-top w-75" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">{name}</h5>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Card;