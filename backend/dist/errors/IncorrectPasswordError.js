class IncorrectPasswordError extends Error {
    constructor() {
        super(`[${Date.now().toString}] Login attempt with incorrect password.`);
        super.name = 'IncorrectPasswordError';
    }
    ;
}
;
export default IncorrectPasswordError;
