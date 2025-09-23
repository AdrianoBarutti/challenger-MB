import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HomeScreen({ navigation, user }: any) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const scheme = useColorScheme();

  useEffect(() => {
    setIsDarkMode(scheme === "dark");
  }, [scheme]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      {/* Header com logo e botão de login */}
      <View style={styles.header}>
        <Image source={require("../assets/mottu-logo.png")} style={styles.logo} resizeMode="contain" />
        
        {user ? (
          <TouchableOpacity onPress={() => navigation.navigate("PerfilUsuario")}>
            <Ionicons name="person-circle" size={40} color="#28a745" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("LoginUsuario")}
          >
            <Text style={styles.loginText}>Login / Cadastro</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#222" }]}>
          Precisa de um Help?
        </Text>
        <Text style={[styles.subtitle, { color: isDarkMode ? "#fff" : "#555" }]}>
          Clique logo abaixo para abrir um formulário com o suporte!
        </Text>

        {/* Botão Suporte */}
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => navigation.navigate("Formulario")}
        >
          <Text style={styles.helpButtonText}>Suporte</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#222" }]}>
          Onde deixo minha moto?
        </Text>
        <Text style={[styles.subtitle, { color: isDarkMode ? "#fff" : "#555" }]}>
          Clique no botão e vamos te ajudar com isto!
        </Text>

        {/* Botão QR Code */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("QrCode")}>
          <Text style={styles.buttonText}>Escanei Aqui</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de alternar tema */}
      <TouchableOpacity
        style={[styles.toggleButton, isDarkMode ? styles.darkToggleButton : styles.lightToggleButton]}
        onPress={toggleTheme}
      >
        <Ionicons
          name={isDarkMode ? "moon" : "sunny"}
          size={25}
          color={isDarkMode ? "#fff" : "#222"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  lightContainer: { backgroundColor: "#fff" },
  darkContainer: { backgroundColor: "#222" },
  header: {
    backgroundColor: "rgb(34, 34, 34)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  logo: { width: 80, height: 40 }, // Ajustado para não esticar
  loginButton: { alignItems: "center", justifyContent: "center", paddingHorizontal: 8 },
  loginText: { color: "#fff", fontSize: 14, textAlign: "center" },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 30 },
  helpButton: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30,
    width: "100%",
    marginBottom: 10,
  },
  helpButtonText: { color: "#fff", fontSize: 18, fontWeight: "600", textAlign: "center" },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30,
    width: "100%",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600", textAlign: "center" },
  toggleButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  lightToggleButton: { backgroundColor: "#28a745" },
  darkToggleButton: { backgroundColor: "#2c2c2c" },
});
