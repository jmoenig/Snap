// Nodes ///////////////////////////////////////////////////////////////

// Node instance creation:

export default class Node {
    constructor(parent, childrenArray) {
        this.init(parent || null, childrenArray || []);
    }

    init(parent, childrenArray) {
        this.parent = parent || null;
        this.children = childrenArray || [];
    }

    // Node string representation: e.g. 'a Node[3]'

    toString() {
        return `a Node[${this.children.length.toString()}]`;
    }

    // Node accessing:

    addChild(aNode) {
        this.children.push(aNode);
        aNode.parent = this;
    }

    addChildFirst(aNode) {
        this.children.splice(0, null, aNode);
        aNode.parent = this;
    }

    removeChild(aNode) {
        const idx = this.children.indexOf(aNode);
        if (idx !== -1) {
            this.children.splice(idx, 1);
        }
    }

    // Node functions:

    root() {
        if (this.parent === null) {
            return this;
        }
        return this.parent.root();
    }

    depth() {
        if (this.parent === null) {
            return 0;
        }
        return this.parent.depth() + 1;
    }

    allChildren() {
        // includes myself
        let result = [this];
        this.children.forEach(child => {
            result = result.concat(child.allChildren());
        });
        return result;
    }

    forAllChildren(aFunction) {
        if (this.children.length > 0) {
            this.children.forEach(child => {
                child.forAllChildren(aFunction);
            });
        }
        aFunction.call(null, this);
    }

    anyChild(aPredicate) {
        // includes myself
        let i;
        if (aPredicate.call(null, this)) {
            return true;
        }
        for (i = 0; i < this.children.length; i += 1) {
            if (this.children[i].anyChild(aPredicate)) {
                return true;
            }
        }
        return false;
    }

    allLeafs() {
        const result = [];
        this.allChildren().forEach(element => {
            if (element.children.length === 0) {
                result.push(element);
            }
        });
        return result;
    }

    allParents() {
        // includes myself
        let result = [this];
        if (this.parent !== null) {
            result = result.concat(this.parent.allParents());
        }
        return result;
    }

    siblings() {
        const myself = this;
        if (this.parent === null) {
            return [];
        }
        return this.parent.children.filter(child => child !== myself);
    }

    parentThatIsA(constructor) {
        // including myself
        if (this instanceof constructor) {
            return this;
        }
        if (!this.parent) {
            return null;
        }
        return this.parent.parentThatIsA(constructor);
    }

    parentThatIsAnyOf(constructors) {
        // including myself
        let yup = false;

        const myself = this;
        constructors.forEach(each => {
            if (myself.constructor === each) {
                yup = true;
                return;
            }
        });
        if (yup) {
            return this;
        }
        if (!this.parent) {
            return null;
        }
        return this.parent.parentThatIsAnyOf(constructors);
    }
}