import * as React from 'react';

export interface Props {
  message: string;
  enthusiasmLevel?: number;
}

function Hello({ message, enthusiasmLevel = 1}: Props) {
  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }

  return (
    <div>
      {message + getExclamationMarks(enthusiasmLevel)} ;)
    </div>
  );
}

function getExclamationMarks(numChars: number): string {
  return Array(numChars + 1).join('!');
}

export default Hello;
