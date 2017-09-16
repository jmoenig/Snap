// Animations //////////////////////////////////////////////////////////////

/*
    Animations handle gradual transitions between one state and another over a
    period of time. Transition effects can be specified using easing functions.
    An easing function maps a fraction of the transition time to a fraction of
    the state delta. This way accelerating / decelerating and bouncing sliding
    effects can be accomplished.

    Animations are generic and not limited to motion, i.e. they can also handle
    other transitions such as color changes, transparency fadings, growing,
    shrinking, turning etc.

    Animations need to be stepped by a scheduler, e. g. an interval function.
    In Morphic the preferred way to run an animation is to register it with
    the World by adding it to the World's animation queue. The World steps each
    registered animation once per display cycle independently of the Morphic
    stepping mechanism.

    For an example how to use animations look at how the Morph's methods
    
        glideTo()
        fadeTo()

    and
    
        slideBackTo()

    are implemented.
*/

import {isString, radians} from "./util";

export type Easing = (t: number) => number;
export type AnimationSetter = (destination: number) => void;
export type AnimationGetter = () => number;

export default class Animation {
    public easings: { [easing: string]: Easing }; // prototype

    public easing: Easing;

    public endTime: number = null;
    public destination: number = null;
    public isActive: boolean = false;

    constructor(public setter: AnimationSetter, public getter: AnimationGetter, public delta = 0,
                public duration = 0 /* milliseconds */, easing: string | Easing,
                public onComplete: () => void = null /* optional callback */) {
        this.easing = isString(easing) ? // string or function
            this.easings[<string> easing] || this.easings.sinusoidal
            : <Easing> easing || this.easings.sinusoidal;

        this.start();
    }

    start() {
        // (re-) activate the animation, e.g. if is has previously completed,
        // make sure to plug it into something that repeatedly triggers step(),
        // e.g. the World's animations queue
        this.endTime = Date.now() + this.duration;
        this.destination = this.getter.call(this) + this.delta;
        this.isActive = true;
    }

    step() {
        if (!this.isActive) {
            return;
        }
        const now = Date.now();
        if (now > this.endTime) {
            this.setter(this.destination);
            this.isActive = false;
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            this.setter(
                this.destination -
                (this.delta * this.easing((this.endTime - now) / this.duration))
            );
        }
    }
}

Animation.prototype.easings = {
    // dictionary of a few pre-defined easing functions used to transition
    // two states

    // ease both in and out:
    linear(t: number) {
        return t;
    },
    sinusoidal(t: number) {
        return 1 - Math.cos(radians(t * 90));
    },
    quadratic(t: number) {
        return t < 0.5 ?
            2 * t * t
            : ((4 - (2 * t)) * t) - 1;
    },
    cubic(t: number) {
        return t < 0.5 ?
            4 * t * t * t
            : ((t - 1) * ((2 * t) - 2) * ((2 * t) - 2)) + 1;
    },
    elastic(t: number) {
        return (t -= 0.5) < 0 ?
            (0.01 + 0.01 / t) * Math.sin(50 * t)
            : (0.02 - 0.01 / t) * Math.sin(50 * t) + 1;
    },

    // ease in only:
    sine_in(t: number) {
        return 1 - Math.sin(radians(90 + (t * 90)));
    },
    quad_in(t: number) {
        return t * t;
    },
    cubic_in(t: number) {
        return t * t * t;
    },
    elastic_in(t: number) {
        return (0.04 - 0.04 / t) * Math.sin(25 * t) + 1;
    },

    // ease out only:
    sine_out(t: number) {
        return Math.sin(radians(t * 90));
    },
    quad_out(t: number) {
        return t * (2 - t);
    },
    elastic_out(t: number) {
        return 0.04 * t / (--t) * Math.sin(25 * t);
    }
};

