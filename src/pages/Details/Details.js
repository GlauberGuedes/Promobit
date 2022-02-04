//GLOBAL - components from npm
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {format} from 'date-fns';

//STYLES
import "./details.scss";

//COMPONENTS
import { PageHeader } from "../../components/layout";
import { CardCast, Card } from "../../components/data-display";

//SERVICES - api, conectors...
import * as API from "../../services/api";

//GLOBAL STATE - redux, env...

//ASSETS - icons, images...

export default function Details() {
  //GENERAL
  const { id } = useParams();

  //STATES
  const [movie, setMovie] = useState();
  const [castList, setCastList] = useState();
  const [crewList, setCrewList] = useState();
  const [trailer, setTrailer] = useState();
  const [recommendations, setRecommendations] = useState();
  const [loading, setLoading] = useState(true);

  //REDUX - Selectors

  //FUNCTIONS
  const getInfoDetails = async () => {
    setLoading(true);
    await getMovieDetail();
    await getMovieCredits();
    await getMovieTrailer();
    await getMovieRecommendations();
    setLoading(false);
  }

  const getMovieCredits = async () => {
    const resposta = await API.get(`movie/${id}/credits`);
    console.log('credits', resposta);
    if (resposta.erro) {
      return console.log(resposta.dados);
    } else {
      setCastList(resposta.dados.cast);
      const arrayCrew = [];
      for(const item of resposta.dados.crew) {
        if(item.job === 'Director' || item.job === 'Characters' || item.job === 'Screenplay') {
          arrayCrew.push(item)
        }
      }
      setCrewList(arrayCrew);
      console.log(arrayCrew);
    }
  };

  const getMovieTrailer = async () => {
    const resposta = await API.get(`movie/${id}/videos`);
    console.log('trailer', resposta);
    if (resposta.erro) {
      return console.log(resposta.dados);
    } else {
      setTrailer(resposta.dados);
    }
  };

  const getMovieRecommendations = async () => {
    const resposta = await API.get(`movie/${id}/recommendations`);
    console.log('recommendations', resposta);
    if (resposta.erro) {
      return console.log(resposta.dados);
    } else {
      setRecommendations(resposta.dados.results);
    }
  };

  const getMovieDetail = async () => {
    const resposta = await API.get(`movie/${id}`);
    console.log('details', resposta);
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
                <div className="details-header-information__details">
                    <p>{format(new Date(movie.release_date), "dd/MM/yyyy")} • {movie.genres.map((item, index) => {
                      if(index !== movie.genres.length - 1) {
                        return item.name+', '
                      } else {
                        return item.name
                      }
                    })} • {(movie.runtime/60).toFixed(0)}h {(movie.runtime%60)}m</p>
                </div>
                <div className="details-header-information__synopsis">
                    <h5>Sinopse</h5>
                    <p>{movie.overview}</p>
                </div>
                <div className="details-header-information__list">
                  {crewList.map((crew,index) => (
                    <div key={index} className="details-header-information-crew">
                      <h5>{crew.name}</h5>
                      <p>{crew.job}</p>
                    </div>
                  ))}
                </div>
            </div>
          </section>
          <main className="details-main">
            <div className="details-main-cast">
              <h3>Elenco original</h3>
              <div className="details-main-cast__list">
                {castList.map((cast, index) => (
                  <CardCast key={index} name={cast.name} image={cast.profile_path} character={cast.character}/>
                ))}
              </div>
            </div>
            <div className="details-main-trailer">
              <h3>Trailer</h3>
              <img  src={`https://www.themoviedb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}/>
            </div>
            <div className="details-main-recommendation">
              <h3>Recomendações</h3>
              <div className="details-main-recommendation__list">
                {recommendations.map((recommendation, index) => (
                  <Card key={index} title={recommendation.title} image={recommendation.poster_path} date={recommendation.release_date}/>
                ))}
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
