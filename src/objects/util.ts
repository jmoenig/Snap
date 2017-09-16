export function isSnapObject(thing) {
    return thing instanceof SpriteMorph || (thing instanceof StageMorph);
}