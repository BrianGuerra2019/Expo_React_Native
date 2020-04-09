import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Image, Text } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { useDebouncedCallback } from "use-debounce";
import { FireSQL } from "firesql";
import firebase from "firebase/app";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

export default function Search(props) {
  const { navigation } = props;
  const [servMedico, setServMedico] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    onSearch();
  }, [search]);

  const [onSearch] = useDebouncedCallback(() => {
    if (search) {
      fireSQL
        .query(`SELECT * FROM servicios WHERE name LIKE '${search}%'`)
        .then(response => {
          setServMedico(response);
        });
    }
  }, 300);

  return (
    <View>
      <SearchBar
        placeholder="Busca tu servicio..."
        onChangeText={e => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
      />
      {servMedico.length === 0 ? (
        <NoFoundServicio />
      ) : (
        <FlatList
          data={servMedico}
          renderItem={servMedico => (
            <ServicioSearch servMedico={servMedico} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

function ServicioSearch(props) {
  const { servMedico, navigation } = props;
  const { name, images } = servMedico.item;
  const [imageServicio, setImageServicio] = useState(null);

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

  return (
    <ListItem
      title={name}
      leftAvatar={{ source: { uri: imageServicio } }}
      rightIcon={<Icon type="material-community" name="chevron-right" />}
      onPress={() =>
        navigation.navigate("Servicio", { servMedico: servMedico.item })
      }
    />
  );
}

function NoFoundServicio() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={require("../../assets/no-result-found.png")}
        resizeMode="cover"
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20
  }
});
