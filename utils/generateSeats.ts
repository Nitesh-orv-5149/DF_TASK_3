export function generateSeats({rows, cols} : {rows: number, cols: number}) {
    const seatArray = [];
    for (let i = 0; i < rows; i++) {
      const rowLetter = String.fromCharCode(65 + i); // A, B, C...
      for (let j = 1; j <= cols; j++) {
        seatArray.push({
          seatNumber: `${rowLetter}${j}`, // e.g., A1, B5
          isBooked: false,
        });
      }
    }
    return seatArray;
  }
  