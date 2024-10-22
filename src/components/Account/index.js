import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = props => {
  const styles = {
    bgcolor: true,
  }
  const LogoutHandler = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <>
      <Header styles={styles} />
      <div className="profile">
        <h1>Account</h1>
        <hr className="line" />
        <div className="memebership">
          <p className="memebership-title">Memeber ship</p>
          <div>
            <p>rahul@gmail.com</p>
            <p className="password">Password:**********</p>
          </div>
        </div>
        <hr className="line" />
        <div className="memebership">
          <p className="memebership-title">Plan details</p>
          <div>
            <p>Premium</p>
            <button type="button">
              <p>Ultra HD</p>
            </button>
          </div>
        </div>
        <hr className="line" />
        <div className="logout">
          <button className="logout-btn" type="button" onClick={LogoutHandler}>
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Account
