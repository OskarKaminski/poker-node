let id = 1;

export class Table {
    constructor(stake, numOfSeats) {
        this.id = id
        this.stake = stake
        this.numOfSeats = numOfSeats
        this.dealerSeat = 0;

        id++;
    }
}