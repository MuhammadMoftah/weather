<template>
  <div>
    <aside class="control">
      <a href="#page1">Home</a>
      <a href="#page2">Weather</a>
    </aside>

    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section home">
        <div class="welcome">
          Welcome to Moftah <br>
          Weather APP
        </div>
        <div id="clouds">
          <div class="cloud x1"></div>
          <div class="cloud x2"></div>
          <div class="cloud x3"></div>
          <div class="cloud x4"></div>
          <div class="cloud x5"></div>
        </div>
      </div>
      <div class="section">
        <div class="weather pt-5">
          <div class="container text-center">
            <p class="h4 text-white">Just type the city name</p>
            <p class="h5 text-muted">You must spelling correctly</p>
            <form class="d-flex justify-content-center" @submit.prevent="getResult()">
              <input class="form-control mr-2" type="search" placeholder="Type City and Press Enter"
                v-model="cityToSearch" aria-label="Search">
            </form>
            <div v-if="!city && !temp" class="alert alert-danger mt-5" role="alert">
              Please let the app use Location Services information
            </div>

            <div class="d-flex flex-column text-white mt-4" v-if="city && temp">
              <p class="h4 my-2">{{city}}, {{country}}</p>
              <span class="temp" :style="{background:tempColor}"></span>
              <p class="h4 my-2">{{weathMain}}</p>
              <p class="h4 my-2">{{temp}}°</p>
              <p class="h5 text-muted">
                <span class="mx-4">{{maxTemp}}°</span>
                <span class="mx-4">{{minTemp}}°</span>
              </p>
              <p class="h4 my-2 text-capitalize">{{weathDesc }}</p>

            </div>
          </div>
        </div>
      </div>
    </full-page>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    data() {
      return {
        options: {
          licenseKey: 'i getted a license',
          menu: '#menu',
          anchors: ['page1', 'page2'],
          sectionsColor: ['#0980dd', '#26293A'],
 
        },
        cityToSearch: "",
        city: "",
        country: "",
        weathMain: "",
        weathDesc: "",
        temp: "",
        maxTemp: "",
        minTemp: "",
        Error: "",
        tempColor: ''

      }
    },
    methods: {
      getResult() {
        axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + this.cityToSearch +
            "&APPID=efbbb0b33c9582440abf9ad32ed24a16")
          .then(response => {
            this.city = response.data.name
            this.country = response.data.sys.country
            this.weathMain = response.data.weather[0].main
            this.weathDesc = response.data.weather[0].description
            this.maxTemp = Math.round(response.data.main.temp_max - 273.15);
            this.minTemp = Math.round(response.data.main.temp_min - 273.15);
            this.temp = Math.round(response.data.main.temp - 273.15);
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    created() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          let currentLat = pos.coords.latitude
          let currentLong = pos.coords.longitude
          axios.get("http://api.openweathermap.org/data/2.5/weather?lat=" + currentLat + "&lon=" + currentLong +
              "&appid=efbbb0b33c9582440abf9ad32ed24a16")
            .then(response => {
              this.city = response.data.name
              this.country = response.data.sys.country
              this.weathMain = response.data.weather[0].main
              this.weathDesc = response.data.weather[0].description
              this.maxTemp = Math.round(response.data.main.temp_max - 273.15);
              this.minTemp = Math.round(response.data.main.temp_min - 273.15);
              this.temp = Math.round(response.data.main.temp - 273.15);
              if (this.temp < 0) {
                this.tempColor = "#29296F"
              } else if (this.temp < 10) {
                this.tempColor = "lightblue"
              } else if (this.temp < 25) {
                this.tempColor = "#FFF004"
              } else if (this.temp < 40) {
                this.tempColor = "#FF7C0F"
              } else if (this.temp > 40) {
                this.tempColor = "#CF2E11"
              }

            })
            .catch(e => {
              console.log(e)
            })
        })
      } else {
        this.Error = "Geolocation is not supported by this browser."
      }

    },
    beforeUpdate() {
      if (this.temp < 0) {
        this.tempColor = "#29296F"
      } else if (this.temp < 10) {
        this.tempColor = "lightblue"
      } else if (this.temp < 25) {
        this.tempColor = "#FFF004"
      } else if (this.temp < 40) {
        this.tempColor = "#FF7C0F"
      } else if (this.temp > 40) {
        this.tempColor = "#CF2E11"
      }
    }
  }
</script>

