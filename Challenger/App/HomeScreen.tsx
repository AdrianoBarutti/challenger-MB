import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { MotiView } from "moti"; 


export default function HomeScreen({ navigation, user }: any) {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const scheme = useColorScheme();

  useEffect(() => {
    setIsDarkMode(scheme === "dark");
  }, [scheme]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  
  const mudarIdioma = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      
      {/* 2. HEADER - Envolvido por MotiView */}
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 100 }}
      >
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
              <Text style={styles.loginText}>{t("loginRegisterButton")}</Text>
            </TouchableOpacity>
          )}
        </View>
      </MotiView>
      
      {/* 3. BOTÕES DE IDIOMA - Envolvido por MotiView */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600, delay: 300 }} // Atraso em relação ao Header
        style={{ flexDirection: "row", justifyContent: "center", marginVertical: 15 }}
      >
        <TouchableOpacity
          style={[styles.botao, { marginRight: 10, backgroundColor: "#007bff" }]}
          onPress={() => mudarIdioma("pt")}
        >
          <Text style={styles.textoBotao}>PT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: "#28a745" }]}
          onPress={() => mudarIdioma("es")}
        >
          <Text style={styles.textoBotao}>ES</Text>
        </TouchableOpacity>
      </MotiView>

      {/* 4. CONTEÚDO PRINCIPAL - Envolvido por MotiView */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 700, delay: 500 }} // Atraso em relação aos Botões de Idioma
        style={styles.content} // Usamos o estilo existente
      >
        <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#222" }]}>
          {t("needHelpQuestion")}
        </Text>
        <Text style={[styles.subtitle, { color: isDarkMode ? "#fff" : "#555" }]}>
          {t("clickForSupportText")}
        </Text>
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => navigation.navigate("Formulario")}
        >
          <Text style={styles.helpButtonText}>{t("supportButton")}</Text>
        </TouchableOpacity>
        
        {/* Bloco secundário dentro do conteúdo, para animar separadamente */}
        <MotiView
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 700, delay: 700 }}
            style={{ width: '100%', alignItems: 'center' }}
        >
            <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#222" }]}>
              {t("whereToParkQuestion")}
            </Text>
            <Text style={[styles.subtitle, { color: isDarkMode ? "#fff" : "#555" }]}>
              {t("clickForHelpText")}
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("QrCode")}>
              <Text style={styles.buttonText}>{t("scanHereButton")}</Text>
            </TouchableOpacity>
        </MotiView>

      </MotiView>
      
      {/* 5. BOTÃO DE TEMA - Envolvido por MotiView com animação spring */}
      <MotiView
        from={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
            type: 'spring', 
            mass: 1,
            damping: 15,
            stiffness: 150,
            delay: 900,
        }}
        style={[styles.toggleButton, isDarkMode ? styles.darkToggleButton : styles.lightToggleButton]}
      >
        <TouchableOpacity onPress={toggleTheme}>
            <Ionicons
              name={isDarkMode ? "moon" : "sunny"}
              size={25}
              color={isDarkMode ? "#fff" : "#222"}
            />
        </TouchableOpacity>
      </MotiView>
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
  logo: { width: 80, height: 40 },
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
  // Adicione os estilos dos botões de idioma
  botao: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});