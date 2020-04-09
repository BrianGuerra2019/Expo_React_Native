import React from "react";
import { SocialIcon } from "react-native-elements";
import { StyleSheet, Text, View, Image, Button } from "react-native";

export default function LoginGoogle() {
  const login = () => {
    console.log("Iniciando sesion con Google");
  };

  return (
    <SocialIcon
      title="Iniciar sesion con Google"
      button
      type="google"
      onPress={login}
    />
  );
}
