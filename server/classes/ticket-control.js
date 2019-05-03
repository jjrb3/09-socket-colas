
const fs = require('fs');

class TicketControl {

    constructor() {
        this.lastNumber = 0;
        this.today      = new Date().getDate();

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.lastNumber = data.last;
        }
        else {
            this.restartCount();
        }
    }


    nextTicket() {

        this.lastNumber++;

        console.log('Next ticket');

        this.saveFile();

        return `Ticket ${ this.lastNumber }`;
    }

    restartCount() {

        this.lastNumber = 0;

        console.log('Restar count');

        this.saveFile();
    }

    saveFile() {

        let jsonData = {
            last: this.lastNumber,
            today: this.today
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}


module.exports = {
  TicketControl
};