
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

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.lastNumber = data.last;
            this.tickets = data.tickets;
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


    restartCount() {

        this.lastNumber = 0;
        this.tickets    = [];

        console.log('Restar count');

        this.saveFile();
    }

    saveFile() {

        let jsonData = {
            last: this.lastNumber,
            today: this.today,
            tickets: this.tickets
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}


module.exports = {
  TicketControl
};