IDE_Morph.prototype.originalOpenIn = IDE_Morph.prototype.openIn;
IDE_Morph.prototype.openIn = function (world) {
    this.originalOpenIn(world);
    if (location.hash.substr(0, 9) === '#tutorial' || !this.getSetting('alreadyVisited'))  {
        this.saveSetting('alreadyVisited', true);
        this.startTutorial(world);
    }
};

IDE_Morph.prototype.startTutorial = function (world) {
    var morph,
        myself = this;

    if (!this.tutorial) { 
        this.tutorial = {};
        this.tutorial.slides = [];
        this.tutorial.currentIndex = 0;

        this.tutorial.addSlide = function (slide) {
            this.slides.push(slide);
            slide.fixLayout();
        };

        this.tutorial.previous = function () {
            this.currentSlide.cancel();
            this.currentIndex -= 1;
            this.currentSlide = this.slides[this.currentIndex];
            if (this.currentIndex === 0) {
                this.currentSlide.previousButton.disable();
            }
            this.currentSlide.popUp(world);
        };
        this.tutorial.next = function () {
            this.currentSlide.cancel();
            this.currentIndex += 1;
            this.currentSlide = this.slides[this.currentIndex];
            if (this.currentIndex === this.slides.length - 1) {
                this.currentSlide.nextButton.disable();
            }
            this.currentSlide.popUp(world);
        };

        this.tutorial.startIn = function (world) {
            this.currentSlide = this.slides[0];
            this.currentSlide.popUp(world);
        };
    }; 

    this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
                'Welcome to BeetleBlocks!', // title
                new AnimationMorph( // img
                    'beetleblocks/assets/tutorial/move/', // path
                    93, // frameCount
                    50, // frameDuration
                    new Point(707, 205) // extent
                    ), 
                'Drag the move block into the scripting area and click on it to move the Beetle.',// msg
                new Point(188, 159), // popUpPosition
                'left', // arrowOrientation ('left' / 'right' / 'top' / 'bottom')
                null, // previousWindow function
                function () { myself.tutorial.next(); } // nextWindow function
                ));

    this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
                'Scripting Area',
                new AnimationMorph(
                    'beetleblocks/assets/tutorial/movesphere/',
                    63,
                    50,
                    new Point(707, 205) // extent
                    ),
                'You can select blocks from different categories and snap them together.',
                null,
                'top',
                function () { myself.tutorial.previous(); },
                function () { myself.tutorial.next(); }
                ));

    this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
                'Viewport',
                new AnimationMorph(
                    'beetleblocks/assets/tutorial/rotate/',
                    296,
                    50,
                    new Point(707, 205) // extent
                    ),
                'The Beetle can rotate around its own X, Y and Z axes.',
                myself.stage.leftCenter(),
                'right',
                function () { myself.tutorial.previous(); },
                function () { myself.tutorial.next(); }
                ));

    this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
                'File menu',
                null,
                'Click "Open..." and open "Tutorial 1" in the Examples.',
                myself.controlBar.projectButton.bottomCenter(),
                'top',
                function () { myself.tutorial.previous(); },
                function () { myself.tutorial.next(); }
                ));

    this.tutorial.startIn(world);
};
