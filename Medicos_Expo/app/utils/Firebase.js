import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAIzZJnDXWqNEGFsiBRB3K8FT6Vl6uhpxg",
  authDomain: "medicos-expo.firebaseapp.com",
  databaseURL: "https://medicos-expo.firebaseio.com",
  projectId: "medicos-expo",
  storageBucket: "medicos-expo.appspot.com",
  messagingSenderId: "442020422323",
  appId: "1:442020422323:web:6c139a5533f905870c86c6",
  measurementId: "G-SZHMRHLTGB"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
