// Load the libraries for Google's Teachable Machine
// https://teachablemachine.withgoogle.com/

// We may not the in the first world child. We may be running in a tutorial
// window, for example.
var scene = world.children[0].scenes
    .asArray()
    .find((s) => s.globalVariables.names(true).includes("__module__teachable_machine__")),
  moduleUrl,
  baseUrl;

let prefix = "teachable_machine_";

if (scene) {
  moduleUrl = scene.globalVariables.getVar("__module__teachable_machine__");
  baseUrl = moduleUrl.substring(0, moduleUrl.lastIndexOf("/") + 1);

  function loadSrc(url) {
    var url = baseUrl + url;
    return new Promise((resolve, reject) => {
      if (contains(SnapExtensions.scripts, url)) {
        reject();
      }
      scriptElement = document.createElement("script");
      scriptElement.onload = () => {
        SnapExtensions.scripts.push(url);
        resolve();
        alert(`Successfully loaded ${url}`);
      };
      document.head.appendChild(scriptElement);
      scriptElement.src = url;
    });
  }

  loadSrc("tensorflow-1.3.1.min.js").then(() =>
    loadSrc("teachablemachine-image-0.8.js"),
  );
}

console.log("Loading scripts...");
delete window.tf;
delete window.tmImage;
delete window._tfengine;

SnapExtensions.primitives.set(
  `${prefix}load_model(model_base)`,
  function (model_base) {
    let base_url = model_base.trim();
    let modelURL = base_url + "model.json"; // model topology
    let metadataURL = base_url + "metadata.json"; // model metadata

    window.ensureModelLoadedResult = null;

    return new Promise((resolve) => {
      tmImage
        .load(modelURL, metadataURL)
        .then((loaded_model) => {
          console.log("Image model has loaded");
          window.imageModel = loaded_model;
          window.ensureModelLoadedResult = "Model loaded successfully";
          resolve(window.ensureModelLoadedResult);
        })
        .catch((error) => {
          console.log("Model load error:");
          console.log(error);
          if (error.message.startsWith("Failed to fetch")) {
            window.ensureModelLoadedResult = "The URL could not be reached";
          } else {
            window.ensureModelLoadedResult = error.message;
          }
          resolve(window.ensureModelLoadedResult);
        });
    });
  },
);

SnapExtensions.primitives.set(
  `${prefix}predict(videoCapture)`,
  function (videoCapture = null) {
    const halt_execution = () => {
      alert(
        "There was a problem making predictions. Check your URL and load your model again.",
      );
      //Trick snap into thinking that the x key has been pressed
      world.keyboardFocus.fireKeyEvent("x");
      setTimeout(() => {
        world.keyboardFocus.removePressedKey("x");
      }, 1000);
    };

    if (typeof window.imageModel == "undefined" || window.imageModel == null) {
      console.log("The imageModel was not defined");
      halt_execution();
      return;
    }

    const prediction = window.imageModel
      .predict(videoCapture.contents)
      .then((prediction) => {
        let class_names = window.imageModel.getClassLabels();
        let names_and_scores = prediction.map((score, index) => [
          class_names[index],
          score.probability,
        ]);

        //console.log(class_names)

        var predictionList = [];

        // This loop is for outer array
        for (var i = 0; i < names_and_scores.length; i++) {
          if (names_and_scores[i].length > 1) {
            predictionList.push([class_names[i], names_and_scores[i][1]]);
            //console.log([class_names[i], predictionList[i]])
          }
        }

        window.prediction = predictionList;
        return predictionList;
      })
      .catch((error) => {
        console.log("Image prediction error:");
        console.log(error);
        halt_execution();
      });
  },
);

SnapExtensions.primitives.set(`${prefix}prediction_result`, function () {
  return window.prediction ?? "";
});
