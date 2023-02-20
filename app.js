/* Global Variables */



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//my api key
const api_key='38e508410202ee9a5d4a716f205f8ea6';
const generate = document.getElementById('generate');


generate.addEventListener('click',async ()=>{
    try {
        let zipCode = document.getElementById('zip').value;
    const feels = document.getElementById('feelings').value;
    const url=`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${api_key}&units=metric`; 
   let  response =await fetch(url).then(res=>res.json());
   const temp = await response.main.temp;
  await fetch('/addweather',{
   method:'POST',
   credentials:'same-origin',
headers: {
    'content-type': "application/json"
},
body: JSON.stringify({
    newDate,temp,feels
})
   })
  
  const resultDate =await fetch('/getWeather').then(res => res.json());
  document.getElementById('date').innerHTML = resultDate.date;
  if(resultDate.feels){
    document.getElementById('content').innerHTML = `I feel ${resultDate.feels}`;
  }
  document.getElementById('temp').innerHTML = resultDate.temp;
    } catch (error) {
        console.error(error);
    }
   
    });