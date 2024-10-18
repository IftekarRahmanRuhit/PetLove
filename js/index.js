
// Declaring a function to load data from API 
const loadAllPets = async (category = 'pets') =>{

    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');

    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/${category !== 'pets' ? `category/${category}` : 'pets'}`);
    const data = await res.json();

    // adding condition for load data 
    let pets;
    if (category !== 'pets') {
        pets = data.data; 
    } else {
        pets = data.pets;
    }
    

    displayAllPets(pets || '');
    spinner.classList.add('hidden');
}


// Displaying pets on the page 

const displayAllPets = (pets) =>{
    // console.log(pets)
    const petCards = document.getElementById('petCards');
    petCards.innerHTML = '';

    if(pets.length === 0){
        document.getElementById('petCards').classList.remove('lg:grid-cols-3','md:grid-cols-2')
        petCards.innerHTML =`
        <div class="border border-gray-300 p-5 rounded-lg flex flex-col justify-center">
    <div class ='flex flex-col justify-center items-center'>
        <img class='rounded-lg' src="./images/error.webp" alt="">
    </div>
    <p class="text-2xl font-extrabold text-center mt-5">No Information Available</p>
    <p class=" text-xl font-medium text-gray-500 text-center mt-3">Unfortunately, the pet is currently unavailable. Please try again later or <br> contact our support team for assistance.</p>
    </div>
        `
        return;
    }
    else{
        document.getElementById('petCards').classList.add('lg:grid-cols-3','md:grid-cols-2')
    }

    const showPets = pets;
    showPets.forEach((pet) =>{
        
        const petCard = document.createElement('div')
        petCard.innerHTML = `
                            <div class="border border-gray-300 p-5 rounded-lg">
                        <div>
                            <img class='rounded-lg' src="${pet.image || 'No image found'}" alt="">
                        </div>
                        <div class="space-y-1">
                            <p class="text-xl font-extrabold">${pet.pet_name || 'No name found'}</p>
                            <p class="text-gray-500"><i class="fa-solid fa-table-cells"></i>  Breed: ${pet.breed || 'No Breed found'} </p>
                            <p class="text-gray-500"><i class="fa-solid fa-calendar-days"></i>  Birth: ${pet.date_of_birth || 'No DOB found'}</p>
                            <p class="text-gray-500"><i class="fa-solid fa-mercury"></i> Gender:  ${pet.gender || 'Gender not found'}</p>
                            <p class="text-gray-500"><i class="fa-solid fa-dollar-sign"></i> Price : ${pet.price || 'No Price found'}$</p>
                        </div>
                        <div class="mt-1">
                            <hr>
                        </div>
                        <div class="flex justify-between mt-2">
                            <button onclick="handleLikeButton('${pet.image}')" class="btn btn-sm"><i class="fa-regular fa-thumbs-up"></i></button>
                            <button id='adopt-btn' onclick="countModal(this)" class="btn btn-sm text-primary hover:bg-primary hover:text-white">Adopt</button>
                            <button onclick="loadDetails(${pet.petId})" class="btn btn-sm text-primary hover:bg-primary hover:text-white">Details</button>
                        </div>
                    </div>
        `
        petCards.append(petCard);


    })
}

// Calling the function for display all pets 
loadAllPets();

// function for clicked button 
const handleClickedButton = (id) => {

    const category = document.getElementById(id).innerText.toLowerCase();
    // console.log(category);

    const petCards = document.getElementById('petCards');
    petCards.innerHTML = '';

    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden'); 

    setTimeout(() => {
        loadAllPets(category).then(() => {
            spinner.classList.add('hidden');
        });

        const buttons = document.getElementsByClassName('category-btn');
        const clickedButtonBg = document.getElementById(id);

        // Lopping on buttons for remove bg 
        for(let button of buttons) {
            button.classList.remove('bg-[#0E7A81]');
        }

        if(clickedButtonBg) {
            clickedButtonBg.classList.add('bg-[#0E7A81]', 'opacity-90');
        }
    }, 2000);
}


// Declaring a function to load details from API

const loadDetails = async(petId) => {
    // console.log(petId)

    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json();
    // console.log(data)
    const petDetails = data;
    // console.log(petDetails);
    displayPetDetails(petDetails);
  };
  

// showing pet details when details button is clicked
  const displayPetDetails = (petDetails) => {

    // console.log(petDetails);

    const displayPetDetailsContainner = document.getElementById('details-modal');

    displayPetDetailsContainner.innerHTML = `
           <div>
            <div>
                <img  class='rounded-lg w-full' src=${petDetails.petData.image || 'No image found'} alt="">
                <p class="text-xl font-extrabold mt-3">${petDetails.petData.pet_name || 'No name found'}</p>
            </div>
            <div class="space-y-1 mt-2 grid grid-cols-2 gap-3">
                <div>
                    
                    <p class="text-gray-500"><i class="fa-solid fa-table-cells"></i>  Breed: ${petDetails.petData.breed || 'No Breed found'} </p>
                    <p class="text-gray-500"><i class="fa-solid fa-mercury"></i> Gender:  ${petDetails.petData.gender || 'Gender not found'}</p>
                    <p class="text-gray-500"><i class="fa-solid fa-mercury"></i> Vaccinated status:  ${petDetails.petData.vaccinated_status || 'NV'}</p>
                </div>
                <div>
                    <p class="text-gray-500"><i class="fa-solid fa-calendar-days"></i>  Birth: ${petDetails.petData.date_of_birth || 'No DOB found'}</p>
                    <p class="text-gray-500"><i class="fa-solid fa-dollar-sign"></i> Price : ${petDetails.petData.price || 'No Price found'}$</p>
                </div>

            </div>
            <div class="mt-1">
                <hr>
            </div>
            <div class="mt-2">
                <p class="font-bold mb-2">Details Information</p>
                <p>${petDetails.petData.pet_details || 'Details not found'}</p>
            </div>
        </div>

    `
    my_modal_5.showModal()

    console.log("button clicked");

  }

//   function for like button
  const handleLikeButton = (image) =>{

    const imageContainer = document.getElementById('imageContainer');
    const div = document.createElement('div')
    div.innerHTML= ''
    div.innerHTML = `
                <div class="border border-gray-300 p-2 rounded-lg ">
                <img class="rounded-lg" src="${image}" alt="">
                </div>
                     
    `
    imageContainer.appendChild(div);

  }


// Countdown Modal 
  const countModal= (adoptButton) =>{
    const showCd = document.getElementById('modal-cd');
    const modal = document.getElementById('my_modal_3');

    adoptButton.disabled = true;
    adoptButton.innerText = 'Adopted'

    let num = 3;
    showCd.innerHTML = `${num}`;
    modal.showModal()

    // function for countDown 
    const countDown = setInterval(() =>{

        num--;
        showCd.innerText = num;
        if(num == 1){
            clearInterval(countDown) // stopping the countdown
            modal.close(); // closing the modal when countdown off
          }
          
    },1000)

 }

  
  // Function to load pets and sort by price
  const loadAllPetsSortByPrice = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const data = await res.json();
    const pets = data.pets;
  
    // sorting price in descending order 
    pets.sort((a, b) => b.price - a.price);
  
    displayAllPets(pets);
  };

// function for when sort by price button is clicked 
const handleSortByPrice = ()=>{

    const petCards = document.getElementById('petCards');
    petCards.innerHTML = '';

    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden'); 

    setTimeout(()=>{
        loadAllPetsSortByPrice().then(()=>{
            spinner.classList.add('hidden');
        })
    },2000)
};