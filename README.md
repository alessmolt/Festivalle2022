# Festivalle2022

## About

Our work proposes a mapping between the movements of the audience and LED light patterns on stage. The aim is for the attendants to feel empowered and deeply and directly involved, changing the performance in a controlled way that does not compromise its own artisticity.

A key aspect of this project is to propose a sophisticated system with technology of daily use. With the sole employment of smartphone sensors we managed to define a metric that describes the movement of the crowd, which drives the whole structure. 

The system suggested in this repository is done in collaboration with Festivalle2022, an Italian jazz festival.  

For a full detailed description of our system we suggest to read [our paper](L29_Report.pdf).

## How to use

* The application runs on a web server. To set up the server find the IP address of your machine and paste it as suggested by the comments in the file sensor-client.js, and the server itself should retrieve it by its own. (NOTE: the server and all the clients at this stage must be connected to the same private network, i.e. the same WiFi, hotspot and so on).

* In the file python-wss/wssServer.py modify the variable ip_osc with the one of the machine runnning the MadMapper file and receiving OSC messages. 
* Run python-wss/wssServer.py to start the websocket secure server.
* Connect using Chrome to https://x.x.x.x:5500/ where x.x.x.x is the IP address or more conviniently to the GitHub Pages link of this repository https://alessmolt.github.io/Festivalle2022/ (NOTE: is important to use https protocol in order to access the smartphone's sensors. Chrome might also notify the connection as unsafe because we created the certificates by ourselves) 
* Now you should be able to see the screen of your phone changing colors while it moves. This means you are all setup. Move along with your music and enjoy!

#### MadMapper

MadMapper manages the DMX protocol and communicates via OSC with the server. You can use you own patterns according to your light setup. In order to do so remember to add OSC controls to MadMapper scenes and copy their OSC address in the appropriate section of python-wss/wssServer.py. You can use our .mad file as a reference template. 

