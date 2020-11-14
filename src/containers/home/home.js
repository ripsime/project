import { render } from 'less';
import React, { Component } from 'react';
import LineChart from '../../../components/LineChart';

import './home.less';
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.getData()
        };
    }

    componentDidMount() {
        window.setInterval(() => {
            this.setState({
                data: this.getData()
            })
        }, 5000)
    }

    // TODO : This is for dummy data
    getRandomDateArray = (numItems) => {
        // Create random array of objects (with date)
        let data = [];
        let baseTime = new Date('2018-05-01T00:00:00').getTime();
        let dayMs = 24 * 60 * 60 * 1000;
        for (var i = 0; i < numItems; i++) {
            data.push({
                time: new Date(baseTime + i * dayMs),
                value: Math.round(20 + 80 * Math.random())
            });
        }
        return data;
    }

    getData = () => {
        let data = [];

        data.push({
            title: 'Visits',
            data: this.getRandomDateArray(150)
        });

        return data;
    }

    render() {
        return (
            <>
                <div>Home</div>
                <LineChart
                    data={this.state.data[0].data}
                    title={this.state.data[0].title}
                    color="#3E517A"
                />
            </>
        )
    }

}

export default Home