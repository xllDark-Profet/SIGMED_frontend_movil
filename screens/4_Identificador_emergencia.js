import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, Alert } from 'react-native';
import { Formik } from 'formik';
import client from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  InnerContainer,
  PageTitle,
  StyledFormArea,
  ButtonText,
  PageLogo,
  StyledButtonSi,
  StyledButtonNo,
  BoxPregunta,
  BoxPregunta2,
  AppContainer,
  QuestionText,
  Colors,
  BoxAzulito,
} from '../components/styles';

const { brand, darklight, primary } = Colors;

const Identificador_Emergencia = ({ navigation }) => {
  const [sintomasPresentes, setSintomasPresentes] = React.useState({});

  return (
    <>
      <StatusBar style="dark" />
      <BoxAzulito/>
      <InnerContainer>
        <Formik
          initialValues={{ sintoma: 'Náuseas', respuesta: '' }}
          onSubmit={(values, { setSubmitting }) => {
            //console.log(JSON.stringify({ sintomas_presentes: sintomasPresentes }, null, 2));
            client
              .post('/identificador/', { sintomas_presentes: sintomasPresentes })
              .then((response) => {
                values.sintoma = response.data.sintoma;
                values.respuesta = '';
                setSubmitting(false);
                navigation.navigate('Identificador_Emergencia');

                if (response.data.emergencia_detectada != null) {
                  AsyncStorage.setItem('emergencia_detectada', response.data.emergencia_detectada)
                    /*.then(() =>
                      console.log(
                        'Nombre de la emergencia almacenada correctamente:',
                        response.data.emergencia_detectada,
                      ),
                    )*/
                    .catch((error) => console.error('Error al almacenar el nombre de la emergencia:', error));

                  AsyncStorage.setItem('especialidad', response.data.especialidad)
                    /*.then(() =>
                      console.log(
                        'Especialidad de la emergencia almacenada correctamente:',
                        response.data.especialidad,
                      ),
                    )*/
                    .catch((error) => console.error('Error al almacenar la especialidad de la emergencia:', error));

                  sintomas_string = response.data.sintomas_presentes.toString();
                  AsyncStorage.setItem('sintomas_presentes', sintomas_string)
                    /*.then(() =>
                      console.log('Sintomas de la emergencia almacenados correctamente:', response.data.sintomas_presentes),
                    )*/
                    .catch((error) => console.error('Error al almacenar la especialidad de la emergencia:', error));

                  triage_string = response.data.triage.toString();
                  AsyncStorage.setItem('triage', triage_string)
                    /*.then(() => console.log('Triage de la emergencia almacenada correctamente:', triage_string))*/
                    .catch((error) => console.error('Error al almacenar el triage de la emergencia:', error));

                  recomendaciones_string = JSON.stringify(response.data.recomendaciones);
                  AsyncStorage.setItem('recomendaciones', recomendaciones_string)
                    /*.then(() =>
                      console.log(
                        'Recomendaciones de la emergencia almacenadas correctamente:',
                        recomendaciones_string,
                      ),
                    )*/
                    .catch((error) => console.error('Error al almacenar las recomendaciones de la emergencia:', error));

                  navigation.navigate('Informacion_Emergencia');
                }

                if (response.data.mensaje != null) {
                  //console.log(response.data.mensaje);
                  Alert.alert(response.data.mensaje);
                  navigation.navigate('Inicio');
                }
              })
              .catch((error) => {
                Alert.alert('Error al hacer la peticion: ', error);
                //console.error('Error al hacer la petición:', error);
                setSubmitting(false);
                navigation.navigate('Inicio');
              });
          }}
        >
          {({ handleSubmit, values, isSubmitting }) => (
            <AppContainer>
              <PageLogo resizeMode="cover" source={require('./../assets/img/img3.png')} />
              <PageTitle identificator={true}>¡Queremos ayudarte! </PageTitle>
              <BoxPregunta>
                <BoxPregunta2>
                  <QuestionText>¿Tienes {values.sintoma}?</QuestionText>
                </BoxPregunta2>
              </BoxPregunta>
              <StyledFormArea identificator={true}>
                {!isSubmitting && (
                  <StyledButtonSi
                    onPress={() => {
                      setSintomasPresentes((prevState) => ({
                        ...prevState,
                        [values.sintoma]: 'si',
                      }));
                      handleSubmit();
                    }}
                  >
                    <ButtonText>Si</ButtonText>
                  </StyledButtonSi>
                )}
                {isSubmitting && (
                  <StyledButtonSi disabled={true}>
                    <ActivityIndicator size={'large'} color={primary} />
                  </StyledButtonSi>
                )}
                {!isSubmitting && (
                  <StyledButtonNo
                    onPress={() => {
                      setSintomasPresentes((prevState) => ({
                        ...prevState,
                        [values.sintoma]: 'no',
                      }));
                      handleSubmit();
                    }}
                  >
                    <ButtonText>No</ButtonText>
                  </StyledButtonNo>
                )}
                {isSubmitting && (
                  <StyledButtonNo disabled={true}>
                    <ActivityIndicator size={'large'} color={primary} />
                  </StyledButtonNo>
                )}
              </StyledFormArea>
            </AppContainer>
          )}
        </Formik>
      </InnerContainer>
      <BoxAzulito/>
    </>
  );
};
export default Identificador_Emergencia;
