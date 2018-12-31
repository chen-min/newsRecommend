#!/usr/bin/env python
# coding: utf-8

import pyjsonrpc
SERVER_HOST = 'localhost' 
SERVER_PORT = 4040

class RequestHandler(pyjsonrpc.HttpRequestHandler):
    """Test method"""
    @pyjsonrpc.rpcmethod
    def add(self, a, b):
        print ("add is called")
        return a + b

http_server = pyjsonrpc.ThreadingHttpServer(
    server_address = (SERVER_HOST, SERVER_PORT),
    RequestHandlerClass = RequestHandler
)

print ("starting http server on %s:%d" % (SERVER_HOST, SERVER_PORT))

http_server.serve_forever()