import React, { useState, useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import LoginForm from "../../components/Account/LoginForm";
import Toast from "react-native-easy-toast";
import LoginFacebook from "../../components/Account/LoginFacebook";
import LoginGoogle from "../../components/Account/LoginGoogle";
//pagina de loggin
export default function Login(props) {
  const { navigation, Paquete1, Paquete2, Paquete3 } = props;
  const toastRef = useRef();
  console.log(Paquete1);
  console.log(Paquete2);
  console.log(Paquete3);

  return (
    <ScrollView>
      <Image
        source={require("../../../assets/logo4.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
        <CreateAccount navigation={navigation}></CreateAccount>
      </View>
      <Divider style={styles.Divider} />
      <View style={styles.viewContainer}>
        <LoginFacebook toastRef={toastRef} navigation={navigation} />
        <LoginGoogle />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </ScrollView>
  );
}

function CreateAccount(props) {
  const { navigation } = props;

  return (
    <ScrollView>
      <Text style={styles.textRegister}>
        No tienes cuenta?{""}
        <Text
          style={styles.btnRegister}
          onPress={() => navigation.navigate("Register")}
        >
          Registrar
        </Text>
      </Text>
      <Text style={styles.textRegister}>
        Quieres ser socio?{""}
        <Text
          style={styles.btnRegister}
          onPress={() => navigation.navigate("RegisterSocio")}
        >
          Registrar
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegister: {
    color: "#3377FF",
    fontWeight: "bold",
  },
  Divider: {
    backgroundColor: "#3377FF",
    margin: 40,
  },
});
