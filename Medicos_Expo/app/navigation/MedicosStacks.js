import { createStackNavigator } from "react-navigation-stack";
import PrincipalScreen from "../screens/medicos/Principal";
import AddMedicosScreen from "../screens/medicos/AddMedicos";
import ServicioScreen from "../screens/medicos/Servicio";
import AddReviewServiciosScreen from "../screens/medicos/AddReviewServicios";
//importar las vistas que se necesitan en cada opcion de la vista
// si se tiene que mover de ventana con algun boton aqui se importan
export const PrincipalScreenStacks = createStackNavigator({
  Medicos: {
    screen: PrincipalScreen,
    navigationOptions: () => ({
      title: "Medicos"
    })
  },
  AddMedicos: {
    screen: AddMedicosScreen,
    navigationOptions: () => ({
      title: "Nuevos Medicos"
    })
  },
  Servicio: {
    screen: ServicioScreen,
    navigationOptions: props => ({
      title: props.navigation.state.params.medicosSe.name
    })
  },
  AddReviewServicios: {
    screen: AddReviewServiciosScreen,
    navigationOptions: () => ({
      title: "Nuevo testimonio"
    })
  }
});

export default PrincipalScreenStacks;
