// Force disconnection of connected sprites before opening a new project
SnapSerializer.prototype.originalOpenProject = SnapSerializer.prototype.openProject;
SnapSerializer.prototype.openProject = function (project, ide) {
    // Disconnect each sprite before opening the new project
    var sprites = ide.sprites.asArray();
    sprites.forEach(function(sprite) {
        if (sprite.arduino && sprite.arduino.board) {
            sprite.arduino.disconnect(true);
        }
    });

    this.originalOpenProject(project, ide);
};

//IDE_Morph.prototype.getURL('version', function (version) {
//    SnapSerializer.prototype.app = 'Snap4Arduino ' + version + ', http://snap4arduino.rocks';
//});

SnapSerializer.prototype.watcherLabels['reportAnalogReading'] = 'analog reading %analogPin';
SnapSerializer.prototype.watcherLabels['reportDigitalReading'] = 'digital reading %digitalPin';

WatcherMorph.prototype.originalToXML = WatcherMorph.prototype.toXML;
WatcherMorph.prototype.toXML = function (serializer) {
    var color = this.readoutColor,
        position = this.parent ?
                this.topLeft().subtract(this.parent.topLeft())
                : this.topLeft();

    if (this.getter === 'reportAnalogReading'
            || this.getter === 'reportDigitalReading') {
        console.log('got u');
        return serializer.format(
            '<watcher% % style="@"% x="@" y="@" color="@,@,@"%%/>',
            serializer.format(' scope="@"', this.target.name),
            serializer.format('s="@" p="@"', this.getter, this.pin),
            this.style,
            '',
            position.x,
            position.y,
            color.r,
            color.g,
            color.b,
            '',
            this.isVisible ? '' : ' hidden="true"'
        );
    } else {
        return this.originalToXML(serializer);
    }

};

SnapSerializer.prototype.originalRawLoadProjectModel = SnapSerializer.prototype.rawLoadProjectModel;
SnapSerializer.prototype.rawLoadProjectModel = function (xmlNode) {
    var project = this.originalRawLoadProjectModel(xmlNode),
        gotWatchers = false,
        myself = this,
        model,
        watchers = project.stage.watchers();
    if (watchers) {
        watchers.forEach(function (watcher) {
            if (watcher.getter === 'reportAnalogReading'
                    || watcher.getter === 'reportDigitalReading') {
                watcher.destroy();
                gotWatchers = true;
            }
        });
        if (gotWatchers) {
            model = {project: xmlNode };
            model.stage = model.project.require('stage');
            model.sprites = model.stage.require('sprites');

            model.sprites.childrenNamed('watcher').forEach(function (model) {
                var pin = model.attributes.p,
                    color,
                    target,
                    info,
                    selector,
                    watcher;
                if (pin) {
                    target = project.sprites[model.attributes.scope];
                    color = myself.loadColor(model.attributes.color);
                    selector = model.attributes.s;
                    info = SpriteMorph.prototype.blocks[selector];
                    watcher = target.arduinoWatcher(selector, localize(info.spec), color, pin);
                    watcher.setStyle(model.attributes.style || 'normal');
                    if (watcher.style === 'slider') {
                        watcher.setSliderMin(model.attributes.min || '1', true);
                        watcher.setSliderMax(model.attributes.max || '100', true);
                    }
                    watcher.setPosition(
                        project.stage.topLeft().add(new Point(
                            +model.attributes.x || 0,
                            +model.attributes.y || 0
                        ))
                    );
                    project.stage.add(watcher);
                }
            });
        }
    }
    return project;
};
