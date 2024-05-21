import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, Alert } from 'react-native';
import client from '../api/client';

import {
  InnerContainer,
  PageTitle,
  PageSubTitle,
  StyledFormArea,
  StyledButton2,
  ButtonText,
  Colors,
  WelcomeContainer,
  WelcomeImage,
  BoxRojo,
  StyledContainer,
} from '../components/styles';

const { brand, darklight } = Colors;

const Inicio = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNombreUsuario();
  }, []);

  const getNombreUsuario = async () => {
    try {
      const username = await AsyncStorage.getItem('nombre_usuario');
      if (username) {
        setUsername(username);
        obtenerUsuario({ username });
      }
    } catch (error) {
      //console.error('Error al obtener el nombre de usuario:', error);
      Alert.alert('Error al obtener el nombre del usuario.');
    }
  };

  const obtenerUsuario = async (username) => {
    setLoading(true);
    try {
      const response = await client.post('/usuarios/buscar/', username);
      const usuario = response.data;
      //console.log(usuario);
      if (usuario) {
        setNombre(usuario.nombre);
        setApellido(usuario.apellido);

        const eps_string = usuario.eps.toString();
        AsyncStorage.setItem('eps_usuario', eps_string)
          /*.then(() => console.log('EPS del usuario almacenada correctamente:', eps_string))*/
          .catch((error) => console.error('Error al almacenar la EPS del usuario:', error));

        const id_usuario_string = usuario.id.toString();
        AsyncStorage.setItem('id_usuario', id_usuario_string)
          /*.then(() => console.log('Id del usuario almacenada correctamente:', id_usuario_string))*/
          .catch((error) => console.error('Error al almacenar el id del usuario:', error));

        AsyncStorage.setItem('nombre_usuario', usuario.nombre)
          /*.then(() => console.log('Nombre del usuario almacenado correctamente:', usuario.nombre))*/
          .catch((error) => console.error('Error al almacenar el nombre del usuario:', error));

        AsyncStorage.setItem('apellido_usuario', usuario.apellido)
          /*.then(() => console.log('Apellido del usuario almacenado correctamente:', usuario.apellido))*/
          .catch((error) => console.error('Error al almacenar el apellido del usuario:', error));

        AsyncStorage.setItem('eps_usuario', eps_string)
          /*.then(() => console.log('EPS del usuario almacenada correctamente:', eps_string))*/
          .catch((error) => console.error('Error al almacenar la EPS del usuario:', error));
      } else {
        //console.error('Usuario no encontrado');
        Alert.alert('Error', 'Usuario no encontrado');
      }
    } catch (error) {
      //console.error('Error al obtener el usuario:', error);
      Alert.alert('Error', 'Error al obtener el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <InnerContainer>
        <BoxRojo />
        <WelcomeContainer>
          <PageTitle welcome={true}>Hola {nombre}</PageTitle>
          <WelcomeImage resizeMode="cover" source={require('./../assets/img/img2.png')} />
          <PageSubTitle welcome={true}>¿Necesitas Ayuda?</PageSubTitle>
          <StyledFormArea welcome={true}>
            <StyledButton2 onPress={() => navigation.navigate('Identificador_Emergencia')}>
              <ButtonText>¡Comencemos!</ButtonText>
            </StyledButton2>
          </StyledFormArea>
          <PageSubTitle welcome={true}>Para evaluar tu emergencia médica</PageSubTitle>
        </WelcomeContainer>
        <BoxRojo />
      </InnerContainer>
    </>
  );
};

export default Inicio;
