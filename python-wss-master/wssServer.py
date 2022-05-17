import wss
import asyncio
import time

from pythonosc.udp_client import SimpleUDPClient

ip_osc = "127.0.0.1"
port_osc = 8010

client_osc = SimpleUDPClient(ip_osc, port_osc)  # Create client


loop = asyncio.get_event_loop()

server =  wss.Server(port=8000, useSsl=True, sslCert="python-wss-master/cert/server.crt",
                     sslKey="python-wss-master/cert/server.key")

def onTextMessage(msg, client):
	print("got message from client:", msg)
	client_osc.send_message("/medias/Gradient_Color/Color/Adjust/Brightness",msg.decode())  # Send float message
	

def onBinaryMessage(msg, client):
	print("got binary message")

server.setTextHandler(onTextMessage)
server.setBinaryHandler(onBinaryMessage)

server.start()
loop.run_forever()