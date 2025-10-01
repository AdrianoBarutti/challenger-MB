import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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

const Stack = createNativeStackNavigator();

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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ title: t("homeScreenTitle"), headerShown: false }}
        >
          {(props) => <HomeScreen {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen
          name="QrCode"
          component={QrCodeScreen}
          options={{ title: t("qrCodeScreenTitle") }}
        />
        <Stack.Screen
          name="Formulario"
          component={FormularioScreen}
          options={{ title: t("formScreenTitle") }}
        />
        <Stack.Screen
          name="CadastrarUsuario"
          component={CadastrarUsuario}
          options={{ title: t("registerUserScreenTitle") }}
        />
        <Stack.Screen
          name="LoginUsuario"
          component={LoginUsuario}
          options={{ title: t("loginScreenTitle") }}
        />
        <Stack.Screen
          name="PerfilUsuario"
          component={PerfilUsuario}
          options={{ title: t("profileScreenTitle") }}
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