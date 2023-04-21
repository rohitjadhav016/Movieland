import { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';

const App = () => {

    const[movies, setMovies] = useState([]);
    //state for search functionality
    const[searchKeyword, setSearchKeyword] = useState('');

    //api key
    const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=1f16786f`;

    const searchMovies = async (title) => {
        const response =  await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
        
    }

    useEffect(() => {
        searchMovies('SpiderMan');
    }, []);

    return(
        <div className='app'>
        <h1> Movie World </h1>
        <div className='search'>
            <input placeholder='Search for a movie' value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}  />
            <img src={SearchIcon} alt='search' onClick={() => searchMovies(searchKeyword)}/>
        </div>
        {
            movies.length > 0
            ? (
                <div className='container'>
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>
            ))}
                </div>
            )
            : (
                <div>
                    <h3> No movies found </h3>
                </div>
            )
        }
        </div>
    );
}

export default App;