const container = document.querySelector(".container");
const emptySeats = document.querySelector(".row .seats:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

const ticketPrice = +movieSelect.value; //  + to convert string to number

//functions
// to update count and total
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}


// Event Listeners

// To select the empty Seats
container.addEventListener("click",(e)=>{
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected");

        updateSelectedCount();
    }
})
