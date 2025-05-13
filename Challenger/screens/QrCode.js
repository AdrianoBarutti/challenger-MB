import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function QrCode() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela do Escaneador de QR Code</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
});
