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
import { useState } from "react";
import { ZeButton } from "./button";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [players, setPlayers] = useState<string[]>([]);

  const resetInput = () => {
    setInput("");
  };

  const addPlayer = () => {
    setPlayers([...players, input]);
    setInput("");
  };

  const deletePlayer = (player: string) => {
    setPlayers(players.filter((p) => p !== player));
  };

  return (
    <div className="flex flex-col gap-4">
      <InputGroup>
        <InputGroupTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a sport player"
        />
        <InputGroupAddon align="block-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="ghost">priority</InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              className="[--radius:0.95rem]"
            >
              <DropdownMenuItem>low</DropdownMenuItem>
              <DropdownMenuItem>mid</DropdownMenuItem>
              <DropdownMenuItem>high</DropdownMenuItem>
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
            disabled={!input}
            onClick={addPlayer}
          >
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <div className="flex flex-wrap gap-4">
        {players.map((player) => (
          <ZeButton
            key={player}
            text={player}
            onClick={() => deletePlayer(player)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
