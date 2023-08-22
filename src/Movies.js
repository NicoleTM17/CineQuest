import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';


import './Movies.css';

function Movies(){
  const apiKey = process.env.REACT_APP_API_OMDB_API_KEY;

  // User must type in valid movie title
  // Should return title, year, plot, base url and poster
  // to do url https://www.imdb.com/title/${url.imdbID}

  const [title, setTitle] = useState(''); // useState for movie title
  const [movies, setMovies] = useState([]); // useState empty array
  const [formattedTitle, setFormattedTitle] = useState(''); // useState for storing the title input

  const [formSubmitted, setFormSubmitted] = useState(false); // useState for submitting the form
  const [resultsTitle, setResultsTitle] = useState(false); // useState for search results for ${movie}
  const [searchError, setSearchError] = useState(false); // useState for search results p tag


  function handleChange(event){
    // console.log(event.target.value);
    const searchInput = event.target.value; // stores the movie title searched
    setTitle(searchInput); // defining the movie title

    setSearchError(false);
    // setResultsTitle(false);
  };


  function handleSubmit(event){
    event.preventDefault();
    // console.log(event);
    setFormSubmitted(true);
  };


  useEffect(() => {
    if (formSubmitted && title) {
      console.log('Fetching data...');
      fetch(`http://www.omdbapi.com/?s=${title}&apikey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "False"){
          console.log('No results!');
          setSearchError(true);
          setMovies([]);
        } else {
          // console.log(data);
          setMovies(data.Search);
          setFormattedTitle(title);
          setResultsTitle(true);

          setSearchError(false);
        }
      })

      .catch((error) => {
        console.error("Error fetching from omdb:", error);
        setSearchError(true);
        setResultsTitle(false);
      })
      .finally(() => {
        setFormSubmitted(false);
        setTitle(''); // clear input field after form submission
      })
    }
  }, [apiKey, title, formSubmitted]);


  return(
    <div id='movies'>

      <div className='banner-wrapper'>
      <div className='logo-wrapper'>
        <img className='logo' src='images/CineQuest.png' alt='logo'/>
        <h2 className='slogan'>Great films at your <span style={{fontStyle: 'italic'}}>fingertips</span></h2>
      </div>

      {/* SEARCHBAR HERE */}
      <div className='searchbar-wrapper'>
        <form onSubmit={handleSubmit} className='searchbar'>
          <input onChange={handleChange} className='search-input' type='text' value={title} placeholder='Search CineQuest...'/>
          <input className='search-btn' type='submit'></input>
        </form>
      </div>
      </div>

      {/* MOVIE CARDS SECTION BELOW */}
      {searchError === true && <p className='search-results'>No search results</p>}
      {resultsTitle && movies && movies.length > 0 ? (
      <h3 className='results-title'>{`${movies.length} search results for ${formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1)}`}</h3>
      ) : null}

      <div className='movies-wrapper'>
        {movies && movies.length > 0 ? (

          movies.map((movie, index) => (
            <Card className='movie-card'>
              <Card.Img className='movie-img' src={movie.Poster !== 'N/A' ? movie.Poster : 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/094/199/original/fd2d9f4640394679d65967c13ec0de2c.jpg?1692633511'} alt='movie-poster'/>
              <Card.Body className='content'>
                <Card.Text className='movie-title'>{movie.Title}</Card.Text>
                <Card.Text className='movie-year'>{movie.Year}</Card.Text>
                <Card.Text className='movie-plot'>{movie.Plot}</Card.Text>
                <a  href={`https://www.imdb.com/title/${movie.imdbID}`} target='_blank' rel="noreferrer"><Button className='movie-btn'>View on imdb</Button></a>
              </Card.Body>
            </Card>

          ))
        ) : (
          <></>
        )}
      </div>


      <footer>© Copyright Nicole Moncrieffe 2023</footer>
    </div>
  )

}


export default Movies;
