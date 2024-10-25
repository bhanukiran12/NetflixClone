import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Popular = () => {
  const [popularMovies, setpopularMovies] = useState([])
  const [popularLoading, setpopularLoading] = useState(true)
  const [apiError, setApiError] = useState(false)

  const isLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )
  const popularAPIHandler = async () => {
    setpopularLoading(true)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
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
      setpopularMovies(updatedDate)
      setpopularLoading(false)
      setApiError(false)
    } else {
      setApiError(true)
      setpopularLoading(false)
    }
  }

  useEffect(() => {
    popularAPIHandler()
  }, [])

  const apiFailure = () => (
    <div className="apiFailure">
      <img
        src="https://res.cloudinary.com/df7wnybwg/image/upload/v1728365736/MoviesApp/Background-Complete_uxsukd.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={popularAPIHandler}>
        Try Again
      </button>
    </div>
  )
  const styles = {
    bgcolor: true,
  }
  const popularView = () =>
    apiError ? (
      apiFailure()
    ) : (
      <div>
        <div className="popular">
          <ul>
            {popularMovies.map(each => (
              <Link to={`/movies/${each.id}`} key={each.id}>
                <li key={each.id}>
                  <img
                    src={each.posterPath}
                    className="popular-image"
                    alt={each.title}
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    )
  return (
    <>
      <Header styles={styles} /> {popularLoading ? isLoading() : popularView()}
      <Footer />
    </>
  )
}

export default Popular
