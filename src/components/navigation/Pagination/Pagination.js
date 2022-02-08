//GLOBAL - components from npm
import React, {useState} from 'react';

//STYLES
import './pagination.scss'

//COMPONENTS


//SERVICES - api, conectors...


//GLOBAL STATE - redux, env...


//ASSETS - icons, images...
import { ReactComponent as IconArrowRight } from "../../../assets/ArrowRight.svg";


export default function Pagination({pages, limit, setPage, currentPage}) {
    //GENERAL
    
    
    //STATES
    const [value, setValue] = useState(currentPage < pages.length - limit ? currentPage - 1 : currentPage - limit);
    
    
    //REDUX - Selectors
    
    
    //FUNCTIONS
    const decreaseValue = () => {
        if (value > 0) {
          return setValue((value) => value - 1);
        } else {
          return;
        }
      };
    
      const increaseValue = () => {
        if (value + limit < pages.length) {
          setValue((value) => value + 1);
        } else {
          return;
        }
      };
    
    
    //USE EFFECTS
    return (
        <div className="pagination">
            {currentPage !== 1 && <div onClick={() => {setValue(0); setPage(1)}} className="pagination-last">Primeira</div>}
            {value > 0 && <div onClick={() => decreaseValue()} className="pagination-arrow pagination-arrow--left"><IconArrowRight/></div>}
            <div className="pagination__list">
                {pages.slice(value, value + limit).map(page => (
                <div onClick={() => setPage(page)} className={`pagination-page ${page === currentPage ? 'active' : ''}`} key={page}>{page}</div>
                ))}
            </div>
            {value + limit < pages.length && <div onClick={() => increaseValue()} className="pagination-arrow pagination-arrow--right"><IconArrowRight/></div>}
            {currentPage !== pages.length && <div onClick={() => {setValue(pages.length - limit); setPage(pages.length)}} className="pagination-last">Última</div>}
        </div>
    )
}
