import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const useGetTopArtist = () => {
  const [topArtist, setTopArtist] = useState([]);

  useEffect(() => {
    const fetchTopArtist = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("token");
        const type = "artists";
        const response = await axios({
          method: "GET",
          url: `https://api.spotify.com/v1/me/top/${type}?limit=6`,
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });

        setTopArtist(response.data.items);
        console.log(response.data.items);
      } catch (e) {
        console.log("error", e.message);
      }
    };
    fetchTopArtist();
  }, []);

  return topArtist;
};
