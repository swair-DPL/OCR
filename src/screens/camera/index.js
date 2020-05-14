import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from 'react-native-text-detector';
export default class Camera extends Component {


  state = { zoomValue: 0, flashMode: RNCamera.Constants.FlashMode.off, loading: false };

  static navigationOptions = {
    header: null,
  };

  render() {

    return (
      <View style={styles.container}>

        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={this.state.flashMode}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          zoom={this.state.zoomValue}
        >
          {this.state.loading == true ? (
            <View styles={styles.spinnerStyle}>
              <ActivityIndicator size="large" animating={true} color='#rgb(242,184,81)' />
              <Text style={{ alignSelf: 'center', fontSize: 20, color: '#F2B851', textAlign: 'center' }}>
                Please Wait {'\n'} We're processing your VIN
              </Text>
            </View>
          ) : null}
          <TouchableOpacity style={{ marginBottom: 30, alignItems: 'center', marginTop: '60%' }} onPress={this.takePicture}>
            <Image
              style={{ width: 50, height: 50, }}
              source={require('../../../assets/images/shape.png')}
            />
          </TouchableOpacity>
        </RNCamera>
      </View>
    );
  }
  flash = () => {
    if (this.state.flashMode == RNCamera.Constants.FlashMode.off) {
      this.setState({ flashMode: RNCamera.Constants.FlashMode.torch });
    } else this.setState({ flashMode: RNCamera.Constants.FlashMode.off });
  };
  takePicture = async () => {
    try {
      this.setState({ loading: true })
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      const { uri } = await this.camera.takePictureAsync(options);
      const visionResp = await RNTextDetector.detectFromUri(uri);

      // debugger;
      this.props.navigation.navigate('OCRView', {
        otherParam: visionResp,
      })

    } catch (e) {
      console.warn(e);
    }
    this.setState({ loading: false })
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  icon: {
    flex: 0,
    color: 'white',
    fontSize: 40,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  spinnerStyle: {

    position: 'absolute',
    backgroundColor: 'red',
    justifyContent: 'center',
    marginBottom: '39%'
  },
});
