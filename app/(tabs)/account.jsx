import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useUser } from "../../context/userContext";
import { loginToWooCommerce } from '../../api/api';

const AccountScreen = () => {
  const { user, login, logout } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const { token, user } = await loginToWooCommerce(email, password);
      login({ token, user });
    } catch (error) {
      setError(error.message);
    }
  };
  
  

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Witaj, {user.name}!</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Wyloguj się</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Logowanie</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Zaloguj się</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 16 },
    loginButton: { backgroundColor: "#007bff", padding: 12, borderRadius: 4 },
    loginButtonText: { color: "#fff", textAlign: "center" },
    errorText: { color: "red", marginBottom: 8 },
    welcomeText: { fontSize: 20, marginBottom: 16 },
    logoutButton: { backgroundColor: "red", padding: 12, borderRadius: 4 },
    logoutButtonText: { color: "#fff", textAlign: "center" },
  });
  
export default AccountScreen