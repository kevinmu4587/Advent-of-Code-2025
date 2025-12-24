import fs from "fs";

type GridCount = Record<number, Record<number, number>>;

class Grid {
  private gridCount: GridCount;
  public readonly numRows: number;
  public readonly numCols: number;
  private grid: string[][];

  constructor(input: string) {
    const rows = input.split("\n");
    this.numRows = rows.length;
    this.numCols = rows[0].length;
    this.grid = rows.map((row) => row.split(""));
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

  private incrementGridCount(row: number, col: number, value: number = 1): void {
    if (row < 0 || col < 0 || row >= this.numRows || col >= this.numCols) {
      return;
    }
    if (this.gridCount[row] && this.gridCount[row][col] !== undefined) {
      this.gridCount[row][col] += value;
    }
  }

  incrementNeighborCounts(row: number, col: number, value: number = 1): void {
    this.incrementGridCount(row - 1, col - 1, value);
    this.incrementGridCount(row - 1, col, value);
    this.incrementGridCount(row - 1, col + 1, value);
    this.incrementGridCount(row, col - 1, value);
    this.incrementGridCount(row, col + 1, value);
    this.incrementGridCount(row + 1, col - 1, value);
    this.incrementGridCount(row + 1, col, value);
    this.incrementGridCount(row + 1, col + 1, value);
  }

  removeRoll(row: number, col: number): void {
    this.grid[row][col] = ".";
    // Update surrounding neighbour counts
    this.incrementNeighborCounts(row, col, -1);
  }

  getCount(row: number, col: number): number {
    return this.gridCount[row]?.[col] ?? 0;
  }

  isRoll(row: number, col: number): boolean {
    return this.grid[row]?.[col] === "@";
  }

  getAccessibleRolls(): [number, number][] {
    const accessibleRolls: [number, number][] = [];
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        if (this.isRoll(i, j) && this.getCount(i, j) < 4) {
          accessibleRolls.push([i, j]);
        }
      }
    }
    return accessibleRolls;
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
  let accessibleRolls = grid.getAccessibleRolls();
  let totalRollsRemoved = 0;

  while (accessibleRolls.length > 0) {
    totalRollsRemoved += accessibleRolls.length;
    for (const [row, col] of accessibleRolls) {
      grid.removeRoll(row, col);
    }
    accessibleRolls = grid.getAccessibleRolls();
  }
  return totalRollsRemoved;
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
