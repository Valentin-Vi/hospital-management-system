class InvalidEmailValueError extends Error {
    constructor(email_value) {
        super(`${email_value} is not a valid email address.`);
        this.name = 'InvalidEmailValueError';
        return this;
    }
}
export default InvalidEmailValueError;
