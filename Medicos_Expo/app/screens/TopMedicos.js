import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-easy-toast";
import ListTopServicios from "../components/Ranking/ListTopServicios";

import { firebaseApp } from "../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
//Pagina Principal de Mejores valorados
export default function TopMedicos(props) {
  const { navigation } = props;
  const [topServicios, setTopServicios] = useState([]);
  const toastRef = useRef();
  //console.log(topServicios);
  useEffect(() => {
    (async () => {
      db.collection("servicios")
        .orderBy("rating", "desc")
        .limit(5)
        .get()
        .then(response => {
          const servicioArray = [];
          response.forEach(doc => {
            let servicio = doc.data();
            servicio.id = doc.id;
            servicioArray.push(servicio);
            //servicioArray.push(doc.data());
          });
          //console.log(restaurantsArray);
          setTopServicios(servicioArray);
        })
        .catch(() => {
          toastRef.current.show(
            "Error al cargar el Ranking, intentlo más tarde",
            3000
          );
        });
    })();
  }, []);
  return (
    <View>
      <ListTopServicios topServicios={topServicios} navigation={navigation} />
      <Toast ref={toastRef} position="center" opacity={0.7} />
    </View>
  );
}
