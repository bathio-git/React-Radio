// Essayist Geoffrey O'Brien described this definition of the mixtape as "perhaps the most widely practiced {...} art form".

import './App.css'
import Home from './Home'
import Radio from './Radio'
import Mixes from './Mixes'
import Tape from './Tape'
import Profile from './Profile'
import SetProfile from './SetProfile'
import Signup from './Signup'
import Login from './Login'
import { AppContext } from "./AppContext"
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom'  
import { useContext, useEffect } from 'react'

function App() {

  let { currentUser } = useContext(AppContext)

  useEffect(() => {
      window.localStorage.setItem('currentUser', JSON.stringify(currentUser) );
  }, [currentUser]);

  return (
    <>
    < Router >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/stream/:id/" component={Radio} />
        <Route path="/mixes/" component={Mixes} />
        <Route path="/tape/:id" component={Tape} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/setProfile" component={SetProfile} />
        <Route path='/connect' component={Login} />
        <Route path='/1rstTime' component={Signup} />
      </Switch>
    </Router>
  </>
  )
}
export default App