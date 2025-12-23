import fs from "fs";

// Excludes the number itself from the factors
export function getFactors(number: number): number[] {
  const factors = [];
  for (let i = 1; i < number; i++) {
    if (number % i === 0) {
      factors.push(i);
    }
  }
  return factors;
}

export function splitIntoSizeChunks(s: string, size: number): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < s.length; i += size) {
    chunks.push(s.substring(i, i + size));
  }
  return chunks;
}

export function isInvalidNumber(number: number): boolean {
  const numberString = number.toString();
  const length = numberString.length;
  const factors = getFactors(length);

  for (const factor of factors) {
    const chunks = splitIntoSizeChunks(numberString, factor);
    if (chunks.every(chunk => chunk === chunks[0])) {
      return true;
    }
  }
  return false;
}

export function calculateInvalidCountForRange(start: number, end: number): number {
  let invalidSum = 0;
  for (let i = start; i <= end; i++) {
    const isInvalid = isInvalidNumber(i);
    if (isInvalid) {
      invalidSum += i;
    }
  }
  return invalidSum;
}

function readFile(filename: string) {
  return fs.readFileSync(filename);
}

function sunInvalidIds(input: string) {
  const ranges = input.split(",");

  let invalidIdSum = 0;
  for (const range of ranges) {
    const [start, end] = range.split("-");
    invalidIdSum += calculateInvalidCountForRange(parseInt(start), parseInt(end));
  }

  return invalidIdSum;
}

function main() {
  const fileName = process.argv[2] ?? '';
  if (fileName === '') {
    console.error('Please provide a filename');
    return;
  }
  const input = readFile(fileName);
  const numInvalidIds = sunInvalidIds(input.toString());
  console.log(numInvalidIds);
}

if (process.argv[2]) {
  main();
}
