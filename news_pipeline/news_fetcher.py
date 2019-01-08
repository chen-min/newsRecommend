# coding=UTF-8
import os
import sys
from newspaper import Article

# from newspaper import Article
sys.path.append(os.path.join(os.path.dirname(__file__), './', 'scrapers'))
import cnn_news_scraper

#import common package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
from cloudAMQP_client import CloudAMQPClient 

DEDUPE_NEWS_TASK_QUEUE_URL = "amqp://paseydwy:BxqoXrPJNGNJg44fdqppxqnoQQsXzV_5@dinosaur.rmq.cloudamqp.com/paseydwy"
DEDUPE_NEWS_TASK_QUEUE_NAME = "dedupe-news-scrape-news-task-queue"
SCRAPE_NEWS_TASK_QUEUE_URL = "amqp://avpzesmb:FnaNcAYeO3V29qrK5Zv_P24E_mjpvBs3@dinosaur.rmq.cloudamqp.com/avpzesmb"
SCRAPE_NEWS_TASK_QUEUE_NAME = "tap-news-scrape-news-task-queue"


SLEEP_TIME_IN_SECONDS = 5

dedupe_news_queue_client = CloudAMQPClient(DEDUPE_NEWS_TASK_QUEUE_URL, DEDUPE_NEWS_TASK_QUEUE_NAME)
scrape_news_queue_client = CloudAMQPClient(SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)


def handle_message(msg):
    if msg is None or not isinstance(msg, dict):
        print('handle messagebreak')
        return
    task = msg
    text = None
    # #只支持CNN
    # if task['source'] == 'cnn':
    #     print('Scraping cnn news')
    #     text = cnn_news_scraper.extract_news(task['url'])
    # else:
    #     print('News source is not supported')
    # task['text'] = text
    article = Article(task['url'])
    article.download()
    article.parse()
    task['text'] = article.text

    dedupe_news_queue_client.sendMessage(task)

while True:
    if scrape_news_queue_client is not None:
        msg = scrape_news_queue_client.getMessage()
        print(msg,'get msg from scrape queue')
        if msg is not None:
            try:
                handle_message(msg)
            except Exception as e:
                print(e)
                pass
        scrape_news_queue_client.sleep(SLEEP_TIME_IN_SECONDS)









