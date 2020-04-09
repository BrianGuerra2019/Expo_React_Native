import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeSubscriptionForm(props) {
  const { subscription, setIsVisibleModal, setReloadData, toastRef } = props;
  const [newSubscription, setNewSubscription] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateSubscription = () => {
    setError(null);
    if (!newCity) {
      setError("La ciudad de usuario no ha cambiado.");
    } else {
      setIsLoading(true);
      const update = {
        subscription: newSubscription,
      };
      firebase
        .auth()
        .currentUser.updateSubscription(update)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          toastRef.current.show("Ciudad Actualizada correctamente");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar la ciudad.");
          setIsLoading(false);
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Paquetes"
        containerStyle={styles.input}
        defaultValue={city && city}
        onChange={(e) => setNewSubscription(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "compass-outline",
          color: "#c2c2c2",
        }}
        errorMessage={error}
      />
      <Button
        title="Cabiar Ciudad"
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
