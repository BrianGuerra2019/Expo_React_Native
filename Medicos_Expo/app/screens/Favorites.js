import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from "react-native";
import { Image, Icon, Button } from "react-native-elements";
import Loading from "../components/Loading";
import Toast from "react-native-easy-toast";
import { NavigationEvents } from "react-navigation";

import { firebaseApp } from "../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
//Pagina Principal de favoritos
export default function Favorites(props) {
  const { navigation } = props;
  const [servicioFavorito, setServicioFavorito] = useState([]);
  const [reloadServicios, setReloadServicios] = useState(false);
  const [isVisibleLoding, setIsVisibleLoading] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const toastRef = useRef();

  //console.log(servicioFavorito);

  firebase.auth().onAuthStateChanged(user => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useEffect(() => {
    if (userLogged) {
      const idUser = firebase.auth().currentUser.uid;
      db.collection("favorites")
        .where("idUser", "==", idUser)
        .get()
        .then(response => {
          const idServArray = [];
          response.forEach(doc => {
            idServArray.push(doc.data().idServicio);
          });

          getDataServicios(idServArray).then(response => {
            const servicioFavorito = [];
            response.forEach(doc => {
              let servFavorito = doc.data();
              servFavorito.id = doc.id;
              servicioFavorito.push(servFavorito);
            });
            setServicioFavorito(servicioFavorito);
          });
        });
    }
    setReloadServicios(false);
  }, [userLogged]);

  const getDataServicios = idServArray => {
    const arrayServicios = [];
    idServArray.forEach(idServicio => {
      const result = db
        .collection("servicios")
        .doc(idServicio)
        .get();
      arrayServicios.push(result);
    });
    return Promise.all(arrayServicios);
  };

  if (!userLogged) {
    return (
      <UserNoLogged
        setReloadServicios={setReloadServicios}
        navigation={navigation}
      />
    );
  }

  if (servicioFavorito.length === 0) {
    return <NotFoundServicios setReloadServicios={setReloadServicios} />;
  }
  return (
    <View style={styles.viewBody}>
      <NavigationEvents onWillFocus={() => setReloadServicios(true)} />
      {servicioFavorito ? (
        <FlatList
          data={servicioFavorito}
          renderItem={servicioFavorito => (
            <FavoritoServ
              servicioFavorito={servicioFavorito}
              navigation={navigation}
              setIsVisibleLoading={setIsVisibleLoading}
              setReloadServicios={setReloadServicios}
              toastRef={toastRef}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.loaderRestaurants}>
          <ActivityIndicator size="large" />
          <Text>Cargando Servicios</Text>
        </View>
      )}
      <Toast ref={toastRef} position="center" opacity={1} />
      <Loading text="Eliminando Restaurante" isVisible={isVisibleLoding} />
    </View>
  );
}

function FavoritoServ(props) {
  const {
    servicioFavorito,
    navigation,
    setIsVisibleLoading,
    setReloadServicios,
    toastRef
  } = props;
  const { id, name, images } = servicioFavorito.item;
  const [imageServicio, setImageServicio] = useState(null);
  //console.log("Favorito");
  //console.log(servicioFavorito);
  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`servicios-imagenes/${image}`)
      .getDownloadURL()
      .then(response => {
        setImageServicio(response);
      });
  }, []);

  const confirmRemoveFavorite = () => {
    Alert.alert(
      "Eliminar el Servicio de Favoritos",
      "¿Estas seguro de que quieres eliminar el servicio de favoritos?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: removeFavorite
        }
      ],
      { cancelable: false }
    );
  };

  const removeFavorite = () => {
    setIsVisibleLoading(true);
    db.collection("favorites")
      .where("idServicio", "==", id)
      .where("idUser", "==", firebase.auth().currentUser.uid)
      .get()
      .then(response => {
        response.forEach(doc => {
          const idFavorite = doc.id;
          db.collection("favorites")
            .doc(idFavorite)
            .delete()
            .then(() => {
              setIsVisibleLoading(false);
              setReloadServicios(true);
              toastRef.current.show("Servicio eliminado correctamente");
            })
            .catch(() => {
              toastRef.current.show(
                "Error al eliminar el Servicio, intentelo más tarde"
              );
            });
        });
      });
  };

  return (
    <View style={styles.restaurant}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Servicio", {
            servicioFavorito: servicioFavorito.item
          })
        }
      >
        <Image
          resizeMode="cover"
          source={{ uri: imageServicio }}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator color="#fff" />}
        />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Icon
          type="material-community"
          name="heart"
          color="#3377FF"
          containerStyle={styles.favorite}
          onPress={confirmRemoveFavorite}
          size={40}
          underlayColor="transparent"
        />
      </View>
    </View>
  );
}
function NotFoundServicios(props) {
  const { setReloadServicios } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <NavigationEvents onWillFocus={() => setReloadServicios(true)} />
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        No tienes Servicios en tu lista
      </Text>
    </View>
  );
}

function UserNoLogged(props) {
  const { setReloadServicios, navigation } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <NavigationEvents onWillFocus={() => setReloadServicios(true)} />
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Necesitas estar logeado para ver esta sección.
      </Text>
      <Button
        title="Ir al login"
        onPress={() => navigation.navigate("Login")}
        containerStyle={{ marginTop: 20, width: "80%" }}
        buttonStyle={{ backgroundColor: "#3377FF" }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10
  },
  restaurant: {
    margin: 10
  },
  image: {
    width: 394,
    height: 180
  },
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: -30,
    backgroundColor: "#fff"
  },
  name: {
    fontWeight: "bold",
    fontSize: 20
  },
  favorite: {
    marginTop: -35,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 100
  }
});
