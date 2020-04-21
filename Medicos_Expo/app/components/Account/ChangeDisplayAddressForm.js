import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
//import * as firebase from "firebase";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ChangeDisplayAddressForm(props) {
  const {
    displayAddress,
    setIsVisibleModal,
    setReloadData,
    toastRef,
    user2,
  } = props;
  const [newDisplayAddress, setNewDisplayAddress] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateDisplayAddress = () => {
    setError(null);
    if (!newDisplayAddress) {
      setError("La direccion de usuario no ha cambiado.");
    } else {
      setIsLoading(true);
      const update = {
        displayAddress: newDisplayAddress,
      };
      // firebase
      //   .auth()
      //   .currentUser.updateDisplayAddress(update)
      //   .then(() => {
      db.collection("usuarios")
        .doc(user2)
        .update({ address: newDisplayAddress })
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          toastRef.current.show("Direccion Actualizada correctamente");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar la direccion.");
          setIsLoading(false);
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Direccion"
        containerStyle={styles.input}
        defaultValue={displayAddress && displayAddress}
        onChange={(e) => setNewDisplayAddress(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "compass-outline",
          color: "#c2c2c2",
        }}
        errorMessage={error}
      />
      <Button
        title="Cabiar Direccion"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateDisplayAddress}
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
