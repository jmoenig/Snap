function (percent) {
    var dest, delta=radians(this.heading);
    //console.log("width: " + this.parent.width() * this.scale);
    //console.log("height: " + this.parent.height() * this.scale);
    
    // Translate by scale*width*percent in the X
    var newX = this.position().x + (this.parent.width() * percent/500) * this.scale;
    // Translate by scale*height*percent in the Y
    //var newY = this.position().y + (this.parent.height() * percent/100 * this.scale) * Math.sin(delta);
    var newY = this.position().y;
    // Apply distance angle calulation
    //console.log("Current angle " + delta);
    //console.log("Current {" + this.position().x + ", " + this.position().y + "}");
    //console.log("New {" + newX + ", " + newY + "}");
    var dist = Math.sqrt(Math.pow(this.position().x-newX, 2))
    console.log("( " + this.heading + ") @ (" + this.scale + ") Moving: " + dist);
    //console.log("Move X " + (this.position().x-newX));
    //console.log("Move Y " + (this.position().y-newY));

    if (percent >= 0) {
        dest = this.position().distanceAngle(dist, this.heading);
    } else {
        dest = this.position().distanceAngle(
            Math.abs(dist),
            (this.heading - 180)
        );
    }
    this.setPosition(dest);
    this.positionTalkBubble();
}
