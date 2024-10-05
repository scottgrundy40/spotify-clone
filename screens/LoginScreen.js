import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  makeRedirectUri,
  useAuthRequest,
  ResponseType,
} from "expo-auth-session";

const LoginScreen = () => {
  const SIGN_IN_SPOTIFY = "Sign in with Spotify";
  const SIGN_IN_GOOGLE = "Sign in with Google";
  const SIGN_IN_FACEBOOK = "Sign in with Facebook";
  const SIGN_IN_PHONE_NUMBER = "Continue with phone number";
  const navigation = useNavigation();

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "hidden",
      clientSecret: "hidden",
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public", // or "playlist-modify-private"
      ],
      usePKCE: false,
      redirectUri: "exp://localhost:19002/--/spotify-auth-callback",
    },
    discovery
  );

  const storeData = async (access_token) => {
    try {
      await AsyncStorage.setItem("token", access_token);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      console.log("accessToken", access_token);
      navigation.navigate("main");

      storeData(access_token);
    }
  }, [response]);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Entypo
          name="spotify"
          size={80}
          color="white"
          style={{
            textAlign: "center",
          }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Millions of Songs Free on Spotify!
        </Text>

        <View style={{ height: 80 }} />
        <View style={{ gap: 20 }}>
          <Pressable
            onPress={() => promptAsync()}
            style={{
              backgroundColor: "#1DB954",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              width: 300,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>{SIGN_IN_SPOTIFY}</Text>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: "#131624",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              width: 300,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              borderColor: "#C0C0C0",
              borderWidth: 0.8,
            }}
          >
            <MaterialIcons name="phone-iphone" size={24} color="white" />
            <Text
              style={{
                fontWeight: 500,
                color: "white",
                textAlign: "center",
                flex: 1,
              }}
            >
              {SIGN_IN_PHONE_NUMBER}
            </Text>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: "#131624",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              width: 300,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              borderColor: "#C0C0C0",
              borderWidth: 0.8,
            }}
          >
            <AntDesign name="google" size={24} color="red" />
            <Text
              style={{
                fontWeight: 500,
                color: "white",
                textAlign: "center",
                flex: 1,
              }}
            >
              {SIGN_IN_GOOGLE}
            </Text>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: "#131624",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              width: 300,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              borderColor: "#C0C0C0",
              borderWidth: 0.8,
            }}
          >
            <Entypo name="facebook" size={24} color="lightblue" />
            <Text
              style={{
                fontWeight: 500,
                color: "white",
                textAlign: "center",
                flex: 1,
              }}
            >
              {SIGN_IN_FACEBOOK}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
