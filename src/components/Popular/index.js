import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {useEffect, useState} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Popular = () => {
  const [popularMovies, setpopularMovies] = useState([])
  const [popularLoading, setpopularLoading] = useState(true)
  useEffect(() => {
    popularAPIHandler()
  }, [])

  const isLoading = () => {
    return (
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    )
  }
  const popularAPIHandler = async () => {
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
    }
  }
  console.log(popularMovies)
  const styles = {
    bgcolor: true,
  }
  return (
    <>
      <Header styles={styles} />{' '}
      {popularLoading ? (
        isLoading()
      ) : (
        <div>
          <div className="popular">
            <ul>
              {popularMovies.map(each => (
                <li>
                  <img src={each.backdropPath} className="popular-image" />
                </li>
              ))}
            </ul>
           
          </div>
        </div>
      )}
       <Footer />
    </>
  )
}

export default Popular
