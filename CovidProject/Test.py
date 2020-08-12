import urllib.request
import json
data = {
        "Inputs": {
                "input1":
                [
                    {
                            'covid19_test_results': "",
                            'loss_of_smell': "false",
                            'sats': "90",
                            'temperature': "1",
                            'loss_of_taste': "false",
                            'diabetes': "false",
                    }
                ],
        },
    "GlobalParameters":  {
    }
}
body = str.encode(json.dumps(data))
url = ''
api_key = ''
headers = {'Content-Type':'application/json', 'Authorization':('Bearer '+ api_key)}
req = urllib.request.Request(url, body, headers)
try:
    response = urllib.request.urlopen(req)
    result = response.read()
    print(result)
except urllib.error.HTTPError as error:
    print("The request failed with status code: " + str(error.code))
    # Print the headers - they include the requert ID and the timestamp, which are useful for debugging the failure
    print(error.info())
