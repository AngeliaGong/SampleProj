import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  View,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import spinner from './img/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    var {navigate} = this.props.navigation;

    if (this.state.isLoading) return;

    this.setState({ isLoading: true });
    Animated.timing(
      this.buttonAnimated,
      {
        toValue: 1,
        duration: 200,
        easing: Easing.linear
      }
    ).start();

    setTimeout(() => {
      this._onGrow();
    }, 2000);

    setTimeout(() => {
      this.setState({ isLoading: false });
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);

    
    this.props.onPress();

    //navigate('Home');
  }

  _onGrow() {
    Animated.timing(
      this.growAnimated,
      {
        toValue: 1,
        duration: 200,
        easing: Easing.linear
      }
    ).start();
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN]
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity style={styles.button}
                            onPress={this._onPress}
                            activeOpacity={1} >
            {this.state.isLoading ?
              <Image source={spinner} style={styles.image} />
              :
              <Text style={styles.text}>LOGIN</Text>
            }
          </TouchableOpacity>
          <Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#167B9A',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#167B9A',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#167B9A',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});
