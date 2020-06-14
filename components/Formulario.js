/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Axios from 'axios';

const Formulario = ({consultarCriptomoneda}) => {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [criptomonedas, guardarCriptomonedas] = useState([]);
  const [error, guardarError] = useState(false);

  const obtenerMoneda = (coin) => {
    guardarMoneda(coin);
  };

  const obtenerCrypto = (crypto) => {
    guardarCriptomoneda(crypto);
  };

  useEffect( () => {
    const consultarCriptomonedas = async () => {
      guardarError(false);
      const URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

      const response = await Axios.get(URL);

      if (response && response.status === 200) {
        guardarCriptomonedas(response.data.Data);
      } else {
        guardarError(true);
      }
    };

    consultarCriptomonedas();
  }, []);

  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      Alert.alert('Error..!', 'Todos los campos son requeridos', ['Ok']);
      return;
    }

    const data = {
      moneda,
      criptomoneda,
    };

    consultarCriptomoneda(data);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        itemStyle={{height: 120}}
        selectedValue={moneda}
        onValueChange={(coin) => obtenerMoneda(coin)}
      >
        <Picker.Item label="- Seleccione -" value="" />
        <Picker.Item label="Dolar de Estados Unidos" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        itemStyle={{height: 120}}
        selectedValue={criptomoneda}
        onValueChange={(crypto) => obtenerCrypto(crypto)}
      >
        <Picker.Item label="- Seleccione -" value="" />
        {
          criptomonedas.map( (item) => (
            <Picker.Item
              key={item.CoinInfo.Id}
              label={item.CoinInfo.FullName}
              value={item.CoinInfo.Name} />
          ))
        }
      </Picker>
      <TouchableHighlight
        onPress={ () => cotizarPrecio()}
        style={styles.btnCotizar} >
        <Text style={styles.btnTexto}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
  },
  btnTexto: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
    fontFamily: 'Lato-Black',
  },
});

export default Formulario;
