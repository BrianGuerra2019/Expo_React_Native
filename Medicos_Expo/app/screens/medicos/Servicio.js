import React from "react";
import { View, Text } from "react-native";

export default function Servicio(props) {
  const { navigation } = props;
  console.log(navigation);
  const { medicosSe } = props.navigation.state.params.medicosSe.item.servMedico;
  console.log(medicosSe);
  return (
    <View>
      <Text>Pagina del servicio seleccionado</Text>
    </View>
  );
}
