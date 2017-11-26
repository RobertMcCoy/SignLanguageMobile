/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Camera from 'react-native-camera';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Button
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      currentTranslation: 'A B C'
    };
  }

  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('./assets/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('./assets/ic_camera_front_white.png');
    }

    return icon;
  }

  get helpIcon() {
    let icon = require('./assets/info.png');
    return icon;
  }

  clearTranslationText = () => {
    this.setState(
      {
        currentTranslation: ''
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          hidden
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => { }}
          onZoomChanged={() => { }}
          defaultTouchToFocus
          mirrorImage={false}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={this.switchType}
          >
            <Image
              source={this.typeIcon}
            />
            {(() => {
              const { back, front } = Camera.constants.Type;
              if (this.state.camera.type === front) {
                return <Text ref={'backCameraBtnText'} style={styles.frontBtnTxt}>Back</Text>
              } else {
                return <Text ref={'frontCameraBtnText'} style={styles.frontBtnTxt}>Front</Text>
              }
            })()}
          </TouchableOpacity>
          <Text ref={'translationTextRef'} style={styles.translationText}>Translation{"\n"}{this.state.currentTranslation}</Text>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={this.showHelp}
          >
            <Image
              source={this.helpIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <Button
            onPress={this.clearTranslationText}
            title="Clear Translation"
            color="red"
            accessibilityLabel="Clear Translations"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  translationText: {
    color: 'white',
    fontSize: 28,
    borderColor: 'black',
    borderWidth: 5,
    textAlign: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
  frontBtnTxt: {
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 50  
  },
  backBtnTxt: {
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 50
  },
});
