# AnimeGuesser

## Table of Contents
- [Introduction](#introduction)
- [Usage](#usage)
- [Features](#features)

### Introduction
AnimeGuesser is a program built using javascript, MongoDB, HTML, React, and Python. It showcases a simplistic use case for MVC architecture (Model-View-Controller), by implementing handling of data logic and communication alongside rudimentary UI controls. Then, we take a step further and make use of Python's MoviePy library, creating custom "Guess the anime" videos. As a kid, I used to watch anime with my siblings, and would often play games where we can listen to a song from an anime, and then have to guess which anime it's from. AnimeGuesser takes that game and semi-automates it, allowing a user to easily create "Guess the anime" videos!

### Usage
First, start the server:
- Node server.js
Next, find a song on YouTube and download it's mp3 and mp4.
Next, Go to localhost:5000 in your favorite web browser.
Then, input the required information into the "Submit a Song" section.
Finally, run "create_video.py"
Congrats! Your Guess the Anime video is created!

### Features
- Play guess the song straight from localhost:5000
- Automatic video generation
- Change the number of songs in the final video by updating the while loop at the bottom of create_video.py
- Easily add a song to the database of songs
- Easily change the format of the final video
