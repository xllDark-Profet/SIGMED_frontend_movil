import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, Alert, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import client from '../api/client';

import {
  InnerContainer,
  PageTitle,
  PageSubTitle,
  PageLogo,
  StyledFormArea,
  StyledButton2,
  ButtonText,
  Colors,
  AppContainer,
  StyledButton,
  BoxInfoSolicitud,
  BoxInfoSolicitud2,
  LineV,
} from '../components/styles';
const { brand, darklight, primary } = Colors;

const Resumen_Solicitud = ({ navigation }) => {
  const [nombre_hospital, setNombre_hospital] = useState('');
  const [direccion, setDireccion_usuario] = useState('');
  const [id_usuario, setId_usuario] = useState('');
  const [nombre_usuario, setNombre_usuario] = useState('');
  const [apellido_usuario, setApellido_usuario] = useState('');
  const [emergencia_detectada, setEmergencia_detectada] = useState('');
  const [triage, setTriage] = useState('');
  const [sintomas_presentes, setSintomas_presentes] = useState('');
  const [loading, setLoading] = useState(false);

  const [info_solicitud, setInfo_solicitud] = useState(null);

  useEffect(() => {
    getSolicitud();
  }, []);

  const getSolicitud = async () => {
    setLoading(true);
    try {
      const nombre_hospital = await AsyncStorage.getItem('nombre_hospital');
      const direccion = await AsyncStorage.getItem('direccion_usuario');
      const id_usuario = parseInt(await AsyncStorage.getItem('id_usuario'));
      const nombre_usuario = await AsyncStorage.getItem('nombre_usuario');
      const apellido_usuario = await AsyncStorage.getItem('apellido_usuario');
      const emergencia_detectada = await AsyncStorage.getItem('emergencia_detectada');
      const sintomas_presentes = await AsyncStorage.getItem('sintomas_presentes');
      const triage = parseInt(await AsyncStorage.getItem('triage'));
      if (
        nombre_hospital &&
        direccion &&
        id_usuario &&
        nombre_usuario &&
        apellido_usuario &&
        emergencia_detectada &&
        triage &&
        sintomas_presentes
      ) {
        setNombre_hospital(nombre_hospital);
        setDireccion_usuario(direccion);
        setId_usuario(id_usuario);
        setNombre_usuario(nombre_usuario);
        setApellido_usuario(apellido_usuario);
        setEmergencia_detectada(emergencia_detectada);
        setTriage(triage);
        setSintomas_presentes(sintomas_presentes);
      }

      const info_solicitud = {
        direccion,
        id_usuario,
        nombre_hospital,
        emergencia_detectada,
        sintomas_presentes,
        triage,
      };
      /*
      console.log("Direccion del usuario: ", direccion);
      console.log("Nombre del hospital: ", nombre_hospital);
      console.log("ID del usuario: ", id_usuario);
      console.log("Nombre del usuario: ", nombre_usuario);
      console.log("Apellido del usuario: ", apellido_usuario);
      console.log("Emergencia identificada: ", emergencia_detectada);
      console.log("Triage de la emergencia: ", triage);
      console.log("Sintomas presentes: ", sintomas_presentes);
      */
      setInfo_solicitud(info_solicitud);
    } catch (error) {
      //console.error('Error al obtener la informacion de la solicitud :', error);
      Alert.alert('A ocurrido un error, por favor intentalo de nuevo');
    } finally {
      setLoading(false);
    }
  };

  const handleSolicitud = async (info_solicitud) => {
    try {
      const response = await client.post('/solicitudes/', info_solicitud);
      Alert.alert(response.data.mensaje);
    } catch (error) {
      if (error.response) {
        Alert.alert('Error', error.response.data.mensaje);
      } else if (error.request) {
        Alert.alert('Error', 'No se recibió respuesta del servidor');
      } else {
        Alert.alert('Error', 'Error al configurar la solicitud: ' + error.message);
      }
    }
  };
  return (
    <>
      <StatusBar style="dark" />
      <ScrollView style={{flex: 1, backgroundColor:'#ffffff'}}>
        <InnerContainer>
          <AppContainer>
            <PageLogo style={{marginTop: 50}} resizeMode="cover" source={require('./../assets/img/img5.png')} />
            <PageTitle info_solicitud={true}>{nombre_usuario}, este es el resumen de tu solicitud: </PageTitle>

            <BoxInfoSolicitud style={{ height: '15%', width: '70%' }}>
              <BoxInfoSolicitud2>
                <PageTitle info_solicitud={true}>Emergencia: </PageTitle>
                <PageSubTitle info_solicitud={true}> {emergencia_detectada}</PageSubTitle>
              </BoxInfoSolicitud2>
            </BoxInfoSolicitud>
            <LineV />
            <BoxInfoSolicitud style={{ height: '15%', width: '70%' }}>
              <BoxInfoSolicitud2>
                <PageTitle info_solicitud={true}>Triage: </PageTitle>
                <PageSubTitle info_solicitud={true}> {triage}</PageSubTitle>
              </BoxInfoSolicitud2>
            </BoxInfoSolicitud>
            <LineV />
            <BoxInfoSolicitud>
              <BoxInfoSolicitud2>
                <PageTitle info_solicitud={true}>Hospital: </PageTitle>
                <PageSubTitle info_solicitud={true}> {nombre_hospital}</PageSubTitle>
              </BoxInfoSolicitud2>
            </BoxInfoSolicitud>
            {loading && <ActivityIndicator style={styles.loading} size="large" color={primary} />}
            {!loading && (
              <StyledFormArea>
                <StyledButton
                  onPress={() => {
                    handleSolicitud(info_solicitud);
                    navigation.navigate('Inicio');
                  }}
                >
                  <ButtonText>Aceptar</ButtonText>
                </StyledButton>
              </StyledFormArea>
            )}
          </AppContainer>
        </InnerContainer>
      </ScrollView>
    </>
  );
};
export default Resumen_Solicitud;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
  },
});
