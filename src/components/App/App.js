import './App.css';
import Details from '../Details/Details';
import MovieList from '../MovieList/MovieList';
import MovieForm from '../MovieForm/MovieForm';
import {HashRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Details />

        {/* Add Movie page */}
        <MovieForm />


      </Router>
    </div>
  );
}


export default App;
