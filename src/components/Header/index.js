import {Link} from 'react-router-dom'
import styled from 'styled-components'
import './index.css'

const Header = props => {
  const {styles} = props
  const {bgcolor} = styles || {}

  return (
    <HeaderContainer bgcolor={bgcolor}>
      <div className="header desktop-header">
        <div className="nav-items">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/df7wnybwg/image/upload/v1728136273/MoviesApp/movie_icon_afcdmy.png"
              className="title-logo"
              alt="title-logo"
            />
          </Link>
          <Link to="/">
            <p className="nav-item">Home</p>
          </Link>
          <Link to="/popular">
            <p className="nav-item">Popular</p>
          </Link>
        </div>

        <div className="nav-items">
          <img
            src="https://res.cloudinary.com/df7wnybwg/image/upload/v1728193515/MoviesApp/Avatar_zsfxf8.png"
            className="avatar"
            alt="avatar"
          />
        </div>
      </div>

      <div className="header mobile-header">
        <div className="nav-items">
          <img
            src="https://res.cloudinary.com/df7wnybwg/image/upload/v1728136273/MoviesApp/movie_icon_afcdmy.png"
            className="title-logo"
            alt="title-logo"
          />
        </div>

        <div className="nav-items">
          <img
            src="https://res.cloudinary.com/df7wnybwg/image/upload/v1728216781/MoviesApp/hamburger_boyujw.png"
            className="hamburger-icon"
            alt="hamburger-icon"
          />
        </div>
      </div>
    </HeaderContainer>
  )
}

export default Header

export const HeaderContainer = styled.div`
  padding: 20px 60px 0px 60px;
  background-color: ${props =>
    props.bgcolor ? 'black' : 'rgba(255, 255, 255, 0.066)'};

  .desktop-header {
   display: flex;
  justify-content: space-between;
  }

  .mobile-header {
    display: none;
  }

  @media (max-width: 768px) {
    .desktop-header {
      display: none;
    }

    .mobile-header {
      display: block;
    }
  }
  
`
