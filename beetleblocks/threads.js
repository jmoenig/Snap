Process.prototype.clear = function () {
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);

    this.stopDrawing();
    this.stopExtrusion();
    beetle.extrusionDiameter = 1;

    stage.clearAll();

    beetle.multiplierScale = 1;

    beetle.reset();
    beetle.color.reset();
    beetle.posAndRotStack = [];
    beetle.materialCache = [];
    stage.reRender();
};

Process.prototype.goHome = function () {
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        p = new THREE.Vector3(),
        startPoint = p.copy(beetle.position);

    beetle.reset();

    if (beetle.extruding) {
        this.addPointToExtrusion();
    }

    if (beetle.drawing) {
        var p = new THREE.Vector3();
        var endPoint = p.copy(beetle.position);
        this.addLineGeom(startPoint, endPoint);
    }

    stage.reRender();
};

Process.prototype.setScale = function (scale) {
    var sprite = this.homeContext.receiver,
        beetle = sprite.beetle,
        ide = sprite.parentThatIsA(IDE_Morph);

    beetle.multiplierScale = Math.max(0, Number(scale));
    ide.statusDisplay.refresh();
};

Process.prototype.changeScale = function (delta) {
    var sprite = this.homeContext.receiver,
        beetle = sprite.beetle,
        ide = sprite.parentThatIsA(IDE_Morph);

    beetle.multiplierScale += Number(delta);

    if (beetle.multiplierScale < 0) { beetle.multiplierScale = 0 };

    ide.statusDisplay.refresh();
};

Process.prototype.reportScale = function () {
    var beetle = this.homeContext.receiver.beetle;
    return beetle.multiplierScale;
};

Process.prototype.setPosition = function (x, y, z) {	
    var beetle = this.homeContext.receiver.beetle,
        p = new THREE.Vector3(),
        startPoint = p.copy(beetle.position),
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);

    x = Number(x);
    y = Number(y);
    z = Number(z);

    beetle.position.set(y, z, x); 

    if (beetle.extruding) {
        this.addPointToExtrusion();
    }

    if (beetle.drawing) {
        var p = new THREE.Vector3();
        var endPoint = p.copy(beetle.position);
        this.addLineGeom(startPoint, endPoint);
    }

    if (startPoint.y != beetle.position.y) {
        beetle.applyCostume();
    }

    stage.reRender();
};

Process.prototype.setPositionOnAxis = function (axis, pos) {
    var beetle = this.homeContext.receiver.beetle,
        p = new THREE.Vector3(),
        startPoint =  p.copy(beetle.position),
        axis = axis[0],
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);


    pos = Number(pos);
    if (axis === 'x') {
        beetle.position.setZ(pos);
    }
    if (axis === 'y') {
        beetle.position.setX(pos);
    }
    if (axis === 'z') {
        beetle.position.setY(pos);
    }		
    if (beetle.extruding) {
        this.addPointToExtrusion();
    }
    if (beetle.drawing) {
        var p = new THREE.Vector3();
        var endPoint = p.copy(beetle.position);
        this.addLineGeom(startPoint, endPoint);
    }

    if (startPoint.x != beetle.position.x) {
        beetle.applyCostume();
    }

    stage.reRender();
};

Process.prototype.changePositionBy = function (axis, dist) {
    var beetle = this.homeContext.receiver.beetle,
        p = new THREE.Vector3(),
        startPoint =  p.copy(beetle.position),
        axis = axis[0],
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);

    dist = Number(dist) * beetle.multiplierScale;
    if (axis === 'x') {
        beetle.position.z += dist;
    }
    if (axis === 'y') {
        beetle.position.x += dist;
    }
    if (axis === 'z') {
        beetle.position.y += dist;
    }	
    if (beetle.extruding) {
        this.addPointToExtrusion();
    }
    if (beetle.drawing) {
        var p = new THREE.Vector3();
        var endPoint = p.copy(beetle.position);
        this.addLineGeom(startPoint, endPoint);
    }	

    if (startPoint.x != beetle.position.x) {
        beetle.applyCostume();
    }
    
    stage.reRender();
};

