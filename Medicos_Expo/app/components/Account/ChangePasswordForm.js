import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
//import * as firebase from "firebase";
import { reauthenticate } from "../../utils/Api";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ChangePasswordForm(props) {
  const { setIsVisibleModal, toastRed, user2 } = props;
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideNewPasswordRepeat, setHideNewPasswordRepeat] = useState(true);
  const updatePassword = () => {
    setError({});
    if (!password || !newPassword || !newPasswordRepeat) {
      let objError = {};
      !password && (objError.password = "No puede estar vacio.");
      !newPassword && (objError.newPassword = "No puede estar vacio.");
      !newPasswordRepeat &&
        (objError.newPasswordRepeat = "No puede estar vacio");
      setError(objError);
    } else {
      if (newPassword !== newPasswordRepeat) {
        setError({
          newPassword: "Las nuevas contrasenas tienen que ser iguales.",
          newPasswordRepeat: "Las nuevas contrasenas tienen que ser iguales.",
        });
      } else {
        setIsLoading(true);
        reauthenticate(password)
          .then(() => {
            firebase
              .auth()
              .currentUser.updatePassword(newPassword)
              .then(() => {
                db.collection("usuarios")
                  .doc(user2)
                  .update({ password: newPassword })
                  .then(() => {
                    setIsLoading(false);
                    setIsVisibleModal(false);
                    toastRed.current.show(
                      "Contrasena actualizada correctamente.",
                      3000
                    );
                    //firebase.auth().signOut();
                  })
                  .catch(() => {
                    setError("Error al actualizar la contrasena.");
                    setIsLoading(false);
                  });
              })
              .catch(() => {
                setError({ general: "Error al actualizar la contrasena." });
                setIsLoading(false);
              });
            setIsLoading(false);
            setIsVisibleModal(false);
            toastRed.current.show("Contrasena actualizada correctamente.");
          })
          .catch(() => {
            setError({ password: "La contrasena no es correcta." });
            setIsLoading(false);
          });
      }
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Contrasena actual"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={hidePassword}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hidePassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHidePassword(!hidePassword),
        }}
        errorMessage={error.password}
      />
      <Input
        placeholder="Nueva contrasena"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={hideNewPassword}
        onChange={(e) => setNewPassword(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hideNewPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHideNewPassword(!hideNewPassword),
        }}
        errorMessage={error.newPassword}
      />
      <Input
        placeholder="Repetir contrasena"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={hideNewPasswordRepeat}
        onChange={(e) => setNewPasswordRepeat(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hideNewPasswordRepeat ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHideNewPasswordRepeat(!hideNewPasswordRepeat),
        }}
        errorMessage={error.newPasswordRepeat}
      />
      <Button
        title="Cambiar contrasena"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updatePassword}
        loading={isLoading}
      />
      <Text>{error.general}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
    marginTop: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#3377FF",
  },
});
