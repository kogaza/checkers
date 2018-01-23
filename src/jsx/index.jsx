import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board.jsx';
import Pawn from './Pawn.jsx';
import Field from './Field.jsx';
import Move from './Move.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: true, //gra aktywna
      whoMoves: 'green', //czyj ruch: gracz white (góra), gracz black (dół)
      selectedCell: false, //które pole jest kliknięte
      availableCells: [], //dostępne pola do ruchu dla zaznaczonego
      //opis figur na planszy
      board: [
        new Pawn(0, "white").getState(),
        null,
        new Pawn(2, "white").getState(),
        null,
        new Pawn(4, "white").getState(),
        null,
        new Pawn(6, "white").getState(),
        null,
        new Pawn(8, "white").getState(),
        null,
        new Pawn(10, "white").getState(),
        null,
        new Pawn(12, "white").getState(),
        null,
        new Pawn(14, "white").getState(),
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        new Pawn(7, "black").getState(),
        null,
        new Pawn(7, "black").getState(),
        null,
        new Pawn(7, "black").getState(),
        null,
        new Pawn(7, "black").getState(),
        null,
        new Pawn(7, "black").getState(),
        null,
        new Pawn(9, "black").getState(),
        null,
        new Pawn(10, "black").getState(),
        null,
        new Pawn(11, "black").getState(),
      ]
    }
  }


  clickPawn = (indexElem) => {
    // robimy kopien z aktualnego state
    const newState = JSON.parse(JSON.stringify(this.state));
    // sprawdzam czy zaznaczono odpowiedni knefel
    if (this.state.board[indexElem].player !== this.state.whoMoves) {
      return;
    }
    // czyszczenie selected i available
    newState.board = newState.board.map((pawn) =>
      pawn ?
        new Pawn(
          pawn.cellNumber,
          pawn.animal,
          pawn.player,
          false, false
        ).getState() :
        null
    );

    newState.selectedCell = false;
    
    const currentPawn = newState.board[indexElem];

    // ustawiamy selected elemen
    newState.selectedCell = indexElem;
    newState.board[indexElem] = new Pawn(
      currentPawn.cellNumber,
      currentPawn.animal,
      currentPawn.player,
      true, false
    ).getState();

    let canMove = this.state.board[indexElem].canMove;
    let availableCells = new Field(parseInt(indexElem)).availableCells;

    let canAvailableCells = [];
    for (let i = 0; i < canMove.length; i++) {
      for (let j = 0; j < availableCells.length; j++) {
        if (availableCells[j] === canMove[i]) {
          canAvailableCells.push(availableCells[j]);
        }
      }
    }

    let oneTeamPowns = [];
    for (let i = 0; i < this.state.board.length; i++) {
      if (this.state.board[i] !== null && this.state.board[i].player === this.state.board[indexElem].player) {
        oneTeamPowns.push(this.state.board[i].cellNumber);
      }
    }
    for (let i = 0; i < canAvailableCells.length; i++) {
      for (let j = 0; j < oneTeamPowns.length; j++) {
        if (oneTeamPowns[j] === canAvailableCells[i]) {
          let index = canAvailableCells.indexOf(oneTeamPowns[j]);
          canAvailableCells.splice(index, 1);
        }
      }
    }

    // ustawiamy available to move here
    canAvailableCells.forEach(id => {
      const pawn = newState.board[id];
      const newPawn = pawn ?
        new Pawn(
          pawn.cellNumber,
          pawn.animal,
          pawn.player,
          false, true
        ).getState() :
        { type: null, available: true, cellNumber: id }
      newState.board[id] = newPawn;
    })

    this.setState(newState);
  }
  
  moveHere = (here) => {
    // robimy kopie z aktualnego state
    const startState = JSON.parse(JSON.stringify(this.state));
    const newState = JSON.parse(JSON.stringify(this.state));
    
    newState.board = newState.board.map((pawn) =>
    pawn ?
      new Pawn(
        pawn.cellNumber,
        pawn.animal,
        pawn.player,
        false, false
      ).getState() :
      null
    );

    //superChicken
    if(
      pawnToMove.animal === "chicken" && 
      pawnToMove.player === "green" &&
      (here === 0 || here === 1 || here === 2)
    ){
      pawnToMove.animal = "superChicken";
    }
    if(
      pawnToMove.animal === "chicken" && 
      pawnToMove.player === "blue" &&
      (here === 9 || here === 10 || here === 11)
    ){
      pawnToMove.animal = "superChicken";
    }

    const newPawn = 
      new Pawn(
        here,
        pawnToMove.animal,
        pawnToMove.player,
        false, false
      ).getState()

    newState.board[here].player = newState.board[here].player == "green" ? "blue" : "green";
    if(newState.board[here].animal === "superChicken"){
      newState.board[here].animal = "chicken";
    }
    if(newState.board[here].animal === "lion"){
      alert(`Koniec gry - ${newState.whoMoves} wygrali`);
      location.reload();
    }
    
    newState.whoMoves = newState.whoMoves == "green" ? "blue" : "green"; 
    newState.selectedCell = false;

    this.setState(newState);
  }

  render() {
    return (
      <Board
        game={this.state.board}
        // whoMoves={this.state.whoMoves}
        // clickPawn={(id) => this.clickPawn(id)}
        // moveHere={(here) => this.moveHere(here)}
      />

    )
  }
}

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
});