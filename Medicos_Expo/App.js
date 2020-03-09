import React from "react";
import Navigation from "./app/navigation/Navigation";
import { firebaseApp } from "./app/utils/Firebase";
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["componentWillReceiveProps"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("componentWillReceiveProps") <= -1) {
    _console.warn(message);
  }
};

export default function App() {
  return <Navigation />;
}
