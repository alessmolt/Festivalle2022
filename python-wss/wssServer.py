from multiprocessing.dummy import Array
from typing import List
from numpy import array
import wss
import asyncio
import time
from random import randrange

from pythonosc.udp_client import SimpleUDPClient

ip_osc = "127.0.0.1"
port_osc = 8010
movement_buffer  = list()
client_osc = SimpleUDPClient(ip_osc, port_osc)  # Create  osc client
BUFFER_LENGTH = 100		# Number of data on which the mean is calculated
HIGH_TH = 20		#threshold determining high quantity of movement
MODERATE_TH = 10	#threshold determining moderate quantity of movement

loop = asyncio.get_event_loop()

# Create https socket server
server =  wss.Server(port=8000, useSsl=True, sslCert="python-wss/cert/server.crt",
                     sslKey="python-wss/cert/server.key")


# On socket message callback
def onTextMessage(msg, client):
	print("got message from client:", msg.decode())
	movement_buffer.append(msg.decode())
	if len(movement_buffer) == BUFFER_LENGTH:
		value = sum([float(i) for i in movement_buffer]) / len(movement_buffer) # Mean of the buffer containing all the user data 
		print("Data sent! --> " + str(value))
		pattern = randrange(3)
		if value > HIGH_TH:
			if pattern == 0:
				client_osc.send_message("/cues/selected/columns/9",value)  # Send float message
			elif pattern == 1: 
				client_osc.send_message("/cues/selected/columns/10",value)
			elif pattern == 2: 
				client_osc.send_message("/cues/selected/columns/11",value)

		elif value > MODERATE_TH:
			if pattern == 0:
				client_osc.send_message("/cues/selected/columns/6",value)
			elif pattern == 1: 
				client_osc.send_message("/cues/selected/columns/7",value)
			elif pattern == 2: 
				client_osc.send_message("/cues/selected/columns/8",value)

		else:
			if pattern == 0:
				client_osc.send_message("/cues/selected/columns/3",value)
			elif pattern == 1: 
				client_osc.send_message("/cues/selected/columns/4",value)
			elif pattern == 2: 
				client_osc.send_message("/cues/selected/columns/5",value)

		movement_buffer.clear()



server.setTextHandler(onTextMessage)

server.start()
loop.run_forever()