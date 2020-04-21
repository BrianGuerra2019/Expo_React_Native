import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
//import * as firebase from "firebase";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ChangeCurpForm(props) {
  const { curp, setIsVisibleModal, setReloadData, toastRef, user2 } = props;
  const [newCurp, setNewCurp] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateCurp = () => {
    setError(null);
    if (!newCurp) {
      setError("La curp de usuario no ha cambiado.");
    } else {
      setIsLoading(true);
      const update = {
        curp: newCurp,
      };
      // firebase
      //   .auth()
      //   .currentUser.updateCurp(update)
      //   .then(() => {
      db.collection("usuarios")
        .doc(user2)
        .update({ curp: newCurp })
        .then(() => {
          console.log("TODO OK");
          setIsLoading(false);
          setReloadData(true);
          toastRef.current.show("Curp Actualizado correctamente");
          setIsVisibleModal(false);
        })
        .catch((error) => {
          console.log(error);
          setError("Error al actualizar la curp.");
          setIsLoading(false);
        });
      // setIsLoading(false);
      // setReloadData(true);
      // toastRef.current.show("Curp Actualizado correctamente");
      // setIsVisibleModal(false);
      // })
      // .catch(() => {
      //   setError("Error al actualizar la curp.");
      //   setIsLoading(false);
      // });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Curp"
        containerStyle={styles.input}
        defaultValue={curp && curp}
        onChange={(e) => setNewCurp(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "format-list-numbered",
          color: "#c2c2c2",
        }}
        errorMessage={error}
      />
      <Button
        title="Cabiar Curp"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateCurp}
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
