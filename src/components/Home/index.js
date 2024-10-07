import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'
import {Banner} from './styledComponents'

import './index.css'

const Home = () => {
  const [trendingMovies, settrendingMovies] = useState([])
  const [trendingLoading, settrendingLoading] = useState(true)

  const [originalsMovies, setoriginalsMovies] = useState([])
  const [originalsLoading, setoriginalsLoading] = useState(true)

  const [banner, setBanner] = useState({
    bannerImage: '',
    title: '',
    description: '',
  })

  useEffect(() => {
    trendingAPIHandler()
    orginalsAPIHandler()
  }, [])
  useEffect(() => {
    randomBanner()
  }, [originalsMovies])
  const isLoading = () => {
    return (
      <div className='loader-container' testid='loader'>
        <Loader type='TailSpin' color='#D81F26' height={50} width={50} />
      </div>
    )
  }
  const randomBanner = async () => {
    if (originalsMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * originalsMovies.length)
      const selectedMovie = originalsMovies[randomIndex]

      if (selectedMovie) {
        const bannerImage = selectedMovie.backdropPath
        const title = selectedMovie.title
        const description = selectedMovie.overview

        setBanner({
          bannerImage,
          title,
          description,
        })
      }
    }
  }

  const trendingAPIHandler = async () => {
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
    }
  }

  const orginalsAPIHandler = async () => {
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
    }
  }

  const bannerSection = () => {
    return (
      <Banner bannerimage={banner.bannerImage}>
        <Header />
        {originalsLoading ? (
          isLoading()
        ) : (
          <>
            <div className='banner-description'>
              <h1>{banner.title}</h1>
              <p>{banner.description.slice(0, 100)}</p>
              <button>Play</button>
            </div>
            <img
              src='https://res.cloudinary.com/df7wnybwg/image/upload/v1728194498/MoviesApp/Rectangle_1451_bcxrua.png'
              className='gradient'
            />
          </>
        )}
      </Banner>
    )
  }
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

  const trendingSection = () => {
    return (
      <div className='trending-container'>
        <Slider {...settings}>
          {trendingMovies.map(each => {
            const {id, backdropPath} = each
            return (
              <div className='slick-item' key={id}>
                <img
                  className='trending-image'
                  src={backdropPath}
                  alt='trending-logo'
                />
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  const originalsSection = () => {
    return (
      <div className='originals-container'>
        <Slider {...settings}>
          {originalsMovies.map(each => {
            const {id, backdropPath} = each
            return (
              <div className='slick-item' key={id}>
                <img
                  className='originals-image'
                  src={backdropPath}
                  alt='trending-logo'
                />
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  const homeView = () => {
    return (
      <div className='homeView'>
        {trendingLoading ? isLoading() : trendingSection()}
        {originalsLoading ? isLoading() : originalsSection()}
      </div>
    )
  }

  return (
    <div className='home-container'>
      {bannerSection()}
      {homeView()}
      <Footer />
    </div>
  )
}
export default Home
