import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css'

const Card = (props) => {
    const { name, image } = props.vehicle;
    return (
        <div className=" items">
            <Link to="/login">
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