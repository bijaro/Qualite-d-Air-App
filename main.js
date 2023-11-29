const pollutionScale = [
  {
    scale: [0, 50],
    quality: "Good",
    src: "happy",
    background: "linear-gradient(to right, #45B649, #DCE35B)",
  },
  {
    scale: [51, 100],
    quality: "Moderate",
    src: "thinking",
    background: "linear-gradient(to right, #F3F9A7, #CAC531)",
  },
  {
    scale: [101, 150],
    quality: "Unhealthy",
    src: "unhealthy",
    background: "linear-gradient(to right, #F16529, #E44D26)",
  },
  {
    scale: [151, 200],
    quality: "Bad",
    src: "bad",
    background: "linear-gradient(to right, #ef473a, #cb2d3e)",
  },
  {
    scale: [201, 300],
    quality: "Very bad",
    src: "mask",
    background: "linear-gradient(to right, #8E54E9, #4776E6)",
  },
  {
    scale: [301, 500],
    quality: "Terrible",
    src: "terrible",
    background: "linear-gradient(to right, #7a2828, #a73737)",
  },
];

const loader = document.querySelector(".loader");
const emoji = document.querySelector(".emoji");
const emojiText = document.querySelector("#emojiText");

async function getApiData() {
  try {
    const response = await fetch(
        "https://api.airvisual.com/v2/nearest_city?key=35acc274-f5bf-4296-94f6-4240859a92ed"
        // "http://api.airvisual.com/v2/nearest_city?key=35acc274-f5bf-4296-94f6-4240859a92ed"
    ).catch((error) => {
        throw new Error(error);
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Error ${response.status} ${response.statusText}`);
    } else {
      const responseData = await response.json();
      console.log(responseData);

      const aqi = responseData.data.current.pollution.aqius;
      // console.log(aqi);

      // console.log(
      //   "destr",

      //   pollutionScale.find(
      //     (city) => aqi >= city.scale[0] && aqi <= city.scale[1]
      //   )
      // );
      const sortedData = {
        city: responseData.data.city,
        aqi,

        ...pollutionScale.find(
          (city) => aqi >= city.scale[0] && aqi <= city.scale[1]
        ),
      };

      appUI(sortedData);
    }
  } catch (error) {
    loader.classList.remove("active");
    emoji.src = "img/browser.svg";
    emojiText.textContent = error.message;
  }
}

getApiData();

const city = document.querySelector("#city");
const pullitionInfo = document.querySelector("#pullitionInfo");
const airQuality = document.querySelector("#airQuality");
background = document.querySelector(".background");

function appUI(data) {
  emoji.src = `img/${data.src}.svg`;
  emojiText.textContent = `Voici la qualité d'air à : ${data.city}`;
  city.textContent = data.city;
  pullitionInfo.textContent = data.quality;
  airQuality.textContent = data.aqi;
  background.style.backgroundImage = data.background;
  loader.classList.remove("active");
  pointerPosition(data.aqi);
}

const pointer = document.querySelector(".pointer");
console.log(pointer);

function pointerPosition(AqiValue) {
  const parentWidth = pointer.parentElement.scrollWidth;
  console.log(parentWidth);
  const positionPointer = (AqiValue / 500) * parentWidth;
  console.log(positionPointer);
  pointer.style.transform = `translateX(${positionPointer}px) rotate(180deg)`;
}
