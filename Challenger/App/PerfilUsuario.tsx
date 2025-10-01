import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../src/services/firebaseConfig";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";

export default function PerfilUsuario() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const loadUser = async () => {
      await auth.currentUser?.reload();
      setUser(auth.currentUser);
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert(t("successTitle"), t("logoutSuccess"));
      navigation.navigate("Home" as never);
    } catch (error) {
      Alert.alert(t("errorTitle"), t("logoutError"));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("profileTitle")}</Text>
      <Image
        source={{
          uri:
            user?.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        }}
        style={styles.profileImage}
      />
      <View style={styles.card}>
        <Text style={styles.label}>{t("nameLabel")}</Text>
        <Text style={styles.value}>{user?.displayName || t("noNameDefined")}</Text>
        <Text style={styles.label}>{t("emailLabel")}</Text>
        <Text style={styles.value}>{user?.email || t("noEmailDefined")}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>{t("logoutButton")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>{t("backButton")}</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#28a745",
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: 16,
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 15,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
