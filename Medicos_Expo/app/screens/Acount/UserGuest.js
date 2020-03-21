import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";
//pagina para usuarios no registrados
function UserGuest(props) {
  const { navigation } = props;

  return (
    <ScrollView style={styles.viewBody} centerContent={true}>
      <Image
        source={require("../../../assets/logo4.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text> Consulta tu perfil de servicios medicos</Text>
      <Text style={styles.description}>Que servicio medico necesitas? </Text>
      <View style={styles.viewBtn}>
        <Button
          buttonStyle={styles.btnStyles}
          containerStyle={styles.btnContainer}
          title="Ver perfil"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </ScrollView>
  );
}

export default withNavigation(UserGuest);

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30
  },
  logo: {
    width: "100%",
    height: 500,
    marginTop: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center"
  },
  description: {
    textAlign: "center",
    marginBottom: 20
  },
  viewBtn: {
    flex: 1,
    alignItems: "center"
  },
  btnStyles: {
    backgroundColor: "#00a680"
  },
  btnContainer: {
    width: "70%"
  }
});
