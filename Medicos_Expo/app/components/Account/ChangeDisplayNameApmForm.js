import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
//import * as firebase from "firebase";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ChangeDisplayNameApmForm(props) {
  const {
    displayNameApm,
    setIsVisibleModal,
    setReloadData,
    toastRef,
    user2,
  } = props;
  const [newDisplayNameApm, setNewDisplayNameApm] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateDisplayNameApm = () => {
    setError(null);
    if (!newDisplayNameApm) {
      setError("El Apellodo materno de usuario no ha cambiado.");
    } else {
      setIsLoading(true);
      const update = {
        displayNameApm: newDisplayNameApm,
      };
      // firebase
      //   .auth()
      //   .currentUser.updateDisplayNameApm(update)
      //   .then(() => {
      db.collection("usuarios")
        .doc(user2)
        .update({ motherlastname: newDisplayNameApm })
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          toastRef.current.show("Apellido Materno Actualizado correctamente");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar el apellido.");
          setIsLoading(false);
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Apellido materno"
        containerStyle={styles.input}
        defaultValue={displayNameApm && displayNameApm}
        onChange={(e) => setNewDisplayNameApm(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        errorMessage={error}
      />
      <Button
        title="Cabiar Apellido"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateDisplayNameApm}
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
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#3377FF",
  },
});
