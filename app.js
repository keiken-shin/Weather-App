window.addEventListener('load', () => {
    let long, lat;
    const loaderDiv = document.querySelector('.loader');
    const temperatureDescription = document.querySelector('.temperature__description'),
          temperatureDegree = document.querySelector('.temperature__degree'),
          locationTimezone = document.querySelector('.location__timezone'),
          degreeSection = document.querySelector('.degree__section'),
          temperatureUnit = degreeSection.querySelector('span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
        
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/520eb28ea2b3badc69cdcfefa78e4dc8/${lat},${long}`;
            
            setTimeout(() => {
                fetch(api)
                    .then(response => {
                        loaderDiv.style.display = 'none';
                        return response.json();
                    })
                    .then(data => {    
                        const {temperature, summary, icon} = data.currently;
    
                        // Set DOM elements from the API
                        temperatureDegree.textContent = temperature;
                        temperatureDescription.textContent = summary;
                        locationTimezone.textContent = data.timezone;
    
                        // Celsius
                        const celsius = (temperature - 32) * (5 / 9);
    
                        // setIcons
                        setIcons(icon, document.querySelector('.icon'));
    
                        // change temperature to Celsius/Fahrenheit
                        degreeSection.addEventListener('click', () => {
                            if(temperatureUnit.textContent === 'F'){
                                temperatureUnit.textContent = 'C';
                                temperatureDegree.textContent = (celsius).toFixed(2);
                                temperatureDegree.title = 'convert to fahrenheit';
                            }else{
                                temperatureUnit.textContent = 'F';
                                temperatureDegree.textContent = temperature;
                                temperatureDegree.title = 'convert to celsius';
                            }
                        })
                    });
            }, 1500);
        });
        console.log(true);
    }else{
        console.log(false);
        loaderDiv.querySelector('.loader__span').style.display = 'none';
        loaderDiv.querySelector('.loader__warning').textContent = 'Geo Location Access Denied... Please allow access to use the Weather-App'
    }

    const setIcons = (icon ,iconID) => {
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});