import { useState, useEffect } from "react";
import {
  PlayerResponse,
  getPlayers,
  createPlayer,
  deletePlayer as deletePlayerAPI,
} from "@/app/client/api";

export const usePlayers = () => {
  const [players, setPlayers] = useState<PlayerResponse[]>([]);
  const [error, setError] = useState<string>("");
  const [playerName, setPlayerName] = useState("");
  const [playerSport, setPlayerSport] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlayers = async () => {
    setIsLoading(true);
    try {
      const playersData = await getPlayers();
      if (typeof playersData === "string") {
        setError(playersData);
      } else {
        setPlayers(playersData as PlayerResponse[]);
        setError("");
      }
    } catch {
      setError("Failed to fetch players");
    } finally {
      setIsLoading(false);
    }
  };

  const addPlayer = async () => {
    if (!playerName || !playerSport) return;

    setIsLoading(true);
    try {
      const result = await createPlayer({
        name: playerName,
        sport: playerSport,
      });
      if (typeof result === "string") {
        setError(result);
      } else if (result.error) {
        setError(result.error);
      } else {
        setPlayerName("");
        setPlayerSport("");
        setError("");
        await fetchPlayers(); // Refresh the list
      }
    } catch {
      setError("Failed to create player");
    } finally {
      setIsLoading(false);
    }
  };

  const deletePlayer = async (playerId: number) => {
    setIsLoading(true);
    try {
      const result = await deletePlayerAPI(playerId);
      if (typeof result === "string") {
        setError(result);
      } else {
        setError("");
        await fetchPlayers(); // Refresh the list
      }
    } catch {
      setError("Failed to delete player");
    } finally {
      setIsLoading(false);
    }
  };

  const resetInput = () => {
    setPlayerName("");
    setPlayerSport("");
  };

  const clearError = () => {
    setError("");
  };

  // Fetch players on mount
  useEffect(() => {
    fetchPlayers();
  }, []);

  return {
    // State
    players,
    error,
    playerName,
    playerSport,
    isLoading,

    // Setters
    setPlayerName,
    setPlayerSport,
    setError,

    // Actions
    addPlayer,
    deletePlayer,
    fetchPlayers,
    resetInput,
    clearError,
  };
};
