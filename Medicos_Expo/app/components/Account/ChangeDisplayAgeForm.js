import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
//import * as firebase from "firebase";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ChangeDisplayAgeForm(props) {
  const {
    displayAge,
    setIsVisibleModal,
    setReloadData,
    toastRef,
    user2,
  } = props;
  const [newDisplayAge, setNewDisplayAge] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateDisplayAge = () => {
    setError(null);
    if (!newDisplayAge) {
      setError("La Fecha de naciineto de usuario no ha cambiado.");
    } else {
      setIsLoading(true);
      const update = {
        displayAge: newDisplayAge,
      };
      // firebase
      //   .auth()
      //   .currentUser.updateDisplayAge(update)
      //   .then(() => {
      db.collection("usuarios")
        .doc(user2)
        .update({ dateofbirth: newDisplayAge })
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          toastRef.current.show("Fecha Actualizada correctamente");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar la fecha de nacimiento.");
          setIsLoading(false);
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Fecha de Nacimiento"
        containerStyle={styles.input}
        defaultValue={displayAge && displayAge}
        onChange={(e) => setNewDisplayAge(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "face",
          color: "#c2c2c2",
        }}
        errorMessage={error}
      />
      <Button
        title="Cabiar Fecha"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateDisplayAge}
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
