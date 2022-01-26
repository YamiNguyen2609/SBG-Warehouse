import mqtt from 'sp-react-native-mqtt';
import {MQTT} from '../helpers/Constants';

function Config(config) {
  return new Promise((reslove, reject) => {
    try {
      mqtt
        .createClient({
          ...MQTT,
          auth: true,
          ...config,
        })
        .then(function (client) {
          reslove(client);
        });
    } catch (error) {
      //-------------- Request API Failure
      reject(JSON.stringify(error));
    }
  });
}

export default {Config};
