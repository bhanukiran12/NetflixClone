import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import Account from './components/Account'
import SearchRoute from './components/SearchRoute'
import MovieDetails from './components/MovieDetails'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route path="/login" component={Login} />

    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute path="/popular" component={Popular} />
    <ProtectedRoute path="/account" component={Account} />
    <ProtectedRoute path="/search" component={SearchRoute} />
    <ProtectedRoute path="/movies/:id" component={MovieDetails} />
    <ProtectedRoute path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
