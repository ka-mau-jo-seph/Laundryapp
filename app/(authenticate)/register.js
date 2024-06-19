import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, KeyboardAvoidingView, TextInput, Animated } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity

  const router = useRouter();

  useEffect(() => {
    // Run the fade-in animation when component mounts
    Animated.timing(fadeAnim, {
      toValue: 3, 
      duration: 3000, 
      useNativeDriver: true, 
    }).start();
  }, []);

  const handleRegister = async () => {
    // Clear any existing error message
    setError("");

    // Input validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("user credential", userCredential);
          const user = userCredential.user.email;
          const myUserUid = auth.currentUser.uid;

          sendEmailVerification(auth.currentUser).then((response) => {
            console.log(response);
            console.log("Email verification sent to the user");
          });

          setDoc(doc(db, "users", `${myUserUid}`), {
            email: user,
          });

          // Clear input fields
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          // Handle errors
          console.error("Registration error:", error.message);
          setError("There was an issue with registration. Please try again.");
        });
    } catch (error) {
      // Handle errors
      console.error("Registration error:", error.message);
      setError("There was an issue with registration. Please try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View style={{ height: 200, backgroundColor: "#FFF", width: "100%" }}>
        <View style={{ marginTop: 25, justifyContent: "center", alignItems: "center" }}>
          <Animated.Text style={[styles.logoText, { opacity: fadeAnim }]}>M-Dhobi</Animated.Text>
        </View>
        <Text style={{ marginTop: 20, textAlign: "center", fontSize: 20, fontWeight: "bold", color: "white" }}>Wash Wizard</Text>
      </View>
      
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25, color: "#007FFF" }}>Register  your Account</Text>
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
          
        </View>

        <View style={{ marginTop: 50 }} />

        <Pressable onPress={handleRegister} style={{ width: 200, backgroundColor: "#007FFF", borderRadius: 6, marginLeft: "auto", marginRight: "auto", padding: 15 }}>
          <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", color: "white" }}>Register</Text>
        </Pressable>

        <Pressable onPress={() => router.replace("/login")} style={{ marginTop: 12 }}>
          <Text style={{ textAlign: "center", fontSize: 15 }}>Already have an account? Sign In</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    fontStyle: "italic",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#0066b2",
    marginTop:70,
  },
});
