import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Card, Image, Icon, Rating } from "react-native-elements";
import * as firebase from "firebase";

export default function ListTopServicios(props) {
  const { topServicios, navigation } = props;
  //console.log(topServicios);
  return (
    <FlatList
      data={topServicios}
      renderItem={servMedico => (
        <ServicioTop servMedico={servMedico} navigation={navigation} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

function ServicioTop(props) {
  const { servMedico, navigation } = props;
  const { name, description, images, rating } = servMedico.item;
  const [imageServicio, setImageServicio] = useState(null);
  const [iconColor, setIconColor] = useState("#000");
  //console.log(servMedico);
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

  useEffect(() => {
    if (servMedico.index === 0) {
      setIconColor("#efb819");
    } else if (servMedico.index === 1) {
      setIconColor("#e3e4e5");
    } else if (servMedico.index === 2) {
      setIconColor("#cd7f32");
    }
  });

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Servicio", {
          servMedico: servMedico.item
        })
      }
    >
      <Card containerStyle={styles.containerCard}>
        <Icon
          type="material-community"
          name="chess-queen"
          color={iconColor}
          size={40}
          containerStyle={styles.containerIcon}
        />
        <Image
          style={styles.restaurantImage}
          resizeMode="cover"
          source={{ uri: imageServicio }}
        />
        <View style={styles.titleRating}>
          <Text style={styles.title}>{name}</Text>
          <Rating
            imageSize={20}
            startingValue={rating}
            readonly
            style={styles.rating}
          />
        </View>
        <Text style={styles.description}>{description}</Text>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    marginBottom: 30,
    borderWidth: 0
  },
  containerIcon: {
    position: "absolute",
    top: -30,
    left: -30,
    zIndex: 1
  },
  restaurantImage: {
    width: "100%",
    height: 200
  },
  titleRating: {
    flexDirection: "row",
    marginTop: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  rating: {
    position: "absolute",
    right: 0
  },
  description: {
    color: "grey",
    marginTop: 0,
    textAlign: "justify"
  }
});
