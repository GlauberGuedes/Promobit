//GLOBAL - components from npm
import React, { useState } from "react";

//STYLES
import "./home.scss";

//COMPONENTS
import { PageHeader } from "../../components/layout";
import { Button } from "../../components/general";

//SERVICES - api, conectors...

//GLOBAL STATE - redux, env...

//ASSETS - icons, images...

export default function Home() {
  //GENERAL
  const categoryList = [
    "Ação",
    "Aventura",
    "Animação",
    "Comédia",
    "Crime",
    "Documentário",
    "Drama",
    "Família",
    "Fantasia",
    "História",
    "Terror",
    "Música",
    "Mistério",
    "Romance",
    "Ficção científica",
    "Cinema TV",
    "Thriller",
    "Guerra",
    "Faroeste",
  ];

  //STATES
  const [filtersList, setFiltersList] = useState([]);

  //REDUX - Selectors

  //FUNCTIONS

  //USE EFFECTS

  return (
    <div className="home">
      <PageHeader />
      <section className="home-header">
        <h1>Milhões de filmes, séries e pessoas para descobrir. Explore já.</h1>
        <div className="home-header-filters">
          <h6>FILTRE POR:</h6>
          <div className="home-header-filters__list">
            {categoryList.map((category, index) => (
              <Button
                key={index}
                text={category}
                onClick={() => {
                  const arrayFilters = [...filtersList];
                  arrayFilters.push(category);
                  setFiltersList(arrayFilters);
                }}
                onClose={() => {
                  const arrayFilters = filtersList.filter(
                    (item) => item !== category
                  );
                  setFiltersList(arrayFilters);
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
