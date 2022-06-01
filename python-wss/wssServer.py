from multiprocessing.dummy import Array
from typing import List
from numpy import array
import wss
import asyncio
import time

from pythonosc.udp_client import SimpleUDPClient

ip_osc = "127.0.0.1"
port_osc = 8010
lista_movimenti  = list()
client_osc = SimpleUDPClient(ip_osc, port_osc)  # Create client


loop = asyncio.get_event_loop()

server =  wss.Server(port=8000, useSsl=True, sslCert="python-wss/cert/server.crt",
                     sslKey="python-wss/cert/server.key")

def onTextMessage(msg, client):
	print("got message from client:", msg.decode())
	lista_movimenti.append(msg.decode())
	f = open("movementdata.txt", "a")
	f.write(msg.decode()+ "\n")
	#f.close()
	if len(lista_movimenti) == 100:
		print("ENTRATO!!!!!!!")
		value = sum([float(i) for i in lista_movimenti]) / len(lista_movimenti)
		client_osc.send_message("/medias/Gradient_Color/Color/Adjust/Brightness",value)  # Send float message
		lista_movimenti.clear()


def onBinaryMessage(msg, client):
	print("got binary message")

server.setTextHandler(onTextMessage)
server.setBinaryHandler(onBinaryMessage)

server.start()
loop.run_forever()