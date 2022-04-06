import requests
import json

#1
apikey = open("apiKey","r").read()
resp = requests.get( 
    "http://clav-api.di.uminho.pt/v2/classes?nivel=3&apikey="+apikey
) 
print(json.dumps(resp.json(), indent=4, sort_keys=True))
