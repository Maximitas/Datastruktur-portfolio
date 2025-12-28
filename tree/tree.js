export default class Tree {
    constructor(rootValue) {
        this.root = new Node(rootValue);
    }

    addValue(value) {
        const newNode = new Node(value);
        this.root.appendChild(newNode);
        return newNode;
    }

    findValue(value, currentNode = this.root) {
        // Ser om det er den rigtige node
        if (currentNode.value === value) {
            return currentNode;
        } else {

        // Jeg har lige beskevet det så jeg kunne forstå det
        // 1 til 11 til 111 tilbage til 11 til 112 tilbage til 11 til 113 tilbage til 11 tilbage til 1 til 12 til 112 osv.
        // Der er ike nogen 1111, 1112, 1113, så den går op igen.
        for (let i = 0; i < currentNode.childNodes.length; i++) {
            const child = currentNode.childNodes[i];
            const found = this.findValue(value, child);
            
            // Hvis vi fandt den i denne gren, så send den hele vejen op!
            if (found) {
                return found;
            } 
        }

        // 3. Hvis vi har kigget overalt og intet fundet
        return null;
        }
    }

    
    removeValue(value) {
        // Her bruger jeg den forrige funktion til at finde noden
        const nodeToRemove = this.findValue(value);
        
        // Vi tjekker om det ikke er null og at det ikke er roden. 
        // Vi kan se om det er roden ved at tjekke om den har en parent
        if (nodeToRemove && nodeToRemove.parent) {
            nodeToRemove.parent.removeChild(nodeToRemove);
        }
    }

    // dump: Udskriver hele træet så du kan se strukturen
    dump(node = this.root, indent = 0) {
        const space = "  ".repeat(indent);
        console.log(space + node.value);

        for (let i = 0; i < node.childNodes.length; i++) {
            this.dump(node.childNodes[i], indent + 1);
        }
    }
}