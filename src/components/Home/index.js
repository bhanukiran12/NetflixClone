import {useEffect, useState, useCallback} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Home = () => {
  const [trendingMovies, settrendingMovies] = useState([])
  const [trendingLoading, settrendingLoading] = useState(true)
  const [trendingError, setTrendingError] = useState(false)

  const [originalsMovies, setoriginalsMovies] = useState([])
  const [originalsLoading, setoriginalsLoading] = useState(true)
  const [originalsError, setOrginalsError] = useState(false)

  // const [topRatedData, setTopRatedData] = useState([])
  // const [bannerLoading, setBannerLoading] = useState(true)
  // const [topratedError, setTopRatedError] = useState(false)

  const [banner, setBanner] = useState({
    bannerImage: '',
    title: '',
    description: '',
    id: '',
  })

  const isLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  const randomBanner = useCallback(async () => {
    if (originalsMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * originalsMovies.length)
      const selectedMovie = originalsMovies[randomIndex]

      if (selectedMovie) {
        const bannerImage = selectedMovie.backdropPath
        const {title} = selectedMovie
        const description = selectedMovie.overview
        const {id} = selectedMovie

        setBanner({
          bannerImage,
          title,
          description,
          id,
        })
      }
    }
  }, [originalsMovies])

  const trendingAPIHandler = async () => {
    settrendingLoading(true)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
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

      settrendingMovies(updatedDate)
      settrendingLoading(false)
      setTrendingError(false)
    } else {
      setTrendingError(true)
      settrendingLoading(false)
    }
  }

  const orginalsAPIHandler = async () => {
    setoriginalsLoading(true)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
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

      setoriginalsMovies(updatedDate)
      setoriginalsLoading(false)
    } else {
      setOrginalsError(true)
      setoriginalsLoading(false)
    }
  }

  // const getTopRatedData = async () => {
  //   setBannerLoading(true)
  //   const jwtToken = Cookies.get('jwt_token')
  //   const url = 'https://apis.ccbp.in/movies-app/top-rated-movies'
  //   const options = {
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`,
  //     },
  //     method: 'GET',
  //   }

  //   const response = await fetch(url, options)
  //   console.log(response)
  //   if (response.ok === true) {
  //     const fetchedData = await response.json()
  //     console.log(fetchedData)
  //     const updatedData = fetchedData.results.map(eachMovie => ({
  //       title: eachMovie.title,
  //       backdropPath: eachMovie.backdrop_path,
  //       overview: eachMovie.overview,
  //       id: eachMovie.id,
  //       posterUrl: eachMovie.poster_path,
  //     }))

  //     setTopRatedData(updatedData)
  //     setBannerLoading(false)
  //     setTopRatedError(false)
  //   }
  //   if (response.status === 401) {
  //     setTopRatedError(true)
  //   }
  // }

  useEffect(() => {
    trendingAPIHandler()
    orginalsAPIHandler()
  }, [])
  // useEffect(() => {
  //   getTopRatedData()
  // }, [])
  useEffect(() => {
    randomBanner()
  }, [randomBanner])

  const screenWidth = window.innerWidth
  const bannerStyle = {
    backgroundImage: `url(${banner.bannerImage})`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: screenWidth <= 768 ? '50vh' : '90vh',
    overflow: 'auto',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  const failureBannerView = () => (
    <div className="failureView">
      <img
        src="https://res.cloudinary.com/df7wnybwg/image/upload/v1728367482/MoviesApp/Icon_lxaqmi.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={orginalsAPIHandler}>
        Try Again
      </button>
    </div>
  )

  const bannerSection = () =>
    originalsError ? (
      failureBannerView()
    ) : (
      <div style={bannerStyle}>
        <Header />
        {originalsError ? (
          isLoading()
        ) : (
          <div className="banner-description">
            <h1>{banner.title}</h1>
            <p>{banner.description}</p>
            <Link to={`movies/${banner.id}`}>
              <button type="button">Play</button>
            </Link>
          </div>
        )}
      </div>
    )

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const failuretrendingView = () => (
    <div className="failureView">
      <img
        src="https://res.cloudinary.com/df7wnybwg/image/upload/v1728367482/MoviesApp/Icon_lxaqmi.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={trendingAPIHandler}>
        Try Again
      </button>
    </div>
  )

  const failureoriginalsView = () => (
    <div className="failureView">
      <img
        src="https://res.cloudinary.com/df7wnybwg/image/upload/v1728367482/MoviesApp/Icon_lxaqmi.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={orginalsAPIHandler}>
        Try Again
      </button>
    </div>
  )

  const trendingSection = () => (
    <>
      {trendingError ? (
        failuretrendingView()
      ) : (
        <div className="trending-container">
          <h1 className="white">Trending Now</h1>
          <Slider {...settings}>
            {trendingMovies.map(each => {
              const {id, posterPath, title} = each
              return (
                <div className="slick-item" key={id}>
                  <Link to={`/movies/${id}`}>
                    <img
                      className="trending-image"
                      src={posterPath}
                      alt={title}
                    />
                  </Link>
                </div>
              )
            })}
          </Slider>
        </div>
      )}
    </>
  )
  const originalsSection = () => (
    <>
      {originalsError ? (
        failureoriginalsView()
      ) : (
        <div className="originals-container">
          <h1 className="white">Originals</h1>
          <Slider {...settings}>
            {originalsMovies.map(each => {
              const {id, posterPath, title} = each
              return (
                <div className="slick-item" key={id}>
                  <Link to={`/movies/${id}`}>
                    <img
                      className="originals-image"
                      src={posterPath}
                      alt={title}
                    />
                  </Link>
                </div>
              )
            })}
          </Slider>
        </div>
      )}
    </>
  )
  const homeView = () => (
    <div className="homeView">
      {trendingLoading ? isLoading() : trendingSection()}
      {originalsLoading ? isLoading() : originalsSection()}
    </div>
  )

  return (
    <div className="home-container">
      {bannerSection()}
      {homeView()}
      <Footer />
    </div>
  )
}
export default Home
