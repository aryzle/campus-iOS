/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

var UNC_LAT = 35.906853;
var UNC_LON = -79.047922;
var R = 6371000;  // Earth's mean radius in metres

class campus extends Component {
  constructor() {
    super();
    this.state = {
      initialPosition: 'uknown',
      onCampus: false,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        {navigator.geolocation.getCurrentPosition(
          (position) => {
            let initialPosition = JSON.stringify(position);
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let distance = R*Math.sqrt(Math.pow((lat - UNC_LAT)*(Math.PI/180), 2) +
                                       Math.pow((lon - UNC_LON)*(Math.PI/180), 2));
            console.log(distance);
            let onCampus = distance < 1200;
            console.log(onCampus);
            this.setState({initialPosition});
            this.setState({onCampus});
          }
        )}
        <User name="Arya Seghatoleslami" onCampus={this.state.onCampus} />
      </View>
    );
  }
}

class User extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if( this.props.onCampus ) {
      return (
        <Text>
        {this.props.name} yup
        </Text>
      );
    } else {
      return (
        <Text>
        {this.props.name} nope
        </Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('campus', () => campus);
