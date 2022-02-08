//GLOBAL - components from npm
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//STYLES
import "./home.scss";

//COMPONENTS
import { PageHeader } from "../../components/layout";
import { Button } from "../../components/general";
import { Card } from "../../components/data-display";
import { Pagination } from "../../components/navigation";
import { Loading } from "../../components/feedback";

//SERVICES - api, conectors...
import * as API from "../../services/api";

//GLOBAL STATE - redux, env...

//ASSETS - icons, images...

export default function Home() {
  //GENERAL
  const navigate = useNavigate();

  //STATES
  const [filtersList, setFiltersList] = useState(
    JSON.parse(localStorage.getItem("filter"))
      ? JSON.parse(localStorage.getItem("filter"))
      : []
  );
  const [moviesList, setMoviesList] = useState([]);
  const [page, setPage] = useState(localStorage.getItem("page")
  ? Number(localStorage.getItem("page"))
  : 1);
  const [totalPages, setTotalPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingList, setLoadingList] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  //REDUX - Selectors

  //FUNCTIONS
  const homeInformation = async () => {
    setLoading(true);
    await getMoviesList();
    await getMoviesListCategory();
    setLoading(false);
  };

  const movieInformation = async () => {
    setLoadingList(true);
    await getMoviesList();
    setLoadingList(false);
  }

  const getMoviesList = async () => {
    const resposta = await API.get("movie/popular", `&page=${page}`);
    if (resposta.erro) {
      return console.log(resposta.dados);
    } else {
      setMoviesList(resposta.dados.results);
      let count = 1;
      const pages = [];
      while (count < 501) {
        pages.push(count);
        count += 1;
      }
      setTotalPages(pages);
    }
  };

  const getMoviesListCategory = async () => {
    const resposta = await API.get(`genre/movie/list`);

    if (resposta.erro) {
      return console.log(resposta.dados);
    } else {
      setCategoryList(resposta.dados.genres);
    }
  };

  const movieFilter = (movie) => {
    if (filtersList.length > 0) {
      for (const category of movie.genre_ids) {
        const categoryMovie = filtersList.find((id) => id === category);
        if (categoryMovie) {
          return movie;
        }
      }
    } else {
      return movie;
    }
  };

  //USE EFFECTS
  useEffect(() => {
    homeInformation();
  }, []);

  useEffect(() => {
    movieInformation()
  }, [page]);

  useEffect(() => {
    localStorage.setItem("filter", JSON.stringify(filtersList));
    localStorage.setItem("page", page);
  }, [filtersList, page]);

  return (
    <>
      {loading ? (
        <Loading open={loading} />
      ) : (
        <div className="home">
          <PageHeader />
          <section className="home-header">
            <h1>
              Milhões de filmes, séries e pessoas para descobrir. Explore já.
            </h1>
            <div className="home-header-filters">
              <h6>FILTRE POR:</h6>
              <div className="home-header-filters__list">
                {categoryList.map((category) => (
                  <Button
                    key={category.id}
                    text={category.name}
                    active={filtersList.find((id) => id === category.id)}
                    onClick={() => {
                      const arrayFilters = [...filtersList];
                      arrayFilters.push(category.id);
                      setFiltersList(arrayFilters);
                    }}
                    onClose={() => {
                      const arrayFilters = filtersList.filter(
                        (item) => item !== category.id
                      );
                      setFiltersList(arrayFilters);
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
          <main className="home-main">
            <>
              {loadingList ? (
                <Loading open={loadingList} />
              ) : (
                <div className="home-movie-list">
                  {moviesList.filter(movieFilter).map((movie, index) => (
                    <Card
                      key={index}
                      image={movie.poster_path}
                      title={movie.title}
                      date={movie.release_date}
                      onClick={() => navigate(`/${movie.id}`)}
                    />
                  ))}
                </div>
              )}
            </>
            <div className="home-pagination">
              <Pagination
                pages={totalPages}
                currentPage={page}
                setPage={setPage}
                limit={5}
              />
            </div>
            <div className="home-pagination-mobile">
              <Pagination
                pages={totalPages}
                currentPage={page}
                setPage={setPage}
                limit={3}
              />
            </div>
          </main>
        </div>
      )}
    </>
  );
}
