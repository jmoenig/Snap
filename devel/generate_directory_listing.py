from os import listdir
import sys

path = sys.argv[1]

html = "<html><body>\n"
for x in listdir(path):
    if x != "index.html":
        html += "<a href=\"" + x + "\">" + x + "</a><br/>";
html += "</body></html>"

with open(path + "/index.html", "w") as f:
    f.write(html)
