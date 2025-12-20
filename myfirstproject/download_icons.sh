#!/bin/bash
BASE_URL="https://raw.githubusercontent.com/ClickCalickClick/modules-watchface/main/myfirstproject/resources/images"
FILES=(
"Cloudy-weather.png"
"Generic-weather.png"
"Heavy-rain.png"
"Heavy-snow.png"
"Light-rain.png"
"Light-snow.png"
"Partly-cloudy.png"
"Raining-and-snowing.png"
"Sunny-day.png"
"Clear-night.png"
"Night-partly-cloudy.png"
"Night-cloudy.png"
"Night-light-rain.png"
"Night-heavy-rain.png"
"Night-light-snow.png"
"Night-heavy-snow.png"
"Night-rain-snow.png"
"battery-charging.png"
"battery-empty.png"
"battery-full.png"
"battery-low.png"
"battery-medium.png"
"battery.png"
)

mkdir -p resources/images

for file in "${FILES[@]}"; do
    echo "Downloading $file..."
    wget -q "$BASE_URL/$file" -O "resources/images/$file"
done
