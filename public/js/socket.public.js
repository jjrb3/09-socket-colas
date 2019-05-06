

// Connect socket
var socket  = io();


var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');


var lblDesktop1 = $('#lblEscritorio1');
var lblDesktop2 = $('#lblEscritorio2');
var lblDesktop3 = $('#lblEscritorio3');
var lblDesktop4 = $('#lblEscritorio4');


var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblDesktop1, lblDesktop2, lblDesktop3, lblDesktop4];

socket.on('actualStatus', function(data) {
   console.log(data);
   updateHTML(data.lastFour);
});

function updateHTML(lastFour) {

    for (var i=0; i <= lastFour.length -1; i++) {
        lblTickets[i].text('Ticket ' + lastFour[i].number);
        lblEscritorios[i].text('Escritorio ' + lastFour[i].desktop);
    }
}