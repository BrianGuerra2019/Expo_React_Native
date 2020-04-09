import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import MapView from "react-native-maps";
import Modal from "../Modal";
import * as Location from "expo-location";
import uuid from "uuid/v4";
import { v4 as uuidv4 } from "uuid";
import * as Random from "expo-random";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const WindtScreen = Dimensions.get("window").width;

export default function AddMedicosForm(props) {
  const { toastRef, setIsLoading, navigation, setIsReloadMedicosServ } = props;
  const [imagesSelected, setImagesSelected] = useState([]);
  const [medicoName, setMedicoName] = useState("");
  const [medicoAdress, setMedicoAdress] = useState("");
  const [medicoDescription, setMedicoDescription] = useState("");
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationMedico, setLocationMedico] = useState(null);

  const AddMedicos = () => {
    if (!medicoName || !medicoAdress || !medicoDescription) {
      toastRef.current.show(
        "Todos los campos del formulario son obligatorios",
        3000
      );
    } else if (imagesSelected.length === 0) {
      toastRef.current.show(
        "El servicio tiene que tener almenos una imagen",
        3000
      );
    } else if (!locationMedico) {
      toastRef.current.show("Tienes que locacisar tu servicio", 3000);
    } else {
      setIsLoading(true);
      uploadImagesStorage(imagesSelected).then(arrayImages => {
        // console.log(arrayImages);
        // window.crypto.getRandomValues(arrayImages); //opcional, no es del codigo
        db.collection("servicios")
          .add({
            name: medicoName,
            address: medicoAdress,
            description: medicoDescription,
            location: locationMedico,
            images: arrayImages,
            rating: 0,
            ratingTotal: 0,
            quantityVoting: 0,
            createAt: new Date(),
            createBy: firebaseApp.auth().currentUser.uid
          })
          .then(() => {
            setIsLoading(false);
            setIsReloadMedicosServ(true);
            navigation.navigate("Medicos");
          })
          .catch(() => {
            setIsLoading(false);
            toastRef.current.show(
              "Error al subir el Servicio, intente mas tarde"
            );
          });
      });
    }
  };

  const uploadImagesStorage = async imageArray => {
    const imagesBlob = [];
    await Promise.all(
      imageArray.map(async image => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase
          .storage()
          .ref("servicios-imagenes")
          .child(uuid());
        await ref.put(blob).then(result => {
          imagesBlob.push(result.metadata.name);
        });
      })
    );
    return imagesBlob;
  };

  return (
    <ScrollView>
      <ImageMedico imageMedicos={imagesSelected[0]} />
      <FormAdd
        setMedicoName={setMedicoName}
        setMedicoAdress={setMedicoAdress}
        setMedicoDescription={setMedicoDescription}
        setIsVisibleMap={setIsVisibleMap}
        locationMedico={locationMedico}
      />
      <UpLoadImagen
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
        toastRef={toastRef}
      />
      <Button
        title="Crear Servicio"
        onPress={AddMedicos}
        buttonStyle={styles.btnAddMedicos}
      />
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationMedico={setLocationMedico}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

function ImageMedico(props) {
  const { imageMedicos } = props;
  return (
    <View style={styles.viewPhoto}>
      {imageMedicos ? (
        <Image
          source={{ uri: imageMedicos }}
          style={{ width: WindtScreen, height: 200 }}
        />
      ) : (
        <Image
          source={require("../../../assets/no-imagen.png")}
          style={{ width: WindtScreen, height: 200 }}
        />
      )}
    </View>
  );
}

function UpLoadImagen(props) {
  const { imagesSelected, setImagesSelected, toastRef } = props;

  const imageSelect = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;
    if (resultPermissionCamera === "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos de la galería, en ajustes del celular ",
        5000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (result.cancelled) {
        toastRef.current.show(
          "Has cerrado la galería sin seleccionar imagen",
          2500
        );
      } else {
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  };

  const removeImage = image => {
    const arrayImages = imagesSelected;
    Alert.alert(
      "Eliminar Imagen",
      "Estas seguro de que quieres eliminar la imagen?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () =>
            setImagesSelected(
              arrayImages.filter(imageUrl => imageUrl !== image)
            )
        }
      ],
      {
        cancelable: false
      }
    );
  };

  return (
    <View style={styles.viewImages}>
      {imagesSelected.length < 5 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}

      {imagesSelected.map(imageMedicos => (
        <Avatar
          key={imageMedicos}
          onPress={() => removeImage(imageMedicos)}
          style={styles.miniatureStyle}
          source={{ uri: imageMedicos }}
        />
      ))}
    </View>
  );
}
function FormAdd(props) {
  const {
    setMedicoName,
    setMedicoAdress,
    setMedicoDescription,
    setIsVisibleMap,
    locationMedico
  } = props;
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del Doctor"
        containerStyle={styles.input}
        onChange={e => setMedicoName(e.nativeEvent.text)}
      />
      <Input
        placeholder="Direccion"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: locationMedico ? "#3377FF" : "#c2c2c2",
          onPress: () => setIsVisibleMap(true)
        }}
        onChange={e => setMedicoAdress(e.nativeEvent.text)}
      />
      <Input
        placeholder="Descripcion"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={e => setMedicoDescription(e.nativeEvent.text)}
      />
    </View>
  );
}

function Map(props) {
  const { isVisibleMap, setIsVisibleMap, setLocationMedico, toastRef } = props;
  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      const resultPermission = await Permissions.askAsync(Permissions.LOCATION);
      const statusPermissions = resultPermission.permissions.location.status;

      if (statusPermissions !== "granted") {
        toastRef.current.show(
          "Tienes que aceptar los perisos de localizacion para crear un servicio",
          3000
        );
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        });
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationMedico(location);
    toastRef.current.show("Localizacion guardada correctamente");
    setIsVisibleMap(false);
  };
  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={region => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar Ubicacion"
            onPress={confirmLocation}
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
          />
          <Button
            title="Cancelar Ubicacion"
            onPress={() => setIsVisibleMap(false)}
            containerStyle={styles.viewMapBtnContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3"
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 1
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    marginBottom: 10
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0
  },
  mapStyle: {
    width: "100%",
    height: 550
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  viewMapBtnContainerSave: {
    paddingRight: 5
  },
  viewMapBtnSave: {
    backgroundColor: "#3377FF"
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5
  },
  viewMapBtnCancel: {
    backgroundColor: "#a60d0d"
  },
  btnAddMedicos: {
    backgroundColor: "#3377FF",
    margin: 20
  }
});
