class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

export default class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.numSize = 0;
    }

    size() {
        return this.numSize;
    }

    enqueue(data) {
        const newNode = new Node(data);

        if (this.numSize === 0) {
            // Hvis køen er tom, er den nye node både hoved og hale
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Når man skal sætte på på en queue skal man altid linke på halen.
            this.tail.next = newNode;
            // Siden der nu er kommet en ny node bag ved halen så skal den lige sættet til at være den nye hale.
            this.tail = newNode;
        }

        this.numSize++;
    }

    dequeue() {
        // Ser om køen er tom
        if (!this.head) {
            return null;
        }

        const dataToReturn = this.head.data;
        
        // Flyt head til den næste i rækken
        this.head = this.head.next;
        this.numSize--;

        // Hvis køen nu er tom, skal tail også være null
        if (this.numSize === 0) {
            this.tail = null;
        }

        return dataToReturn;
    }

    get(index) {
        // Ser lige om der overhoved er et index at hente
        if (index < 0 || index >= this.numSize) return null;
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current.data;
    }

    peek() {
        return this.head ? this.head.data : null;
    }

}