import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import './App.css'

const App = () => (
  <Switch>
    <Route path="/login" component={Login} />

    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute path="/popular" component={Popular} />
  </Switch>
)

export default App
