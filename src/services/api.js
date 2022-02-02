const baseURL = "https://api.themoviedb.org/3/";

export async function get(endPoint,page) {
  const headers = {
    "Content-type": "application/json",
  };

  try {
    const resposta = await fetch(`${baseURL}${endPoint}?api_key=${process.env.REACT_APP_KEY}${page ? page : ''}&language=pt-BR`, {
      headers,
    });

    const dados = await resposta.json();

    return { dados, erro: !resposta.ok };
  } catch (error) {
    console.log(error);
  }
}