import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dropdown } from 'react-native-element-dropdown';
//importar formik
import { Formik } from 'formik';
//importar Octicons para los iconos
import { Octicons, Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import axios from 'axios';
import client from '../api/client';

import {
  StyledContainer,
  InnerContainer,
  PageTitle,
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
  DropdownContainer,
} from '../components/styles';

const { brand, darklight, primary } = Colors;

const typesOfDocument = [
  { label: 'CC - Cedula de ciudadania', value: 'CC' },
  { label: 'TI - Tarjeta de identidad', value: 'TI' },
  { label: 'NIP - Numero de Identificacion Personal', value: 'NIP' },
];

const typesOfBlood = [
  { label: 'AB+', value: 'AB+' },
  { label: 'AB-', value: 'AB-' },
  { label: 'B+', value: 'B+' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' },
];

const Registro = ({ navigation }) => {
  const [message, setMessage] = useState();

  const handleRegister = (credentials, setSubmitting) => {
    handleMessage(null);
    client
      .post('/usuarios/agregar/', credentials)
      .then((response) => {
        const result = response.data;
        const { message } = result;
        handleMessage(message);
        navigation.navigate('Login');
        setSubmitting(false);
        //console.log(credentials);
        Alert.alert(response.data.mensaje);
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

  const [epsOptions, setEpsOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEps, setSelectedEps] = useState(null);

  useEffect(() => {
    const fetchEps = async () => {
      try {
        const response = await client.get('/eps/');
        const formattedEpsOptions = response.data.map((eps) => ({
          label: eps.nombre, // Ajusta el nombre del campo de la EPS según la estructura de tu respuesta
          value: eps.id, // Ajusta el ID del campo de la EPS según la estructura de tu respuesta
        }));
        setEpsOptions(formattedEpsOptions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching EPS:', error);
        setLoading(false);
      }
    };

    fetchEps();
  }, []);

  const [hidePassword, setHidePassword] = useState(true);
  const [value, setValue] = useState(null);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));

  //Coje el dia actual para ser manejado
  const [dob, setDob] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Regístrate en SIGMED</PageTitle>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <Formik
            initialValues={{
              tipo_identificacion: '',
              identificacion: '',
              nombre: '',
              apellido: '',
              correo: '',
              telefono: '',
              nombre_usuario: '',
              clave: '',
              tipo_usuario: 'Usuario',
              fecha_nacimiento: '',
              tipo_sangre: '',
              nombre_eps: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (
                values.tipo_identificacion == '' ||
                values.identificacion == '' ||
                values.nombre == '' ||
                values.apellido == '' ||
                values.correo == '' ||
                values.telefono == '' ||
                values.nombre_usuario == '' ||
                values.clave == '' ||
                values.tipo_usuario == '' ||
                values.fecha_nacimiento == '' ||
                values.tipo_sangre == '' ||
                values.nombre_eps == ''
              ) {
                handleMessage('Por favor llena los campos');
                setSubmitting(false);
              } else {
                handleRegister(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Nombre"
                  icon="person"
                  placeholder="Ingresa tu nombre"
                  placeholderTextColor={darklight}
                  onChangeText={handleChange('nombre')}
                  onBlur={handleBlur('nombre')}
                  value={values.nombre}
                />

                <MyTextInput
                  label="Apellido"
                  icon="person"
                  placeholder="Ingresa tu apellido"
                  placeholderTextColor={darklight}
                  onChangeText={handleChange('apellido')}
                  onBlur={handleBlur('apellido')}
                  value={values.apellido}
                />

                <DropdownContainer>
                  <StyledInputLabel>Tipo de sangre</StyledInputLabel>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={typesOfBlood}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecciona tu tipo de sangre"
                    searchPlaceholder="Buscar..."
                    value={value}
                    onChange={(item) => {
                      handleChange('tipo_sangre')(item.value);
                    }}
                  />
                </DropdownContainer>

                <MyTextInput
                  label="Fecha de nacimiento"
                  icon="calendar"
                  placeholder="DD - MM - AAAA"
                  placeholderTextColor={darklight}
                  onChangeText={handleChange('fecha_nacimiento')}
                  onBlur={handleBlur('fecha_nacimiento')}
                  value={(values.fecha_nacimiento = dob ? dob.toISOString().split('T')[0] : '')}
                  isDate={true}
                  editable={false}
                  showDatePicker={showDatePicker}
                />

                <DropdownContainer>
                  <StyledInputLabel>Tipo de identificación</StyledInputLabel>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={typesOfDocument}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecciona tu tipo de documento"
                    searchPlaceholder="Buscar..."
                    value={value}
                    onChange={(item) => {
                      handleChange('tipo_identificacion')(item.value);
                    }}
                  />
                </DropdownContainer>

                <MyTextInput
                  label="Número de identificación"
                  icon="number"
                  placeholder="12345678"
                  placeholderTextColor={darklight}
                  onChangeText={handleChange('identificacion')}
                  onBlur={handleBlur('identificacion')}
                  value={values.identificacion}
                  keyboardType="numeric"
                />

                <MyTextInput
                  label="Correo Electronico"
                  icon="mail"
                  placeholder="ejemplo@ejemplo.com"
                  placeholderTextColor={darklight}
                  onChangeText={handleChange('correo')}
                  onBlur={handleBlur('correo')}
                  value={values.correo}
                  keyboardType="email-address"
                />

                <MyTextInput
                  label="Número de Teléfono o Contacto"
                  icon="smiley"
                  placeholder="Ingresa tu numero "
                  placeholderTextColor={darklight}
                  onChangeText={handleChange('telefono')}
                  onBlur={handleBlur('telefono')}
                  value={values.telefono}
                />

                <DropdownContainer>
                  <StyledInputLabel>EPS o Servicio afiliado</StyledInputLabel>
                  {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                  ) : (
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={epsOptions}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Selecciona tu EPS"
                      searchPlaceholder="Buscar..."
                      value={values.eps}
                      onChange={(item) => {
                        values.nombre_eps = item.label;
                      }}
                    />
                  )}
                </DropdownContainer>

                <MyTextInput
                  label="Nombre de usuario"
                  icon="smiley"
                  placeholder="Ingresa tu Username"
                  placeholderTextColor={darklight}
                  onChangeText={handleChange('nombre_usuario')}
                  onBlur={handleBlur('nombre_usuario')}
                  value={values.nombre_usuario}
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

                <MsgBox> {message} </MsgBox>
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
                  <ExtraText>¿Ya estás registrado?</ExtraText>
                  <TextLink onPress={() => navigation.navigate('Login')}>
                    <TextLinkContent> Iniciar Sesión</TextLinkContent>
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

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>

      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} editable={false} />
        </TouchableOpacity>
      )}

      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={darklight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Registro;

const styles = StyleSheet.create({
  dropdown: {
    height: 65,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    backgroundColor: '#E5E7EB',
    borderRadius: 5,
    marginTop: 5,
  },
  icon: {
    paddingLeft: 15,
  },
  placeholderStyle: {
    fontSize: 15,
    paddingLeft: 10,
    color: '#9CA3AF',
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 10,
  },
  iconStyle: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
