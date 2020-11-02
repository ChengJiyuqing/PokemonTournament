class TypeTable {
    constructor() {
        this.typeTable = [
            [[], [5, 7, 8]],
            [[0, 5, 8, 14, 17], [2, 3, 13, 6, 7, 16]],
            [[1, 6, 11], [5, 8, 12]],
            [[11, 16], [3, 4, 5, 7, 8]],
            [[3, 5, 8, 14, 9], [2, 6, 11]],
            [[2, 6, 9, 14], [1, 4, 8]],
            [[11, 13, 17], [1, 2, 3, 7, 8, 9, 16]],
            [[7, 13], [0, 17]],
            [[5, 14, 16], [8, 9, 10, 12]],
            [[6, 8, 11, 14], [5, 9, 10, 15]],
            [[4, 5, 9], [10, 11, 15]],
            [[4, 5, 10], [2, 3, 6, 8, 9, 11, 15]],
            [[2, 10], [4, 11, 12, 15]],
            [[1, 3], [8, 13, 17]],
            [[2, 4, 11, 15], [8, 9, 10, 14]],
            [[15], [8, 16]],
            [[1, 15, 17], [3, 8, 9]],
            [[7, 13], [1, 17, 16]]
        ]
    }
    
    
    getTypeId(type) {
        switch(type) {
            case "normal": return 0
            
            case "fighting": return 1
            
            case "flying": return 2
            
            case "poison": return 3
            
            case "ground": return 4

            case "rock": return 5

            case "bug": return 6

            case "ghost": return 7

            case "steel": return 8

            case "fire": return 9

            case "water": return 10 

            case "grass": return 11

            case "electric": return 12

            case "psychic": return 13

            case "ice": return 14

            case "dragon": return 15

            case "fairy": return 16

            case "dark": return 17

        }

    }

    /*
     * Return is type1 weakened when it encounters type2
     */
    isWeakened(type1, type2) {
        const type1Id = this.getTypeId(type1);
        const type2Id = this.getTypeId(type2);
        console.log(type1Id, type2Id)
        console.log(this.typeTable)
        return this.typeTable[type1Id][1].includes(type2Id);
    }

    /*
     * Return is type1 strengthened when it encounters type2
     */
    isStrengthened(type1, type2) {
        const type1Id = this.getTypeId(type1)
        const type2Id = this.getTypeId(type2)
        return this.typeTable[type1Id][0].includes(type2Id)
    }
}

export default TypeTable