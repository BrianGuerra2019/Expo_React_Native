import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  FlatList
} from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
//pagina para usuarios no registrados
function UserGuest(props) {
  const { navigation } = props;

  return (
    <ScrollView style={styles.viewBody}>
      <Image
        source={require("../../../assets/logo4.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text>
        La aplicacion de servicios medicos ayuda a las personas a contratar un
        servicio en especifico deacuerdo a sus necesidades medias, desde una
        revicion de rutina a domicilio, hasta cuidados especiales en su casa.
      </Text>

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
    height: 350,
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
    backgroundColor: "#3377FF"
  },
  btnContainer: {
    width: "70%"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20
  }
});
