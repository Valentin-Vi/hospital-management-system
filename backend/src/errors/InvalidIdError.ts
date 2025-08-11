class InvalidIdError extends Error {
  constructor(class_name: string, field_name: string) {
    super(`${class_name}'s ${field_name} property cannot be assigned a value less than or equal to 0.`);
    this.name = 'InvalidIdError';
    return this;
  }
}

export default InvalidIdError;
