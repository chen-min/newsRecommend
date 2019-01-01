from cloudAMQP_client import CloudAMQPClient 
CLOUDAMQP_URL ="amqp://bukvmvbg:PtFNv48W5rqDitFCpsr3rX0fsSsd3D97@dinosaur.rmq.cloudamqp.com/bukvmvbg"
TEST_QUEUE_NAME = "test"

def test_basic():
    client = CloudAMQPClient(CLOUDAMQP_URL, TEST_QUEUE_NAME)

    sentMsg = {"test": "test"}
    client.sendMessage(sentMsg)
    client.sleep(10)
    receivedMsg = client.getMessage()

    assert sentMsg == receivedMsg
    print("test_basic passed!!")

if __name__=="__main__":
    test_basic()