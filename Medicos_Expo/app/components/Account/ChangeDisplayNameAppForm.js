import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeDisplayNameAppForm(props) {
  const { displayNameApp, setIsVisibleModal, setReloadData, toastRef } = props;
  const [newDisplayNameApp, setNewDisplayNameApp] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateDisplayNameApp = () => {
    setError(null);
    if (!newDisplayNameApp) {
      setError("El Apellodo paterno de usuario no ha cambiado.");
    } else {
      setIsLoading(true);
      const update = {
        displayNameApp: newDisplayNameApp
      };
      firebase
        .auth()
        .currentUser.updateDisplayNameApp(update)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          toastRef.current.show("Apellido Paterno Actualizado correctamente");
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
        placeholder="Apellido paterno"
        containerStyle={styles.input}
        defaultValue={displayNameApp && displayNameApp}
        onChange={e => setNewDisplayNameApp(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2"
        }}
        errorMessage={error}
      />
      <Button
        title="Cabiar Apellido"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateDisplayNameApp}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    marginBottom: 10
  },
  btnContainer: {
    marginTop: 20,
    width: "95%"
  },
  btn: {
    backgroundColor: "#3377FF"
  }
});
