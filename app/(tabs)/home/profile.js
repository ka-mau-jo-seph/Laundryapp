import React, { useState, useEffect } from "react";
import { Text, View, Button, TextInput, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged, updatePassword, signOut } from "firebase/auth";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

const Profile = () => {
  const [logoutError, setLogoutError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail("");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    if (!currentPassword) {
      Alert.alert("Password Required", "Please enter your current password to logout.");
      return;
    }

    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User logged out successfully");
        navigation.navigate("(authenticate)");
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
        setLogoutError("Failed to log out. Please try again.");
      });
  };

  const handleChangePassword = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(userEmail, currentPassword);

    // Reauthenticate the user
    reauthenticateWithCredential(user, credential)
      .then(() => {
        // User successfully reauthenticated, now update the password
        updatePassword(user, newPassword)
          .then(() => {
            console.log("Password updated successfully");
            setNewPassword("");
            setPasswordError("");
            // Show success message
            Alert.alert("Success", "Password changed successfully.");
          })
          .catch((error) => {
            console.error("Change password error:", error.message);
            setPasswordError("Failed to change password. Please try again.");
          });
      })
      .catch((error) => {
        console.error("Reauthentication error:", error.message);
        setPasswordError("Failed to authenticate. Please check your current password.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text>Email: {userEmail}</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        onChangeText={setCurrentPassword}
        value={currentPassword}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        onChangeText={setNewPassword}
        value={newPassword}
        secureTextEntry={true}
      />
      <View style={styles.buttonContainer}>
        <Button title="Change Password" onPress={handleChangePassword} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      {logoutError ? <Text style={styles.error}>{logoutError}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default Profile;
