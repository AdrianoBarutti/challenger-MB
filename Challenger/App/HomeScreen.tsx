import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth } from "../services/firebaseConfig";
import { signOut } from "firebase/auth";

export default function HomeScreen({ navigation }: any) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const scheme = useColorScheme();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setIsDarkMode(scheme === "dark");
  }, [scheme]);

  // Atualiza o usuário logado
  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Usuário deslogado com sucesso");
        setUser(null);
        Alert.alert("Logout", "Você saiu da conta com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao deslogar:", error);
        Alert.alert("Erro", "Não foi possível deslogar.");
      });
  };

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/mottu-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {user ? (
          <Image
            source={{
              uri:
                user.photoURL ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={styles.avatar}
          />
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("QrCode")}
        >
          <Text style={styles.buttonText}>Escanei Aqui</Text>
        </TouchableOpacity>

        {/* Botão para Cadastrar Usuário */}
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => navigation.navigate("CadastrarUsuario")}
        >
          <Text style={styles.buttonText}>Cadastrar Usuário</Text>
        </TouchableOpacity>

        {/* Botão para Login */}
        {!user && (
          <TouchableOpacity
            style={[styles.button, { marginTop: 10, backgroundColor: "#007bff" }]}
            onPress={() => navigation.navigate("LoginUsuario")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}

        {/* Botão de Logout */}
        {user && (
          <TouchableOpacity
            style={[styles.button, { marginTop: 10, backgroundColor: "#dc3545" }]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Botão de alternar tema */}
      <TouchableOpacity
        style={[
          styles.toggleButton,
          isDarkMode ? styles.darkToggleButton : styles.lightToggleButton,
        ]}
        onPress={toggleTheme}
      >
        <Ionicons
          name={isDarkMode ? "moon" : "sunny"}
          size={25}
          color={isDarkMode ? "#fff" : "#222"}
        />
      </TouchableOpacity>

      <StatusBar style={isDarkMode ? "light" : "dark"} />
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
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  logo: { width: 60, height: 60 },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  loginText: { color: "#fff", fontSize: 14, textAlign: "center" },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#28a745",
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 30 },
  helpButton: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30,
    width: "100%",
    marginBottom: 10,
  },
  helpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
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
