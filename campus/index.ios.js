/**
 * Campus iOS app
 * https://github.com/aryzle/campus-iOS
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  ListView,
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
      lastPosition: 'unknown',
      onCampus: false,
      location: "UNC",
    }
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state.users = ds.cloneWithRows([{ name: "Lauren O'Connor",
                                           onCampus: true },
                                         { name: "Samantha Smith",
                                           onCampus: false },
                                         { name: "Thomas Yang",
                                           onCampus: true }
                                        ])
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition( (position) => {
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
    });
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar location={this.state.location}/>
        <View style={styles.content}>
          <ListView
            dataSource={this.state.users}
            renderRow={this._renderRow}
          />
        </View>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }

  _renderRow (rowData) {
    return (
      <View style={styles.row}>
        <Text style={styles.username}>{rowData.name}</Text>
        <Text style={styles.onCampus}>{rowData.onCampus? "yup" : "nope"}</Text>
      </View>
    )     
  }
}

class Toolbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let style = this.props.location === "RPI" ? styles.RPItoolbar :
                                                styles.UNCtoolbar;
    return (
      <View style={style}>
        <Text style={styles.toolbarTitle}>Campüs</Text>
      </View>
    )
  }
}

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={styles.user}>
          {this.props.name + (this.props.onCampus? " yup" : " nope")}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  UNCtoolbar: {
    backgroundColor:'#7BAFD4',
    paddingTop: 30,
    paddingBottom: 10,
  },
  RPItoolbar: {
    backgroundColor:'#D80502',
    paddingTop: 30,
    paddingBottom: 10,
  },
  toolbarTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  username: {
    textAlign: 'left',
    flex: 1,
  },
  onCampus: {
    width: 50,
    textAlign:'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('campus', () => campus);
