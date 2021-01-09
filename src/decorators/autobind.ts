export const Autobind = (
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;
  const modifiedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      // Executed when tried to access the function
      const boundFunction = originalMethod.bind(this); // this = an instance from the class this dec. is applied to
      return boundFunction;
    },
  };
  return modifiedDescriptor;
};
