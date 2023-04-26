/* Global Variables */
const APIKey = "4a356c8c6cc37b4403b968c648de09ed";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = 1+d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click',async function(){
  const zipcode = document.getElementById("zip").value;
  const feeling = document.getElementById('feelings').value;
  try{
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${APIKey}&units=metric`);
  const data = await response.json();
  const temperature = data.main.temp;
  const appData = {
    date: newDate,
    feeling: feeling,
    temperature: temperature
  }
  await fetch ('/saveData',{
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(appData)
  });
  const serverresponse = await fetch ('/weatherData',{
    method: "GET",
    credentials: "same-origin",
  });
  updatUi(await serverresponse.json());
}
catch(err){
  console.log(err);
}
});

async function updatUi(appData){
  document.getElementById("date").innerHTML = `<p>Date : ${appData.date}</p>`;
  document.getElementById("temp").innerHTML=`<p>temperature: ${appData.temperature}</p>`;
  document.getElementById("content").innerHTML=`<p>feeling: ${appData.feeling}</p>`;
}
