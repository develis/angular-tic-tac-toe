import { Injectable } from '@angular/core';

@Injectable()
export class TicTacToeService {
  private readonly matrix_size: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly empty: number = 0;

  private matrix: any;
  private moves: number;
  private win: any;

  private player: number;
  private beginScreen: boolean;
  private matrixScreen: boolean;
  private finalScreen: boolean;

  constructor() { }
  initialMatrix(): void {
    this.matrix = [this.matrix_size];
    for (var u = 0; u < this.matrix_size; u++) {
      this.matrix[u] = [this.empty, this.empty, this.empty];
    }
  }

  initialGame(): void {
    this.beginScreen = true;
    this.matrixScreen = false;
    this.finalScreen = false;
    this.moves = 0;
    this.player = this.X;
    this.win = false;
    this.initialMatrix();
  }

  get show_beginScreen(): boolean {
    return this.beginScreen;
  }

  get show_matrixScreen(): boolean {
    return this.matrixScreen;
  }

  get show_finalScreen(): boolean {
    return this.finalScreen;
  }

  get which_player(): number {
    return this.player;
  }

  gameStart(): void {
    this.beginScreen = false;
    this.matrixScreen = true;
  }

  play(axisX: number, axisY: number): void {
    if (this.matrix[axisX][axisY] !== this.empty || this.win) return;
    this.matrix[axisX][axisY] = this.player;
    this.moves++;
    this.win = this.endGame(axisX, axisY, this.matrix, this.player);
    this.player = (this.player === this.X) ? this.O : this.X;
    if (!this.win && this.moves < 9) this.computerPlays();
    if (this.win !== false) this.finalScreen = true;
    if (!this.win && this.moves === 9) {
      this.player = 0;
      this.finalScreen = true;
    }
  }

  getMove(player: number): number[] {
    var Matrix = this.matrix;
    for (var row = 0; row < this.matrix_size; row++) {
      for (var column = 0; column < this.matrix_size; column++) {
        if (Matrix[row][column] !== this.empty) continue;
        Matrix[row][column] = player;
        if (this.endGame(row, column, Matrix, player)) return [row, column]
        Matrix[row][column] = this.empty
      }
    }
    return [];
  }

  endGame(row: number, column: number, matrix: any, player: number) {
    var end: any = false;
    if (matrix[row][0] === player && matrix[row][1] === player && matrix[row][2] === player) end = [[row, 0], [row, 1], [row, 2]];
    if (matrix[0][column] === player && matrix[1][column] === player && matrix[2][column] === player) end = [[0, column], [1, column], [2, column]];
    if (matrix[0][0] === player && matrix[1][1] === player && matrix[2][2] === player) end = [[0, 0], [1, 1], [2, 2]];
    if (matrix[0][2] === player && matrix[1][1] === player && matrix[2][0] === player) end = [[0, 2], [1, 1], [2, 0]];
    return end;
  }

  computerPlays(): void {
    let Play: number[] = this.getMove(this.O);

    if (Play.length <= 0) {
      Play = this.getMove(this.X);
    }

    if (Play.length <= 0) {
      let Plays: any = [];
      for (let i = 0; i < this.matrix_size; i++) {
        for (let j = 0; j < this.matrix_size; j++) {
          if (this.matrix[i][j] === this.empty) {
            Plays.push([i, j]);
          }
        }
      }
      let k = Math.floor((Math.random() * (Plays.length - 1)));
      Play = [Plays[k][0], Plays[k][1]];
    }

    this.matrix[Play[0]][Play[1]] = this.player;
    this.moves++;
    this.win = this.endGame(Play[0], Play[1],
      this.matrix, this.player);
    this.player = (this.player === this.X) ? this.O : this.X;
  }

  show_X(axisX: number, axisY: number): boolean {
    return this.matrix[axisX][axisY] === this.X;
  }

  show_O(axisX: number, axisY: number): boolean {
    return this.matrix[axisX][axisY] === this.O;
  }

  show_win(axisX: number, axisY: number): boolean {
    let showWin: boolean = false;
    if (!this.win) {
      return showWin;
    }
    for (let pos of this.win) {
      if (pos[0] === axisX && pos[1] === axisY) {
        showWin = true;
        break;
      }
    }
    return showWin;
  }

  new_game(): void {
    this.initialGame();
    this.finalScreen = false;
    this.beginScreen = false;
    this.matrixScreen = true;
  }

}
