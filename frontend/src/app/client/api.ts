export const testBackend = async () => {
  try {
    const response = await fetch(`/api/ping`);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorBody}`
      );
    }

    const result = await response.json();
    return JSON.stringify(result);
  } catch (error) {
    console.error("Error testing backend:", error);
    return `Failed to connect to backend`;
  }
};

export const createPlayer = async (player: Player) => {
  try {
    const response = await fetch(`/player/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorBody}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating player:", error);
    return `Failed to create player`;
  }
};

export const getPlayers = async () => {
  try {
    const response = await fetch(`/player/players`);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorBody}`
      );
    }

    const result = await response.json();
    return result as PlayerResponse[];
  } catch (error) {
    console.error("Error getting players:", error);
    return `Failed to get players`;
  }
};

export const deletePlayer = async (player_id: number) => {
  try {
    const response = await fetch(`/player/delete/${player_id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorBody}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting player:", error);
    return `Failed to delete player`;
  }
};

export type Player = {
  name: string;
  sport: string;
};

export type PlayerResponse = {
  id: number;
  name: string;
  sport: string;
};
