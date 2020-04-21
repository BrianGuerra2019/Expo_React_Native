import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
//import * as firebase from "firebase";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ChangeStateForm(props) {
  const { state, setIsVisibleModal, setReloadData, toastRef, user2 } = props;
  const [newState, setNewState] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateState = () => {
    setError(null);
    if (!newState) {
      setError("La ciudad de usuario no ha cambiado.");
    } else {
      setIsLoading(true);
      const update = {
        state: newState,
      };
      // firebase
      //   .auth()
      //   .currentUser.updateState(update)
      //   .then(() => {
      db.collection("usuarios")
        .doc(user2)
        .update({ state: newState })
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          toastRef.current.show("Estado Actualizado correctamente");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar el estado.");
          setIsLoading(false);
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Estado"
        containerStyle={styles.input}
        defaultValue={state && state}
        onChange={(e) => setNewState(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "compass-outline",
          color: "#c2c2c2",
        }}
        errorMessage={error}
      />
      <Button
        title="Cabiar Estado"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateState}
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
