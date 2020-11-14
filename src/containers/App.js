import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Commons
import Header from "./common/header/Header";
import Panel from './common/panel/panel';
import PageNotFound from "./common/PageNotFound";
import Home from "./home/home";

// Containers
import Dashboard from "./dashboard/Dashboard";

import './app.less';

class App extends Component {
	render() {
		return (
			<Fragment>
				<Header/>
				<Router>
					<div className="body">
						<Panel />
						<div className="main">
						<Switch>
                                <Route path='/' component={Home} exact/>
                                <Route path='/home' component={Home}/>
                                <Route path='/dashboard' component={Dashboard}/>
                                <Route component={PageNotFound}/>                        
                            </Switch>
						</div>
					</div>
				</Router>				
			</Fragment>
		);
	}
}

export default App;
