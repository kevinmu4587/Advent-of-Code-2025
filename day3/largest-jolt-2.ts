import fs from "fs";

export function findLargestJolts(bank: string): number {
  const numDigits = 12;
  const bankLength = bank.length;
  
  let result = "";
  let startPos = 0;
  let remainingDigits = numDigits;

  for (let i = 0; i < numDigits; i++) {
    // Calculate the range where we can pick the next digit
    // We need to leave (remainingDigits - 1) digits after our pick
    const endPos = bankLength - (remainingDigits - 1);
    
    // Find the largest digit in the available range
    let maxDigit = -1;
    let maxPos = -1;
    for (let j = startPos; j < endPos; j++) {
      const digit = parseInt(bank[j]);
      if (digit > maxDigit) {
        maxDigit = digit;
        maxPos = j;
      }
    }
    
    // Add the selected digit to result and update position
    result += bank[maxPos];
    startPos = maxPos + 1;
    remainingDigits--;
  }
  
  return parseInt(result);
}

function readFile(filename: string) {
  return fs.readFileSync(filename);
}

function sumLargestJoltsForAllBanks(input: string) {
  const banks = input.split("\n");
  let largestJoltSum = 0;
  for (const bank of banks) {
    if (bank.trim() === "") continue; // Skip empty lines
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

