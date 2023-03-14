const container = document.querySelector(".container");
const emptySeats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value; //  + to convert string to number

//functions

// Save selected movie index and price to local storage
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem("selectedMovieIndex",movieIndex);
    localStorage.setItem("selectedMoviePrice",moviePrice);

}

// to update count and total
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    // Saving data to local storage so you dont loose on refresh.

    // To-do
    // copy selected seats into array
    // Map through array 
    // Return an array of indexes
    const seatsIndex = [...selectedSeats].map((seat)=>{
        return [...emptySeats].indexOf(seat);
    });

    localStorage.setItem("selectedSeats",JSON.stringify(seatsIndex));


    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localStorage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if(selectedSeats !== null && selectedSeats.length > 0){
        emptySeats.forEach((seat,index)=> {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if(selectedMovieIndex !== null ){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
     
}


// Event Listeners

// Movie Select event
movieSelect.addEventListener("change",(e) => {
    ticketPrice = +e.target.value;

    // Storing to local storage
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();
})

// To select the empty Seats
// Seat click event
container.addEventListener("click",(e)=>{
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected");

        updateSelectedCount();
    }
})


// Intial count and total values set.
// will display the present status of count and total
updateSelectedCount();