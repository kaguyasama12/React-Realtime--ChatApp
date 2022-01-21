import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/pages/Login.js';
import Create from './components/pages/Create.js';
import Chat from './components/pages/Chat.js';
import Find from './components//pages/Find.js';

function App() {
    return (
        <Router>
            <div>
             
                <Switch>
                    <Route exact path="/" exact component={Login} /> 
                    <Route exact path="/create" exact component={Create} />
                    <Route exact path="/chat" exact component={Chat} />
                    <Route exact path="/find" exact component={Find} />
                    
                </Switch>
            </div>
            
        </Router>
    )
}

export default App;