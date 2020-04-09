import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeCityForm(props) {
  const { city, setIsVisibleModal, setReloadData, toastRef } = props;
  const [newCity, setNewCity] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateCity = () => {
    setError(null);
    if (!newCity) {
      setError("La ciudad de usuario no ha cambiado.");
    } else {
      setIsLoading(true);
      const update = {
        city: newCity,
      };
      firebase
        .auth()
        .currentUser.updateCity(update)
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
        placeholder="Ciudad"
        containerStyle={styles.input}
        defaultValue={city && city}
        onChange={(e) => setNewCity(e.nativeEvent.text)}
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
        onPress={updateCity}
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
