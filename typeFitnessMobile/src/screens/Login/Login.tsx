import {
  View,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import database, { auth } from "../../config/firebase.config";
import { ref, get } from "firebase/database";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [handle, setHadnle] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const appAuth = auth;

  const loginUser = async () => {
    setLoading(true);

    const email: string = (
      await get(ref(database, `users/${handle}/email`))
    ).val();

    try {
      signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} color={"#0000ff"} />
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            autoCapitalize="none"
            onChangeText={(val) => setHadnle(val)}
          />
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Password"
            onChangeText={(val) => setPassword(val)}
          />
          <Button title="Login" onPress={loginUser} />
        </>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
});
