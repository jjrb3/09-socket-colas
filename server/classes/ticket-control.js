
const fs = require('fs');


class Ticket {

    constructor(number, desktop) {
        this.number  = number;
        this.desktop = desktop;
    }
}


class TicketControl {

    constructor() {

        this.lastNumber = 0;
        this.today      = new Date().getDate();
        this.tickets    = [];
        this.lastFour   = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.lastNumber = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        }
        else {
            this.restartCount();
        }
    }


    nextTicket() {

        this.lastNumber++;

        let ticket = new Ticket(this.lastNumber, null);
        this.tickets.push(ticket);

        this.saveFile();

        return `Ticket ${ this.lastNumber }`;
    }


    getLastTicket() {

        return `Ticket ${ this.lastNumber }`;
    }

    answerTicket(desktop) {

        if (this.tickets.length === 0) {
            return 'No exists tickets'
        }

        let numberTicket = this.tickets[0].number;
        this.tickets.shift();

        let answerTicket = new Ticket(numberTicket, desktop);

        this.lastFour.unshift(answerTicket);


        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1); // Delete last element
        }

        console.log('Last four');
        console.log(this.lastFour);

        this.saveFile();

        return answerTicket;
    }


    restartCount() {

        this.lastNumber = 0;
        this.tickets    = [];
        this.lastFour   = [];

        console.log('Restar count');

        this.saveFile();
    }

    saveFile() {

        let jsonData = {
            last: this.lastNumber,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}


module.exports = {
  TicketControl
};