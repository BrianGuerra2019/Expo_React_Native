import React from "react";
import { StyleSheet, Text, View, MaskedViewIOS, Animated } from "react-native";

export default class App extends React.Component {
  state = {
    loadingProgress: new Animated.Value(0),
    animationDone: false
  };

  componentDidMount() {
    Animated.timing(this.state.loadingProgress, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
      delay: 400
    }).start(() => {
      this.setState({ animationDone: true });
    });
  }

  render() {
    const colorLayer = this.state.animationDone ? null : (
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#7F23D9" }]} />
    );
    const whiteLayer = this.state.animationDone ? null : (
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#FFF" }]} />
    );
    const imageScale = {
      transform: [
        {
          scale: this.state.loadingProgress.interpolate({
            inputRange: [0, 15, 100],
            outputRange: [0.1, 0.06, 16]
          })
        }
      ]
    };
    const opacity = {
      opacity: this.state.loadingProgress.interpolate({
        inputRange: [0, 25, 50],
        outputRange: [0, 0, 1],
        extrapolate: "clamp"
      })
    };

    return (
      <View style={{ flex: 1 }}>
        {colorLayer}
        <MaskedViewIOS
          style={{ flex: 1 }}
          maskElement={
            <View style={StyleSheet.centered}>
              <Animated.Image
                source={require("../assets/logo4.png")}
                style={[{ width: 1000 }, imageScale]}
                resizeMode="contain"
              />
            </View>
          }
        >
          <Animated.View style={[opacity, styles.centered]}>
            <Text>tu aplicacion</Text>
          </Animated.View>
        </MaskedViewIOS>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
