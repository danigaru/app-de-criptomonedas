/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

import Axios from 'axios';

const App = () => {
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  const consultarCriptomoneda = async ({criptomoneda, moneda}) => {
    const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda},ETH&tsyms=${moneda}`;

    const response = await Axios.get(URL);
    guardarCargando(true);

    setTimeout(() => {
      guardarCargando(false);
      guardarResultado(response.data.DISPLAY[criptomoneda][moneda]);
    }, 3000);
  };

  return (
    <>
      <ScrollView>
        <Header />

        <Image
          source={require('./assets/img/cryptomonedas.png')}
          style={styles.imagen}
        />
        <View style={styles.contenido}>
          <Formulario consultarCriptomoneda={consultarCriptomoneda} />
        </View>

        <View style={{marginTop: 40}}>
          {cargando ? (
            <ActivityIndicator size="large" color="#5e49e2" />
          ) : Object.keys(resultado).length === 0 ? null : (
            <Cotizacion resultado={resultado} />
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
