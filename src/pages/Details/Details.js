//GLOBAL - components from npm
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {format} from 'date-fns';

//STYLES
import "./details.scss";

//COMPONENTS
import { PageHeader } from "../../components/layout";

//SERVICES - api, conectors...
import * as API from "../../services/api";

//GLOBAL STATE - redux, env...

//ASSETS - icons, images...

export default function Details() {
  //GENERAL
  const { id } = useParams();

  //STATES
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);

  //REDUX - Selectors

  //FUNCTIONS
  const getInfoDetails = async () => {
    setLoading(true);
    await getMovieDetail();
    setLoading(false);
  }
  const getMovieDetail = async () => {
    const resposta = await API.get(`movie/${id}`);
    console.log(resposta);
    if (resposta.erro) {
      return console.log(resposta.dados);
    } else {
      setMovie(resposta.dados);
    }
  };

  //USE EFFECTS
  useEffect(() => {
      getInfoDetails();
  }, []);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div className="details">
          <PageHeader />
          <section className="details-header">
            <img
              src={`https://www.themoviedb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="details-header-information">
                <div className="details-header-information__title">
                    <h2>{movie.title} {` (${format(new Date(movie.release_date), "yyyy")})`}</h2>
                </div>
                <div className="details-header-information__synopsis">
                    <h5>Sinopse</h5>
                    <p>{movie.overview}</p>
                </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
