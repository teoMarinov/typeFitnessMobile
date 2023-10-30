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

  const setUser = useContext(AuthContext);

  const errorMessage = (message: string) => {
    alert(message);
    setLoading(false);
  };

  const onLogin = async () => {
    setLoading(true);
    if (!handle) return errorMessage("Please enter a username!");
    if (!password) return errorMessage("Please enter a password");

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
        return errorMessage("Wrong password!");
      }
      if (error.message.includes("User not found")) {
        return errorMessage("User not found!");
      }
      if (error.message.includes("too-many-requests")) {
        return errorMessage("Too many request. Try again later!");
      }
    }
    setLoading(false);
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
