import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const QrCode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [vaga, setVaga] = useState(null);

  useEffect(() => {
    const simularLeituraQRCode = () => {
      setTimeout(() => {
        const vagaGerada = Math.floor(Math.random() * 200) + 1;
        setVaga(vagaGerada);
        setIsScanning(false);
      }, 4000);
    };

    const getCameraPermission = async () => {
      if (Platform.OS === 'web') {
        // Simula permissão concedida no navegador
        setHasPermission(true);
        simularLeituraQRCode();
      } else {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        if (status === 'granted') {
          simularLeituraQRCode();
        }
      }
    };

    getCameraPermission();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text>Solicitando permissão para a câmera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text>Permissão para a câmera negada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isScanning ? (
        <View style={styles.scannerArea}>
          <Text style={styles.scanText}>Escaneando QR Code...</Text>
          <ActivityIndicator size="large" color="#28a745" />
        </View>
      ) : (
        <View style={styles.resultArea}>
          <Text style={styles.resultText}> QR Code reconhecido!</Text>
          <Text style={styles.vagaText}>Sua vaga é: <Text style={styles.vaga}>{vaga}</Text></Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scannerArea: {
    alignItems: 'center',
  },
  scanText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  resultArea: {
    alignItems: 'center',
  },
  resultText: {
    color: '#28a745',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  vagaText: {
    fontSize: 18,
    color: '#fff',
  },
  vaga: {
    fontSize: 26,
    color: '#28a745',
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
});

export default QrCode;
