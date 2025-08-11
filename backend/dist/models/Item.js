class Item {
    constructor(itemId, name, category, description, stock) {
        this.itemId = 0;
        this.itemId = itemId;
        this.name = name;
        this.category = category;
        this.description = description;
        this.stock = stock;
        return this;
    }
    ;
    toString() {
        return `Item { itemId: ${this.itemId}, name: ${this.name}, category: ${this.category}, description: ${this.description} }`;
    }
    toJSON() {
        return JSON.stringify({
            itemId: this.itemId,
            name: this.name,
            category: this.category,
            description: this.description
        });
    }
}
export default Item;
