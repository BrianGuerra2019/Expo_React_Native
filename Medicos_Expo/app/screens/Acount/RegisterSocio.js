import React, { useRef } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterFormSocio from "../../components/Account/RegisterFormSocio";
import Toast from "react-native-easy-toast";

export default function RegisterSocio() {
  const toastRef = useRef();

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/logo4.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.viewForm}>
        <RegisterFormSocio toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 200,
    marginTop: 20
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40
  }
});
