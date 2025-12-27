import { Node } from "./node.js";

export default class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    size() {
        return this.length;
    }

    getFirstNode() {
        return this.head;
    }

    getLastNode() {
        return this.tail;
    }

    getFirst() {
        return this.head ? this.head.data : null;
    }

    getLast() {
        return this.tail ? this.tail.data : null;
    }

    getNextNode(node) {
        return node ? node.next : null;
    }

    getPreviousNode(node) {
        return node ? node.prev : null;
    }

    set(index, data) {
        const node = this.getNode(index);
        if (node) node.data = data;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    addFirst(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
    }

    addLast(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return newNode;
    }

    getNode(index) {
        if (index < 0 || index >= this.length) return null;
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }

    get(index) {
        const node = this.getNode(index);
        return node ? node.data : null;
    }

    remove(index) {
        const node = this.getNode(index);
        return this.removeNode(node);
    }

    removeNode(node) {
        if (!node) return null;
        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }
        this.length--;
        const data = node.data;

        node.next = null;
        node.prev = null;
        return data;
    }

    removeFirst() {
        return this.removeNode(this.head);
    }

    removeLast() {
        return this.removeNode(this.tail);
    }

    insertBeforeNode(node, data) {
        if (!node) return;
        const newNode = new Node(data);
        newNode.next = node;
        newNode.prev = node.prev;
        if (node.prev === null) {
            this.head = newNode;
        } else {
            node.prev.next = newNode;
        }
        node.prev = newNode;
        this.length++;
    }

    insertAfterNode(node, data) {
        if (!node) return;
        const newNode = new Node(data);
        newNode.next = node.next;
        newNode.prev = node;
        if (node.next === null) {
            this.tail = newNode;
        } else {
            node.next.prev = newNode;
        }
        node.next = newNode;
        this.length++;
    }

    insert(index, data) {
        if (index === 0) {
            this.addFirst(data);
        } else if (index === this.length) {
            this.addLast(data);
        } else {
            const node = this.getNode(index);
            this.insertBeforeNode(node, data);
        }
    }
    
    swap(nodeA, nodeB) {
        if (!nodeA || !nodeB || nodeA === nodeB) return;
        const temp = nodeA.data;
        nodeA.data = nodeB.data;
        nodeB.data = temp;
    }

    makeFirst(node) {
        if (!node || node === this.head) return;
        const data = this.removeNode(node);
        this.addFirst(data);
    }

    makeLast(node) {
        if (!node || node === this.tail) return;
        const data = this.removeNode(node);
        this.addLast(data);
    }
    printList() {
        let current = this.head;
        let result = "";
        while (current !== null) {
            result += `${current.data} <-> `;
            current = current.next;
        }
        console.log(result + "null");
    }
}