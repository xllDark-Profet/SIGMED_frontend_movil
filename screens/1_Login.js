import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, Alert } from 'react-native';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';

//importar formik
import { Formik } from 'formik';
//importar Octicons para los iconos
import { Octicons, Ionicons } from '@expo/vector-icons';
import client from '../api/client';

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  PageSubTitle,
  StyledFormArea,
  StyledTextInput,
  StyledInputLabel,
  LeftIcon,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from '../components/styles';

const { brand, darklight, primary } = Colors;

const Login = ({ navigation }) => {
  const [message, setMessage] = useState();
  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    client
      .post('/usuarios/login/', credentials)
      .then((response) => {
        const result = response.data;
        const { message } = result;
        handleMessage(message);
        //console.log(credentials);
        //console.log(response.data.tipo_usuario);
        if (response.data.tipo_usuario == 'usuario') {
          // Almacenar el nombre de usuario en AsyncStorage
          AsyncStorage.setItem('nombre_usuario', credentials.acceso)
            /*.then(() => console.log('Nombre de usuario almacenado correctamente:', credentials.acceso))*/
            .catch((error) => console.error('Error al almacenar el nombre de usuario:', error));
          navigation.navigate('Inicio');
          setSubmitting(false);
        } else if (response.data.tipo_usuario != 'usuario') {
          Alert.alert('Debes ingresar con un usuario tipo cliente');
        }
      })
      .catch((error) => {
        if (error.response) {
          Alert.alert('Error', error.response.data.mensaje);
        } else if (error.request) {
          Alert.alert('Error', 'No se recibió respuesta del servidor');
        } else {
          Alert.alert('Error', 'Error al configurar la solicitud: ' + error.message);
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleMessage = (message) => {
    setMessage(message);
  };

  const [hidePassword, setHidePassword] = useState(true);
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('./../assets/img/img1.png')} />
          <PageTitle>Bienvenido a SIGMED</PageTitle>
          <PageSubTitle>Inicia Sesión</PageSubTitle>
          <Formik
            initialValues={{ acceso: '', clave: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.acceso == '' || values.clave == '') {
                handleMessage('Por favor llena los campos');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Nombre usuario o Correo"
                  icon="mail"
                  placeholder="usuario o ejemplo@ejemplo.com"
                  placeholderTextColor={darklight}
                  onChangeText={handleChange('acceso')}
                  onBlur={handleBlur('acceso')}
                  value={values.acceso}
                  keyboardType="email-address"
                />

                <MyTextInput
                  label="Contraseña"
                  icon="lock"
                  placeholder="* * * * * * * * *"
                  placeholderTextColor={darklight}
                  onChangeText={handleChange('clave')}
                  onBlur={handleBlur('clave')}
                  value={values.clave}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox>{message} </MsgBox>
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Aceptar</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size={'large'} color={primary} />
                  </StyledButton>
                )}
                <Line />
                <ExtraView>
                  <ExtraText>¿Aún no estás registrado?</ExtraText>
                  <TextLink onPress={() => navigation.navigate('Registro')}>
                    <TextLinkContent> Registrarse</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={darklight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
