class Node {


    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}


export class SinglyLinkedList {
    
    #head = null;
    #size = 0;

    constructor() {
    }

    get head() {
    return this.#head;
    }

    set head(node) {
    this.#head = node;
    }

    size() {
    return this.#size;
    }

    insertAtStart(data) {
    const newNode = new Node(data, this.#head);
    this.#head = newNode;
    this.#size++;
    return newNode;
    }

    printList() {
        let current = this.head;

        if (!current) {
        console.log("Listen er tom.");
        return;
        }

        while (current) {
        console.log(`Data:`, current.data);
        
        current = current.next;
        }
    }

    add(data) {
        const newNode = new Node(data);

        if (!this.#head) {
        this.#head = newNode;
        this.#size++;
        return;
        }

        let current = this.#head;

        while (current.next) {
            current = current.next;
        }
        current.next = newNode;

        this.#size++;
    }

    get(index) {

        let current = this.head;
        let count = 0;  
        while (current) {
            if (count === index) {
                return current.data;
            }
            count++;
            current = current.next;
        }
        throw new RangeError(`Index is out of bounds.`);
    }

    getFirst() {
        if (this.head) { 
            return this.head.data;
        } else {
            return null;
        }
    }

    getLast() {
        let current = this.head;

        if (!current) {
        return null;
        }

        while (current.next) {
            current = current.next;
        }
        return current.data;
    }

    set(index, data) {
        let current = this.#head;
        let count = 0;  
        while (current) {
            if (count === index) {
                current.data = data;
                return;
            }
            count++;
            current = current.next;
        }
        throw new RangeError(`Index is out of bounds.`);
    }

    /*
    Forestil dig, at du vil indsætte en ny node N mellem node A og node B (hvor A er current):

        A peger på B (current.next er B).

        Du skriver: newNode.next = current.next;

        N får nu pilen til at pege på B. (N peger nu på B)

        Du skriver: current.next = newNode;

        A får nu pilen til at pege på N. (A peger nu på N)

        Resultatet er: A -> N -> B. Listen er samlet igen!
    */

    insert( index, data ) {
        if (index < 0 || index > this.#size) {
        throw new RangeError(`Index is out of bounds for insertion.`);
    }
        if (index === 0) {
        this.insertAtStart(data);
        return;
    }

        const newNode = new Node(data);
        let current = this.#head;
        let count = 0;
        while (count < index - 1) {
            current = current.next;
            count++;
        }
        newNode.next = current.next;
        current.next = newNode;
        this.#size++;
    }

    remove(index) {
        if (index < 0 || index >= this.#size) {
            throw new RangeError(`Index is out of bounds.`);
        }

        if (index === 0) {
            return this.removeFirst();
        }

        let current = this.#head;
        let count = 0;

        while (count < index - 1) {
            current = current.next;
            count++;
        }

        const nodeToRemove = current.next;
        const dataToRemove = nodeToRemove.data;
        current.next = nodeToRemove.next; 
        this.#size--;

        return dataToRemove;
    }

    removeFirst() {
    if (!this.#head) {
        return null;
    }

    const dataToRemove = this.#head.data;
    this.#head = this.#head.next;
    this.#size--;

    return dataToRemove;
    }

    removeLast() {
    if (!this.#head) {
        return null;
    }
    if (!this.#head.next) {
        const dataToRemove = this.#head.data;
        this.#head = null;
        this.#size = 0;
        return dataToRemove;
    }           
    let current = this.#head;

    while (current.next.next) {
        current = current.next;
    }
    const dataToRemove = current.next.data;
    current.next = null;
    this.#size--;
    return dataToRemove;
    }

    clear() {
        this.#head = null;
        this.#size = 0;
    }

    getNode(index) {
    if (index < 0 || index >= this.#size) {
        throw new RangeError(`Index is out of bounds.`);
    }

    let current = this.#head;
    let count = 0;
    
    while (current) {
        if (count === index) {
            return current;
        }
        count++;
        current = current.next;
    }
    }

    getFirstNode() {
        return this.getNode(0);
    }

    getLastNode() {
        return this.getNode(this.#size - 1);
    }

    getNextNode(node) {
        return node.next;
    }

    getPreviousNode(node) {
        if (node === this.#head) {
            return null;
        }
        let current = this.#head;
        while (current && current.next !== node) {
            current = current.next;
        }   
        return current;
    }

    insertBefore( node , data ) {
        if (!this.#head) {
        throw new Error("Cannot insert before, list is empty.");
        }
        
        if (node === this.#head) {
            this.insertAtStart(data);
            return;
        }           
        const previousNode = this.getPreviousNode(node);

        if (!previousNode) {
        throw new Error("Target node not found in list."); 
        }

        const newNode = new Node(data);
        newNode.next = node;
        previousNode.next = newNode;
        this.#size++;

        return newNode;
    }

    insertAfter( node , data ) {
        const newNode = new Node(data);
        newNode.next = node.next;
        node.next = newNode;
        this.#size++;
        return newNode;
    }

    removeNode( node ) {
        if (node === this.#head) {
            return this.removeFirst();
        }
        const previousNode = this.getPreviousNode(node);

        if (!previousNode) {
        throw new Error("Node not found in list.");
        }

        previousNode.next = node.next;
        this.#size--;
        return node.data;
    }

}