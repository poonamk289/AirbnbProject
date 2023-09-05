
const middleCont = document.querySelector(".middle-cont");
const searchLab = document.querySelector(".search-lab");
const fullsearch = document.querySelector(".fullsearch");
const location1 = document.querySelector("#location");
const checkin = document.querySelector("#checkin");
const checkout = document.querySelector("#checkout");
const noGuests = document.querySelector("#noGuests");

const searchlists = document.getElementById("searchlists");

middleCont.addEventListener("click",()=>{
    middleCont.style.display = "none";
    searchLab.style.display="flex";
    fullsearch.style.display="flex";
})

searchlists.addEventListener("click",getHotelList);



async function getHotelList(){
    const loca =location1.value;
    const checkin1 = checkin.value;
    const checkout1 = checkout.value;
    const guest = noGuests.value;
    console.log(loca,checkin1,checkout1,guest);
    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${loca}&checkin=${checkin1}&checkout=${checkout1}&adults=${guest}&children=0&infants=0&pets=0&page=1&currency=INR`;
    const options = {
	method: 'GET',
    headers: {
            'X-RapidAPI-Key': '2325898651msh12aa5338c725819p13619ejsn94f6beaf38c7',
            'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        localStorage.setItem('result',JSON.stringify(result));
        window.location.href="listing.html";
    } catch (error) {
        console.error(error);
    }
}
// gethh();
