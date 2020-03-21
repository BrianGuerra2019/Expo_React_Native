import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from "react-native-action-button";
import AddMedicos from "./AddMedicos";
import ListMedicos from "../../components/Medicos/ListMedicos";
//import * as firebase from "firebase";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
//vista que carga todos los servicios existentes
export default function Principal(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [medicosServ, setMedicosServ] = useState([]);
  const [startMedicosServ, setStartMedicosServ] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalMedicosServ, setTotalMedicosServ] = useState(0);
  const [isReloadMedicosServ, setIsReloadMedicosServ] = useState(false);
  const limitMedicosServ = 12;

  //console.log(medicosServ);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  useEffect(() => {
    db.collection("servicios") //carpeta de firestone
      .get()
      .then(snap => {
        setTotalMedicosServ(snap.size);
      });

    (async () => {
      const resultMedicosServ = [];
      const medicosdb = db
        .collection("servicios")
        .orderBy("createAt", "desc")
        .limit(limitMedicosServ);

      await medicosdb.get().then(response => {
        setStartMedicosServ(response.docs[response.docs.length - 1]);
        response.forEach(doc => {
          let servMedico = doc.data();
          servMedico.id = doc.id;
          resultMedicosServ.push({ servMedico });
        });
        setMedicosServ(resultMedicosServ);
      });
    })();
    setIsReloadMedicosServ(false);
  }, [isReloadMedicosServ]);

  const handleLoadMore = async () => {
    const resultMedicosServ = [];
    medicosServ.length < totalMedicosServ && setIsLoading(true);
    const medicosDb = db
      .collection("servicios")
      .orderBy("createAt", "desc")
      .startAfter(startMedicosServ.data().createAt)
      .limit(limitMedicosServ);

    await medicosDb.get().then(response => {
      if (response.docs.length > 0) {
        setStartMedicosServ(response.docs[response.docs.length - 1]);
      } else {
        setIsLoading(false);
      }

      response.forEach(doc => {
        let servMedico = doc.data();
        servMedico.id = doc.id;
        resultMedicosServ.push({ servMedico });
      });
      setMedicosServ([...medicosServ, ...resultMedicosServ]);
    });
  };

  return (
    <View style={styles.viewBody}>
      <ListMedicos
        medicosServ={medicosServ}
        isLoading={isLoading}
        handleLoadMore={handleLoadMore}
        navigation={navigation}
      />
      {user && (
        <AddMedicosButton
          navigation={navigation}
          setIsReloadMedicosServ={setIsReloadMedicosServ}
        />
      )}
    </View>
  );
}

function AddMedicosButton(props) {
  const { navigation, setIsReloadMedicosServ } = props;
  return (
    <ActionButton
      buttonColor="#00a680"
      onPress={() =>
        navigation.navigate("AddMedicos", { setIsReloadMedicosServ })
      }
    />
  );
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
});
