class EmptyStringError extends Error {
    constructor(class_name, field_name) {
        super(`${class_name}'s ${field_name} property cannot be assigned an empty string.`);
        this.name = 'EmptyStringError';
        return this;
    }
}
export default EmptyStringError;
