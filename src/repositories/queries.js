function updateFlightSeats(flightId){
    return `SELECT * FROM flights where flights.id = ${flightId} FOR UPDATE;`;
}

module.exports = {
    updateFlightSeats,
}