import {useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const {history} = props

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, seterrorMsg] = useState('')

  const usernameHandler = event => {
    setUsername(event.target.value)
  }

  const passwordHandler = event => {
    setPassword(event.target.value)
  }
  const successHandler = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }
  const onSubmitHandler = async event => {
    event.preventDefault()
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      successHandler(jwtToken)
    } else {
      seterrorMsg(`* ${data.error_msg}`)
    }
  }

  return (
    <div className='login-container'>
      <img
        src='https://res.cloudinary.com/df7wnybwg/image/upload/v1728136273/MoviesApp/movie_icon_afcdmy.png'
        className='heading'
      />
      <div className='login-card'>
        <h1 className='login-text'> Login </h1>
        <form onSubmit={onSubmitHandler}>
          <div className='label-input'>
            <label htmlFor='username'>USERNAME</label>
            <input id='username' type='text' onChange={usernameHandler} />
          </div>
          <div className='label-input'>
            <label htmlFor='password'>PASSWORD</label>
            <input id='password' type='password' onChange={passwordHandler} />
          </div>
          <button type='submit' className='login-btn'>
            Login
          </button>
          <p className='errorMsg'>{errorMsg}</p>
        </form>
      </div>
    </div>
  )
}
export default Login
