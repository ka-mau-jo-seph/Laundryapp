import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  Animated,
  Easing,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const router = useRouter();

  const animatedOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: 10,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const token = user?.stsTokenManager.accessToken;

        AsyncStorage.setItem("auth", token);

        router.replace("/(tabs)/home");
      })
      .catch((error) => {
        let errorMessage = 'There was an issue logging in. Please check your email and password and try again.';
        setError(errorMessage);
      });
  };

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email to reset your password.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Password Reset", "A password reset email has been sent to your email address.");
      })
      .catch((error) => {
        Alert.alert("Error", "There was an issue sending the reset email. Please try again.");
        console.error(error.message);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View style={{ marginTop: 50 }}>
        <Animated.Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: "#007FFF",
            opacity: animatedOpacity,
            textTransform: "uppercase", 
            letterSpacing: 2, 
            fontStyle: "italic", 
          }}
        >
          M-Dhobi
        </Animated.Text>
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25, color: "#007FFF" }}>Log in to your Account</Text>
        </View>

        {error ? (
          <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>{error}</Text>
        ) : null}

        <View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#007FFF", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
            <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="white" />
            <TextInput value={email} onChangeText={(text) => setEmail(text)} style={{ color: "white", width: 300, marginVertical: 10, fontSize: email ? 17 : 17 }} placeholder="Enter your email" placeholderTextColor={"white"} />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#007FFF", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
            <AntDesign name="lock1" size={24} color="white" style={{ marginLeft: 8 }} />
            <TextInput secureTextEntry={!showPassword} value={password} onChangeText={(text) => setPassword(text)} style={{ color: "white", width: 260, marginVertical: 10, fontSize: password ? 17 : 17 }} placeholder="Enter your password" placeholderTextColor={"white"} />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <AntDesign name={showPassword ? "eye" : "eyeo"} size={24} color="white" />
            </Pressable>
          </View>
        </View>

        <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text>Keep me logged in</Text>
          <Text style={{ color: "#007FFF", fontWeight: "500" }} onPress={handleForgotPassword}>Forgot Password</Text>
        </View>

        <View style={{ marginTop: 50 }} />

        <Pressable onPress={handleLogin} style={{ width: 200, backgroundColor: "#007FFF", borderRadius: 6, marginLeft: "auto", marginRight: "auto", padding: 15 }}>
          <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", color: "white" }}>Login</Text>
        </Pressable>

        <Pressable onPress={() => router.replace("/register")} style={{ marginTop: 12 }}>
          <Text style={{ textAlign: "center", fontSize: 15 }}>Don't have an account? Sign up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
