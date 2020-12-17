const mqtt = require('mqtt');
const Emmiter = require('events');

const connectionOptions = require('../../configs/connectionOptions');

class Client extends Emmiter {
    constructor() {
        super();

        this.client = null;
        this.clientId = connectionOptions.clientId;
        this.connectionOptions = connectionOptions;
        this.APIversion = '/v1.0/';
    }

    connect() {
        try {
            this.client = mqtt.connect(connectionOptions);

            const allClientTopics = this.APIversion + '+/#';
            this.client.subscribe(allClientTopics);

            this.client.once('connect', this.onConnect.bind(this));
            this.client.on('message', this.onMessage.bind(this));
            this.client.on('error', this.onError.bind(this));
        } catch (error) {
            this.emit('ConnectionFailed', err);
        }
    }

    onConnect() {
        console.log('Connected');
    }

    onMessage(topic, message) {
        message = message.toString();
        this.emit(topic, message, topic);
    }

    onError(msg) {
        console.log('Error', msg);
        // this.emit('error', msg);
    }

    getSensors() {
        return new Promise(async (resolve, reject) => {
            try {
                const publishTopic = this.APIversion + this.clientId + '/inventory';
                const subscribeTopic = publishTopic + '/inbox';
                const errorTopic = publishTopic + '/error/inbox';

                const message = '{}';

                let sensors = [];

                this.client.publish(publishTopic, message);
                this.once(subscribeTopic, (msg) => {
                    this.client.end();
                    sensors = JSON.parse(msg);
                    resolve(sensors);
                });
                if (errorTopic) {
                    this.once(errorTopic, (error) => {
                        reject('Error getting sensor list');
                    });
                }
            } catch (error) {
                console.error('Sensor List Failed: ', error.message);
                this.emit('SensorListFailed', error)
            }
        });
    }

    getData(sensorId, onMessage) {
        try {
            const subscribeTopic = '/v1.0/' + this.clientId + '/sensor/' + sensorId + '/livedata';

            this.on(subscribeTopic, (message) => {
                onMessage(sensorId, message);
            });
        } catch (error) {
            console.error('Live Data Failed: ', error.message);
            this.emit('LiveDataFailed', error)
        }
    }

    subscribe(sensorId, callback) {
        try {
            const subscribeTopic = '/v1.0/' + this.clientId + '/sensor/' + sensorId + '/livedata';

            //TODO change this. Should unsubscribe on disconnect so that we don't have duplicate listeners
            if (!this._events[subscribeTopic]) {
                this.on(subscribeTopic, (message) => {
                    callback(message);
                });
            }
        } catch (error) {
            console.error('Live Data Failed: ', error.message);
            this.emit('LiveDataFailed', error)
        }
    }
}

module.exports = Client;