import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeGenderForm(props) {
  const { gender, setIsVisibleModal, setReloadData, toastRef } = props;
  const [newGender, setNewGender] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateGender = () => {
    setError(null);
    if (!newGender) {
      setError("El Genero de usuario no ha cambiado.");
    } else {
      setIsLoading(true);
      const update = {
        gender: newGender,
      };
      firebase
        .auth()
        .currentUser.updateGender(update)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          toastRef.current.show("Genero Actualizado correctamente");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar el genero.");
          setIsLoading(false);
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Genero"
        containerStyle={styles.input}
        defaultValue={gender && gender}
        onChange={(e) => setNewGender(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "face-recognition",
          color: "#c2c2c2",
        }}
        errorMessage={error}
      />
      <Button
        title="Cabiar Genero"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateGender}
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