Process.prototype.setRotationOnAxis = function (axis, angle) {
    var beetle = this.homeContext.receiver.beetle,
        axis = axis[0],
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);

    angle = Number(angle);
    if (axis === 'x') {
        beetle.rotation.z = radians(angle * -1);
    }
    if (axis === 'y') {
        beetle.rotation.x = radians(angle * -1);
    }
    if (axis === 'z') {
        beetle.rotation.y = radians(angle);
    }

    if (beetle.extruding) {
        this.addPointToExtrusion();
    }

    stage.reRender();
};

Process.prototype.pointTowards = function (x, y, z) {
    // We're losing precision here
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        x = Number(x),
        y = Number(y),
        z = Number(z);

    beetle.lookAt(new THREE.Vector3(y, z, x));
    stage.reRender();
};

Process.prototype.addLineGeom = function (startPoint, endPoint) {
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        lineMaterial = new THREE.LineBasicMaterial({ color: beetle.color });

    if (beetle.drawStyle === 'curves') {

        // If this is the first segment, let's create an object and add the first point
        if (beetle.spline === null) {
            beetle.spline = {};
            beetle.spline.points = [startPoint];
        }

        beetle.spline.points.push(endPoint);
        beetle.spline.curve = new THREE.CatmullRomCurve3(beetle.spline.points);

        beetle.spline.geometry = new THREE.Geometry();
        beetle.spline.geometry.vertices = beetle.spline.curve.getPoints(beetle.spline.curve.points.length * 12);

        stage.myObjects.remove(beetle.spline.line);
        beetle.spline.line = new THREE.Line(beetle.spline.geometry, lineMaterial);
        beetle.spline.line.anchorPoints = beetle.spline.curve.points;
        beetle.spline.line.type = 'spline';
        stage.myObjects.add(beetle.spline.line);
        
    } else {
        
        // We don't care if there is no option selected, we start drawing lines by default
        // If this is the first segment, let's create an object and add the first point
        if (beetle.polyline === null) {
            beetle.polyline = {};
            beetle.polyline.points = [startPoint];
        }

        beetle.polyline.points.push(endPoint);

        beetle.polyline.geometry = new THREE.Geometry();
        beetle.polyline.geometry.vertices = beetle.polyline.points;
        beetle.polyline.geometry.verticesNeedUpdate = true;

        stage.myObjects.remove(beetle.polyline.line);
        beetle.polyline.line = new THREE.Line(beetle.polyline.geometry, lineMaterial);
        beetle.polyline.line.type = 'polyline';
        stage.myObjects.add(beetle.polyline.line);

    }

    stage.reRender();
};

Process.prototype.move = function (dist) {
    var beetle = this.homeContext.receiver.beetle,
        p, startPoint,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);

    if (beetle.drawing) {
         p = new THREE.Vector3();
         startPoint =  p.copy(beetle.position);
    }

    dist = Number(dist) * beetle.multiplierScale;
    beetle.translateZ(dist);

    if (beetle.extruding) {
        this.addPointToExtrusion();
    }
    if (beetle.drawing) {
        p = new THREE.Vector3();
        endPoint = p.copy(beetle.position);
        this.addLineGeom(startPoint, endPoint);
    }

    beetle.applyCostume();
    stage.reRender();
};

Process.prototype.rotate = function (axis, angle) {
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        axis = axis[0],
        angle = Number(angle);

    if (axis === 'x') {
        beetle.rotateZ(radians(angle) * -1);
    }
    if (axis === 'y') {
        beetle.rotateX(radians(angle) * -1);
    }
    if (axis === 'z') {
        beetle.rotateY(radians(angle));
    }	

    stage.reRender();
};

