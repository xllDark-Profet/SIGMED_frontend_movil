import React from 'react';
import RootStack from './navigators/RootStack';

//Screens
import Login from './screens/1_Login';
import Registro from './screens/2_Registro';
import Inicio from './screens/3_Inicio_cliente';

export default function App() {
  return <RootStack />;
}
