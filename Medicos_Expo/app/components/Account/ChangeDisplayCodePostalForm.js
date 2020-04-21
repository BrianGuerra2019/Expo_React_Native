import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
//import * as firebase from "firebase";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ChangeDisplayCodePostalForm(props) {
  const {
    displayCodePostal,
    setIsVisibleModal,
    setReloadData,
    toastRef,
    user2,
  } = props;
  const [newDisplayCodePostal, setNewDisplayCodePostal] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateDisplayCodePostal = () => {
    setError(null);
    if (!newDisplayCodePostal) {
      setError("El codigo postal de usuario no ha cambiado.");
    } else {
      setIsLoading(true);
      const update = {
        displayCodePostal: newDisplayCodePostal,
      };
      // firebase
      //   .auth()
      //   .currentUser.updateDisplayCodePostal(update)
      //   .then(() => {
      db.collection("usuarios")
        .doc(user2)
        .update({ postalcode: newDisplayCodePostal })
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          toastRef.current.show("Codigo postal Actualizado correctamente");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar el codigo postal.");
          setIsLoading(false);
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Codigo Postal"
        containerStyle={styles.input}
        defaultValue={displayCodePostal && displayCodePostal}
        onChange={(e) => setNewDisplayCodePostal(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "format-list-numbered",
          color: "#c2c2c2",
        }}
        errorMessage={error}
      />
      <Button
        title="Cabiar Fecha"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateDisplayCodePostal}
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
