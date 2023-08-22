import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import React from 'react';


import './Movies.css';
import './Responsive.css';


function Movies(){
  const apiKey = process.env.REACT_APP_API_OMDB_API_KEY;

  const featuredMovies = [
    {poster: 'https://m.media-amazon.com/images/I/71ivyTtPwoL._AC_UF894,1000_QL80_.jpg', title: 'Seven', year: '1995', plot: 'Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.', imdbid: 'tt0114369'},
    {poster: 'https://i.ebayimg.com/images/g/no4AAOSw7R1hC-Sd/s-l400.jpg', title: 'Children of Men', year: '2006', plot: 'In 2027, in a chaotic world in which women have somehow become infertile, a former activist agrees to help transport a miraculously pregnant woman to a sanctuary at sea.', imdbid: 'tt0206634'},
    {poster: 'https://m.media-amazon.com/images/I/71nSF+pVrTL._AC_UF894,1000_QL80_.jpg', title: 'Spirited Away', year: '2001', plot: 'During her familys move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, a world where humans are changed into beasts.', imdbid: 'tt0245429'},
    {poster: 'https://m.media-amazon.com/images/M/MV5BMDJhMGRjN2QtNDUxYy00NGM3LThjNGQtMmZiZTRhNjM4YzUxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg', title: 'Shrek 2', year: '2004', plot: 'Shrek and Fiona travel to the Kingdom of Far Far Away, where Fionas parents are King and Queen, to celebrate their marriage. When they arrive, they find they are not as welcome as they thought they would be.', imdbid: 'tt0298148'},
    {poster: 'https://m.media-amazon.com/images/M/MV5BYmU4NTk4OWYtMjE4My00MGVkLTgwY2EtZTZjN2YyOGFiMDQ0L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg', title: 'Freaky Friday', year: '2003', plot: 'An overworked mother and her daughter did not get along. When they switch bodies, each is forced to adapt to the others life for one freaky Friday.', imdbid: 'tt0322330'},
    {poster: 'https://i.ebayimg.com/images/g/PgoAAOSwtglcabvE/s-l1200.jpg', title: 'The Hunger Games', year: '2012', plot: 'Katniss Everdeen voluntarily takes her younger sisters place in the Hunger Games: a televised competition in which two teenagers from each of the twelve Districts of Panem are chosen at random to fight to the death.', imdbid: 'tt1392170'}
  ]
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
      fetch(`https://www.omdbapi.com/?s=${title}&apikey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "False"){
          // console.log('No results!');
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
      <h3 className='results-title'>
        <React.Fragment>{movies.length} search results for <strong>{formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1)}</strong></React.Fragment></h3>
      ) : null}

      <div className='movies-wrapper'>
        {movies && movies.length > 0 ? (

          movies.map((movie, index) => (
            <Card className='movie-card' key={index}>
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
          <>
            {featuredMovies.map((fmovie, index) => (
              <Card className='movie-card' key={index}>
                <Card.Img className='movie-img' src={fmovie.poster} alt='movie-poster'/>
                <Card.Body className='content'>
                  <Card.Text className='movie-title'>{fmovie.title}</Card.Text>
                  <Card.Text className='movie-year'>{fmovie.year}</Card.Text>
                  {/* <Card.Text className='movie-plot'>{fmovie.plot}</Card.Text> */}
                  <a href={`https://www.imdb.com/title/${fmovie.imdbid}`} target='_blank' rel="noreferrer"><Button className='movie-btn'>View on imdb</Button></a>
                </Card.Body>
              </Card>
            ))}
          </>
        )}
      </div>


      <footer>© Copyright Nicole Moncrieffe 2023</footer>
    </div>
  )

}


export default Movies;
