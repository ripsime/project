import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Commons
import Header from "./common/Header";
import Nav from "./common/Nav";
import PageNotFound from "./common/PageNotFound";
// Containers
import Home from "./home/Home";
import Dashboard from "./dashboard/Dashboard";

class App extends Component {
	render() {
		return (
			<Router>
				<div className="wrapper">
					{/* <Header /> */}
					<div className="main">
						<Nav />
						<div className="content">
							<Switch>
								<Route exact path="/" component={Home} />
								<Route path="/home" component={Home} />
								<Route
									path="/dashboard"
									component={Dashboard}
								/>
								<Route component={PageNotFound} />
							</Switch>
						</div>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
