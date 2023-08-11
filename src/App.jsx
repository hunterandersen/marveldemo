import { useState } from 'react'
import './App.css'

//This is Vite's way of importing an environment variable
//from a .env file
const KEY = import.meta.env.VITE_PUBLIC_API_KEY;

function App() {
  //Creating our state variables
  const [heroesData, setHeroesData] = useState([]);
  const [marvelAttribution, setMarvelAttribution] = useState({});

  function fetchHeroes(){
    //fetch returns a Promise object
    fetch(`https://gateway.marvel.com:443/v1/public/characters?apikey=${KEY}`)
    //This line unwraps the json data that was inside the Promise object
    .then((response) => response.json())
    //This line gives us access to the useable data that came back from the fetch response
    .then((data) => {
      console.log(data);
      //Get the website link that the Marvel API wants us to refer to in their attribution section
      const firstQuotes = data.attributionHTML.indexOf("\"");
      const lastQuotes = data.attributionHTML.lastIndexOf("\"");
      const link = data.attributionHTML.slice(firstQuotes+1, lastQuotes);
      console.log(link);
      //Store that attribution info so we can render it below
      setMarvelAttribution({
        text: data.attributionText,
        url: link
      });
      //Set the heroes data
      setHeroesData(data.data.results);
    })
  }

  return (
    <>
      <h1>Marvel Stuff</h1>
      <button onClick={fetchHeroes}>Get Heroes</button>
      {heroesData && <div>{heroesData.map((hero) => {
        return (
          <p key={hero.id}>{hero.name}</p>
        )
      })}</div>}
      {marvelAttribution.text && <a href={marvelAttribution.url}>{marvelAttribution.text}</a>}
    </>
  )
}

export default App
