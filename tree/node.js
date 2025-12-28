class Node {
    constructor(value) {
        this.value = value;
        this.parent = null;      
        this.childNodes = []; 
    }

    firstChild() {
        // Giver det første barn i arrayet
        return this.childNodes[0] || null;
    }

    lastChild() {
        // Denne giver det sidste barn
        return this.childNodes[this.childNodes.length - 1] || null;
    }

    hasChildNodes() {
        // Ser bare om der er nogen børn
        return this.childNodes.length > 0;
    }

    appendChild(child) {
        // Fyr barnet ind som barn af denne node
        child.parent = this;
        // Og læg barnet til i arrayet
        this.childNodes.push(child);
    }

    removeChild(child) {
        const newChildren = [];

        // Jeg bruger et for loop til at gå igennem alle børnene
        for (let i = 0; i < this.childNodes.length; i++) {
            const currentChild = this.childNodes[i];

            // Hvis det ikke er det targetterede barn, så får det lov at blive, for nu
            if (currentChild !== child) {
                newChildren.push(currentChild);
            }
        }

        // Erstatter listen
        this.childNodes = newChildren;

        // Og nulstiller barnets forælder
        child.parent = null;
    }

    replaceChild(newChild, oldChild) {
        // Jeg leder efter den gamle barn i listen
        for (let i = 0; i < this.childNodes.length; i++) {
            if (this.childNodes[i] === oldChild) {
            
                // Fjerner den gamle barn fra forældrenoden
                oldChild.parent = null;

                // Fyrer en ny far på barnet
                newChild.parent = this;

                // Erstatter den gamle barn med den nye i listen
                this.childNodes[i] = newChild;
            
                return;
            }
        }
    }
}