import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeDisplayTelForm(props) {
  const { displayTel, setIsVisibleModal, setReloadData, toastRef } = props;
  const [newDisplayTel, setNewDisplayTel] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateDisplayTel = () => {
    setError(null);
    if (!newDisplayTel) {
      setError("El telefono de usuario no ha cambiado.");
    } else {
      setIsLoading(true);
      const update = {
        displayTel: newDisplayTel,
      };
      firebase
        .auth()
        .currentUser.updateDisplayTel(update)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          toastRef.current.show("Telefono Actualizado correctamente");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar el telefono.");
          setIsLoading(false);
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Telefono"
        containerStyle={styles.input}
        defaultValue={displayTel && displayTel}
        onChange={(e) => setNewDisplayTel(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "phone",
          color: "#c2c2c2",
        }}
        errorMessage={error}
      />
      <Button
        title="Cabiar Telefono"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateDisplayTel}
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
