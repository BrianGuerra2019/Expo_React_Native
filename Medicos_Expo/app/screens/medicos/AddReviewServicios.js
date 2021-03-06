import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { AirbnbRating, Button, Input } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function AddReviewServicios(props) {
  const { navigation } = props;
  const { idServicio, setReviewsReload } = navigation.state.params;
  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();
  const addReview = () => {
    if (rating === null) {
      toastRef.current.show("No has puntuado el servicio", 3000);
    } else if (!title) {
      toastRef.current.show("Titulo obligatorio", 3000);
    } else if (!review) {
      toastRef.current.show("Comentario obligatorio", 3000);
    } else {
      setIsLoading(true);
      const user = firebase.auth().currentUser;
      const payload = {
        idUser: user.uid,
        avatarUser: user.photoURL,
        idServicio: idServicio,
        title: title,
        review: review,
        rating: rating,
        createAt: new Date()
      };
      db.collection("reviews")
        .add(payload)
        .then(() => {
          updateTestimonios();
          //console.log("Comentario guardado");
        })
        .catch(() => {
          toastRef.current.show(
            "Error al enviar el testimonio, intentalo mas tarde",
            3000
          );
          setIsLoading(false);
        });
    }
  };

  const updateTestimonios = () => {
    const servicioRef = db.collection("servicios").doc(idServicio);
    servicioRef.get().then(response => {
      const servicioData = response.data();
      const ratingTotal = servicioData.ratingTotal + rating;
      const quantityVoting = servicioData.quantityVoting + 1;
      const ratingResult = ratingTotal / quantityVoting;

      servicioRef
        .update({ rating: ratingResult, ratingTotal, quantityVoting })
        .then(() => {
          setIsLoading(false);
          setReviewsReload(true);
          navigation.goBack();
        });
    });
  };

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewRating}>
        <AirbnbRating
          count={5}
          reviews={["Pesimo", "Deficiente", "Normal", "Muy Bueno", "Exelente"]}
          defaultRating={0}
          size={35}
          onFinishRating={value => setRating(value)}
        />
      </View>
      <View style={styles.formReview}>
        <Input
          placeholder="Titulo"
          containerStyle={styles.input}
          onChange={e => setTitle(e.nativeEvent.text)}
        />
        <Input
          placeholder="Comentario..."
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChange={e => setReview(e.nativeEvent.text)}
        />
        <Button
          title="Enviar Testimonio"
          onPress={addReview}
          containerStyle={styles.btncontainer}
          buttonStyle={styles.btn}
        />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading isVisible={isLoading} text="Enviando comentario" />
    </View>
  );
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewRating: {
    height: 110,
    backgroundColor: "#f2f2f2"
  },
  formReview: {
    margin: 10,
    marginTop: 40,
    flex: 1,
    alignItems: "center"
  },
  input: {
    marginBottom: 10
  },
  textArea: {
    height: 350, //Area del comentario
    width: "100%",
    padding: 0,
    margin: 0
  },
  btncontainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 10,
    width: "95%"
  },
  btn: {
    backgroundColor: "#3377FF"
  }
});
