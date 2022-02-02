//GLOBAL - components from npm
import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

//STYLES
import "./home.scss";

//COMPONENTS
import { PageHeader } from "../../components/layout";
import { Button } from "../../components/general";
import { Card } from "../../components/data-display";

//SERVICES - api, conectors...
import * as API from "../../services/api";

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
  const navigate = useNavigate();

  //STATES
  const [filtersList, setFiltersList] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const [page, setPage] = useState(1);

  //REDUX - Selectors

  //FUNCTIONS
  const getMoviesList = async () => {
    const resposta = await API.get('movie/popular', `&page=${page}`);
    console.log(resposta)
    if(resposta.erro) {
      return console.log(resposta.dados)
    } else {
      setMoviesList(resposta.dados.results);
    }
  }

  //USE EFFECTS
  useEffect(() => {
    getMoviesList();
  }, [])

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
      <main className="home-main">
        <div className="home-movie-list">
                {moviesList.map((movie, index) => (
                  <Card key={index} image={movie.poster_path} title={movie.title} date={movie.release_date} onClick={() => navigate(`/${movie.id}`)}/>
                ))}
        </div>
        <div className="home-pagination">
            
        </div>
      </main>
    </div>
  );
}
