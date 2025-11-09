import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/services/firebaseConfig";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/services/i18n";
import { useTranslation } from "react-i18next";

// Telas
import HomeScreen from "./App/HomeScreen";
import QrCodeScreen from "./App/QrCode";
import FormularioScreen from "./App/FormularioScreen";
import CadastrarUsuario from "./App/CadastrarUsuario";
import LoginUsuario from "./App/LoginUsuario";
import PerfilUsuario from "./App/PerfilUsuario";
import SobreApp from "./App/SobreApp"; 

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const AppContent = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: { animation: "timing", config: { duration: 350 } },
            close: { animation: "timing", config: { duration: 350 } },
          },
          gestureEnabled: true,
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          options={{ title: t("homeScreenTitle"), headerShown: false }}
        >
          {(props) => <HomeScreen {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen
          name="QrCode"
          component={QrCodeScreen}
          options={{ title: t("qrCodeScreenTitle"), headerShown: true }}
        />
        <Stack.Screen
          name="Formulario"
          component={FormularioScreen}
          options={{ title: t("formScreenTitle"), headerShown: true }}
        />
        <Stack.Screen
          name="CadastrarUsuario"
          component={CadastrarUsuario}
          options={{ title: t("registerUserScreenTitle"), headerShown: true }}
        />
        <Stack.Screen
          name="LoginUsuario"
          component={LoginUsuario}
          options={{ title: t("loginScreenTitle"), headerShown: true }}
        />
        <Stack.Screen
          name="PerfilUsuario"
          component={PerfilUsuario}
          options={{ title: t("profileScreenTitle"), headerShown: true }}
        />
        <Stack.Screen
          name="SobreApp"
          component={SobreApp}
          options={{ title: "Sobre o App", headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AppContent />
    </I18nextProvider>
  );
}
