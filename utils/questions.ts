function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAddition(): { a: number; b: number; answer: number } {
  const a = randomInt(1, 20);
  const b = randomInt(1, 20);
  return { a, b, answer: a + b };
}

function generateSubtraction(): { a: number; b: number; answer: number } {
  const a = randomInt(1, 20);
  const b = randomInt(1, a);
  return { a, b, answer: a - b };
}

function generateMultiplication(): { a: number; b: number; answer: number } {
  const a = randomInt(2, 12);
  const b = randomInt(2, 12);
  return { a, b, answer: a * b };
}

function generateDivision(): { a: number; b: number; answer: number } {
  const divisor = randomInt(2, 12);
  const quotient = randomInt(2, 12);
  const dividend = divisor * quotient;
  return { a: dividend, b: divisor, answer: quotient };
}

const generators = [
  { op: "+" as const, fn: generateAddition },
  { op: "-" as const, fn: generateSubtraction },
  { op: "×" as const, fn: generateMultiplication },
  { op: "÷" as const, fn: generateDivision },
];

export function generateQuestion() {
  const { op, fn } = generators[randomInt(0, generators.length - 1)];
  const { a, b, answer } = fn();

  return {
    text: `${a} ${op} ${b}`,
    answer,
    operation: op,
  };
}
