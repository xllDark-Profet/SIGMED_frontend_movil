import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AppContainer, ExtraText, InnerContainer, PageTitle } from '../components/styles';

const Prueba = () => {
  const baseUrl = 'http://10.0.2.2:8000';
  // https://pokeapi.co/api/v2/pokemon/ditto

  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    getPrueba();
  }, []);

  const getPrueba = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto');
      const  ability  = response.data;
      setAbilities(ability.name);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <InnerContainer>
      <AppContainer>
        <PageTitle>Habilidad de un pokemon: </PageTitle>
        <ExtraText>{abilities}</ExtraText>
      </AppContainer>
    </InnerContainer>
  );
};

export default Prueba;
