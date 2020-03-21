import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";
//Vista de animacion de cargando
export default function Loading(props) {
  const { isVisible, text } = props;
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.Overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#309ccb" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  Overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderColor: "#309ccb",
    borderWidth: 2,
    borderRadius: 10
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#309ccb",
    textTransform: "uppercase",
    marginTop: 10
  }
});
