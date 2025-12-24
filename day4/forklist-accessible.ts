import fs from "fs";

type GridCount = Record<number, Record<number, number>>;

class Grid {
  private gridCount: GridCount;
  public readonly numRows: number;
  public readonly numCols: number;
  public readonly rows: string[];

  constructor(input: string) {
    this.rows = input.split("\n");
    this.numRows = this.rows.length;
    this.numCols = this.rows[0].length;
    this.gridCount = this.initializeGridCount();
  }

  private initializeGridCount(): GridCount {
    const gridCount: GridCount = {};
    for (let i = 0; i < this.numRows; i++) {
      gridCount[i] = {};
      for (let j = 0; j < this.numCols; j++) {
        gridCount[i][j] = 0;
      }
    }
    return gridCount;
  }

  private incrementGridCount(row: number, col: number): void {
    if (row < 0 || col < 0 || row >= this.numRows || col >= this.numCols) {
      return;
    }
    if (this.gridCount[row] && this.gridCount[row][col] !== undefined) {
      this.gridCount[row][col]++;
    }
  }

  incrementNeighborCounts(row: number, col: number): void {
    this.incrementGridCount(row - 1, col - 1);
    this.incrementGridCount(row - 1, col);
    this.incrementGridCount(row - 1, col + 1);
    this.incrementGridCount(row, col - 1);
    this.incrementGridCount(row, col + 1);
    this.incrementGridCount(row + 1, col - 1);
    this.incrementGridCount(row + 1, col);
    this.incrementGridCount(row + 1, col + 1);
  }

  getCount(row: number, col: number): number {
    return this.gridCount[row]?.[col] ?? 0;
  }

  isRoll(row: number, col: number): boolean {
    return this.rows[row]?.[col] === "@";
  }
}

function readFile(filename: string) {
  return fs.readFileSync(filename);
}

function countAccessibleRolls(input: string): number {
  const grid = new Grid(input);
  
  // First pass: For each @, increment counters for all its neighbors
  for (let i = 0; i < grid.numRows; i++) {
    for (let j = 0; j < grid.numCols; j++) {
      if (grid.isRoll(i, j)) {
        grid.incrementNeighborCounts(i, j);
      }
    }
  }

  // Second pass: For each @, check if its counter < 4
  let accessibleRolls = 0;
  for (let i = 0; i < grid.numRows; i++) {
    for (let j = 0; j < grid.numCols; j++) {
      if (grid.isRoll(i, j) && grid.getCount(i, j) < 4) {
        accessibleRolls++;
      }
    }
  }
  return accessibleRolls;
}

function main() {
  const fileName = process.argv[2];
  const input = readFile(fileName);
  const largestJolts = countAccessibleRolls(input.toString());
  console.log(largestJolts);
}

if (process.argv[2]) {
  main();
}
