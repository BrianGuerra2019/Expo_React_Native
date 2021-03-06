import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
//import * as firebase from "firebase";
import { reauthenticate } from "../../utils/Api";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ChangeEmailForm(props) {
  const { email, setIsVisibleModal, setReloadData, toastRef, user2 } = props;
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const updateEmail = () => {
    setError({});
    if (!newEmail || email === newEmail) {
      setError({ email: "El email no puede ser igual o estar vacio." });
    } else {
      setIsLoading(true);
      reauthenticate(password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateEmail(newEmail)
            .then(() => {
              db.collection("usuarios")
                .doc(user2)
                .update({ email: newEmail })
                .then(() => {
                  setIsLoading(false);
                  setReloadData(true);
                  toastRef.current.show("Email actualizado correctamente");
                  setIsVisibleModal(false);
                })
                .catch(() => {
                  setError("Error al actualizar el correo.");
                  setIsLoading(false);
                });

              // setIsLoading(false);
              // setReloadData(true);
              // toastRef.current.show("Email actualizado correctamente");
              // setIsVisibleModal(false);
            })
            .catch(() => {
              setError({ email: "Error al actualizar el email." });
              setIsLoading(false);
            });
        })
        .catch(() => {
          setError({ password: "La contrasena no es correcta" });
          setIsLoading(false);
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.input}
        defaultValue={email && email}
        onChange={(e) => setNewEmail(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
        errorMessage={error.email}
      />
      <Input
        placeholder="Contrasena"
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
      <Button
        title="Cambiar email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateEmail}
        loading={isLoading}
      />
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
