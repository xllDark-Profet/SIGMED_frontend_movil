import * as React from 'react';
import * as Location from 'expo-location';
import { ScrollView, StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_KEY } from '@env';
import {
  AppContainer,
  BoxInfoHospital,
  BoxRojo,
  StyledFormArea,
  PageTitle,
  PageSubTitle,
  InnerContainer,
  StyledButton,
  ButtonText,
  OptionsContainer,
  StyledButtonOptions,
  ButtonTextOptions,
  BoxBrand,
  Colors,
  BoxInfoHospital2,
} from '../components/styles';
import client from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';

const { brand, darklight, primary } = Colors;

const Recomendacion_Hospital = ({ navigation }) => {

  //const GOOGLE_MAPS_KEY = 'AIzaSyBkTCP6bqysdiD-lZmkStVwqKKf453nEx4';
  React.useEffect(() => {
    getInfo();
    getLocationPermission();
  }, []);

  const [eps_usuario, setEPS_usuario] = React.useState('');
  const [especialidad, setEspecialidad] = React.useState('');
  const [triage, setTriage] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const [info_recomendacion, setInfoRecomendacion] = React.useState(null);

  const [hospitalesCandidatos, setHospitalesCandidatos] = React.useState([]);
  const [selectedHospitalIndex, setSelectedHospitalIndex] = React.useState(null);

  const [destination, setDestination] = React.useState({
    latitude: 4.6286243449550435,
    longitude: -74.0646891505176,
  });

  const [origin, setOrigin] = React.useState({
    latitude: 4.727025930801913,
    longitude: -74.05612717484247,
  });

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado.');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setOrigin(current);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_MAPS_KEY}`,
      );
      const data = await response.json();
      //console.log('Respuesta de la API de Geocoding:', data);
      if (data.status === 'OK') {
        const address = data.results[0].formatted_address;
        const formattedAddress = address.split(',').slice(0, 2).join(',');
        AsyncStorage.setItem('direccion_usuario', formattedAddress)
          /*.then(() => console.log('Direccion del usuario almacenada correctamente:', formattedAddress))*/
          .catch((error) => console.error('Error al almacenar la dirección del usuario:', error));
        //console.log('Dirección:', formattedAddress);
      } else {
        //console.error('Error al obtener la dirección:', data.status);
        Alert.alert('Error al obtener la dirección:', data.status);
      }
    } catch (error) {
      //console.error('Error al obtener la dirección:', error);
      Alert.alert('Error al obtener la dirección:', error.message);
    }
  }

  const getInfo = async () => {
    setLoading(true);
    try {
      const eps_usuario = parseInt(await AsyncStorage.getItem('eps_usuario'));
      const especialidad = await AsyncStorage.getItem('especialidad');
      const triage = parseInt(await AsyncStorage.getItem('triage'));
      if (eps_usuario) {
        setEPS_usuario(eps_usuario);
      }
      if (especialidad) {
        setEspecialidad(especialidad);
      }
      if (triage) {
        setTriage(triage);
      }

      const info_recomendacion = {
        triage,
        especialidad,
        id_eps: eps_usuario,
        latitud: origin.latitude,
        longitud: origin.longitude,
      };
      setInfoRecomendacion(info_recomendacion);
      await handleRecomendacionHospital(info_recomendacion);
    } catch (error) {
      console.error('Error al obtener informacion:', error);
      Alert.alert('A ocurrido un error, por favor intentalo de nuevo');
    } finally {
      setLoading(false);
    }
  };

  /*
  console.log("id eps del usuario: ", eps_usuario);
  console.log("especialidad de la emergencia: ", especialidad);
  console.log("triage de la emergencia: ", triage);
  console.log(origin.longitude);
  console.log(origin.latitude);
  console.log('informacion de la recomendacion: ', info_recomendacion);
  */

  const handleRecomendacionHospital = async (info_recomendacion) => {
    try {
      const response = await client.post('/hospitales/identificar/', info_recomendacion);
      const { hospitales } = response.data;
      setHospitalesCandidatos(hospitales);
      setSelectedHospitalIndex(null);
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

  const handleSelectHospital = (index) => {
    setSelectedHospitalIndex(index);
    setDestination({
      latitude: hospitalesCandidatos[index].latitud,
      longitude: hospitalesCandidatos[index].longitud,
    });
  };
  return (
    <>
      <StatusBar style="dark" />
      <InnerContainer>
        <AppContainer>
          <OptionsContainer>
            {hospitalesCandidatos.map((hospital, index) => (
              <StyledButtonOptions key={index} onPress={() => handleSelectHospital(index)}>
                <ButtonTextOptions>Opción {index + 1}</ButtonTextOptions>
              </StyledButtonOptions>
            ))}
          </OptionsContainer>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: origin.latitude,
              longitude: origin.longitude,
              latitudeDelta: 0.09,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              draggable
              coordinate={origin}
              onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
            />
            {selectedHospitalIndex !== null && (
              <Marker
                coordinate={{
                  latitude: hospitalesCandidatos[selectedHospitalIndex].latitud,
                  longitude: hospitalesCandidatos[selectedHospitalIndex].longitud,
                }}
              />
            )}
            {selectedHospitalIndex !== null && (
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_KEY}
                strokeColor={brand}
                strokeWidth={5}
              />
            )}
          </MapView>
          {selectedHospitalIndex !== null && (
            <BoxInfoHospital>
              <BoxInfoHospital2>
                <PageTitle info_hospital={true}>{hospitalesCandidatos[selectedHospitalIndex].hospital}</PageTitle>
                <PageSubTitle info_hospital={true}>
                  Distancia: {hospitalesCandidatos[selectedHospitalIndex].distancia_km} km
                </PageSubTitle>
                <PageSubTitle info_hospital={true}>
                  Tiempo: {hospitalesCandidatos[selectedHospitalIndex].tiempo}
                </PageSubTitle>
                <PageSubTitle info_hospital={true}>Eps: {hospitalesCandidatos[selectedHospitalIndex].eps}</PageSubTitle>
                <PageSubTitle info_hospital={true}>
                  Especialidad: {hospitalesCandidatos[selectedHospitalIndex].especialidad}
                </PageSubTitle>
              </BoxInfoHospital2>
            </BoxInfoHospital>
          )}
          {loading && <ActivityIndicator style={styles.loading} size="large" color={primary} />}
          {!loading && (
            <StyledFormArea>
              <StyledButton
                onPress={() => {
                  if (hospitalesCandidatos[selectedHospitalIndex] == null) {
                    Alert.alert('Por favor selecciona una de las opciones disponibles.');
                    navigation.navigate('Recomendacion_Hospital');
                  } else {
                    nombre_hospital = hospitalesCandidatos[selectedHospitalIndex].hospital;
                    AsyncStorage.setItem('nombre_hospital', nombre_hospital)
                      /*.then(() =>
                      console.log(
                        'Nombre del hospital almacenado correctamente:',
                        nombre_hospital,
                      ),
                    )*/
                      .catch((error) => console.error('Error al almacenar el nombre el hospital:', error));
                    navigation.navigate('Resumen_Solicitud');
                  }
                }}
              >
                <ButtonText>Aceptar</ButtonText>
              </StyledButton>
            </StyledFormArea>
          )}
        </AppContainer>
      </InnerContainer>
    </>
  );
};
export default Recomendacion_Hospital;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '45%',
    marginTop: 10,
  },

  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
  },
});
