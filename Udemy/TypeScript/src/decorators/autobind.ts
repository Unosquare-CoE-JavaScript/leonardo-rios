export default function autobind(
  target: any,
  method: string,
  descriptor: PropertyDescriptor
) {
  return {
    configurable: true,
    get: function () {
      return descriptor.value.bind(this);
    },
  } as PropertyDescriptor;
}
