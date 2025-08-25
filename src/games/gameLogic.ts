export function generateSecretCode(): number[] {
    const code: number[] = [];
    while (code.length < 4) {
        const digit = Math.floor(Math.random() * 10);
        if (!code.includes(digit)) code.push(digit);
    }
    return code;
}
export function bulls(guessNumbers: number[], secretCode: number[]): number {

    let count = 0;
    for (let i = 0; i < 4; i++) {
        if (guessNumbers[i] === secretCode[i]) {
            count++;
        }
    }
    return count;
}
export function pgias(guessNumbers: number[], secretCode: number[]): number {

    let count = 0;
    for (let i = 0; i < 4; i++) {
        let b = false;
        for (let j = 0; j < 4; j++)
            if (!b&&i != j && guessNumbers[i] === secretCode[j]) {
                count++;
                b=true;
            }
    }
    return count;
}
export function win(guessNumbers: number[], secretCode: number[]): boolean {
    if (bulls(guessNumbers, secretCode) === 4)
        return true;
    return false;
}