import styled from 'styled-components';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

//Colores
export const Colors = {
  primary: '#ffffff',
  secondary: '#E5E7EB',
  tertiary: '#1F2937',
  darklight: '#9CA3AF',
  dark: '#373737',
  brand: '#36788a',
  green: '#3E8E80',
  red: '#db636b',
  azulito: '#00C2FF',
};

const { primary, secondary, tertiary, dark, darklight, brand, green, red, azulito } = Colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${statusBarHeight + 55}px;
  background-color: ${primary};
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background-color: ${primary};
`;

export const PageLogo = styled.Image`
  margin-top: 15px;
  width: 150px;
  height: 150px;
`;

export const WelcomeContainer = styled(InnerContainer)`
  padding: 20px;
  justify-content: center;
  background-color: ${primary};
`;

export const QuestionText = styled.Text`
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
  color: ${darklight};
`;

export const AppContainer = styled(InnerContainer)`
  padding-horizontal: 20px;
  padding-vertical: 100px;
  justify-content: center;
  background-color: ${primary};
`;

export const WelcomeImage = styled.Image`
  height: 25%;
  width: 50%;
  margin-bottom: 40px;
`;

export const BoxBrand = styled.View`
  height: 5%;
  width: 100%;
  background-color: #627aa1;
`;

export const BoxAzulito= styled.View`
  height: 5%;
  width: 100%;
  background-color: #68c4cc;
`;

export const BoxRojo = styled.View`
  height: 5%;
  width: 100%;
  background-color: ${red};
`;

export const BoxPregunta = styled.View`
  height: 30%;
  width: 70%;
  background-color: #68c4cc;
  margin-bottom: 70px;
  margin-top: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const BoxPregunta2 = styled.View`
  height: 92%;
  width: 94%;
  background-color: ${primary};
  justify-content: center;
  border-radius: 10px;
`;

export const BoxRecomendaciones = styled.View`
  height: 25%;
  width: 80%;
  background-color: #627aa1;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const BoxRecomendaciones2 = styled.View`
  height: 95%;
  width: 95%;
  background-color: ${primary};
  justify-content: center;
  border-radius: 10px;
`;

export const BoxInfoHospital = styled.View`
  height: 35%;
  width: 100%;
  background-color: ${green};
  justify-content: center;
  border-radius: 10px;
  margin_top: 15px;
  margin_bottom: 10px;
  align-items: center;
`;
export const BoxInfoHospital2 = styled.View`
  height: 93%;
  width: 95%;
  background-color: ${primary};
  justify-content: center;
  border-radius: 10px;
`;

export const BoxInfoSolicitud = styled.View`
  height: 25%;
  width: 80%;
  background-color: ${brand};
  justify-content: center;
  border-radius: 10px;
  margin_top: 1px;
  margin_bottom: 1px;
  align-items: center;
`;
export const BoxInfoSolicitud2 = styled.View`
  height: 93%;
  width: 96%;
  background-color: ${primary};
  justify-content: center;
  border-radius: 10px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;
  margin-bottom: 5px;
  margin-top: 30px;

  ${(props) =>
    props.welcome &&
    ` margin-top: 1px;
      font-size: 35px;
      margin-bottom: 40px;
      color: ${red};
    `}

  ${(props) =>
    props.identificator &&
    ` margin-top: 10px;
      margin-bottom: 20px;
      color: #68c4cc;
    `}
    
  ${(props) =>
    props.info_emergencia &&
    ` font-size: 25px;
      margin-top: 1px;
      margin-bottom: 1px;
      color: #627aa1;
      padding: 8px;
    `}

  ${(props) =>
    props.info_hospital &&
    ` margin-top: 1px;
      font-size: 20px;
      margin-bottom: 1px;
      color: ${green};
      padding: 10px;
    `}

    ${(props) =>
      props.info_solicitud &&
      ` margin-top: 1px;
        font-size: 25px;
        margin-bottom: 1px;
        color: ${brand};
        padding-horizontal: 10px;
      `}
`;

export const PageSubTitle = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${red};

  ${(props) =>
    props.welcome &&
    `
        font-size: 28px;
        color: ${darklight};
        text-align: center;
        margin-top: 15px;
        `}

  ${(props) =>
    props.info_emergencia &&
    `
          font-size: 20px;
          color: ${darklight};
          text-align: center;
          margin-top: 1px;
          margin-bottom: 1px;
          padding: 10px;
          `}

  ${(props) =>
    props.info_hospital &&
    `
      color: ${darklight};
      text-align: center;
      font-size: 20px;
      margin-bottom: 1px;
    `}

    ${(props) =>
      props.info_solicitud &&
      `
        color: ${darklight};
        text-align: center;
        font-size: 20px;
        margin-bottom: 1px;
        padding-horizontal: 10px;
      `}
`;

export const StyledFormArea = styled.View`
  width: 90%;
  ${(props) =>
    props.welcome &&
    `
            width: 70%;
            `}

  ${(props) =>
    props.identificator &&
    `
              width: 65%;
              `}
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${brand};
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  background-color: ${green};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-vertical: 15px;
  height: 50px;

`;

export const StyledButton2 = styled.TouchableOpacity`
  padding: 5px;
  background-color: ${red};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-vertical: 5px;
  height: 70px;
`;

export const StyledButtonSi = styled.TouchableOpacity`
  padding: 5px;
  background-color: #68c4cc;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-vertical: 5px;
  height: 70px;
`;
export const StyledButtonNo = styled.TouchableOpacity`
  padding: 5px;
  background-color: #f37c7c;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-vertical: 5px;
  height: 70px;
`;

export const StyledButtonOptions = styled.TouchableOpacity`
  padding: 5px;
  background-color: ${green};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-vertical: 5px;
  margin-right: 10px;
  height: 40px;
`;

export const StyledButtonOptionsRecomendations = styled.TouchableOpacity`
  padding: 1px;
  background-color: #627aa1;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 35px;
  width: 80px;
  margin-vertical: 5px;
  margin-horizontal: 15px;
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
`;

export const ButtonTextOptions = styled.Text`
  color: ${primary};
  font-size: 15px;
  font-weight: bold;
  padding: 5px;
`;

export const ButtonTextOptionsRecomendations = styled.Text`
  color: ${primary};
  font-size: 15px;
  font-weight: bold;
  padding: 5px;
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  margin-bottom: 10px;
  color: ${green};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${brand};
  margin-top: 40px;
  margin-vertical: 10px;
`;

export const LineV = styled.View`
  width: 5px;
  height: 5%;
  background-color: ${brand};
  margin-horizontal: 10px;
  margin-vertical: 10px;
`;


export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
`;

export const DropdownContainer = styled.View`
  margin-vertical: 3px;
  margin-bottom: 10px;
`;

export const OptionsContainer = styled.View`
  margin-top: 50px;
  background-color: ${primary};
  flex-direction: row;
`;

export const OptionsContainerRecomendations = styled.View`
  background-color: ${primary};
  flex-direction: row;
  margin-bottom: 15px;
`;