<style>
  .home {
    position: relative;
    overflow: hidden;
  }

  .home .welcome {
    animation: text-shadow 5s ease-in-out infinite;
    font-size: 50px;
    font-weight: 700;
    position: absolute;
    color: white;
    text-shadow: 1px 1px 1px black;
    bottom: 30%;
    left: 10%;
    max-width: 700px;
    line-height: 70px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 7px;
  }

  .home .welcome:hover {
    animation-play-state: paused;
  }

  @keyframes text-shadow {
    0% {
      transform: translateY(0);
    }

    20% {
      transform: translateY(-1em);
    }

    40% {
      transform: translateY(0.5em);
    }

    60% {
      transform: translateY(-0.25em);

    }

    80% {
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
  @media(max-width:576px){
    .home .welcome{
      left: 4%;
      bottom: 15%;
      font-size: 30px;
      line-height: 40px;
    }
  }

  #clouds {
    padding: 100px 0;
    background: #0980dd;
    background: -webkit-linear-gradient(top, #c9dbe9 0%, #fff 100%);
    background: -linear-gradient(top, #c9dbe9 0%, #fff 100%);
    background: -moz-linear-gradient(top, #c9dbe9 0%, #fff 100%);
  }

  /*Time to finalise the cloud shape*/
  .cloud {
    width: 200px;
    height: 60px;
    background: #fff;
    border-radius: 200px;
    -moz-border-radius: 200px;
    -webkit-border-radius: 200px;
    position: relative;
  }

  .cloud:before,
  .cloud:after {
    content: '';
    position: absolute;
    background: #fff;
    width: 100px;
    height: 80px;
    position: absolute;
    top: -15px;
    left: 10px;

    border-radius: 100px;
    -moz-border-radius: 100px;
    -webkit-border-radius: 100px;

    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
    -moz-transform: rotate(30deg);
  }

  .cloud:after {
    width: 120px;
    height: 120px;
    top: -55px;
    left: auto;
    right: 15px;
  }

  /*Time to animate*/
  .x1 {
    -webkit-animation: moveclouds 15s linear infinite;
    -moz-animation: moveclouds 15s linear infinite;
    -o-animation: moveclouds 15s linear infinite;
  }

  /*variable speed, opacity, and position of clouds for realistic effect*/
  .x2 {
    left: 200px;

    -webkit-transform: scale(0.6);
    -moz-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 0.6;
    /*opacity proportional to the size*/

    /*Speed will also be proportional to the size and opacity*/
    /*More the speed. Less the time in 's' = seconds*/
    -webkit-animation: moveclouds 25s linear infinite;
    -moz-animation: moveclouds 25s linear infinite;
    -o-animation: moveclouds 25s linear infinite;
  }

  .x3 {
    left: -250px;
    top: -200px;

    -webkit-transform: scale(0.8);
    -moz-transform: scale(0.8);
    transform: scale(0.8);
    opacity: 0.8;
    /*opacity proportional to the size*/

    -webkit-animation: moveclouds 20s linear infinite;
    -moz-animation: moveclouds 20s linear infinite;
    -o-animation: moveclouds 20s linear infinite;
  }

  .x4 {
    left: 470px;
    top: -250px;

    -webkit-transform: scale(0.75);
    -moz-transform: scale(0.75);
    transform: scale(0.75);
    opacity: 0.75;
    /*opacity proportional to the size*/

    -webkit-animation: moveclouds 18s linear infinite;
    -moz-animation: moveclouds 18s linear infinite;
    -o-animation: moveclouds 18s linear infinite;
  }

  .x5 {
    left: -150px;
    top: -150px;

    -webkit-transform: scale(0.8);
    -moz-transform: scale(0.8);
    transform: scale(0.8);
    opacity: 0.8;
    /*opacity proportional to the size*/

    -webkit-animation: moveclouds 20s linear infinite;
    -moz-animation: moveclouds 20s linear infinite;
    -o-animation: moveclouds 20s linear infinite;
  }

  @-webkit-keyframes moveclouds {
    0% {
      margin-left: 1000px;
    }

    100% {
      margin-left: -1000px;
    }
  }

  @-moz-keyframes moveclouds {
    0% {
      margin-left: 1000px;
    }

    100% {
      margin-left: -1000px;
    }
  }

  @-o-keyframes moveclouds {
    0% {
      margin-left: 1000px;
    }

    100% {
      margin-left: -1000px;
    }
  }

  .control {
    position: fixed;
    top: 10%;
    right: 0%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    z-index: 99;
  }

  .control a {
    margin: 20px 0;
    transform: rotate(90deg);
    transition: all 0.2s ease-out;
    /* border: 1px solid red; */
    padding: 10px;
    width: 100px;
    height: 100px;
    font-size: 20px;
    color: white;
    text-align: center;
    margin-right: 15px;
    text-shadow: 1px 1px 1px black;
  }

  .control a:hover {
    transform: rotate(0deg);
    transition: all 0.2s ease-out;
    text-decoration: none;
    transform: scale(1.2);
    color: #61baff;
    
  }

  .section {
    overflow-y: auto;
  }

  .weather form input {
    max-width: 500px;
  }

  .weather .temp {
    background-color: white;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin: 10px auto;
  }
</style>