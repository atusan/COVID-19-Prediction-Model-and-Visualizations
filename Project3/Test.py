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
url = 'https://ussouthcentral.services.azureml.net/workspaces/9dd08afd6c2a46279748e85ce6d087f5/services/b50514218e8340399611a015edd70944/execute?api-version=2.0&format=swagger'
api_key = 'yOIfNt0USxKAf91b7eO/c4NgYnYfnXrto5whh2dbz9gfLXiUYoq6ynPnzzG0Uva1dafa2eNS3dRf28rY94hRHw=='
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