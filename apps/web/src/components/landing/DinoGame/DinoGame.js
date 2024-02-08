"use client";

import React, { useEffect, useRef, useState } from "react";
import { Rubik_Burned } from "next/font/google";
import "./Dino.css";

const rubik_burned = Rubik_Burned({ subsets: ["latin"], weight:'400' });
// Partial Credit for collision detection: https://www.codinn.dev/projects/react-dinosaur-game
function Dino() {
  // Font for the game part
  
  const dinoRef = useRef();
  const ObstacleRef = useRef();
  const [score, setScore] = useState(0);
  const [gameStarted,setGameStarted] = useState(false);
  const[gameOver,setGameOver] = useState(false);
  const[highscore,setHighscore] = useState(0);
  const[newHighScore,setNewHighScore] = useState(false)
  
  const startGame = ()=>{setGameStarted(true);}

  const endGame = ()=>{
    console.log("Game over!");
    setGameOver(true);
    if (score > highscore){
      setNewHighScore(true);
      setHighscore(score);
    }
    ObstacleRef.current.classList.remove("block");
    setTimeout(()=>{
      setScore(0);
      setHighscore(false);
      setGameOver(false);
      setGameStarted(false);
    },2000);
  }
  const jump = (e) => {
    e.preventDefault();
    if (e.key === 'j' && gameStarted){
      if (!!dinoRef.current && dinoRef.current.classList != "jump") {
        dinoRef.current.classList.add("jump");
        setTimeout(function () {
          dinoRef.current.classList.remove("jump");
        }, 300);
      }
    }
  };

  const moveCactus = (e)=>{
    if (!!ObstacleRef.current && gameStarted && ObstacleRef.current.classList != "block"){
      console.log("Adding to cactus list!");
      ObstacleRef.current.classList.add("block");
    }
  }

  useEffect(() => {
    const isAlive = setInterval(function () {
      // get current dino Y position
      if (gameStarted && !gameOver){
        const dinoTop = parseInt(
          getComputedStyle(dinoRef.current).getPropertyValue("top")
        );

        // get current cactus X position
        let cactusLeft = parseInt(
          getComputedStyle(ObstacleRef.current).getPropertyValue("left")
        );

        // detect collision
        if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) {
          // collision
          endGame();
          
        } else {
          setScore(score + 1);
        }
      }
    }, 10);

    return () => clearInterval(isAlive);
  });
  // Useeffect for adding the jump key
  useEffect(() => {
    document.addEventListener("keydown", jump);
    return () => document.removeEventListener("keydown", jump);
  }, [gameStarted]);
  // Use effect for activating the cactus
  useEffect(()=>{
    if (gameStarted){
      moveCactus();
    }
  },[gameStarted]);

  // Detect when to start game
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "s" && !gameStarted) {
        startGame();
      }
    });
    return () => document.removeEventListener("keydown", startGame);
  }, [gameStarted]);

  return (
    <div className={`game text-[#FEF2E6] ${rubik_burned.className}`}>
      {gameStarted ? (
        <>
          <div className="w-full h-auto flex justify-between items-start">
            <h1 className={`pl-2 `}>{`Score : ${score}`}</h1>
            <h1 className={`pl-2 `}>{`High Score : ${highscore}`}</h1>
          </div>
        </>
      ) : (
        <div className="flex flex-col h-full w-full justify-center items-center text-5xl">
          <h1 className={`  ${rubik_burned.className}`}>
            Press <span className="text-[#A88567] text-5xl font-bold">S</span>{" "}
            To Start
          </h1>
          <h1>
            Press <span className="text-[#A88567] font-bold">J</span> to Jump!
          </h1>
        </div>
      )}

      {gameOver ? (
        <div className="relative w-full h-full">
          <h1 className={`game-over ${rubik_burned.className}`}>Game Over!</h1>
          {highscore ? (
            <h1 className={`highscore ${rubik_burned.className}`}>
              New High Score : {highscore}
            </h1>
          ) : null}
        </div>
      ) : null}

      {/* Add highscore functionality */}
      {/* Set a bit of offset for different obstacles and when they spawn */}
      <div id="dino" ref={dinoRef}></div>
      <div id="cactus" ref={ObstacleRef}></div>
    </div>
  );
}

export default Dino;
