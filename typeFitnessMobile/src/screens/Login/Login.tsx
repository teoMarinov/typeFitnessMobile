import {
  View,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contenxt/AuthContext";
import { auth } from "../../config/firebase.config";
import { loginUser } from "../../service/auth-service";

const Login = () => {
  const [handle, setHadnle] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const appAuth = auth;

  const [error, setError] = useState("");

  const setUser = useContext(AuthContext);

  const onLogin = async () => {
    if (!handle) return setError("Please enter a username!");
    if (!password) return setError("Please enter a password");

    try {
      const credential: any = await loginUser(handle, password);
      {
        setUser;
      }
      ({
        user: credential.user,
      });
    } catch (error: any) {
      console.log(error.message);
      if (error.message.includes("wrong-password")) {
        return setError("Wrong password!");
      }
      if (error.message.includes("User not found")) {
        return setError("User not found!");
      }
      if (error.message.includes("too-many-requests")) {
        return setError("Too many request. Try again later!");
      }
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
          <Button title="Login" onPress={onLogin} />
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
