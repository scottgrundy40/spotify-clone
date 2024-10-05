import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useGetUserProfile = () => {
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("token");
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        const data = await response.json();
        setUserProfile(data);
        return data;
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchUserProfile();
  }, []);

  return userProfile;
};
