const cityName=document.getElementById("cityName")
const submitBtn=document.getElementById("submitBtn")
const city_name=document.getElementById("city-name")
const temp_real_val =document.getElementById("temp-real-val")
const temp_status =document.getElementById("temp-status")
const datahide=document.querySelector(".middle-layer")
const today_date = document.getElementById("today-date");
const day = document.getElementById("day");



const getInfo=async(event)=>{
    event.preventDefault();
    let cityVal=cityName.value;
    if (cityVal === "") {
        city_name.innerText=`Please write city name before search`
        datahide.classList.add("data-hide")
    } else {
        try {
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=689dff18e80f5a17a35d07bd8185ba2e`
        const response=await fetch(url);
        const data=await response.json()
        const arrData=[data];

        city_name.innerText=`${arrData[0].name},${arrData[0].sys.country}`


        temp_real_val.innerText = `${(arrData[0].main.temp - 273.15).toFixed(2)}`;
        temp_status.innerText = arrData[0].weather[0].main;
        const tempMood = arrData[0].weather[0].main;

         // Update weekday and date
         const currentDate = new Date();
         const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
         const weekday = weekdays[currentDate.getDay()];
         const date = currentDate.getDate();
         const month = currentDate.toLocaleString('default', { month: 'long' });
         day.innerText = weekday;
         today_date.innerText = `${date} ${month}`;

        // condition too check sunny  or cloudy
        if(tempMood==="Clear"){
            temp_status.innerHTML=`<i class="fas fa-sun" style="color:#eccc68"></i>`;
        }
        else if(tempMood==="Clouds"){
            temp_status.innerHTML=`<i class="fas fa-cloud" style="color:#f1f2f6"></i>`;
        }
        else if(tempMood==="Rain"){
            temp_status.innerHTML=`<i class="fas fa-cloud-rain" style="color:#a4b0be"></i>`;
        }
        else
        {
            temp_status.innerHTML=`<i class="fas fa-sun" style="color:#eccc68"></i>`;
        }
        datahide.classList.remove("data-hide")


        } catch {
            city_name.innerText=`Please enter city name  properly`
            datahide.classList.add("data-hide")
        }
    }
}

submitBtn.addEventListener("click",getInfo)
