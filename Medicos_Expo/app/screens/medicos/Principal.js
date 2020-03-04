import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from "react-native-action-button";
import AddMedicos from "./AddMedicos";
import * as firebase from "firebase";

export default function Principal(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);
  return (
    <View style={styles.viewBody}>
      <Text>Medicos</Text>
      {user && <AddMedicosButton navigation={navigation} />}
    </View>
  );
}

function AddMedicosButton(props) {
  const { navigation } = props;
  return (
    <ActionButton
      buttonColor="#00a680"
      onPress={() => navigation.navigate("AddMedicos")}
    />
  );
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
});
