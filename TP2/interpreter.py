import re
import json

f = open('dataset.json')
data = json.load(f)

index_html="""<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Indice</title>
    </head>
    <body>
        <h1>Índice dos filmes</h1>
        <ul>
"""

prog = re.compile(r'(\(.*\))|(^\($)|(^\)$)|and')
def atorvalido(ator):
    result = prog.match(ator)
    if result: return False
    else: return True

atores={}
filmeID=1
atorID=1
for linha in data:
    link="http://localhost:7777/filmes/f"+str(filmeID)
    filename="filmes/f"+str(filmeID)+".html"
    filme_html="""<html>
    <head>
        <meta charset="UTF-8"/>
        <title>"""+ linha["title"]+"""</title>
    </head>
    <body>
"""
    filme_html+="\t\t<h1><b>Nome do filme:</b> "+linha["title"]+"</h1>\n"
    filme_html+="\t\t<h3><b>Ano de lançamento:</b> "+str(linha["year"])+"</h3>\n"
    filme_html+="""        <h3><b>Elenco:</b></h3>
        <ul>

"""
    for ator in linha["cast"]:
        if atorvalido(ator):
            if ator not in atores:
                atores[ator]=[0,atorID,[]]
                atorID+=1
            filme_html+="\t\t\t<li><a href=\"http://localhost:7777/atores/a"+str(atores[ator][1])+"\">"+ator+"</a></li>\n"        #<a href=\""+ link +"\">"+ link="http://localhost:7777/filmes/f"+str(filmeID)
            atores[ator][0]+=1
            atores[ator][2].append((linha["title"],link))

    filme_html+="""\t\t</ul>
"""
    filme_html+="""        <h3><b>Géneros:</b></h3>
        <ul>
"""
    for genero in linha["genres"]:
        filme_html+="\t\t\t<li>"+genero+"</li>\n"
    filme_html+="""\t\t</ul>
    </body>
</html>"""
    
    filmen = open(filename, "w")
    filmen.write(filme_html)
    filmen.close()
    
    index_html+="\t\t\t<li><a href=\""+ link +"\">"+linha["title"]+"</a></li>\n"
    filmeID+=1
 

index_html+="""\t\t</ul>
    </body>
</html>
"""
index = open("index.html", "w")
index.write(index_html)
index.close()


#Ordenar atores
import collections
order1=collections.OrderedDict(sorted(atores.items()))
order2={k: v for k, v in sorted(order1.items(), key=lambda item: item[1])}
print(order2)
order3=reversed(order2)


atores_html="""<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Atores</title>
    </head>
    <body>
        <h1>Índice dos atores</h1>
        <ul>
"""
for ator in order3:
    print(order2[ator])
    link="http://localhost:7777/atores/a"+str(atores[ator][1])
    atores_html+="\t\t\t<li><a href=\""+ link +"\">"+ator+"</a></li>\n"
    filename="atores/a"+str(atores[ator][1])+".html"
    ator_html="""<html>
    <head>
        <meta charset="UTF-8"/>
        <title>"""+ linha["title"]+"""</title>
    </head>
    <body>
"""
    ator_html+="\t\t<h1><b>Nome do ator:</b> "+ator+"</h1>\n"
    ator_html+="\t\t<h3><b>Numero de filmes em que participa:</b> "+str(atores[ator][0])+"</h3>\n"
    ator_html+="""        <h3><b>Filmes onde participa:</b></h3>
        <ul>
"""
    for (fn,li) in atores[ator][2]:
        ator_html+="\t\t\t<li><a href=\""+ li +"\">"+fn+"</a></li>\n"
    ator_html+="""\t\t</ul>
    </body>
</html>"""

    filmeAtor = open(filename, "w")
    filmeAtor.write(ator_html)
    filmeAtor.close()
    #break

atores_html+="""\t\t</ul>
    </body>
</html>
"""
fileAtores = open("atores.html", "w")
fileAtores.write(atores_html)
fileAtores.close()


'''
for linha in data:
    filename="filmes/f"+str(filmeID)+".html"
    filme_html="""<html>
    <head>
        <meta charset="UTF-8"/>
        <title>"""+ linha["title"]+"""</title>
    </head>
    <body>
"""
    filme_html+="\t\t<h1><b>Nome do filme:</b> "+linha["title"]+"</h1>\n"
    filme_html+="\t\t<h3><b>Ano de lançamento:</b> "+str(linha["year"])+"</h3>\n"
    filme_html+="""        <h3><b>Elenco:</b></h3>
        <ul>

"""
    for ator in linha["cast"]:
        if atorvalido(ator):
            filme_html+="\t\t\t<li>"+ator+"</li>\n"
            if ator not in atores:
                atores[ator]=[0]
            atores[ator][0]+=1
            atores[ator].append((linha["title"],link))

    filme_html+="""\t\t</ul>
"""
    filme_html+="""        <h3><b>Géneros:</b></h3>
        <ul>
"""
    for genero in linha["genres"]:
        filme_html+="\t\t\t<li>"+genero+"</li>\n"
    filme_html+="""\t\t</ul>
    </body>
</html>"""
    
    filmen = open(filename, "w")
    filmen.write(filme_html)
    filmen.close()
    
    index_html+="\t\t\t<li><a href=\""+ link +"\">"+linha["title"]+"</a></li>\n"
    filmeID+=1
 

index_html+="""\t\t</ul>
    </body>
</html>
"""
index = open("index.html", "w")
index.write(index_html)
index.close()
'''