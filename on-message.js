var receiveMessage = function(event) {
  switch (event.data.type) {
    case "import":
      var nbm = world.children.find(function(x) { return x instanceof NetsBloxMorph; });
      nbm.droppedText(event.data.blocks, event.data.name);
      break;
  }
}

window.addEventListener("message", receiveMessage, false);
