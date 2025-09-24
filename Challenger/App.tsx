import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebaseConfig";

// Telas
import HomeScreen from "./App/HomeScreen";
import QrCodeScreen from "./App/QrCode";
import FormularioScreen from "./App/FormularioScreen";
import CadastrarUsuario from "./App/CadastrarUsuario";
import LoginUsuario from "./App/LoginUsuario";
import PerfilUsuario from "./App/PerfilUsuario"; // 👈 Import da tela de perfil

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Observa mudanças no login do usuário
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // salva o usuário logado
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Mostra loading enquanto verifica login
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Home */}
        <Stack.Screen
          name="Home"
          options={{ title: "Página Inicial", headerShown: false }}
        >
          {(props) => <HomeScreen {...props} user={user} />}
        </Stack.Screen>

        {/* Outras telas */}
        <Stack.Screen
          name="QrCode"
          component={QrCodeScreen}
          options={{ title: "QR Code" }}
        />
        <Stack.Screen
          name="Formulario"
          component={FormularioScreen}
          options={{ title: "Formulário de Suporte" }}
        />
        <Stack.Screen
          name="CadastrarUsuario"
          component={CadastrarUsuario}
          options={{ title: "Cadastrar Usuário" }}
        />
        <Stack.Screen
          name="LoginUsuario"
          component={LoginUsuario}
          options={{ title: "Login" }}
        />

        {/* ✅ Tela de Perfil */}
        <Stack.Screen
          name="PerfilUsuario"
          component={PerfilUsuario}
          options={{ title: "Perfil do Usuário" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
