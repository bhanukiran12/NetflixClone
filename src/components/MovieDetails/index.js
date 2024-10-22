import {useState, useEffect} from 'react'
import {format, addMinutes, getYear} from 'date-fns'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const MovieDetails = props => {
  const [movieDetails, setMovieDetails] = useState({})
  const [similarMovies, setSimilarMovies] = useState([])
  const [movieDetailsLoading, setMovieDetailsLoading] = useState(true)
  const [detailsError, setdetailsError] = useState(false)
  console.log('component mounted')
  console.log(movieDetails)

  const isLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )
  const convertMinutesToHoursMinutes = totalMinutes => {
    if (!totalMinutes || Number.isNaN(totalMinutes)) {
      return '0 h 0 m'
    }

    const minutesAsNumber = Number(totalMinutes)
    const initialDate = new Date(0)
    const updatedDate = addMinutes(initialDate, minutesAsNumber)
    return format(updatedDate, "H 'h' m 'm'")
  }
  const {match} = props
  const {params} = match
  const {id} = params
  useEffect(() => {
    const movieDetailsAPIHandler = async () => {
      const jwtToken = Cookies.get('jwt_token')

      const url = `https://apis.ccbp.in/movies-app/movies/${id}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        const updatedDate = data.movie_details.similar_movies.map(each => ({
          backdropPath: each.backdrop_path,
          id: each.id,
          overview: each.overview,
          posterPath: each.poster_path,
          title: each.title,
        }))

        setSimilarMovies(updatedDate)
        setMovieDetailsLoading(false)

        const moviedata = {
          adult: data.movie_details.adult,
          backdropPath: data.movie_details.backdropPath,
          budget: data.movie_details.budget,
          genres: data.movie_details.genres.map(each => ({
            id: each.id,
            name: each.name,
          })),
          id: data.movie_details.id,
          overview: data.movie_details.overview,
          posterPath: data.movie_details.poster_path,
          releaseDate: data.movie_details.release_date,
          runtime: data.movie_details.runtime,
          spokenLanguages: data.movie_details.spoken_languages.map(each => ({
            id: each.id,
            englishName: each.english_name,
          })),
          title: data.movie_details.title,
          voteAverage: data.movie_details.vote_average,
          voteCount: data.movie_details.vote_count,
        }
        setMovieDetails(moviedata)
        setdetailsError(false)
      } else {
        setdetailsError(true)
      }
    }

    movieDetailsAPIHandler()
  }, [id])

  // const movieDetailsAPIHandler = async () => {
  //   const jwtToken = Cookies.get('jwt_token')
  //   const {match} = props
  //   const {params} = match
  //   const {id} = params
  //   const url = `https://apis.ccbp.in/movies-app/movies/${id}`
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`,
  //     },
  //   }
  //   const response = await fetch(url, options)
  //   console.log(`response${response}`)
  //   const data = await response.json()
  //   console.log(data)
  //   if (response.ok) {
  //     const updatedDate = data.movie_details.similar_movies.map(each => ({
  //       backdropPath: each.backdrop_path,
  //       id: each.id,
  //       overview: each.overview,
  //       posterPath: each.poster_path,
  //       title: each.title,
  //     }))

  //     setSimilarMovies(updatedDate)
  //     setMovieDetailsLoading(false)
  //     const moviedata = {
  //       adult: data.movie_details.adult,
  //       backdropPath: data.movie_details.backdropPath,
  //       budget: data.movie_details.budget,
  //       genres: data.movie_details.genres.map(each => ({
  //         id: each.id,
  //         name: each.name,
  //       })),
  //       id: data.movie_details.id,
  //       overview: data.movie_details.overview,
  //       posterPath: data.movie_details.poster_path,
  //       releaseDate: data.movie_details.release_date,
  //       runtime: data.movie_details.runtime,
  //       spokenLanguages: data.movie_details.spoken_languages.map(each => ({
  //         id: each.id,
  //         englishName: each.english_name,
  //       })),
  //       title: data.movie_details.title,
  //       voteAverage: data.movie_details.vote_average,
  //       voteCount: data.movie_details.vote_count,
  //     }
  //     setMovieDetails(moviedata)
  //   }
  //   console.log(`data${data}`)
  // }

  // useEffect(() => {
  //   console.log('Fetching movie details...')
  //   movieDetailsAPIHandler()
  // }, [])

  const screenWidth = window.innerWidth

  const bannerStyle = {
    backgroundImage: `url(${movieDetails.posterPath}), radial-gradient(rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.021))`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: '100%',
    overflow: 'auto',
    height: screenWidth <= 768 ? '50vh' : '90vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
  const apiFailure = () => (
    <div className="apiFailure">
      <img
        src="https://res.cloudinary.com/df7wnybwg/image/upload/v1728365736/MoviesApp/Background-Complete_uxsukd.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={useEffect}>
        Try Again
      </button>
    </div>
  )
  const movieDetailsView = () =>
    detailsError ? (
      apiFailure()
    ) : (
      <div>
        <div style={bannerStyle}>
          <Header />
          <div className="banner-description">
            <h1 className="white">{movieDetails.title}</h1>
            <div className="flex">
              <p className="white mr-3">
                {convertMinutesToHoursMinutes(movieDetails.runtime)}
              </p>

              {movieDetails.adult ? (
                <p className="white mr-3">A</p>
              ) : (
                <p className="white adult mr-3">U/A</p>
              )}

              <p className="white mr-3">
                {getYear(new Date(movieDetails.releaseDate))}
              </p>
            </div>
            <p>{movieDetails.overview}</p>
            <button type="button">Play</button>
          </div>
        </div>
        <div className="bg-black">
          <div className="flex details">
            <div className="flex-col mr-3">
              <ul>
                <h1 className="grey-color">Genres</h1>
                {movieDetails.genres &&
                  movieDetails.genres.map(each => (
                    <li key={each.id}>
                      <p className="white">{each.name}</p>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="flex-col mr-3">
              <ul>
                <h1 className="grey-color">Audio Available</h1>
                {movieDetails.spokenLanguages &&
                  movieDetails.spokenLanguages.map(each => (
                    <li key={each.id}>
                      <p className="white">{each.englishName}</p>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="flex-col mr-3">
              <h1 className="grey-color">Rating Count</h1>
              <p className="white">{movieDetails.voteCount}</p>
              <h1 className="grey-color">Rating Average</h1>
              <p className="white">{movieDetails.voteAverage}</p>
            </div>
            <div className="flex-col mr-3">
              <h1 className="grey-color">Budget</h1>
              <p className="white">{movieDetails.budget}</p>
              <h1 className="grey-color">Release Date</h1>
              <p className="white">{movieDetails.releaseDate}</p>
            </div>
          </div>
          <div className="similarMovies">
            <h1 className="white ml-5">More Like This</h1>
            <div className="similarMovieView">
              {similarMovies.map(each => (
                <div>
                  <Link to={`/movies/${each.id}`} key={each.id}>
                    <img
                      src={each.posterPath}
                      className="similarMovie"
                      alt={each.title}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  return <>{movieDetailsLoading ? isLoading() : movieDetailsView()}</>
}
export default MovieDetails
