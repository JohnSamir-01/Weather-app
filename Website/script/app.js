// Declaration...................
const api_key = "8790cc2c6553552d48d42de99af47acc";
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

// Adding event listener
document.getElementById("button").addEventListener('click',generate);

async function generate(){  
//GET request to the OpenWeatherMap API.
let feeling = document.querySelector('#feel').value;
let zip = document.querySelector('#zip').value;
if(!zip){
    alert("Please enter a zipcode");
}

const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${api_key}&units=metric`;
const fetching = await fetch(url)
  .then(async (fetching)=>{
      if(fetching.status==404){
          alert("Please enter a valid zip code")
      }else{
    const tempreture = await fetching.json();
    return tempreture;
      }
// storing date , temp , and feel in an obj
}).then((tempreture)=>{
    const data ={temp: tempreture.main.temp,

        feel: feeling,
    
        date: newDate
    };
    return data;

// Chaining an async function to handle post req to the server
}).then(async (data)=>{
    const posting = await fetch("/add", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        ,
    })
//Chaining the UI function to handle get rq from the server and update UI
}).then(()=>{
    UI();
}).catch((err)=>{
    console.log('error',err);
});
}
// UI  function to handle get rq form the server and update UI

async function UI(){
    const data = await fetch('/get');
    try {
        const allData = await data.json();
        console.log(allData);
        document.querySelector('#temp').innerHTML = `The Tempreture is: ${allData.temp}&#8451`;
        document.querySelector('#date').innerHTML = `Today's Date: ${allData.date}`;
        document.querySelector('#content').innerHTML = `Your Feeling: ${allData.feel}`;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
/////////////////////////////////////////////////////////////