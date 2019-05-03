
// Connect socket
var socket  = io();


var searchParams = new URLSearchParams(window.location.search);


if (!searchParams.has('desktop')) {
    window.location = 'index.html';
    throw new Error('The desktop is required');
}

var desktop = searchParams.get('desktop');
var label = $('small');


$('h1').text('Desktop ' + desktop);


$('button').on('click', function() {

    socket.emit('attendTicket', {desktop: desktop}, function(resp) {
        console.log('12312321');
        console.log(resp);
    });
});


/**
 * Acenet
 *
 */