import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import PrincipalScreenStacks from "./MedicosStacks";
import TopListScreenStacks from "./TopListStacks";
import SearchScreenStacks from "./SearchStacks";
import AccountScreenStacks from "./AccountStacks";
// import SplashScreen from "../screens/SplashScreen";
import FavoritesScreenStacks from "./FavoritesStacks";
//importar las vistas que se necesitan en la pantalla

const NavigationStacks = createBottomTabNavigator(
  {
    // Splash: {
    //   screen: SplashScreen,
    //   navigationOptions: {
    //     headerShown: false
    //   }
    // },
    Principal: {
      screen: PrincipalScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Medicos",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="compass-outline"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    TopLists: {
      screen: TopListScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Ranking",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="star-outline"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    Favorites: {
      screen: FavoritesScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Favoritos",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="heart-outline"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    Search: {
      screen: SearchScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Buscar",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="magnify"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    Account: {
      screen: AccountScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="home-outline"
            size={22}
            color={tintColor}
          />
        )
      })
    }
  },
  {
    initialRouteName: "Principal",
    order: ["Principal", "TopLists", "Favorites", "Search", "Account"],
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#3377FF"
    }
  }
);

export default createAppContainer(NavigationStacks);
