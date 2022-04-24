import wss
import asyncio

loop = asyncio.get_event_loop()

server =  wss.Server(port=8000, useSsl=True, sslCert="python-wss-master/cert/server.crt",
                     sslKey="python-wss-master/cert/server.key")

def onTextMessage(msg, client):
	print("got message from client:", msg)

def onBinaryMessage(msg, client):
	print("got binary message")

server.setTextHandler(onTextMessage)
server.setBinaryHandler(onBinaryMessage)

server.start()
loop.run_forever()