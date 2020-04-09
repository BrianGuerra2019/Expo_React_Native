import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeDisplayCellForm(props) {
  const { displayCell, setIsVisibleModal, setReloadData, toastRef } = props;
  const [newDisplayCell, setNewDisplayCell] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateDisplayCell = () => {
    setError(null);
    if (!newDisplayCell) {
      setError("El Celular de usuario no ha cambiado.");
    } else {
      setIsLoading(true);
      const update = {
        displayCell: newDisplayCell,
      };
      firebase
        .auth()
        .currentUser.updateDisplayCell(update)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          toastRef.current.show("Celular Actualizado correctamente");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar el numero celular.");
          setIsLoading(false);
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Celular"
        containerStyle={styles.input}
        defaultValue={displayCell && displayCell}
        onChange={(e) => setNewDisplayCell(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "phone-in-talk",
          color: "#c2c2c2",
        }}
        errorMessage={error}
      />
      <Button
        title="Cabiar Celular"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateDisplayCell}
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
