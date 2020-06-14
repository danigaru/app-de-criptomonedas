/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Cotizacion = ({resultado}) => {
  return (
    <View style={styles.resultado}>
      <Text style={[styles.texto, styles.precio]}>
        <Text style={styles.span}> {resultado.PRICE}</Text>
      </Text>
      <Text style={styles.texto}>
        Precio más alto del dia:
        <Text style={styles.span}> {resultado.HIGHDAY}</Text>
      </Text>
      <Text style={styles.texto}>
        Precio más bajo del dia:
        <Text style={styles.span}> {resultado.LOWDAY}</Text>
      </Text>
      <Text style={styles.texto}>
        Variación últimas 24 horas:
        <Text style={styles.span}> {resultado.CHANGEPCT24HOUR} %</Text>
      </Text>
      <Text style={styles.texto}>
        Ùltima actualizaciòn:
        <Text style={styles.span}> {resultado.LASTUPDATE}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultado: {
    backgroundColor: '#5e49e2',
    padding: 20,
  },
  texto: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    marginBottom: 10,
  },
  precio: {
    fontSize: 28,
  },
  span: {
    fontFamily: 'Lato-Black',
  },
});

export default Cotizacion;
