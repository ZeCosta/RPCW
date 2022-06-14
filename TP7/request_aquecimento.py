import requests
import json

#apikey = open("apiKey","r").read()
mytoken="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGNiYTg0OWJhYmI2NjdjYmZkYzE2ZSIsImlhdCI6MTY1MzM5MTc0NiwiZXhwIjoxNjU1OTgzNzQ2fQ.DxCI1zx_2Tq8tue_iDO3-bA8_IuDUVxcDSYzXMNplhDKzfLFtHX7Po4AVWPi6fYIcQ1KZ1KPoRT_svOQ89zuySPRg0wnKosDIWPRF2_YPJVZvw5wZn76mRD7wKRBciSRqpe8lzcRIVGIhifJ9Jk-KikKHhQx4W1OBqrWGanT2pOQoEDwyS55KrwXN7eabvRQn1J01mQ5c7e0sPqjcEQmoB8vM_u7c4MWAMjTFQFw_iAaI-N7wkUkoDAfLnY3HMY3zTMq23P0-AYD4_Jjl9-Gy0e8mEZAIIYmhd6vWLQG3CV3BLmU27khiXZ95nOk620kYD7BwPr5jz-JpF0eLavKaA"
apikey=mytoken

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

    