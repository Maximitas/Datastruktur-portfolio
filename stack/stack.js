class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

export default class Stack {
    constructor() {
        this.head = null;
        this.numSize = 0;
    }

    size() {
        return this.numSize;
    }

    push(data) {
        const newNode = new Node(data);
        
        // Den nye node peger på toppen af stakken
        newNode.next = this.head;
        
        // Her gør vi den nye node til toppen af stakken
        this.head = newNode;
        
        this.numSize++;
    }

    pop() {
        // Hvis der ikke er et hoved er stakken tom
        if (!this.head) return null;

        const dataToReturn = this.head.data;

        // Flyt toppen til den næste node
        this.head = this.head.next;

        this.numSize--;
        return dataToReturn;
    }

    get(index) {
        if (index < 0 || index >= this.numSize) return null;

        let current = this.head;
        let count = 0;

        while (count < index) {
            current = current.next;
            count++;
        }

        return current.data;
    }

    peek() {
        return this.head ? this.head.data : null;
    }
}