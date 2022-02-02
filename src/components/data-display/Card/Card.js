//GLOBAL - components from npm
import React from 'react';
import {format} from 'date-fns';
import  ptBR  from 'date-fns/locale/pt-BR'

//STYLES
import './card.scss'

//COMPONENTS


//SERVICES - api, conectors...


//GLOBAL STATE - redux, env...


//ASSETS - icons, images...


export default function Card({image, title, date, onClick}) {
    //GENERAL
    
    
    //STATES
    
    
    //REDUX - Selectors
    
    
    //FUNCTIONS
    
    
    //USE EFFECTS
    
    
    return (
        <div className="card" onClick={onClick}>
            <img alt={title} src={`https://www.themoviedb.org/t/p/w500/${image}`}/>
            <p className="card__title">{title}</p>
            <p className="card__date">{format(new Date(date), "dd MMM yyyy", {locale: ptBR}).toUpperCase()}</p>
        </div>
    )
}
