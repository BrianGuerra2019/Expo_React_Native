import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeDisplayNameAppForm from "./ChangeDisplayNameAppForm";
import ChangeDisplayNameApmForm from "./ChangeDisplayNameApmForm";
import ChangeCityForm from "./ChangeCityForm";
import ChangeCurpForm from "./ChangeCurpForm";
import ChangeDisplayAddressForm from "./ChangeDisplayAddressForm";
import ChangeDisplayAgeForm from "./ChangeDisplayAgeForm";
import ChangeDisplayCellForm from "./ChangeDisplayCellForm";
import ChangeDisplayCodePostalForm from "./ChangeDisplayCodePostalForm";
import ChangeDisplayTelForm from "./ChangeDisplayTelForm";
import ChangeGenderForm from "./ChangeGenderForm";
import ChangeStateForm from "./ChangeStateForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountOptions(props) {
  const { userInfo, setReloadData, toastRef } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderCoponent, setRenderCoponent] = useState(null);
  const menuOptions = [
    {
      title: "Suscripcion",
      iconType: "material-community",
      iconNameLeft: "unfold-more-vertical",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent("subscription"),
    },
    {
      title: "Cambiar Nombre",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent("displayName"),
    },
    {
      title: "Cambiar Apellido Paterno",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent("displayNameApp"),
    },
    {
      title: "Cambiar Apellido Materno",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent("displayNameApm"),
    },
    {
      title: "Cambiar Correo",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent("email"),
    },
    {
      title: "Cambiar Contrasena",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent("password"),
    },
    {
      title: "Cambiar Direccion",
      iconType: "material-community",
      iconNameLeft: "compass-outline",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent("displayAddress"),
    },
    {
      title: "Cambiar Telefono de Casa",
      iconType: "material-community",
      iconNameLeft: "phone",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent("displayTel"),
    },
    {
      title: "Cambiar Celular",
      iconType: "material-community",
      iconNameLeft: "phone-in-talk",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent("displayCell"),
    },
    {
      title: "Cambiar Fecha de Nacimiento",
      iconType: "material-community",
      iconNameLeft: "face",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent("displayAge"),
    },
    {
      title: "Cambiar Codigo Postal",
      iconType: "material-community",
      iconNameLeft: "format-list-numbered",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent("displayCodePostal"),
    },
    {
      title: "Cambiar Ciudad",
      iconType: "material-community",
      iconNameLeft: "compass-outline",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent("City"),
    },
    {
      title: "Cambiar Estado",
      iconType: "material-community",
      iconNameLeft: "compass-outline",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent("State"),
    },
    {
      title: "Cambiar CURP",
      iconType: "material-community",
      iconNameLeft: "format-list-numbered",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent("Curp"),
    },
    {
      title: "Cambiar Genero",
      iconType: "material-community",
      iconNameLeft: "face-recognition",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent("Gender"),
    },
    {
      title: "",
      iconType: "material-community",
      iconNameLeft: "",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent("displayName"),
    },
    {
      title: "",
      iconType: "material-community",
      iconNameLeft: "",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent(""),
    },
    {
      title: "",
      iconType: "material-community",
      iconNameLeft: "",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorLeft: "#ccc",
      onPress: () => selectedCoponent(""),
    },
  ];

  const selectedCoponent = (key) => {
    switch (key) {
      case "subscription":
        setRenderCoponent(
          <ChangeSubscriptionForm
            subscription={userInfo.subscription}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "displayName":
        setRenderCoponent(
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "displayNameApp":
        setRenderCoponent(
          <ChangeDisplayNameAppForm
            displayNameApp={userInfo.displayNameApp}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "displayNameApm":
        setRenderCoponent(
          <ChangeDisplayNameApmForm
            displayNameApm={userInfo.displayNameApm}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "email":
        setRenderCoponent(
          <ChangeEmailForm
            email={userInfo.email}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "password":
        setRenderCoponent(
          <ChangePasswordForm
            setIsVisibleModal={setIsVisibleModal}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "displayAddress":
        setRenderCoponent(
          <ChangeDisplayAddressForm
            displayAddress={userInfo.displayAddress}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "displayTel":
        setRenderCoponent(
          <ChangeDisplayTelForm
            displayTel={userInfo.displayTel}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "displayCell":
        setRenderCoponent(
          <ChangeDisplayCellForm
            displayCell={userInfo.displayCell}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "displayAge":
        setRenderCoponent(
          <ChangeDisplayAgeForm
            displayAge={userInfo.displayAge}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "displayCodePostal":
        setRenderCoponent(
          <ChangeDisplayCodePostalForm
            displayCodePostal={userInfo.displayCodePostal}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "City":
        setRenderCoponent(
          <ChangeCityForm
            city={userInfo.city}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "State":
        setRenderCoponent(
          <ChangeStateForm
            state={userInfo.state}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "Curp":
        setRenderCoponent(
          <ChangeCurpForm
            curp={userInfo.curp}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "Gender":
        setRenderCoponent(
          <ChangeGenderForm
            gender={userInfo.gender}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      default:
        break;
    }
  };
  return (
    <ScrollView>
      {menuOptions.map((menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight,
          }}
          onPress={menu.onPress}
          containerStyle={styles.menuItem}
        />
      ))}
      {renderCoponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderCoponent}
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
