import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, ScrollView, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  InnerContainer,
  PageLogo,
  PageTitle,
  AppContainer,
  PageSubTitle,
  StyledButton,
  ButtonText,
  StyledFormArea,
  BoxRecomendaciones,
  BoxRecomendaciones2,
  OptionsContainerRecomendations,
  StyledButtonOptionsRecomendations,
  Colors,
} from '../components/styles';

const { brand, darklight, primary } = Colors;

const Informacion_Emergencia = ({ navigation }) => {
  const [emergencia_detectada, setEmergencia_detectada] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [triage, setTriage] = useState('');
  const [recomendaciones, setRecomendaciones] = useState('');
  const [currentRecomendacionIndex, setCurrentRecomendacionIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getEmergencia();
  }, []);

  const getEmergencia = async () => {
    try {
      const emergencia_detectada = await AsyncStorage.getItem('emergencia_detectada');
      const especialidad = await AsyncStorage.getItem('especialidad');
      const triage = await AsyncStorage.getItem('triage');
      const recomendaciones = await AsyncStorage.getItem('recomendaciones');
      if (emergencia_detectada) {
        setEmergencia_detectada(emergencia_detectada);
      }
      if (especialidad) {
        setEspecialidad(especialidad);
      }
      if (triage) {
        setTriage(triage);
      }
      if (recomendaciones) {
        const parsedRecomendaciones = JSON.parse(recomendaciones);
        setRecomendaciones(Object.values(parsedRecomendaciones));
      }
    } catch (error) {
      //console.error('Error al obtener informacion:', error);
      Alert.alert('Error al obtener la informacion.');
    }
  };

  const handleNextRecomendacion = () => {
    setCurrentRecomendacionIndex((prevIndex) => (prevIndex + 1) % recomendaciones.length);
  };

  const handlePrevRecomendacion = () => {
    setCurrentRecomendacionIndex((prevIndex) => (prevIndex === 0 ? recomendaciones.length - 1 : prevIndex - 1));
  };

  return (
    <>
      <StatusBar style="dark" />
      <ScrollView style={{flex: 1, backgroundColor:'#ffffff'}}>
        <InnerContainer>
          <AppContainer>
            <PageLogo resizeMode="cover" source={require('./../assets/img/img4.png')} />
            <PageTitle info_emergencia={true}>Emergencia identificada:</PageTitle>
            <PageSubTitle info_emergencia={true}>{emergencia_detectada}</PageSubTitle>
            <PageTitle info_emergencia={true}>Categoría:</PageTitle>
            <PageSubTitle info_emergencia={true}>{especialidad}</PageSubTitle>
            <PageTitle info_emergencia={true}>Triage:</PageTitle>
            <PageSubTitle info_emergencia={true}>Triage {triage}</PageSubTitle>
            <PageTitle info_emergencia={true}>Recomendaciones:</PageTitle>
            <BoxRecomendaciones>
              <BoxRecomendaciones2>
                {recomendaciones.length > 0 && (
                  <PageSubTitle info_emergencia={true}>{recomendaciones[currentRecomendacionIndex]}</PageSubTitle>
                )}
              </BoxRecomendaciones2>
            </BoxRecomendaciones>
            <OptionsContainerRecomendations>
              <StyledButtonOptionsRecomendations onPress={handlePrevRecomendacion}>
                <Ionicons name="arrow-back" size={30} color={primary} />
              </StyledButtonOptionsRecomendations>
              <StyledButtonOptionsRecomendations onPress={handleNextRecomendacion}>
              <Ionicons name="arrow-forward" size={30} color={primary} />
              </StyledButtonOptionsRecomendations>
            </OptionsContainerRecomendations>
            <StyledFormArea>
              <StyledButton onPress={() => navigation.navigate('Recomendacion_Hospital')}>
                <ButtonText>Aceptar</ButtonText>
              </StyledButton>
            </StyledFormArea>
          </AppContainer>
        </InnerContainer>
      </ScrollView>
    </>
  );
};
export default Informacion_Emergencia;
