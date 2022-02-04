//GLOBAL - components from npm
import React from 'react';

//STYLES
import './card-cast.scss'

//COMPONENTS


//SERVICES - api, conectors...


//GLOBAL STATE - redux, env...


//ASSETS - icons, images...


export default function CardCast({name, image, character}) {
    //GENERAL
    
    
    //STATES
    
    
    //REDUX - Selectors
    
    
    //FUNCTIONS
    
    
    //USE EFFECTS
    
    
    return (
        <div className="card-cast">
            <img src={`https://www.themoviedb.org/t/p/w500/${image}`} alt={name} />
            <div className="card-cast__name">{name}</div>
            <p>{character}</p>
        </div>
    )
}
