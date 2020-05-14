import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Linking,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,

} from 'react-native';
export default class OCRView extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      data: props.navigation.state.params.otherParam
    }
  }
  render() {
    return <View style={styles.container}>

      <Text style={styles.text}>
        Your VIN is:
      </Text>
      {this.list()}</View>
  }
  list = () => {
    return this.state.data.map(element => {
      console.log('element vad' + JSON.stringify(element))
      return (
        <View style={{ margin: 10 }}>
          <Text>{element.text}</Text>
        </View>
      );
    });
  };

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },

});
