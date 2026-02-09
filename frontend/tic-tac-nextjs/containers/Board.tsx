"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import FindLastSpot from "../functions/LastSpot";
import axios from "axios";

function Board() {
  const [playerOne, setPlayerOne] = useState<string>("X");
  const [playerTwo, setPlayerTwo] = useState<string>("O");
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const [boxes, getBoxes] = useState<(1 | 2 | null)[]>(Array(9).fill(null));
  const [choice, getChoice] = useState(0);
  const buttons = useRef<HTMLButtonElement[]>([]);
  useEffect(() => {
    if (choice == 0) {
      disableButtons();
    } else {
      enableButtons();
    }
  }, [choice]);
  useEffect(() => {
    for (let i: number = 0; i < 9; i++) {
      const button = buttons.current[i];
      if (boxes[i] === 1) {
        button.textContent = playerOne;
      } else if (boxes[i] === 2) {
        button.textContent = playerTwo;
      }
    }
  }, [playerOne, playerTwo, boxes]);
  useEffect(() => {
    if (
      choice == 2 &&
      isPlayer1Turn == false &&
      determineTies(boxes) == false &&
      determineWinner(boxes) == false
    ) {
      axiosLastSpot().then((square) => {
        computerMove(square - 1, boxes);
      });
    }
  }, [boxes, choice]);
  async function axiosLastSpot(): Promise<number> {
    let url: string = "http://localhost:3000/board?id=";
    for (let i: number = 0; i < boxes.length; i++) {
      if (boxes[i] == 2) {
        url += "o";
      } else if (boxes[i] == 1) {
        url += "x";
      } else {
        url += "-";
      }
    }
    let data: any;
    data = await axios.get(url);
    return data.data.square;
  }
  function determineWinner(squares: (1 | 2 | null)[]): boolean {
    let winners = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i: number = 0; i < winners.length; i++) {
      let winner: number[] = winners[i];
      if (
        squares[winner[0]] != null &&
        squares[winner[0]] == squares[winner[1]] &&
        squares[winner[1]] == squares[winner[2]]
      ) {
        disableButtons();
        return true;
      }
    }
    return false;
  }

  function determineTies(squares: (1 | 2 | null)[]): boolean {
    for (let i: number = 0; i < squares.length; i++) {
      if (squares[i] == null) {
        return false;
      }
    }
    if (determineWinner(boxes)) {
      return false;
    }
    disableButtons();
    return true;
  }
  function determineChoice(): boolean {
    if (choice == 1) {
      return true;
    } else {
      return false;
    }
  }

  function swap() {
    if (isPlayer1Turn == true) {
      setIsPlayer1Turn(false);
      return playerTwo;
    } else if (isPlayer1Turn == false) {
      setIsPlayer1Turn(true);
      return playerOne;
    }
    return playerOne;
  }
  function chooseColor(button: HTMLButtonElement | null) {
    if (isPlayer1Turn == true) {
      if (button) {
        button.style.background = "crimson";
      }
    } else {
      if (button) {
        button.style.background = "green";
      }
    }
  }
  function buttonSetUp(index: number, button: HTMLButtonElement): void {
    const newBoxes: (1 | 2 | null)[] = [...boxes];
    if (isPlayer1Turn == true) {
      newBoxes[index] = 1;
    } else if (isPlayer1Turn == false) {
      newBoxes[index] = 2;
    }
    getBoxes(newBoxes);
    chooseColor(button);
    if (isPlayer1Turn == true) {
      button.textContent = playerOne;
    } else {
      button.textContent = playerTwo;
    }
    swap();
    button.disabled = true;
  }
  function computerMove(index: number, boxes: (1 | 2 | null)[]) {
    let button: HTMLButtonElement | null = buttons.current[index];
    const newBoxes: (1 | 2 | null)[] = [...boxes];
    if (isPlayer1Turn == true) {
      newBoxes[index] = 1;
    } else if (isPlayer1Turn == false) {
      newBoxes[index] = 2;
    }
    getBoxes(newBoxes);
    if (button) {
      button.style.background = "green";
      if (isPlayer1Turn == true) {
        button.textContent = playerOne;
      } else {
        button.textContent = playerTwo;
      }
      button.disabled = true;
    }
    setIsPlayer1Turn(true);
  }
  function disableButtons() {
    for (let i: number = 0; i < 9; i++) {
      if (buttons.current[i]) {
        buttons.current[i].disabled = true;
      }
    }
  }
  function enableButtons() {
    for (let i: number = 0; i < 9; i++) {
      if (buttons.current[i]) {
        buttons.current[i].disabled = false;
      }
    }
  }
  function getPlayerName() {
    if (isPlayer1Turn) {
      return playerTwo;
    } else {
      return playerOne;
    }
  }
  const handleChangeP1 = (e: any) => {
    setPlayerOne(e.target.value);
  };
  const handleChangeP2 = (e: any) => {
    setPlayerTwo(e.target.value);
  };

  return (
    <div>
      <button
        className="PVPButton"
        id="winButton"
        onClick={(element) => {
          getChoice(1);
        }}
      >
        PVP
      </button>
      <button
        className="ComputerButton"
        onClick={(element) => {
          getChoice(2);
        }}
      >
        Computer
      </button>
      <div className="row1">
        <button
          className="Button"
          ref={(element) => {
            if (element) {
              buttons.current[0] = element;
            }
          }}
          onClick={(element) => buttonSetUp(0, element.currentTarget)}
        >
          {"1"}
        </button>
        <button
          className="Button"
          ref={(element) => {
            if (element) {
              buttons.current[1] = element;
            }
          }}
          onClick={(element) => buttonSetUp(1, element.currentTarget)}
        >
          {"2"}
        </button>
        <button
          className="Button"
          ref={(element) => {
            if (element) {
              buttons.current[2] = element;
            }
          }}
          onClick={(element) => buttonSetUp(2, element.currentTarget)}
        >
          {"3"}
        </button>
      </div>
      <div className="row1">
        <button
          className="Button"
          ref={(element) => {
            if (element) {
              buttons.current[3] = element;
            }
          }}
          onClick={(element) => buttonSetUp(3, element.currentTarget)}
        >
          {"4"}
        </button>
        <button
          className="Button"
          ref={(element) => {
            if (element) {
              buttons.current[4] = element;
            }
          }}
          onClick={(element) => buttonSetUp(4, element.currentTarget)}
        >
          {"5"}
        </button>
        <button
          className="Button"
          ref={(element) => {
            if (element) {
              buttons.current[5] = element;
            }
          }}
          onClick={(element) => buttonSetUp(5, element.currentTarget)}
        >
          {"6"}
        </button>
      </div>
      <div className="row1">
        <button
          className="Button"
          ref={(element) => {
            if (element) {
              buttons.current[6] = element;
            }
          }}
          onClick={(element) => buttonSetUp(6, element.currentTarget)}
        >
          {"7"}
        </button>
        <button
          className="Button"
          ref={(element) => {
            if (element) {
              buttons.current[7] = element;
            }
          }}
          onClick={(element) => buttonSetUp(7, element.currentTarget)}
        >
          {"8"}
        </button>
        <button
          className="Button"
          ref={(element) => {
            if (element) {
              buttons.current[8] = element;
            }
          }}
          onClick={(element) => buttonSetUp(8, element.currentTarget)}
        >
          {"9"}
        </button>
      </div>
      <div>
        <input
          name="player1"
          value={playerOne}
          onChange={handleChangeP1}
          placeholder="X"
        />
        <input
          name="player2"
          value={playerTwo}
          onChange={handleChangeP2}
          placeholder="O"
        />
      </div>
      <div>
        {determineWinner(boxes) && (
          <p className="winMessage">Congrats player {getPlayerName()}!</p>
        )}
        {determineTies(boxes) && (
          <p className="winMessage">there are better games to play ig</p>
        )}
      </div>
    </div>
  );
}
export default Board;
