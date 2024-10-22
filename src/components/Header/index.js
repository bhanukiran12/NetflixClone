import {useState} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

const Header = props => {
  const [shownavbar, setshownavbar] = useState(false)

  const {styles} = props
  const {bgcolor} = styles || {}
  const {searchBar} = styles || {}
  const {searchBarHandler} = styles || {}

  const hamburgerHandler = () => (
    <>
      <div className="mobile-navbar">
        <div className="mobile-nav-items">
          <ul>
            <li>
              <Link to="/">
                <p className="nav-item">Home</p>
              </Link>
            </li>
            <li>
              <Link to="/popular">
                <p className="nav-item">Popular</p>
              </Link>
            </li>
            <li>
              <Link to="/account">
                <p className="nav-item">Account</p>
              </Link>
            </li>
          </ul>
        </div>
        <button
          className="hamburger-btn"
          type="button"
          onClick={() => setshownavbar(false)}
        >
          <img
            src="https://res.cloudinary.com/df7wnybwg/image/upload/v1728278205/MoviesApp/cross_ol94zt.png"
            className="closs"
            alt="closs"
          />
        </button>
      </div>
    </>
  )

  const screenWidth = window.innerWidth
  const headerContainerStyle = {
    padding: screenWidth <= 768 ? '20px 30px 0px 30px' : '20px 60px 0px 60px',
    backgroundColor: bgcolor ? 'black' : 'rgba(255, 255, 255, 0.066)',
    position: 'sticky',
    top: '0',
    width: '100%',
  }

  const mobileHeaderStyle = {
    display: screenWidth <= 768 ? 'flex' : 'none',
    flexDirection: searchBar ? 'column' : 'row',
    justifyContent: searchBar ? 'flex-start' : 'center',
    alignItems: 'center',
  }

  const mobileSearchStyle = {
    alignSelf: searchBar ? 'center' : 'auto',
    marginTop: searchBar ? '20px' : '0',
  }

  return (
    <div style={headerContainerStyle}>
      <div className="header desktop-header desktopHeaderStyle">
        <nav className="nav-items">
          <ul>
            <li>
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/df7wnybwg/image/upload/v1728136273/MoviesApp/movie_icon_afcdmy.png"
                  className="title-logo"
                  alt="website logo"
                />
              </Link>
            </li>
            <li>
              <Link to="/">
                <p className="nav-item desktop">Home</p>
              </Link>
            </li>
            <li>
              <Link to="/popular">
                <p className="nav-item desktop">Popular</p>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="nav-items">
          {searchBar ? (
            searchBarHandler()
          ) : (
            <>
              <Link to="/search">
                <button
                  className="search-btn"
                  type="button"
                  data-testid="searchButton"
                >
                  <HiOutlineSearch
                    size={20}
                    color="white"
                    data-testid="searchButton"
                  />
                </button>
              </Link>
              <button
                className="hamburger-btn"
                type="button"
                onClick={() => setshownavbar(true)}
              >
                <img
                  src="https://res.cloudinary.com/df7wnybwg/image/upload/v1728216781/MoviesApp/hamburger_boyujw.png"
                  className="hamburger-icon"
                  alt="hamburger-icon"
                />
              </button>
            </>
          )}
          <Link to="/account">
            <img
              src="https://res.cloudinary.com/df7wnybwg/image/upload/v1728193515/MoviesApp/Avatar_zsfxf8.png"
              className="avatar"
              alt="profile"
            />
          </Link>
        </div>
      </div>

      {shownavbar ? hamburgerHandler() : null}
    </div>
  )
}

export default Header