Process.prototype.cube = function (size) {
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph), 
        size = Number(size) * beetle.multiplierScale;
    
    this.addBoxGeom(size, size, size);

    stage.reRender();
};

Process.prototype.cuboid = function (length, width, height) {
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph), 
        length = Number(length) * beetle.multiplierScale,
        width = Number(width) * beetle.multiplierScale,
        height = Number(height) * beetle.multiplierScale;

    this.addBoxGeom(width, height, length); 

    stage.reRender();
};

Process.prototype.addBoxGeom = function (length, width, height) {
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        boxGeometry = beetle.cache.findGeometry('box', [length, width, height]),
        box;

    if (!boxGeometry) {
        boxGeometry = new THREE.BoxGeometry(Math.abs(length), Math.abs(width), Math.abs(height));
        beetle.cache.addGeometry('box', boxGeometry, [length, width, height]);
    }

    box = new THREE.Mesh(boxGeometry, beetle.makeMaterial());
    box.position.copy(beetle.position);
    box.rotation.copy(beetle.rotation);	

    // If any of the sides is negative, we carve a negative cuboid
    stage.myObjects.add(box, (length < 0 || width < 0 || height < 0));
    stage.reRender();
};

Process.prototype.sphere = function (diam) {
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        diam = Number(diam) * beetle.multiplierScale;

    this.addSphereGeom(diam);
};

Process.prototype.addSphereGeom = function (diam, isExtrusionCap, material) {
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        sphereGeometry = beetle.cache.findGeometry('sphere', [diam, isExtrusionCap]),
        sphere;

    if (!sphereGeometry) {
        sphereGeometry = new THREE.SphereGeometry(
                Math.abs(diam/2), 
                isExtrusionCap ?  12: 16,
                isExtrusionCap ?  6: 12);

        beetle.cache.addGeometry('sphere', sphereGeometry, [diam, isExtrusionCap]);
    }

    sphere = new THREE.Mesh(sphereGeometry, material ? material : beetle.makeMaterial());
    sphere.position.copy(beetle.position);
    sphere.rotation.copy(beetle.rotation);
    
    // If the diameter is negative, we carve a negative sphere
    stage.myObjects.add(sphere, diam < 0);
    stage.reRender();

    return sphere;
};

Process.prototype.tube = function (length, outer, inner) {
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph), 
        length = Number(length) * beetle.multiplierScale,
        outer = Number(outer) * beetle.multiplierScale,
        inner = Number(inner) * beetle.multiplierScale;

    this.addTubeGeom(length, outer, inner);

    stage.reRender();
};

Process.prototype.addTubeGeom = function (length, outer, inner) {
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph), 
        tubeGeom = beetle.cache.findGeometry('tube', [length, outer, inner]),
        outerRadius, innerRadius, arcShape, holePath, tube;

    if (!tubeGeom) {
        outerRadius = outer/2;
        innerRadius = inner/2;

        arcShape = new THREE.Shape();
        arcShape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

        // ThreeJS r84 (maybe earlier) doesn't close circles unless they go
        // over Math.PI * 2. Werid.
        holePath = new THREE.Path();
        holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2.01, true);
        arcShape.holes.push(holePath);

        tubeGeom = new THREE.ExtrudeGeometry(
                arcShape, 
                { 
                    amount: length, 
                    steps: 1, 
                    bevelEnabled: true, 
                    bevelThickness: 0, 
                    bevelSize: 0 
                }); 

        tubeGeom.computeFaceNormals();
        tubeGeom.computeVertexNormals();

        beetle.cache.addGeometry('tube', tubeGeom, [length, outer, inner]);
    }

    tube = new THREE.Mesh(tubeGeom, beetle.makeMaterial());
    tube.position.copy(beetle.position);
    tube.rotation.copy(beetle.rotation);	
    tube.translateZ(-length/2);		

    stage.myObjects.add(tube);
};

