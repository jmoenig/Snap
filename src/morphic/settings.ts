import {getBlurredShadowSupport, getMinimumFontHeight, enableRetinaSupport} from "./util";

export const useBlurredShadows = getBlurredShadowSupport(); // check for Chrome-bug

export const standardSettings = {
    minimumFontHeight: getMinimumFontHeight(), // browser settings
    globalFontFamily: '',
    menuFontName: 'sans-serif',
    menuFontSize: 12,
    bubbleHelpFontSize: 10,
    prompterFontName: 'sans-serif',
    prompterFontSize: 12,
    prompterSliderSize: 10,
    handleSize: 15,
    scrollBarSize: 12,
    mouseScrollAmount: 40,
    useSliderForInput: false,
    useVirtualKeyboard: true,
    isTouchDevice: false, // turned on by touch events, don't set
    rasterizeSVGs: false,
    isFlat: false,
    grabThreshold: 5
};

export const touchScreenSettings = {
    minimumFontHeight: standardSettings.minimumFontHeight,
    globalFontFamily: '',
    menuFontName: 'sans-serif',
    menuFontSize: 24,
    bubbleHelpFontSize: 18,
    prompterFontName: 'sans-serif',
    prompterFontSize: 24,
    prompterSliderSize: 20,
    handleSize: 26,
    scrollBarSize: 24,
    mouseScrollAmount: 40,
    useSliderForInput: true,
    useVirtualKeyboard: true,
    isTouchDevice: false,
    rasterizeSVGs: false,
    isFlat: false,
    grabThreshold: 5
};

export const MorphicPreferences = standardSettings;

export const morphicVersion = '2017-September-01';

// first, try enabling support for retina displays - can be turned off later

/*
    Support for retina displays has been pioneered and contributed by
    Bartosz Leper.

    NOTE: this will make changes to the HTMLCanvasElement that - mostly -
    make Morphic usable on retina displays in very high resolution mode
    with crisp fonts and clear fine lines without you (the programmer)
    needing to know any specifics, provided both the display and the browser
    support these (Safari currently doesn't), otherwise these utilities will
    not be installed.
    If you don't want your Morphic application to support retina resolutions
    you don't have to edit this morphic.js file to comment out the next line
    of code, instead you can simply call

        disableRetinaSupport();

    before you create your World(s) in the html page. Disabling retina
    support also will simply do nothing if retina support is not possible
    or already disabled, so it's equally safe to call.

    For an example how to make retina support user-specifiable refer to
    Snap! >> guis.js >> toggleRetina()
*/

enableRetinaSupport();

