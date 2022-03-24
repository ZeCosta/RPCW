import json

with open('arq-son-EVO.json', 'r', encoding='utf8') as json_file:
    content=json.load(json_file)

default_id=0
for c in content["musicas"]:
    c["id"]=default_id
    default_id+=1
    print(c)
    print("\n")


with open('arq-son-EVO_with-id.json', 'w', encoding='utf8') as json_file:
    json.dump(content, json_file, indent=4, ensure_ascii=False)