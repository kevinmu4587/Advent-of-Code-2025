import fs from "fs";

export function findLargestJolts(bank: string): number {
  let largestLeftSide = -1;
  let largestRightSide = -1;
  let largest = -1;
  for (const cell of bank) {
    const jolt = parseInt(cell);

    if (jolt > largest) {
      // If there is already a largest so far, save it for the left side and update the largest
      if (jolt !== -1) {
        largestLeftSide = largest;
        largest = jolt;
        largestRightSide = -1;
      }
    } else if (jolt > largestRightSide) {
      largestRightSide = jolt;
    }
  }
  
//   console.log('[largestLeftSide, largest, largestRightSide]', [largestLeftSide, largest, largestRightSide]);
  // Edge case: Largest number is at the end of the bank:
  if (largestRightSide === -1) {
    return parseInt(`${largestLeftSide}${largest}`);
  }
  return parseInt(`${largest}${largestRightSide}`);
}

function readFile(filename: string) {
    return fs.readFileSync(filename);
}

function sumLargestJoltsForAllBanks(input: string) {
  const banks = input.split("\n");
  let largestJoltSum = 0;
  for (const bank of banks) {
    const largestJolt = findLargestJolts(bank);
    largestJoltSum += largestJolt;
  }

  return largestJoltSum;
}

function main() {
  const fileName = process.argv[2];
  const input = readFile(fileName);
  const largestJolts = sumLargestJoltsForAllBanks(input.toString());
  console.log(largestJolts);
}

if (process.argv[2]) {
    main();
  }
  