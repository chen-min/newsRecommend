#!/usr/bin/env python
# coding: utf-8
import json
import pyjsonrpc
import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__),'./','common'))
import mongodb_client
from bson.json_util import dumps

SERVER_HOST = 'localhost' 
SERVER_PORT = 4040

class RequestHandler(pyjsonrpc.HttpRequestHandler):
    """Test method"""
    @pyjsonrpc.rpcmethod
    def add(self, a, b):
        print ("add is called")
        return a + b

    @pyjsonrpc.rpcmethod
    def getNews(self):
        db = mongodb_client.get_db()
        news = list(db['news'].find()) 
        return json.loads(dumps(news))


http_server = pyjsonrpc.ThreadingHttpServer(
    server_address = (SERVER_HOST, SERVER_PORT),
    RequestHandlerClass = RequestHandler
)

print ("starting http server on %s:%d" % (SERVER_HOST, SERVER_PORT))

http_server.serve_forever()