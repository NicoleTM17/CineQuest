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
    setResultsTitle(false);
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
        // console.log(data);
        setMovies(data.Search);
        setFormattedTitle(title);

        setResultsTitle(true);
        setFormSubmitted(false);
        setSearchError(false);
        setTitle(''); // clear input field after form submission
      })

      .catch((error) => {
        console.error("Error fetching from omdb:", error);
        setSearchError(true);
        setResultsTitle(false);
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
      <p className={searchError === true || movies.length === 0 ? 'search-results' : 'search-results-hidden'}>No search results</p>
      <h3 className={resultsTitle === true && movies.length > 0 ? 'results-title' : 'results-title-hidden'}>{movies.length} search results for <strong>{formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1)}</strong></h3>

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