Process.prototype.text = function (textString, height, depth) {
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph), 
        textGeometry = beetle.cache.findGeometry('text', [textString, height, depth]),
        height, depth, mesh;

    if (!textGeometry) {

        height = Number(height) * beetle.multiplierScale;
        depth = Number(depth) * beetle.multiplierScale;
            
        textGeometry = new THREE.TextGeometry(textString, { font: stage.font, size: height, height: depth });

        beetle.cache.addGeometry('text', textGeometry, [textString, height, depth]);
    }

    mesh = new THREE.Mesh(textGeometry, beetle.makeMaterial());

    mesh.position.copy(beetle.position);
    mesh.rotation.copy(beetle.rotation);	
    mesh.geometry.center();
    mesh.rotateY(-Math.PI/2);
    stage.myObjects.add(mesh);

    stage.reRender();
};

Process.prototype.text2D = function (textString, size) {
    this.text(textString, size, 0);
};

Process.prototype.startExtrusion = function (extrudeStyle) {
    var beetle = this.homeContext.receiver.beetle,
        extrudeStyle = extrudeStyle ? extrudeStyle[0] : 'lines',
        stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        p = new THREE.Vector3();

    if (!beetle.extruding) {
        beetle.extruding = true;
        beetle.extrudeStyle = extrudeStyle;
        beetle.extrusionPoints = [];
        beetle.startSphere = this.addSphereGeom(beetle.extrusionDiameter * beetle.multiplierScale, true);
        this.addPointToExtrusion();
    } else if (beetle.extrudeStyle != extrudeStyle) {
        this.stopExtrusion();
        this.startExtrusion(extrudeStyle);
    }
};

Process.prototype.stopExtrusion = function () {
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);

    if (beetle.extruding) {
        beetle.extrusion = null;
        beetle.extruding = false;
        beetle.extrudeStyle = null;
        beetle.extrusionPoints = [];
        beetle.endSphere = null;
        beetle.startSphere = null;
    }

    stage.reRender();
};

Process.prototype.addPointToExtrusion = function () {
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        p = new THREE.Vector3(),
        geometry, extrudeBend, segments, geometry, distanceToLast, cylinder, joint;

    p.copy(beetle.position);
    beetle.extrusionPoints.push(p);

    if (beetle.extrudeStyle === 'curves') {
        // Catmull-Rom strategy
        if (beetle.extrusion) { stage.myObjects.remove(beetle.extrusion) };
        if (beetle.extrusionPoints.length < 2) { return };
        if (beetle.endSphere) { stage.myObjects.remove(beetle.endSphere) };

        beetle.endSphere = this.addSphereGeom(beetle.extrusionDiameter * beetle.multiplierScale, true);

        extrudeBend = new THREE.CatmullRomCurve3(beetle.extrusionPoints);

        extrudeBend.type = 'catmullrom';
        extrudeBend.tension = 0.2;

        segments = Math.max(Math.floor((extrudeBend.getLength()) * 2), 12);
        geometry = new THREE.TubeGeometry(extrudeBend, segments, (beetle.extrusionDiameter / 2) * beetle.multiplierScale, 12, false);

        beetle.extrusion = new THREE.Mesh(geometry, beetle.makeMaterial());
        stage.myObjects.add(beetle.extrusion);
    } else {
        // Cylinder and sphere strategy
        distanceToLast = beetle.extrusionPoints[0].distanceTo(beetle.position);

        geometry = new THREE.CylinderGeometry(
            (beetle.extrusionDiameter / 2) * beetle.multiplierScale, //radiusTop
            (beetle.extrusionDiameter / 2) * beetle.multiplierScale, //radiusBottom
            distanceToLast, //height
            12 // radiusSegments
            );
        
        cylinder = new THREE.Mesh(geometry, beetle.startSphere.material); // reusing the same material speeds things up
        cylinder.position.copy(beetle.position);
        cylinder.rotation.copy(beetle.rotation);
        cylinder.lookAt(beetle.extrusionPoints[0]);
        cylinder.rotateX(-Math.PI/2);
        cylinder.translateY(-distanceToLast/2);

        beetle.extrusionPoints[0] = p.copy(beetle.position);

        joint = new THREE.Mesh(beetle.startSphere.geometry, beetle.startSphere.material);
        joint.position.copy(beetle.position);
        joint.rotation.copy(beetle.rotation);

        stage.myObjects.add(joint); 
        stage.myObjects.add(cylinder); 
    }

    stage.reRender();
};

