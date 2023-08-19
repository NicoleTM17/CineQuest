


import './Movies.css';

function Movies(){

  return(
    <div id='movies'>

      <div className='banner'>
      <div className='logo-wrapper'>
        <img className='logo' src='images/CineQuest.png' alt='logo'/>
        <h2 className='slogan'>Great films at your <span style={{fontStyle: 'italic'}}>fingertips</span></h2>
      </div>

      <div className='searchbar-wrapper'>
        <form className='searchbar'>
          <input className='search-input' type='text' placeholder='Search CineQuest...'/>
          <input className='search-btn' type='submit'></input>
        </form>
      </div>
      </div>

      {/* MOVIE CARDS SECTION BELOW */}
      <p className='search-results'>3 search results</p>

      <div className='movies-wrapper'>
        {/* CARD 1  */}
        <div className='movie-card'>
          <img className='movie-img' src='https://artofthemovies.co.uk/cdn/shop/products/IMG_2299-850371.jpg?v=1611688017' alt='movie-poster'/>
          <div className='content'>
            <h5 className='movie-title'>Harry Potter and the Goblet of Fire</h5>
            <p className='movie-year'>2005</p>
            <p className='movie-plot'>Harry Potter finds himself competing in a hazardous tournament between rival schools of magic, but he is distracted by recurring nightmares.</p>
            <a  href='#' target='_blank'><div className='movie-btn btn'>View on imdb</div></a>
          </div>
        </div>

        {/* CARD 2  */}
        <div className='movie-card'>
          <img className='movie-img' src='https://artofthemovies.co.uk/cdn/shop/products/IMG_2299-850371.jpg?v=1611688017' alt='movie-poster'/>
          <div className='content'>
            <h5 className='movie-title'>Harry Potter and the Goblet of Fire</h5>
            <p className='movie-year'>2005</p>
            <p className='movie-plot'>Harry Potter finds himself competing in a hazardous tournament between rival schools of magic, but he is distracted by recurring nightmares.</p>
            <a  href='#' target='_blank'><div className='movie-btn btn'>View on imdb</div></a>
          </div>
        </div>


        {/* CARD 3  */}
        <div className='movie-card'>
          <img className='movie-img' src='https://artofthemovies.co.uk/cdn/shop/products/IMG_2299-850371.jpg?v=1611688017' alt='movie-poster'/>
          <div className='content'>
            <h5 className='movie-title'>Harry Potter and the Goblet of Fire</h5>
            <p className='movie-year'>2005</p>
            <p className='movie-plot'>Harry Potter finds himself competing in a hazardous tournament between rival schools of magic, but he is distracted by recurring nightmares.</p>
            <a  href='#' target='_blank'><div className='movie-btn btn'>View on imdb</div></a>
          </div>
        </div>



      </div>



    </div>
  )

}


export default Movies;
