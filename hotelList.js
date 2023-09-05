const val = JSON.parse(localStorage.getItem('result'));
console.log(val);
let arr = val.results;
console.log(arr);
let length = arr.length;


const lengthDiv = document.querySelector(".length");
const listing = document.querySelector(".listing");
lengthDiv.innerHTML = `${length}+ stays  `;

let map;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
}

arr.forEach((room)=>{
    let rating;
    if(room.rating===undefined){
        rating = "New";
    }else{
        rating  =room.rating;
    }
    let dis;
  if(room.isSuperhost){
    dis = "block";
    
  }else{
    dis ="none";
   
  }
  let rare;
  if(room.rareFind){
    rare = "block";
    
  }else{
    rare ="none";
   
  }
    const itemCount = document.createElement("div");
    
    itemCount.innerHTML = `

                    <div>
                        <img src="${room.images[0]}" class="list-img">
                        <div style="display: flex;align-items: center;">
                            <img src="${room.hostThumbnail}" class="host-img">
                            <span style="">Host Name</span>
                        </div>
                    </div>
                    <div class="hotel-details">
                        <div>
                            <div class="super-rare">
                                <div class="superhost" style="display:${dis}">Superhost</div>
                                <div class="rare" style="display:${rare}">Rare Finds</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div style="color:brown;font-weight:500;padding-bottom: 3px;">${room.type}</div>
                                <div>${room.name}</div>
                            </div>
                            <div class="line-div"></div>
                        </div>
                        <div>
                            <div>
                                <div style="color:#201b82;padding-bottom: 3px;">${room.persons} guest - ${room.beds}bed - ${room.bathrooms}bathroom</div>
                                <div><span>Amenities:</span> ${room.previewAmenities.join(" - ")}</div>
                            </div>
                            <div class="line-div"></div>
                        </div>
                        <div>
                            <div>${rating} <i class="fa-solid fa-star" style="color: #e2c508;"></i>  (${room.reviewsCount} review)</div>
                            <div class="line-div"></div>
                        </div>
                        <div>   
                            <div class="city-price">
                                <div>${room.city}</div>
                                <div>Rs.${room.price.rate}/night</div>
                            </div>
                        </div> 
                        <div>Distance from you:45km</div>
                       
                        
                    </div>

    `;
    itemCount.className = "item-cont";
    
    const hoteldetails = itemCount.children[1];
    const pricebutton = document.createElement("div");
    pricebutton.innerHTML=`<button>Show Booking Cost Breakdown</button>`;
    pricebutton.className = "price-button";
    pricebutton.addEventListener("click", () => showBookingCostBreakdown(room));
    hoteldetails.appendChild(pricebutton);
    

    listing.appendChild(itemCount);
    // new google.maps.Marker({
    //     position: { lat: room.lat, lng: room.lng },
    //     map,
    //     title: room.title
    // });
})




function showBookingCostBreakdown(listing){
    // console.log("skdmsdc",listing.price.priceItems);
    let itemsprice = listing.price.priceItems;
    let totalCost=0;

    const modal = document.createElement("div");
    modal.style.display = "block";
    modal.style.width = "300px";
    modal.style.height = "450px";
    modal.style.backgroundColor = "#fff";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.padding = "20px";
    modal.style.boxShadow = "0 0 10px black";
    modal.innerHTML = `
    <h2>Booking Cost Breakdown</h2>`;

    itemsprice.forEach((val)=>{
        // console.log(val.amount);
        totalCost =totalCost+ val.amount;
        const p = document.createElement("p");
        p.innerHTML=`${val.title}  :  Rs.${val.amount}`;
        modal.appendChild(p);
    })
        const p = document.createElement("p");
        p.innerHTML=`Total Cost  : Rs.${totalCost}`;
        modal.appendChild(p);
    
    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.addEventListener("click", () => modal.style.display = "none");
    modal.appendChild(closeButton);

    // Add the modal to the body
    document.body.appendChild(modal);
}



