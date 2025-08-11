import Item from "./Item";
class Medication extends Item {
    constructor({ itemId, name, category, description, stock }) {
        super(itemId, name, category, description, stock);
        return this;
    }
    toSring() {
        return super.toString();
    }
    toJSON() {
        return super.toJSON();
    }
}
;
export default Medication;
