import React from 'react';
import ReactDOM from 'react-dom';
import Field from "./Field.jsx";

class Board extends React.Component{
  
  handleClickPawn = (pawn) => {
    if (pawn) {
        if(pawn.available === true){
          this.props.moveHere(pawn.cellNumber);
        }
        else {
          this.props.clickPawn(pawn.cellNumber);
        }
    }
  }

  render(){

    let fieldIndex = 0;
    let rowNumber = 8;
    let boardFields = [];
    let startState = this.props.state;
    let fields = this.props.game;
    let row = 0;
    
    for(let i=0; i<8; i++){
      
      // if(i==0){
      //   boardFields.push(  <tr className="row">
      //               <td></td>
      //               <td className="cell-label">A</td>
      //               <td className="cell-label">B</td>
      //               <td className="cell-label">C</td>
      //               <td className="cell-label">D</td>
      //               <td className="cell-label">E</td>
      //               <td className="cell-label">F</td>
      //               <td className="cell-label">G</td>
      //               <td className="cell-label">H</td>
      //             </tr>
      //           );
      // }else{

        boardFields.push(  <tr className="row">
                    <td>{rowNumber--}</td>
                    {
                      fields.filter((v,i) => (i>=fieldIndex && i<fieldIndex+8) )
                          .map( (p,i) => {
                            fieldIndex += 1;
                            
                            if(fieldIndex%8 === 1) {
                              row++;
                              console.log("row =",row);
                            }
                            
                            if((fieldIndex-row)%2 === 0){
                              console.log("index =", fieldIndex);
                              return (
                                <td 
                                key = {i}
                                data-index = {fieldIndex}
                                className={"cell white"}
                                />
                              )
                            } else {
                              // fieldIndex += 1;
                              // if(fieldIndex%8 === 1) row ++;
                            
                              // console.log(row);
                              return(
                                <td
                                key = {i}
                                data-index = {fieldIndex}
                                className={"cell black"}
                                />
                              )
                            }

                          // if( p === null || p.type === null){
                          //   return (
                          //       <td 
                          //       key={i} 
                          //       data-index={fieldIndex+i}
                          //       className={"cell white"}

                          //       // className={`cell ${p && p.available ? 
                          //       //   (this.props.whoMoves === "white" ? 
                          //       //     'cell-available-white' :
                          //       //     'cell-available-black' ) : ''}`}
                          //       onClick={() => this.handleClickPawn(p)}/>
                          //   );
                          // }else{
                            
                          //   let classes = "animal " + p.classes.join(' ');
                          //   let moves = "cell black";
                          //   if(this.props.whoMoves === p.player){
                          //     moves += " cell-move";
                          //   }

                          //   if(p.selected === true){
                          //     moves += " cell-selected";
                          //   }
                          //   if(p.available === true){
                          //     if(this.props.whoMoves === "white"){
                          //       moves += " cell-available-white";
                          //     }else {
                          //       moves += " cell-available-black";
                          //     }
                          //   }
                                
                          //   return <td key={i} data-index={fieldIndex+i} className={moves} 
                          //   onClick={() => this.handleClickPawn(p)}>
                                
                          //     </td>;
                          // }
                          })
                     
                    }
                  </tr>
                );
        // fieldIndex +=8;
              }
        
          boardFields.push(  <tr className="row">
                      <td></td>
                      <td className="cell-label">A</td>
                      <td className="cell-label">B</td>
                      <td className="cell-label">C</td>
                      <td className="cell-label">D</td>
                      <td className="cell-label">E</td>
                      <td className="cell-label">F</td>
                      <td className="cell-label">G</td>
                      <td className="cell-label">H</td>
                    </tr>
                  );
        
      
    

    let board = <div className="container"> 
            <div className="wrapper">
              <table className="game-box">
                <tbody>{boardFields}</tbody>
              </table>
              <h1>Checkers</h1>
            </div>
          </div>;

    return  board;

  }
}

Board.propTypes = {
    moveHere: React.PropTypes.func,
    clickPawn: React.PropTypes.func
}

module.exports = Board;