Process.prototype.setExtrusionDiameter = function (diameter) {
    var beetle = this.homeContext.receiver.beetle;
    if (!beetle.extruding) {
        this.homeContext.receiver.beetle.extrusionDiameter = diameter;
    }
};

Process.prototype.changeExtrusionDiameter = function (delta) {
    var beetle = this.homeContext.receiver.beetle;
    if (!beetle.extruding) {
        this.homeContext.receiver.beetle.extrusionDiameter += delta;
    }
};

Process.prototype.startDrawing = function (drawStyle) {
    var beetle = this.homeContext.receiver.beetle,
        drawStyle = drawStyle ? drawStyle[0] : 'lines';

    if (!beetle.drawing) {
        beetle.drawing = true;
        beetle.drawStyle = drawStyle;
    } else if (beetle.drawStyle != drawStyle) {
        this.stopDrawing();
        this.startDrawing(drawStyle);
    }
};

Process.prototype.stopDrawing = function () {
    var beetle = this.homeContext.receiver.beetle;
    beetle.drawing = false;
    beetle.drawStyle = null;
    beetle.spline = null;
    beetle.polyline = null;
};

// Negative Geometry
Process.prototype.startNegativeGeometry = function () {
    var beetle = this.homeContext.receiver.beetle;
    beetle.negative = true;
};

Process.prototype.stopNegativeGeometry = function () {
    var beetle = this.homeContext.receiver.beetle;
    beetle.negative = false;
};

Process.prototype.pickHue = function (value) {
    this.setHSLA(['hue'], value.hsv()[0] * 360);
};
Process.prototype.setHSLA = function (channel, value) {
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        channel = channel[0],
        value = Number(value),
        hsl = beetle.color.getHSL(),
        style;

    // Hue is cyclic, while saturation, lightness and opacity are clipped between 0 and 100

    if (channel === 'hue') {
        beetle.color.state.h = Math.abs(value + 360) % 360;
    } else if (channel === 'saturation') {
        beetle.color.state.s = Math.max(Math.min(value, 100), 0);
    } else if (channel === 'lightness') {
        beetle.color.state.l = Math.max(Math.min(value, 100), 0);
    } else if (channel === 'opacity') {
        beetle.shape.material.opacity = Math.max(Math.min(value / 100, 1), 0);
    }

    beetle.color.update();

    if (beetle.drawing) {
        style = beetle.drawStyle;
        this.stopDrawing();
        this.startDrawing(style);
    }

    if (beetle.extruding) {
        style = beetle.extrudeStyle;
        this.stopExtrusion();
        this.startExtrusion(style);
    }

    stage.reRender();
};

Process.prototype.changeHSLA = function (channel, value) {	
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        channel = channel[0],
        value = Number(value),
        style;

    // Hue is cyclic, while saturation, lightness and opacity are clipped between 0 and 100

    if (channel === 'hue') {
        beetle.color.state.h = Math.abs(beetle.color.state.h + value + 360) % 360;
    } else if (channel === 'saturation') {
        beetle.color.state.s = Math.max(Math.min((beetle.color.state.s + value), 100), 0);
    } else if (channel === 'lightness') {
        beetle.color.state.l = Math.max(Math.min((beetle.color.state.l + value), 100), 0);
    } else if (channel === 'opacity') {
        beetle.shape.material.opacity = Math.max(Math.min(beetle.shape.material.opacity + value / 100, 1), 0);
    }

    beetle.color.update();

    if (beetle.drawing) {
        style = beetle.drawStyle;
        this.stopDrawing();
        this.startDrawing(style);
    }

    if (beetle.extruding) {
        style = beetle.extrudeStyle;
        this.stopExtrusion();
        this.startExtrusion(style);
    }

    stage.reRender();
};

