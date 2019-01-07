#!/usr/bin/env python
# coding: utf-8
import json
import pyjsonrpc
import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__),'./','common'))
import mongodb_client
from bson.json_util import dumps
import operations

SERVER_HOST = 'localhost' 
SERVER_PORT = 4040

class RequestHandler(pyjsonrpc.HttpRequestHandler):
    """Test method"""
    @pyjsonrpc.rpcmethod
    def add(self, a, b):
        print ("add is called")
        return a + b

    @pyjsonrpc.rpcmethod
    def getNewsSummariesForUser(self, user_id, page_num):
        # db = mongodb_client.get_db()
        # print(db,'dbs')
        # news = list(db['news'].find()) 
        # print(news,"news123")
        # return json.loads(dumps(news))
        return operations.getNewsSummariesForUser(user_id, page_num)

    @pyjsonrpc.rpcmethod
    def log_news_click_for_user(self, user_id, news_id):
        print("log_news_click_for_user is called with %s and %s" % (user_id, news_id))
        return operations.logNewsClickForUser(user_id, news_id)


http_server = pyjsonrpc.ThreadingHttpServer(
    server_address = (SERVER_HOST, SERVER_PORT),
    RequestHandlerClass = RequestHandler
)

print ("starting http server on %s:%d" % (SERVER_HOST, SERVER_PORT))

http_server.serve_forever()