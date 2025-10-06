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
import React from "react";
import { ZeButton } from "./button";
import { usePlayers } from "@/hooks/players";

const TodoList = () => {
  const {
    players,
    error,
    playerName,
    playerSport,
    setPlayerName,
    setPlayerSport,
    addPlayer,
    deletePlayer,
    resetInput,
  } = usePlayers();

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
              <InputGroupButton variant="ghost">
                {playerSport
                  ? sports.find((s) => s.value === playerSport)?.name || "Sport"
                  : "Sport"}
              </InputGroupButton>
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
                  className={playerSport === sport.value ? "bg-accent" : ""}
                >
                  <span className="flex items-center justify-between w-full">
                    {sport.name}
                    {playerSport === sport.value && (
                      <span className="ml-2 text-green-600">✓</span>
                    )}
                  </span>
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
