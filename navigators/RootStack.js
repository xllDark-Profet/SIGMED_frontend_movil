import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../components/styles';

//Screens
import Login from '../screens/1_Login';
import Registro from '../screens/2_Registro';
import Inicio from '../screens/3_Inicio_cliente';
import Identificador_Emergencia from '../screens/4_Identificador_emergencia';
import Informacion_Emergencia from '../screens/5_Informacion_emergencia';
import Recomendacion_Hospital from '../screens/6_Recomendacion_hospital';
import Resumen_Solicitud from '../screens/7_Resumen_solicitud';
import Prueba from '../screens/pruebaget';

const Stack = createNativeStackNavigator();
const {primary, tertiary} = Colors;

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent'
          },
          headerTintColor: tertiary,
          headerTransparent: true,
          headerTitle: '',
        }}

        initialRouteName='Login'
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Identificador_Emergencia" component={Identificador_Emergencia} />
        <Stack.Screen name="Informacion_Emergencia" component={Informacion_Emergencia} />
        <Stack.Screen name="Recomendacion_Hospital" component={Recomendacion_Hospital} />
        <Stack.Screen name="Resumen_Solicitud" component={Resumen_Solicitud} />
        <Stack.Screen name="Prueba" component={Prueba} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
