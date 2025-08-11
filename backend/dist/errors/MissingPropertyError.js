class MissingPropertyError extends Error {
    constructor(classname, fieldname, type) {
        super(`\`${classname}.${fieldname}: ${type}\` property needs to be initialized`);
        this.name = 'MissingPropertyError';
    }
}
export default MissingPropertyError;
