import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import WeatherSearch from "./components/weatherSearch";
import WeatherInfo from "./components/weatherInfo";
import axios from "axios";
import { API_KEY, BASE_URL } from "./constant";

const App = () => {
  const [weatherData, setWeatherData] = useState()
  const searchWeather = (location) => {
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        data.visibility /= 1000
        data.visibility = data.visibility.toFixed(2)
        data.main.temp -= 273.15 // Konversi Kelvin ke Celcius
        data.main.temp = data.main.temp.toFixed(2)
        setWeatherData(data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      {/* Berikan function searchWeather ke component weatherSearch */}
      <WeatherSearch searchWeather={searchWeather} />
      {weatherData && <WeatherInfo weatherData={weatherData} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default App;
