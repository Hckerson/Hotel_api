import { ValidatorOptions, ValidationError } from "class-validator";
export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  enableDebugMessages: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}
