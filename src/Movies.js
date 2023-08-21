import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState } from 'react';


import './Movies.css';

function Movies(){

  // User must type in valid movie title
  // Should return title, year, plot, base url and poster
  // to do url https://www.imdb.com/title/${url.imdbID}

  const [title, setTitle] = useState(''); // useState for movie title
  const [year, setYear] = useState(''); // useState for year of release
  const [plot, setPlot] = useState(''); // useState for movie plot
  const [id, setId] = useState(''); // useState for ID to use on imdb url
  const [poster, setPoster] = useState(''); // useState for movie poster

  const [searchResults, setSearchResults] = useState(false); // useState for search results p tag


  function handleChange(event){
    // console.log(event.target.value);
    const searchInput = event.target.value; // stores the movie title searched
    setTitle(searchInput); // defining the movie title

    setSearchResults(false);
  };


  function handleSubmit(event){
    event.preventDefault();
    // console.log(event);
  };









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
          <input onChange={handleChange} className='search-input' type='text' placeholder='Search CineQuest...'/>
          <input className='search-btn' type='submit'></input>
        </form>
      </div>
      </div>

      {/* MOVIE CARDS SECTION BELOW */}
      <p className='search-results'>{searchResults === true ? '3' : 'No'} search results</p>

      <div className='movies-wrapper'>
        {/* CARD 1  */}
        <Card className='movie-card'>
          <Card.Img className='movie-img' src='https://artofthemovies.co.uk/cdn/shop/products/IMG_2299-850371.jpg?v=1611688017' alt='movie-poster'/>
          <Card.Body className='content'>
            <Card.Text className='movie-title'>Harry Potter and the Goblet of Fire</Card.Text>
            <Card.Text className='movie-year'>2005</Card.Text>
            <Card.Text className='movie-plot'>Harry Potter finds himself competing in a hazardous tournament between rival schools of magic, but he is distracted by recurring nightmares.</Card.Text>
            <a  href='#' target='_blank'><Button className='movie-btn'>View on imdb</Button></a>
          </Card.Body>
        </Card>

        {/* CARD 2  */}
        <Card className='movie-card'>
          <Card.Img className='movie-img' src='https://artofthemovies.co.uk/cdn/shop/products/IMG_2299-850371.jpg?v=1611688017' alt='movie-poster'/>
          <Card.Body className='content'>
            <Card.Text className='movie-title'>Harry Potter and the Goblet of Fire</Card.Text>
            <Card.Text className='movie-year'>2005</Card.Text>
            <Card.Text className='movie-plot'>Harry Potter finds himself competing in a hazardous tournament between rival schools of magic, but he is distracted by recurring nightmares.</Card.Text>
            <a  href='#' target='_blank'><Button className='movie-btn'>View on imdb</Button></a>
          </Card.Body>
        </Card>

        {/* CARD 3  */}
        <Card className='movie-card'>
          <Card.Img className='movie-img' src='https://artofthemovies.co.uk/cdn/shop/products/IMG_2299-850371.jpg?v=1611688017' alt='movie-poster'/>
          <Card.Body className='content'>
            <Card.Text className='movie-title'>Harry Potter and the Goblet of Fire</Card.Text>
            <Card.Text className='movie-year'>2005</Card.Text>
            <Card.Text className='movie-plot'>Harry Potter finds himself competing in a hazardous tournament between rival schools of magic, but he is distracted by recurring nightmares.</Card.Text>
            <a  href='#' target='_blank'><Button className='movie-btn'>View on imdb</Button></a>
          </Card.Body>
        </Card>



      </div>



    </div>
  )

}


export default Movies;
