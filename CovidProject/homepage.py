from flask import Flask, render_template, redirect, request
# from flask_pymongo import PyMongo
import LoadData
import urllib.request
import json

# Create an instance of Flask
app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
result = ''
# mongo = PyMongo(app, uri="mongodb://localhost:27017/Covid19")
# mongo_test = PyMongo(app, uri="mongodb://localhost:27017/TestResult")

@app.route("/")
def index():
    # Covid19 = mongo.db.Covid19
    # Covid19_data = LoadData.getData()
    # Covid19.update({}, Covid19_data, upsert=True)
    return render_template("index.html")

@app.route("/map")
def map():

    return render_template("map.html")

@app.route("/Californiamap")
def Californiamap():

    return render_template("Californiamap.html")

@app.route("/Incidentrate")
def Incidentrate():

    return render_template("Incidentrate.html")

@app.route("/stateData2")
def stateData2():

    return render_template("stateData2.html")

@app.route("/StatesData")
def StatesData():

    return render_template("StatesData.html")

@app.route("/Form")
def Form():

    return render_template("Form.html", result=result)


@app.route("/Test", methods=['GET', 'POST'])
def Test():
    if request.method == 'POST':

        # inputName = request.form['inputName']
        # inputGender = request.form['inputGender']
        # inputEmail = request.form['inputEmail']
        temperature = request.form['temperature']
        sats = request.form['sats']

        isLossOfSmell = 'isLossOfSmell' in request.form
        isLossOfTaste = 'isLossOfTaste' in request.form
        isDiabetes = 'isDiabetes' in request.form




        data = {
                "Inputs": {
                        "input1":
                        [
                            {
                                    'covid19_test_results': "",
                                    'loss_of_smell': isLossOfSmell,
                                    'sats': sats,
                                    'temperature': temperature,
                                    'loss_of_taste': isLossOfTaste,
                                    'diabetes': isDiabetes,
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
            result = json.loads(str(result, 'utf-8'))
            result = result["Results"]["output1"][0]
            # ['Scored Labels']
            # print(result)
        except urllib.error.HTTPError as error:
            print("The request failed with status code: " + str(error.code))
            # Print the headers - they include the requert ID and the timestamp, which are useful for debugging the failure
            print(error.info())



    # testData = {"Name":inputName,
    #             "Gender":inputGender,
    #             "Email":inputEmail,
    #             "temperature":temperature,
    #             "sats":sats,
    #             "isLossOfSmell":isLossOfSmell,
    #             "isLossOfTaste":isLossOfTaste,
    #             "isDiabetes":isDiabetes,
    #             "testResult":result
    #             }
    

    # TestResult = mongo_test.db.TestResult
    # TestResult.insert_one(testData)
    return render_template("Form.html", result=result)



if __name__ == "__main__":
    app.run(debug=True)
