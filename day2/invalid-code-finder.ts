import fs from "fs";

export function roundUpToEvenDigits(number: number) {
  const numDigits = number.toString().length;

  // If the number already has an even number of digits, do nothing
  if (numDigits % 2 === 0) {
    return number;
  }

  // Edge case: If the number is 0, round up to 10
  if (number === 0) {
    return 10;
  }

  const expandedNumber = number + parseInt("9".repeat(numDigits));
  const expandedNumberDigits = expandedNumber.toString().length;

  return Math.pow(10, expandedNumberDigits - 1);
}

export function roundDownToEvenDigits(number: number) {
  const numDigits = number.toString().length;

  // If the number already has an even number of digits, do nothing
  if (numDigits % 2 === 0) {
    return number;
  }

  // Edge case:If the number has only one digit, round down to 0
  if (numDigits === 1) {
    return 0;
  }
  const modOperand = Math.pow(10, numDigits - 1);
  return number - (Math.floor(number) % modOperand) - 1;
}

export function isInvalidNumber(number: number): boolean {
  const numberString = number.toString();

  // Odd numbers can never be invalid
  if (numberString.length % 2 !== 0) {
    return false;
  }

  const firstHalf = numberString.substring(0, numberString.length / 2);
  const secondHalf = numberString.substring(numberString.length / 2);
  return firstHalf === secondHalf;
}

export function calculateInvalidCountForRange(start: number, end: number): number {
  let invalidSum = 0;
  for (let i = start; i <= end; i++) {
    const isInvalid = isInvalidNumber(i);
    if (isInvalid) {
      invalidSum += i;
    //   console.log(i);
    }
  }
  return invalidSum;
}

function readFile(filename: string) {
  return fs.readFileSync(filename);
}

function countInvalidIds(input: string) {
  const ranges = input.split(",");

  let invalidIdSum = 0;
  for (const range of ranges) {
    const [start, end] = range.split("-");
    const roundedUpStart = roundUpToEvenDigits(parseInt(start));
    const roundedDownEnd = roundDownToEvenDigits(parseInt(end));
    invalidIdSum += calculateInvalidCountForRange(roundedUpStart, roundedDownEnd);
  }

  return invalidIdSum;
}

function main() {
  const fileName = process.argv[2];
  const input = readFile(fileName);
  const numInvalidIds = countInvalidIds(input.toString());
  console.log(numInvalidIds);
}

if (process.argv[2]) {
  main();
}
