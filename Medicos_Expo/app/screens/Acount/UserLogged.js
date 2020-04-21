import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
//import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AccountOptions from "../../components/Account/AccountOptions";

import ListUsuarios from "../Chat/ListUsuarios";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

//Pagina de usuario logueado
export default function UserLogged() {
  const [userInfo, setUserInfo] = useState({});
  const [user2, setUser2] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState("");
  const toastRef = useRef();

  // const [Usuarios, setUsuarios] = useState([]);
  // const [totalUsuarios, setTotalUsuarios] = useState(0);
  // const [startUsuarios, setStartUsuarios] = useState(null);

  //console.log(Usuarios);
  //console.log("uid");
  //console.log(user2);
  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.providerData[0]);

      // const user2 = await firebase.auth().currentUser;
      // setUser2(user2.getIdTokenResult());

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User logged in already or has just logged in.
          //console.log(user.uid);
          const user2 = user.uid;
          setUser2(user2);
        } else {
          // User not logged in or has just logged out.
        }
      });
    })();
    setReloadData(false);
  }, [reloadData]);

  // useEffect(() => {
  //   db.collection("usuarios")
  //     .get()
  //     .then((snap) => {
  //       setTotalUsuarios(snap.size);
  //     });

  //   (async () => {
  //     const resultUsuarios = [];
  //     const listaUsuarios = db
  //       .collection("usuarios")
  //       .orderBy("createAt", "desc");

  //     await listaUsuarios.get().then((response) => {
  //       setStartUsuarios(response.docs[response.docs.length - 1]);

  //       response.forEach((doc) => {
  //         let listUser = doc.data();
  //         listUser.id = doc.id;
  //         resultUsuarios.push({ listUser });
  //       });
  //       setUsuarios(resultUsuarios);
  //     });
  //   })();
  // }, []);
  return (
    <View style={styles.viewUserInfo}>
      <InfoUser
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        setTextLoading={setTextLoading}
      />
      <AccountOptions
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
        user2={user2}
      />
      <Button
        title="Cerrar sesion"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={() => firebase.auth().signOut()}
      />
      <Loading text={textLoading} isVisible={isLoading} />
      <Toast ref={toastRef} position="center" opacity={0.5} />
      {/* <ListUsuarios /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
    paddingTop: 0,
    paddingBottom: 0,
  },
  btnCloseSession: {
    marginTop: 0,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnCloseSessionText: {
    color: "#3377FF",
  },
});
