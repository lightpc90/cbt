export const numberToAlphabet = (number) => {
    let alphabetValue = number + 64
    let alphabetChar = String.fromCharCode(alphabetValue)
    return alphabetChar
  }