// screens/QrCode.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QrCodeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Escaneador de QR Code</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    color: '#000',
  },
});

export default QrCodeScreen;
