import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import * as firebase from "firebase";
import ActionButton from "react-native-action-button";

export default function ChatScreen() {
  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState("");
  const toastRef = useRef();
  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.providerData[0]);
    })();
    setReloadData(false);
  }, [reloadData]);
  return (
    <View style={styles.viewUserInfo}>
      <InfoUser
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        setTextLoading={setTextLoading}
      />
      <ScrollView style={styles.tipo}>
        <Text>Chat</Text>
      </ScrollView>
      <NewMessage />
      <Loading text={textLoading} isVisible={isLoading} />
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </View>
  );
}

function NewMessage() {
  return (
    <ActionButton
      buttonColor="#3377FF"
      onPress={() => console.log("nuevo mensaje")}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
    paddingTop: 0,
    paddingBottom: 0,
  },
  tipo: {
    flex: 1,
  },
});
