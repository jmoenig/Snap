// Copyright 2023 The MediaPipe Authors.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//      http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import {
    PoseLandmarker,
    GestureRecognizer,
    FaceDetector,
    FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3"

let gestureRecognizer = GestureRecognizer;
let poseLandmarker = PoseLandmarker;
let faceDetector = FaceDetector;
let runningMode = "IMAGE";

// Before we can use HandLandmarker class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
const createObjects = async () => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
    );
    gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
            delegate: "GPU"
        },
        runningMode: runningMode
    });
    poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
            delegate: "GPU"
        },
        runningMode: runningMode
    });
    faceDetector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
            delegate: "GPU"
        },
        runningMode: runningMode
    });
};
createObjects();

async function ensureObjects() {
    if (!gestureRecognizer || !faceDetector || !poseLandmarker) {
        alert("Please wait for objects to load");
        return;
    }
};

// Here ends the MediaPipe code and begins the Snap! wrapper

// Utilities

function validateCostume(costume) {
    return costume.contents instanceof HTMLCanvasElement &&
        costume.contents.width > 0 &&
        costume.contents.height > 0;
}

// SnapExtension primitive definitions

SnapExtensions.primitives.set(
    'ecv_init()',
    function () {
        ensureObjects();
    }
);

SnapExtensions.primitives.set(
    'ecv_hand_landmarks(costume)',
    function (costume) {
        if (validateCostume(costume)) {
            const results = gestureRecognizer.recognize(costume.contents);
            return JSON.stringify(results.landmarks);
        } else {
            throw new Error('Needs a costume');
        }
    }
);

SnapExtensions.primitives.set(
    'ecv_handednesses(costume)',
    function (costume) {
        if (validateCostume(costume)) {
            const results = gestureRecognizer.recognize(costume.contents);
            return JSON.stringify(results.handednesses);
        } else {
            throw new Error('Needs a costume');
        }
    }
);

SnapExtensions.primitives.set(
    'ecv_hand_gestures(costume)',
    function (costume) {
        if (validateCostume(costume)) {
            const results = gestureRecognizer.recognize(costume.contents);
            return JSON.stringify(results.gestures);
        } else {
            throw new Error('Needs a costume');
        }
    }
);

SnapExtensions.primitives.set(
    'ecv_find_face(costume)',
    function (costume) {
        if (validateCostume(costume)) {
            const results = faceDetector.detect(costume.contents);
            return JSON.stringify(results.detections);
        } else {
            throw new Error('Needs a costume');
        }
    }
);

SnapExtensions.primitives.set(
    'ecv_pose_landmarks(costume)',
    function (costume) {
        if (validateCostume(costume)) {
            const results = poseLandmarker.detect(costume.contents);
            return JSON.stringify(results.landmarks);
        } else {
            throw new Error('Needs a costume');
        }
    }
);
