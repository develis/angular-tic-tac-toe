import { Component, OnInit } from '@angular/core';
import { TicTacToeService } from './shared';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {

  constructor(private tictactoeService: TicTacToeService) { }

  ngOnInit() {
    this.tictactoeService.initialGame();
  }

  get show_beginScreen(): boolean {
    return this.tictactoeService.show_beginScreen;
  }

  get show_matrixScreen(): boolean {
    return this.tictactoeService.show_matrixScreen;
  }

  get show_finalScreen(): boolean {
    return this.tictactoeService.show_finalScreen;
  }
  
  get which_player(): number{
    return this.tictactoeService.which_player;
  }

  gameStart(): void {
    this.tictactoeService.gameStart();
  }

  play(axisX: number, axisY: number): void{
    this.tictactoeService.play(axisX, axisY);
  }

  show_X(axisX: number, axisY: number): boolean {
    return this.tictactoeService.show_X(axisX, axisY);
  }

  show_O(axisX: number, axisY: number): boolean {
    return this.tictactoeService.show_O(axisX, axisY);
  }

  show_win(axisX: number, axisY: number): boolean{
    return this.tictactoeService.show_win(axisX, axisY);
  }

  new_game(): void{
    this.tictactoeService.new_game();
  }

}
