export default class Grid {
    constructor(rows, cols) {
        this.numRows = rows;
        this.numCols = cols;
        this.data = new Array(rows * cols);
    }

    // Her er lidt til mig selv så jeg husker hvordan indekserne fungerer:

    // Husk at man starter på index 0, så J ville være på række 2, kolonne 1:
    // Altså index er 2 * 4 + 1 = 9. Så selvomn J er på plads 10 så startwe man på nul så det er plads 9 så det passer.
    // Kolonner:  0    1    2    3
    //           -------------------
    // Række 0: | A |  B |  C |  D  |
    // Række 1: | E |  F |  G |  H  |
    // Række 2: | I |  J |  K |  L  |

    rows() {
        return this.numRows;
    }

    cols() {
        return this.numCols;
    }

    size() {
        return this.numRows * this.numCols;
    }

    indexFor({ row, col }) {
        // Vi ganger rækkenummeret med hvor mange celler der er i hver række,
        // og lægger så kolonnenummeret til.
        return row * this.numCols + col;
    }

    rowColFor(index) {
        // Det omvendte: rækken er index divideret med kolonner (rundet ned)
        // Kolonnen er resten (modulo) af den division.
        const row = Math.floor(index / this.numCols);
        const col = index % this.numCols;
        return { row, col };
    }

    set({ row, col }, value) {
        const index = this.indexFor({ row, col });
        this.data[index] = value;
    }

    get({ row, col }) {
        const index = this.indexFor({ row, col });
        return this.data[index];
    }
    
    fill(value) {
        this.data.fill(value);
    }

    north({ row, col }) {
        // Nord er rækken ovenover (row - 1)
        if (row > 0) {
            const newCoord = { row: row - 1, col: col };
            return { 
                row: newCoord.row, 
                col: newCoord.col, 
                value: this.get(newCoord) 
            };
        }
        return undefined;
    }

    south({ row, col }) {
        // Syd er rækken under (row + 1)
        if (row < this.numRows - 1) {
            const newCoord = { row: row + 1, col: col };
            return { 
                row: newCoord.row, 
                col: newCoord.col, 
                value: this.get(newCoord) 
            };
        }
        return undefined;
    }

    west({ row, col }) {
        // Vest er kolonnen til venstre (col - 1)
        if (col > 0) {
            const newCoord = { row: row, col: col - 1 };
            return { 
                row: newCoord.row, 
                col: newCoord.col, 
                value: this.get(newCoord) 
            };
        }
        return undefined;
    }

    east({ row, col }) {
        // Øst er kolonnen til højre (col + 1)
        if (col < this.numCols - 1) {
            const newCoord = { row: row, col: col + 1 };
            return { 
                row: newCoord.row, 
                col: newCoord.col, 
                value: this.get(newCoord) 
            };
        }
        return undefined;
    }

    nextInRow({ row, col }) {
    return this.east({ row, col });
    }

    nextInCol({ row, col }) {
    return this.south({ row, col });
    }

    neighbours({ row, col }) {
    const list = [];
    
    // Vi tjekker hver retning en efter en
    const n = this.north({ row, col });
    const s = this.south({ row, col });
    const w = this.west({ row, col });
    const e = this.east({ row, col });

    // Hvis retningen ikke er undefined, putter vi den i listen
    if (n) {
        list.push(n);
    }
    if (s) {
        list.push(s);
    }
    if (w) {
        list.push(w);
    }
    if (e) {
        list.push(e);
    }

    return list;
    }

    neighbourValues({ row, col }) {
    // Her trækker kun værdierne ud
    const neighbors = this.neighbours({ row, col });
    const values = [];
    for (const neighbor of neighbors) {
        values.push(neighbor.value);
    }
    return values;
    }
}