import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Image } from "react-native-elements";
import * as firebase from "firebase";
//vista que carga la inforacion de cada servicio exitente
export default function ListMedicos(props) {
  const { medicosServ, isLoading, handleLoadMore, navigation } = props;

  return (
    <View>
      {medicosServ ? (
        <FlatList
          data={medicosServ}
          renderItem={medicosSe => (
            <MedicosSe medicosSe={medicosSe} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderMedicos}>
          <ActivityIndicator size="large" />
          <Text>Cargando Medicos</Text>
        </View>
      )}
    </View>
  );
}
function MedicosSe(props) {
  const { medicosSe, navigation } = props;
  const { name, address, description, images } = medicosSe.item.servMedico;
  const [imageMedicoSer, setImageMedicoSer] = useState(null);
  //console.log("lista medicos");
  //console.log(medicosSe.item.servMedico);
  useEffect(() => {
    async function fetchData() {
      const image = images[0];
      await firebase
        .storage()
        .ref(`servicios-imagenes/${image}`)
        .getDownloadURL()
        .then(result => {
          setImageMedicoSer(result);
        })
        .catch(error => {
          console.log(error);
        });
    }
    fetchData();
  }, []);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Servicio", {
          medicosSe: medicosSe.item.servMedico
        })
      }
    >
      <View style={styles.viewMedicos}>
        <View style={styles.viewMedicosImage}>
          <Image
            resizeMode="cover"
            source={{
              uri: imageMedicoSer || "https://imgplaceholder.com/72x80"
            }}
            style={styles.imageMedico}
            PlaceholderContent={<ActivityIndicator color="fff" />}
          />
        </View>
        <View>
          <Text style={styles.medicoName}>{name}</Text>
          <Text style={styles.medicoAddress}>{address}</Text>
          <Text style={styles.medicoDescription}>
            {description.substr(0, 60)}...
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.loadingMedicos}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundMedicos}>
        <Text>No quedan servicios por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingMedicos: {
    marginTop: 20,
    alignItems: "center"
  },
  viewMedicos: {
    flexDirection: "row",
    margin: 10
  },
  viewMedicosImage: {
    marginRight: 15
  },
  imageMedico: {
    width: 80,
    height: 80
  },
  medicoName: {
    fontWeight: "bold"
  },
  medicoAddress: {
    paddingTop: 2,
    color: "grey"
  },
  medicoDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300
  },
  loaderMedicos: {
    marginTop: 10,
    marginBottom: 10
  },
  notFoundMedicos: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center"
  }
});
