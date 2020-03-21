import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Rating, ListItem, Icon } from "react-native-elements";
import Carousel from "../../components/Carrousel";
import { ScrollView } from "react-native-gesture-handler";
import Map from "../../components/Map";
import ListReviews from "../../components/Medicos/ListReviews";
import Toast from "react-native-easy-toast";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "VirtualizedLists should never be nested" // TODO: Remove when fixed
]);

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
//Vista del servicio seleccionado
const screenWidth = Dimensions.get("window").width;

export default function Servicio(props) {
  const { navigation } = props;
  const { medicosSe } = navigation.state.params;
  // console.log("servicio seleccionado");
  // console.log(navigation);
  // console.log(navigation.state);
  // console.log("servicio");
  //console.log("servicio");
  //console.log(medicosSe);
  const [imagesServicio, setImageServicio] = useState([]);
  // console.log("imagesServicio arreglo");
  // console.log(imagesServicio);
  const [rating, setRating] = useState(medicosSe.rating);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const toastRef = useRef();
  //console.log(servMedico.id);
  //console.log(firebase.auth().currentUser.uid);
  firebase.auth().onAuthStateChanged(user => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useEffect(() => {
    const arrayUrls = [];
    (async () => {
      await Promise.all(
        medicosSe.images.map(async idImage => {
          await firebase
            .storage()
            .ref(`servicios-imagenes/${idImage}`)
            .getDownloadURL()
            .then(imageUrl => {
              arrayUrls.push(imageUrl);
            });
        })
      );
      setImageServicio(arrayUrls);
    })();
  }, []);

  useEffect(() => {
    if (userLogged) {
      // console.log(userLogged);
      db.collection("favorites")
        .where("idServicio", "==", medicosSe.id)
        .where("idUser", "==", firebase.auth().currentUser.uid)
        .get()
        .then(response => {
          //console.log(response.docs.length);
          if (response.docs.length === 1) {
            setIsFavorite(true);
          } else {
            console.log("error");
          }
        });
    }
  }, []);

  const addFavorite = () => {
    if (!userLogged) {
      toastRef.current.show(
        "Para usar el sistema de favoritos tienes que estar logeado",
        2000
      );
    } else {
      const payload = {
        idUser: firebase.auth().currentUser.uid,
        idServicio: medicosSe.id
      };

      db.collection("favorites")
        .add(payload)
        .then(() => {
          setIsFavorite(true);
          toastRef.current.show("Servicio añadido a la lista de favoritos");
        })
        .catch(() => {
          toastRef.current.show(
            "Error al añadir el servicio a la lista de favoritos, intentelo más tarde"
          );
        });
    }
  };

  const removeFavorite = () => {
    db.collection("favorites")
      .where("idServicio", "==", medicosSe.id)
      .where("idUser", "==", firebase.auth().currentUser.uid)
      .get()
      .then(response => {
        response.forEach(doc => {
          const idFavorite = doc.id;
          db.collection("favorites")
            .doc(idFavorite)
            .delete()
            .then(() => {
              setIsFavorite(false);
              toastRef.current.show(
                "Servicio eliminado de la lista de favoritos"
              );
            })
            .catch(() => {
              toastRef.current.show(
                "No se ha podido eliminar el servicio de la lista de favoritos, intentelo mas tarde"
              );
            });
        });
      });
  };
  return (
    <ScrollView style={styles.viewBody}>
      {/* <Text>Pagina del servicio seleccionado</Text> */}
      <View style={styles.viewFavorite}>
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          onPress={isFavorite ? removeFavorite : addFavorite}
          color={isFavorite ? "#ea6554" : "#000"}
          size={35}
          underlayColor="transparent"
        />
      </View>
      <Carousel arrayImages={imagesServicio} width={screenWidth} height={300} />
      <TitleServicio
        name={medicosSe.name}
        description={medicosSe.description}
        rating={rating}
      />
      <ServicioInfo
        location={medicosSe.location}
        name={medicosSe.name}
        address={medicosSe.address}
      ></ServicioInfo>
      <ListReviews
        navigation={navigation}
        idServicio={medicosSe.id}
        setRating={setRating}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </ScrollView>
  );
}

function ServicioInfo(props) {
  const { location, name, address } = props;
  // console.log("servicioInfo");
  // console.log(location);
  // console.log(name);
  // console.log(address);
  const listInfo = [
    {
      text: address,
      iconName: "map-marker",
      iconType: "material-community",
      action: null
    },
    {
      //si se necesita mas informacion de mostrar
      text: " 4492785445", //campo telefono
      iconName: "phone",
      iconType: "material-community",
      action: null
    },
    {
      text: "xAgustin93@gmail.com",
      iconName: "at",
      iconType: "material-community",
      action: null
    }
  ];

  return (
    <View style={styles.viewServicioInfo}>
      <Text style={styles.ServicioInfoTitle}>Inforacion del servicio</Text>
      <Map location={location} name={name} height={100}></Map>
      {listInfo.map((item, index) => (
        <ListItem
          key={index}
          title={item.text}
          leftIcon={{
            name: item.iconName,
            type: item.iconType,
            color: "#309ccb"
          }}
          containerStyle={styles.containerListItem}
        />
      ))}
    </View>
  );
}

function TitleServicio(props) {
  const { name, description, rating } = props;
  // console.log("titulo del servico");
  // console.log(name);
  // console.log(description);
  return (
    <View style={styles.viewServicioTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameServicio}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.descriptionServicio}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewServicioTitle: {
    margin: 15
  },
  nameServicio: {
    fontSize: 20,
    fontWeight: "bold"
  },
  rating: {
    position: "absolute",
    right: 0
  },
  descriptionServicio: {
    marginTop: 5,
    color: "grey"
  },
  viewServicioInfo: {
    margin: 15,
    marginTop: 25
  },
  ServicioInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1
  },
  viewFavorite: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 100,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 5
  }
});
