"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import { Separator } from "@/components/ui/separator";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpIcon } from "lucide-react";
import React, { useState } from "react";
import { ZeButton } from "./button";
import {
  getPlayers,
  createPlayer,
  deletePlayer as deletePlayerAPI,
  Player,
  PlayerResponse,
} from "@/app/client/api";

const TodoList = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerSport, setPlayerSport] = useState("");
  const [players, setPlayers] = useState<PlayerResponse[]>([]);
  const [error, setError] = useState<string>("");

  const fetchPlayers = async () => {
    const players = await getPlayers();
    setPlayers(players as PlayerResponse[]);
  };

  const addPlayer = async () => {
    console.log({ name: playerName, sport: playerSport });
    const player = await createPlayer({ name: playerName, sport: playerSport });
    if (player.error) {
      setError(player.error);
    } else {
      setPlayerName("");
      setPlayerSport("");
    }

    fetchPlayers();
  };

  const deletePlayer = async (player_id: number) => {
    await deletePlayerAPI(player_id);
    setPlayers(players.filter((player) => player.id !== player_id));
    fetchPlayers();
  };

  React.useEffect(() => {
    fetchPlayers();
  }, [setPlayers]);

  const resetInput = () => {
    setPlayerName("");
    setPlayerSport("");
  };

  const sports = [
    { name: "Tennis", value: "tennis" },
    { name: "Football", value: "football" },
    { name: "Padel", value: "padel" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <InputGroup>
        <InputGroupTextarea
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Add a sport player"
        />
        <InputGroupAddon align="block-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="ghost">Sport</InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              className="[--radius:0.95rem]"
            >
              {sports.map((sport) => (
                <DropdownMenuItem
                  key={sport.value}
                  onClick={() => setPlayerSport(sport.value)}
                >
                  {sport.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupText className="ml-auto">
            <button className="hover:cursor-pointer" onClick={resetInput}>
              reset
            </button>
          </InputGroupText>
          <Separator orientation="vertical" className="!h-4" />
          <InputGroupButton
            variant="default"
            className="rounded-full hover:cursor-pointer"
            size="icon-xs"
            disabled={!playerName || !playerSport}
            onClick={addPlayer}
          >
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <div className="flex flex-wrap gap-4">
        {error && <p className="text-red-500">{error}</p>}
        {players.map((player) => (
          <ZeButton
            key={player.id}
            text={player.name}
            onClick={() => deletePlayer(player.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
