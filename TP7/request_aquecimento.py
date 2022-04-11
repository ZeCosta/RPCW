import requests
import json

apikey = open("apiKey","r").read()


#1
resposta1=[]
resp = requests.get( 
    "http://clav-api.di.uminho.pt/v2/classes/c150?&apikey="+apikey
) 
for filho2 in resp.json()["filhos"]:
    resp2 = requests.get( 
        "http://clav-api.di.uminho.pt/v2/classes/c"+filho2["codigo"]+"?&apikey="+apikey
    )
    resposta1=resposta1 + resp2.json()["filhos"]
print(len(resposta1))

for elem in resposta1:
    print(elem)

print("\n\n------------------------\n------------------------\n\n")

resposta2 = requests.get( 
    "http://clav-api.di.uminho.pt/v2/classes?nivel=4&apikey="+apikey
).json()
print(len(resposta2))
for elem in resposta2:
    print(elem)

print("\n\n------------------------\n------------------------\n\n")

resposta3 = requests.get( 
    "http://clav-api.di.uminho.pt/v2/classes/c750.30?apikey="+apikey
).json()
print(len(resposta3["filhos"]))
for elem in resposta3["filhos"]:
    print(elem)

print("\n\n------------------------\n------------------------\n\n")

resposta4 = requests.get( 
    "http://clav-api.di.uminho.pt/v2/classes/c750.30.001?apikey="+apikey
).json()
print(len(resposta4["processosRelacionados"]))
for elem in resposta4["processosRelacionados"]:
    print(elem)

    