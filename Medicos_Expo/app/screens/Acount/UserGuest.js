import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  ImageBackground,
} from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import ViewPager from "@react-native-community/viewpager";
import Login from "../Acount/Login";
//pagina para usuarios no registrados
function UserGuest(props) {
  const { navigation } = props;
  //const Paquete = ["Basico", "Pro", "Premiun"];
  //const [Paquete1, setPaquete1] = useState({});
  //const Paquete1 = ["Basico"];
  //setPaquete1("Basico");
  //const [Paquete2, setPaquete2] = useState({});
  //const Paquete2 = ["Pro"];
  // setPaquete2("Pro");
  //const [Paquete3, setPaquete3] = useState({});
  //const Paquete3 = ["Premiun"];
  // setPaquete3("Premiun");
  //console.log(Paquete);
  const [Paquete, setPaquete] = useState({});

  // useEffect(() => {
  //   setPaquete1("Basico");
  //   setPaquete2("Pro");
  //   setPaquete3("Premiun");
  // }, []);
  return (
    //<ScrollView style={styles.viewBody}>
    <ViewPager style={(styles.viewPager, styles.container)} initialPage={0}>
      <View key="1">
        <Image
          source={require("../../../assets/logo4.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.description}>
          La aplicacion de servicios medicos ayuda a las personas a contratar un
          servicio en especifico deacuerdo a sus necesidades medias, desde una
          revicion de rutina a domicilio, hasta cuidados especiales en su casa.
        </Text>
        <Text style={styles.description}>
          Desliza para conocer nuestros paquetes...
        </Text>
        <Image
          source={require("../../../assets/swipe.gif")}
          //source={{ uri: "https://m.cuencana.com.ec/images/swipe.gif" }}
          style={styles.logo2}
          resizeMode="contain"
        />
        {/* <View style={styles.viewBtn}>
          <Button
            buttonStyle={styles.btnStyles}
            containerStyle={styles.btnContainer}
            title="Ver perfil"
            onPress={() => navigation.navigate("Login")}
          />
        </View> */}
      </View>

      <View key="2">
        <ImageBackground
          //source={require("../../../assets/Paquete-Gratis.jpg")}
          // source={{
          //   uri:
          //     "https://i2.wp.com/windowscustomization.com/wp-content/uploads/2018/09/plexus1.gif?resize=750%2C365&quality=80&strip=all&ssl=1",
          // }}
          source={require("../../../assets/plexus1.gif")}
          style={styles.backgroundImage}
        >
          <View backgroundColor={"#fFF"}>
            <Text style={styles.description2}>Paquete Basico</Text>
          </View>
          <Image
            source={require("../../../assets/Presio-gratis.png")}
            style={styles.logo3}
            resizeMode="contain"
          />
          <Text style={{ color: "white" }} style={styles.description3}>
            Publicacion de Perfil basico {"\n"}1 Foto de Perfil {"\n"}
          </Text>
          <Button
            buttonStyle={styles.btnStyles}
            containerStyle={styles.btnContainer}
            title="Obtener Paquete"
            onPress={() => navigation.navigate("Login")}
            //onPress={(() => navigation.navigate("Login"), setPaquete("Basico"))}
          />
        </ImageBackground>
      </View>
      <View key="3">
        <ImageBackground
          //source={require("../../../assets/Paquete-Pro.jpg")}
          source={require("../../../assets/plexus1.gif")}
          style={styles.backgroundImage}
        >
          <View backgroundColor={"#fFF"}>
            <Text style={styles.description2}>Paquete Pro</Text>
          </View>
          <Image
            source={require("../../../assets/Presio-Pro.png")}
            style={styles.logo3}
            resizeMode="contain"
          />
          <Text style={styles.description3}>
            Publicacion de Perfil Pro {"\n"}Contacto {"\n"}
            Publicacion del servicio y especialidades{"\n"}
            Chat Privado con pacientes{"\n"}
            Subir Videos{"\n"} Subir varias fotografias{"\n"}
            Testimonios y calificacion de usuarios{"\n"}
            Hacer promociones y descuentos dentro de tu perfil{"\n"}
          </Text>
          <Button
            buttonStyle={styles.btnStyles2}
            containerStyle={styles.btnContainer2}
            title="Obtener Paquete"
            //Paquete={Paquete[1]}
            onPress={() => navigation.navigate("Login")}
          />
        </ImageBackground>
      </View>

      <View key="4">
        <ImageBackground
          //source={require("../../../assets/Paquete-Premiun.jpg")}
          source={require("../../../assets/plexus1.gif")}
          style={styles.backgroundImage}
        >
          <View backgroundColor={"#fFF"}>
            <Text style={styles.description2}>Paquete Premiun</Text>
          </View>
          <Image
            source={require("../../../assets/Presio-Premiun.png")}
            style={styles.logo3}
            resizeMode="contain"
          />
          <Text style={styles.description6}>
            Publicacion de Perfil Pro {"\n"}Contacto {"\n"}
            Publicacion del servicio y especialidades{"\n"}
            Chat Privado con pacientes{"\n"}
            Subir Videos{"\n"} Subir varias fotografias{"\n"}
            Testimonios y calificacion de usuarios{"\n"}
            Hacer promociones y descuentos dentro de tu perfil{"\n"}
            Crear citas dentro de la app{"\n"}
            Tener recordatorios por medio de notificaciones con tus clientes y
            tu{"\n"}
            Cobrar tus servicios establecidos por ti sin comisiones para
            nosotros dentro de la platafora{"\n"}
            Agregar una cuenta para que puedan cobrar por medio de nuestra
            plataforma{"\n"}
            Mandar correos con contenido sugerido por nosotros a todos tus
            pacientes PREDEFINIDOS
          </Text>
          <Button
            buttonStyle={styles.btnStyles3}
            containerStyle={styles.btnContainer3}
            title="Obtener Paquete"
            //Paquete={Paquete[2]}
            onPress={() => navigation.navigate("Login")}
          />
        </ImageBackground>
      </View>
      <Login Paquete={Paquete} />
    </ViewPager>
    //</ScrollView>
  );
}

export default withNavigation(UserGuest);

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  logo: {
    width: "100%",
    height: 350,
    marginTop: 20,
  },
  logo2: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  logo3: {
    width: "100%",
    height: 200,
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
  },
  description2: {
    textAlign: "center",
    marginBottom: 0,
    fontWeight: "bold",
    fontSize: 48,
  },
  description3: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    fontSize: 22,
  },
  description4: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    fontSize: 22,
    color: "#9B9B9B",
  },
  description5: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    fontSize: 17,
    color: "black",
  },
  description6: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    fontSize: 17,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btnStyles: {
    backgroundColor: "#3377FF",
  },
  btnStyles2: {
    backgroundColor: "#035E30",
  },
  btnStyles3: {
    backgroundColor: "#82001C",
  },
  btnContainer: {
    width: "100%",
    marginTop: 260,
  },
  btnContainer2: {
    width: "100%",
    marginTop: 50,
  },
  btnContainer3: {
    width: "100%",
    marginTop: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  viewPager: {
    flex: 1,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  backgroundImage: {
    flex: 1,
    alignSelf: "stretch",
    width: "100%",
    height: "100%",
  },
});