Process.prototype.getHSLA = function (channel) {
    var beetle = this.homeContext.receiver.beetle,
        channel = channel[0];

    if (channel === 'hue') {
        return beetle.color.state.h;
    }
    if (channel === 'saturation') {
        return beetle.color.state.s;
    }
    if (channel === 'lightness') {
        return beetle.color.state.l;
    }
    if (channel === 'opacity') {
        return beetle.shape.material.opacity * 100
    }

    return null;
};

Process.prototype.getPosition = function (axis) {
    var beetle = this.homeContext.receiver.beetle,
        axis = axis[0],
        pos = 0;

    if (axis === 'x') {
        pos = beetle.position.z;
    }
    if (axis === 'y') {
        pos = beetle.position.x;
    }
    if (axis === 'z') {
        pos = beetle.position.y;
    }

    return pos;
};

Process.prototype.getRotation = function (axis) {
    var beetle = this.homeContext.receiver.beetle,
        axis = axis[0],
        rot = 0;

    if (axis === 'x') {
        rot = beetle.rotation.z;
    }
    if (axis === 'y') {
        rot = beetle.rotation.x;
    }
    if (axis === 'z') {
        rot = beetle.rotation.y;
    }

    return degrees(rot);
};

Process.prototype.pushPosition = function () {
    var beetle = this.homeContext.receiver.beetle;
    beetle.posAndRotStack.push({position: beetle.position.clone(), rotation: beetle.rotation.clone()});
};

Process.prototype.popPosition = function () {
    var beetle = this.homeContext.receiver.beetle,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        p = new THREE.Vector3(),
        startPoint = p.copy(beetle.position),
        posAndRot, endPoint;

    if (beetle.posAndRotStack.length) {
        posAndRot = beetle.posAndRotStack.pop();	

        beetle.position.set(posAndRot.position.x, posAndRot.position.y, posAndRot.position.z);
        beetle.rotation.set(posAndRot.rotation.x, posAndRot.rotation.y, posAndRot.rotation.z);

        if (beetle.extruding) { this.addPointToExtrusion() }

        if (beetle.drawing) {
            p = new THREE.Vector3();
            endPoint = p.copy(beetle.position);
            this.addLineGeom(startPoint, endPoint);
        }

        stage.reRender();
    }
};

Process.prototype.doAsk = function (data) {
    var stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        isStage = true,
        activePrompter;

    if (!this.prompter) {
        activePrompter = detect(
                stage.children,
                function (morph) {return morph instanceof StagePrompterMorph; }
                );
        if (!activePrompter) {
            if (!isStage) {
                this.blockReceiver().bubble(data, false, true);
            }
            this.prompter = new StagePrompterMorph(isStage ? data : null);
            if (stage.scale < 1) {
                this.prompter.setWidth(stage.width() - 10);
            } else {
                this.prompter.setWidth(stage.dimensions.x - 20);
            }
            this.prompter.fixLayout();
            this.prompter.setCenter(stage.center());
            this.prompter.setBottom(stage.bottom() - this.prompter.border);
            stage.add(this.prompter);
            this.prompter.inputField.edit();
            stage.changed();
        }
    } else {
        if (this.prompter.isDone) {
            stage.lastAnswer = this.prompter.inputField.getValue();
            this.prompter.destroy();
            this.prompter = null;
            if (!isStage) {this.blockReceiver().stopTalking(); }
            return null;
        }
    }
    this.pushContext('doYield');
    this.pushContext();
};
