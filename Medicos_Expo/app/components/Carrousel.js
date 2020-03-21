import React from "react";
import { Image } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import Carousel from "react-native-banner-carousel";

//vista donde se carga el carrusel de imagenes
export default function CarouselImages(props) {
  const { arrayImages, height, width } = props;
  // console.log("carrusel");
  // console.log(arrayImages);
  return (
    <Carousel
      autoplay
      autoplayTimeout={5000}
      loop
      index={0}
      pageSize={width}
      pageIndicatorStyle={styles.indicator}
      activePageIndicatorStyle={styles.indicatorActive}
    >
      {arrayImages.map(urlImage => (
        <View key={urlImage}>
          <Image style={{ width, height }} source={{ uri: urlImage }} />
        </View>
      ))}
    </Carousel>
  );
}

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: "#00a680"
  },
  indicatorActive: {
    backgroundColor: "#00ffc5"
  }
});
