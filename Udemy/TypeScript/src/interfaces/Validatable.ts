export default interface Validatable {
  isValid: () => boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
