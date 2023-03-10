import Validation from 'string-format-validation'
import { verifyPhoneNumber } from 'nigerian-phone-number-validator';

const required = (validator) => {
  return (value) => {
    if(value && value.length >= 1) {
      return validator(value);
    }
    return 'This field is required';
  }
}

const email = (validator) => {
    return (value) => {
        const validationRule = {type: 'email'};
        const isValid = Validation.validate(validationRule, value);
        if(isValid) {
            return validator(value);
        }
        return 'The email is invalid';
    }
}

const newValidator = (validationRules, error) => {
  return (value) => {
    const isValid = Validation.validate(validationRules, value);
    if(isValid) {
      return '';
    }
    return error;
  }
}

const equals = (validator) => {
    return (value, shouldEqual) => {
        const isValid = value === shouldEqual;
        if(isValid) {
            return validator(value)
        }
        return 'Field values don\'t match';
    }
}

const phoneNumber = (validator) => {
    return (value) => {
        const isValid = verifyPhoneNumber(value);
        if(isValid) {
            return validator(value);
        }
        return 'The phone number is not valid';
    }
}

const min = (minLength, validator) => {
    return (value) => {
        const validationRule = {min: minLength};
        const isValid = Validation.validate(validationRule, value);
        if(isValid) {
            return validator(value);
        }
        return 'Field value must be at least ' + minLength + ' characters'
    }
}

const done = () => {
    return (value) => ''
}

export {
    newValidator,
    required,
    done,
    email,
    equals,
    phoneNumber,
    min
}