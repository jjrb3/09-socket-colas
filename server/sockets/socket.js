const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();


io.on('connection', (client) => {


    client.on('nextTicket', (data, callback) => {

        let next = ticketControl.nextTicket();

        console.log(next);

        callback(next);
    });


    client.emit('actualStatus', {
        actual: ticketControl.getLastTicket(),
        lastFour: ticketControl.getLastFour()
    });


    client.on('attendTicket', (data, callback) => {

        if (!data.desktop) {
            return callback({
                success: false,
                message: 'The desktop is required'
            });
        }

        let attend = ticketControl.answerTicket(data.desktop);

        callback(attend);
    });
});