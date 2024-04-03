import Input from "../../Shared/Form/Input";
import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native'
import FormContainer from "../../Shared/Form/FormContainer";
import { Button } from "native-base";
import { useNavigation } from '@react-navigation/native';
import Error from '../../Shared/Error'
import AuthGlobal from '../../Context/Store/AuthGlobal'
import { loginUser } from '../../Context/Actions/Auth.actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoginButton from "../../Shared/StyledComponents/EasyButton";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

import InputLog from '../../Shared/Form/InputLog';
import Header from "../../Shared/Header";

const Login = (props) => {
  const context = useContext(AuthGlobal)
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      navigation.navigate("User Profile")
    }
  }, [context.stateUser.isAuthenticated])
  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
      // console.log("error")
    }
  };
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (error, stores) => {
      stores.map((result, i, store) => {
        console.log({ [store[i][0]]: store[i][1] });
        return true;
      });
    });
  });

  const handleCreateAccount = () => {
    navigation.navigate("Register");
  };

  return (
    <FormContainer style={{ backgroundColor: '#FFFFFF' }}>
      <Header />
      <InputLog
        placeholder="Email"
        style={{ marginLeft: 20 }}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <InputLog
        placeholder={"Password"}
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={{ color: "#C49D19", marginTop: 10, marginBottom: 10, marginLeft: 200 }}>Forgot your password?</Text>
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        {/* <Button variant={"ghost"} onPress={() => handleSubmit()}>Login</Button> */}
        <LoginButton
          large
          login
          onPress={() => handleSubmit()}
        ><Text style={{ color: "white", fontWeight: 'bold' }}>Login</Text>
        </LoginButton>
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        {/* <Text style={styles.middleText}>Dont' Have an Account yet?</Text> */}
        {/* <Button variant={"ghost"} onPress={() => navigation.navigate("Register")} > Register</Button> */}
        {/* <EasyButton
          large
          secondary
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={{ color: "white" }}>Register</Text>
        </EasyButton> */}
      </View>
      <View style={[{ marginTop: 20 }, styles.buttonGroup]}>
        {/* <EasyButton large
          secondary
          onPress={() => navigation.navigate("Google")}>
          // <Text style={{ color: "white" }}>Sign in with Google</Text> 

        </EasyButton> */}
      </View>
      <Text style={{ color: "black", marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Don't have an account?</Text>
      <Text
        onPress={handleCreateAccount}
        style={[
          styles.registerButton,
          { color: "#C49D19", fontWeight: "bold", letterSpacing: 0, marginTop: 30 }
        ]}
      >
        Create new account
      </Text>
    </FormContainer>
  )
}
const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
  pageBackground: {
    backgroundColor: 'black',
  },
});
export default Login;