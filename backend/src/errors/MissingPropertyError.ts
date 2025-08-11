class MissingPropertyError extends Error {
  constructor(classname: string, fieldname: string, type: string) {
    super(`\`${classname}.${fieldname}: ${type}\` property needs to be initialized`)
    this.name = 'MissingPropertyError';
  }
}

export default MissingPropertyError;
