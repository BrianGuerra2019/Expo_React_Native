import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ListReviews(props) {
  const { navigation, idServicio, setRating } = props;
  //console.log(idServicio);
  const [reviews, setReviews] = useState([]);
  const [reviewsReload, setReviewsReload] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  firebase.auth().onAuthStateChanged(user => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useEffect(() => {
    (async () => {
      const resultReviews = [];
      const arrayRating = [];

      db.collection("reviews")
        .where("idServicio", "==", idServicio)
        .get()
        .then(response => {
          response.forEach(doc => {
            resultReviews.push(doc.data());
            arrayRating.push(doc.data().rating);
          });

          let numSum = 0;
          arrayRating.map(value => {
            numSum = numSum + value;
          });
          const countRating = arrayRating.length;
          const resultRating = numSum / countRating;
          const resultRatingFinish = resultRating ? resultRating : 0;

          setReviews(resultReviews);
          setRating(resultRatingFinish);
        });

      setReviewsReload(false);
    })();
  }, [reviewsReload]);

  return (
    <View>
      {userLogged ? (
        <Button
          buttonStyle={styles.btnAddReview}
          titleStyle={styles.btnTitleAddReview}
          title="Escribir testimonio"
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#309ccb"
          }}
          onPress={() =>
            navigation.navigate("AddReviewServicios", {
              idServicio: idServicio,
              setReviewsReload: setReviewsReload
            })
          }
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Text
            style={{ textAlign: "center", color: "#ea6554", padding: 20 }}
            onPress={() => navigation.navigate("Login")}
          >
            Para escribir un comentario es necesario estar logeado{" "}
            <Text style={{ fontWeight: "bold" }}>
              pulsa AQUÍ para iniciar sesión
            </Text>
          </Text>
        </View>
      )}
      <FlatList
        data={reviews}
        renderItem={review => <Review review={review} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

function Review(props) {
  const { title, review, rating, createAt, avatarUser } = props.review.item;
  const createReview = new Date(createAt.seconds * 1000);

  return (
    <View style={styles.viewReview}>
      <View style={styles.viewImageAvatar}>
        <Avatar
          size="large"
          rounded
          containerStyle={styles.imageAvatarUser}
          source={{
            url: avatarUser
              ? avatarUser
              : "https://api.adorable.io/avatars/285/abott@adorable.png"
          }}
        />
      </View>
      <View style={styles.viewInfo}>
        <Text style={styles.reviewTitle}>{title}</Text>
        <Text style={styles.reviewText}>{review}</Text>
        <Rating imageSize={15} startingValue={rating} readonly />
        <Text style={styles.reviewDate}>
          {createReview.getDate()}/{createReview.getMonth() + 1}/
          {createReview.getFullYear()} - {createReview.getHours()}:
          {createReview.getMinutes() < 10 ? "0" : ""}
          {createReview.getMinutes()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnAddReview: {
    backgroundColor: "transparent"
  },
  btnTitleAddReview: {
    color: "#309ccb"
  },
  viewReview: {
    flexDirection: "row",
    margin: 10,
    paddingBottom: 20,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1
  },
  viewImageAvatar: {
    marginRight: 15
  },
  imageAvatarUser: {
    width: 50,
    height: 50
  },
  viewInfo: {
    flex: 1,
    alignItems: "flex-start"
  },
  reviewTitle: {
    fontWeight: "bold"
  },
  reviewText: {
    paddingTop: 2,
    color: "grey",
    marginBottom: 5
  },
  reviewDate: {
    marginTop: 5,
    color: "grey",
    fontSize: 12,
    position: "absolute",
    right: 0,
    bottom: 0
  }
});
