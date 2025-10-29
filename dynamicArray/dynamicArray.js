import StaticArray from "./staticarray.js";


export default class DynamicArray {
    #storage
    #size
    static default_capacity = 10

    constructor(capacity = DynamicArray.default_capacity) {
        this.#storage = new StaticArray(capacity)
        this.#size = 0
    }

        grow() {
        if (this.#size === this.capacity) {
            
            const newCapacity = this.capacity * 2;
            
            const newStorage = new StaticArray(newCapacity);

            for (let i = 0; i < this.#size; i++) {
                newStorage.set(i, this.#storage.get(i)); 
            }
            this.#storage = newStorage;
            
            console.log(`Resize: Kapacitet fordoblet fra ${newCapacity / 2} til ${newCapacity}`);
        }
    }

    add(item) {
        this.grow();
        this.#storage.set(this.#size, item);
        this.#size++;
    }

    get(index) {
        if (index < 0 || index >= this.#size) {
            throw new RangeError("Out of bounds");
        }
        return this.#storage.get(index);
    }

    set(index, item) {
        if (index < 0 || index >= this.#size) {
            throw new RangeError("Out of bounds");
        }
        this.#storage.set(index, item);
    }

    insert(index, item) {
        if (index < 0 || index > this.#size) {
            throw new RangeError("Out of bounds");
        }
        this.grow();
        for (let i = this.#size; i > index; i--) {
            this.#storage.set(i, this.#storage.get(i - 1));
        }
        this.#storage.set(index, item);
        this.#size++;
    }

    remove(index) {
        if (index < 0 || index >= this.#size) {
            throw new RangeError("Out of bounds");
        }
        for (let i = index; i < this.#size - 1; i++) {
            this.#storage.set(i, this.#storage.get(i + 1));
        }
        this.#size--;
    }

    clear() {
        this.#storage = new StaticArray(DynamicArray.default_capacity);
        this.#size = 0;
    }  

    get size() {
        return this.#size;
    }

    get capacity() {
        return this.#storage.length;
    }
}

