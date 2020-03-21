import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddMedicosForm from "../../components/Medicos/AddMedicosForm";

export default function AddMedicos(props) {
  const { navigation } = props;
  const { setIsReloadMedicosServ } = navigation.state.params;
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>
      <AddMedicosForm
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
        setIsReloadMedicosServ={setIsReloadMedicosServ}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading isVisible={isLoading} text="Creando Servicio" />
    </View>
  );
}
