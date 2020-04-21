import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
//import * as firebase from "firebase";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ChangeDisplayNameForm(props) {
  const {
    displayName,
    setIsVisibleModal,
    setReloadData,
    toastRef,
    user2,
  } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //console.log(props);
  const updateDisplayName = () => {
    setError(null);
    if (!newDisplayName) {
      setError("El nobre de usuario no ha cambiado.");
    } else {
      setIsLoading(true);
      const update = {
        displayName: newDisplayName,
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          //console.log("entra a tabla usuario");
          db.collection("usuarios")
            .doc(user2)
            .update({ name: newDisplayName })
            .then(() => {
              console.log("TODO OK");
            })
            .catch((error) => {
              console.log(error);
            });
          setIsLoading(false);
          setReloadData(true);
          toastRef.current.show("Nombre Actualizado correctamente");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar el nombre.");
          setIsLoading(false);
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre"
        containerStyle={styles.input}
        defaultValue={displayName && displayName}
        onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        errorMessage={error}
      />
      <Button
        title="Cabiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateDisplayName}
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
