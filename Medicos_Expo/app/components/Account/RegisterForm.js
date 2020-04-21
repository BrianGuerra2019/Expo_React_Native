import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
//import * as firebase from "firebase";
import { withNavigation } from "react-navigation";
import Loading from "../Loading";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

// import { firebaseApp } from "../../utils/Firebase";
// import firebase from "firebase/app";
// import "firebase/firestore";
// const db = firebase.firestore(firebaseApp);

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

//import { ReactNativeFirebase } from '@react-native-firebase/app';
//import { firebase } from '@react-native-firebase/auth';
//import auth from '@react-native-firebase/auth';
//import firebase from '@react-native-firebase/app';
//import '@react-native-firebase/auth';

//Pagina de los campos para el registro de usuarios
function RegisterForm(props) {
  const { toastRef, navigation } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [hideRepeatPassword, setHideRepeatPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const register = async () => {
    setIsVisibleLoading(true);
    if (!email || !password || !repeatPassword) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("El email no es correcto");
      } else {
        if (password !== repeatPassword) {
          toastRef.current.show("Contrasenas no coinsiden");
        } else {
          //console.log("entro");
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
              //console.log("cuenta");
              //console.log(user);
              //const { ID } = user.uid;
              // console.log("ID");
              // console.log(ID);
              db.collection("usuarios")
                .doc(user.user.uid)
                .set({
                  idUsuario: user.user.uid,
                  name: "",
                  lastname: "",
                  motherlastname: "",
                  avatarUser: "",
                  email: email,
                  password: password,
                  address: "",
                  telephone: "",
                  cellular: "",
                  dateofbirth: "",
                  postalcode: "",
                  city: "",
                  state: "",
                  curp: "",
                  gender: "",
                  type: "",
                  package: "",
                  createAt: new Date(),
                })
                .then(() => {
                  console.log("TODO OK");
                  navigation.navigate("MyAccount");
                })
                .catch((error) => {
                  console.log(error);
                });
              //navigation.navigate("MyAccount");
            })
            .catch((err) => {
              toastRef.current.show(
                "Error al crear la cuenta, intentalo mas tarde",
                500
              );
              console.log(err);
            });
        }
      }
    }
    setIsVisibleLoading(false);
  };

  return (
    <View style={styles.forContainer} behavior="padding" enable>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contrasena"
        pasword={true}
        secureTextEntry={hidePassword}
        containerStyle={styles.inputForm}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setPassword(!hidePassword)}
          />
        }
      />
      <Input
        placeholder="Repetir Contrasena"
        pasword={true}
        secureTextEntry={hideRepeatPassword}
        containerStyle={styles.inputForm}
        onChange={(e) => setRepeatPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hideRepeatPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHideRepeatPassword(!hideRepeatPassword)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={register}
      />
      <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
    </View>
  );
}

export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  iconRight: {
    color: "#c1c1c1",
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#3377FF",
  },
});
