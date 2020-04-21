import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
//import * as firebase from "firebase";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ChangeSubscriptionForm(props) {
  const {
    subscription,
    setIsVisibleModal,
    setReloadData,
    toastRef,
    user2,
  } = props;
  const [newSubscription, setNewSubscription] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateSubscription = () => {
    setError(null);
    if (!newSubscription) {
      setError("Su cambio de suscripcion no ha cambiado.");
    } else {
      setIsLoading(true);
      const update = {
        subscription: newSubscription,
      };
      // firebase
      //   .auth()
      //   .currentUser.updateSubscription(update)
      //   .then(() => {
      db.collection("usuarios")
        .doc(user2)
        .update({ package: newSubscription })
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          toastRef.current.show("Suscripcion Actualizada correctamente");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar la suscripcion.");
          setIsLoading(false);
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Suscripcion"
        containerStyle={styles.input}
        defaultValue={subscription && subscription}
        onChange={(e) => setNewSubscription(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "compass-outline",
          color: "#c2c2c2",
        }}
        errorMessage={error}
      />
      <Button
        title="Cabiar suscripcion"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateSubscription}
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
