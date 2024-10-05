import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const useGetRecentlyPlayedSongs = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    const fetchRecentlyPlayedSongs = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("token");

        const response = await axios({
          method: "GET",
          url: "https://api.spotify.com/v1/me/player/recently-played?limit=10",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });

        const tracks = response.data.items;

        const uniqueTrackId = new Set();

        const filteredTracks = tracks.filter((tracks) => {
          if (uniqueTrackId.has(tracks.track?.id)) {
            return false;
          }
          uniqueTrackId.add(tracks.track?.id);
          return true;
        });

        setRecentlyPlayed(filteredTracks);
      } catch (e) {
        console.log("error", e.message);
      }
    };
    fetchRecentlyPlayedSongs();
  }, []);

  return recentlyPlayed;
};
