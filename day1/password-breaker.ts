import fs from "fs";

const START_POSITION = 50;
const PASSWORD_KEY_POSITION = 0;
const PASSWORD_MAX_POSITION = 99;
const PASSWORD_MIN_POSITION = 0;

function readFile(filename: string) {
  return fs.readFileSync(filename);
}

function parsePassword(password: Buffer) {
  const lines = password.toString().split("\n");
  let position: number = START_POSITION;
  let keyCount: number = 0;

  for (const line of lines) {
    const direction: string = line.charAt(0);
    const steps: number = parseInt(line.substring(1));

    switch (direction) {
      case "L":
        position -= steps;
        break;
      case "R":
        position += steps;
        break;
      default:
        throw new Error(`Invalid direction: ${direction}`);
    }

    if (position < PASSWORD_MIN_POSITION || position > PASSWORD_MAX_POSITION) {
      const range = PASSWORD_MAX_POSITION + 1;
      position = ((position % range) + range) % range;
    }

    if (position === PASSWORD_KEY_POSITION) {
      keyCount++;
    }
    console.log("position is now", position);
  }
  return keyCount;
}

function main() {
  const fileName = process.argv[2];
  const password = readFile(fileName);
  const parsedPassword = parsePassword(password);
  console.log(parsedPassword);
}

main();
