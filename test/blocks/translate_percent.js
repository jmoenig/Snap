(function () {
    return function (percent) {
        var dest, delta=radians(this.heading);
    
        var newX = this.position().x + 
            (this.parent.width() * percent/500) * this.scale;
        var newY = this.position().y;
        var dist = Math.sqrt(Math.pow(this.position().x-newX, 2));

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
    };
}());
