import {useState} from 'react'
import Cookies from 'js-cookie'
import {HiOutlineSearch} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const SearchRoute = () => {
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchClick, setsearchClick] = useState(false)
  const [searchError, setSearchError] = useState(false)

  const isLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  const searchInputHandler = event => {
    setSearchText(event.target.value)
  }

  const searchAPIHandler = async () => {
    setSearchLoading(true)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedDate = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      setSearchResults(updatedDate)
      setSearchLoading(false)
      setsearchClick(true)
      setSearchError(false)
    } else {
      setSearchError(true)
    }
  }

  const apiFailure = () => (
    <div className="apiFailure">
      <img
        src="https://res.cloudinary.com/df7wnybwg/image/upload/v1728365736/MoviesApp/Background-Complete_uxsukd.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={searchAPIHandler}>
        Try Again
      </button>
    </div>
  )

  const searchBarHandler = () => (
    <div className="searchBarHandler">
      <input
        type="search"
        className="searchbar"
        onChange={searchInputHandler}
      />
      <button
        type="button"
        className="search-route-btn"
        onClick={searchAPIHandler}
        data-testid="searchButton"
      >
        <HiOutlineSearch size={20} color="white" />
      </button>
    </div>
  )

  const noresultsView = () => (
    <div className="search-failure">
      <img
        src="https://res.cloudinary.com/df7wnybwg/image/upload/v1728304782/MoviesApp/no-results_funmwm.png"
        alt="no movies"
      />
      <p>Your search for {searchText} did not find any matches.</p>
    </div>
  )
  const styles = {
    searchBar: true,
    bgcolor: true,
    searchBarHandler,
  }

  const searchResultsStyle = {
    backgroundColor: 'black',
    minHeight: '70vh',
    height: '100%',
    display: 'flex',
    justifyContent: searchResults.length === 0 ? 'center' : 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: '30px 60px 0px 60px',
    margin: '0px',
  }
  const searchView = () => (
    <ul style={searchResultsStyle}>
      {searchLoading ? (
        isLoading()
      ) : (
        <>
          {searchResults.length === 0 && searchClick ? (
            noresultsView()
          ) : (
            <>
              {searchResults.map(each => (
                <div>
                  <li key={each.id}>
                    <img
                      src={each.posterPath}
                      className="searchImageResult"
                      alt={each.title}
                    />
                  </li>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </ul>
  )
  return (
    <div>
      <Header styles={styles} />
      {searchError ? apiFailure() : searchView()}
      <Footer />
    </div>
  )
}

export default SearchRoute
