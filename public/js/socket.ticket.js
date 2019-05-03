
// Connect socket
var socket  = io();
var label   = $('#lblNuevoTicket');


// Listen information
socket.on('connect', function() {
    console.log('Connect to server');
});

// Listen information
socket.on('disconnect', function() {
    console.log('Connect lost');
});


$('button').on('click', function() {

    socket.emit('nextTicket', null, function(nextTicket) {

        label.text(nextTicket);
    });
});