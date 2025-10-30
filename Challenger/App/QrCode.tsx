import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useTranslation } from "react-i18next";
import { MotiView } from 'moti'; 


const QrCode = () => {
  const { t } = useTranslation();
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
        <Text style={styles.centeredText}>{t("cameraPermissionRequesting")}</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>{t("cameraPermissionDenied")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isScanning ? (
        // 2. ÁREA DE SCANNING: Animação de entrada e Loop
        <MotiView 
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 1000 }}
          style={styles.scannerArea}
        >
          <Text style={styles.scanText}>{t("scanningQrCode")}</Text>
          <ActivityIndicator size="large" color="#28a745" />
        </MotiView>
      ) : (
        // 3. ÁREA DE RESULTADO: Animação de resultado "celebrando" a vaga encontrada
        <MotiView 
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', duration: 800, delay: 100 }}
          style={styles.resultArea}
        >
          <Text style={styles.resultText}>{t("qrCodeRecognized")}</Text>
          
          {/* Animação extra para a VAGA */}
          <MotiView
            from={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: 400, stiffness: 200, damping: 10 }}
          >
            <Text style={styles.vagaText}>
              {t("yourParkingSpace")}
              <Text style={styles.vaga}>{vaga}</Text>
            </Text>
          </MotiView>

        </MotiView>
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
  // Adiciona a cor de texto para garantir que as mensagens de permissão sejam visíveis
  centeredText: {
      color: '#fff', 
      textAlign: 'center'
  }
});

export default QrCode;