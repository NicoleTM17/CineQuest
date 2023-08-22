import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';


import Movies from './Movies.js';

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: [
      'Montserrat:ital,wght@0,100;0,200;0,500;1,200;1,700',
    ],
  },
});


function App() {
  return (
    <div className="container-wrapper">
      <Movies/>
    </div>
  );
}

export default App;
