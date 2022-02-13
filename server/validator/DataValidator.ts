import { ObjectSchema } from "yup";
import { ValidateOptions } from "yup/lib/types.d";

import YupValidator from "./YupValidator";

class DataValidator<T> implements YupValidator {
  public schema: ObjectSchema<any>;

  constructor(schema: ObjectSchema<any>) {
    this.schema = schema;
  }

  async validate(data: T, options?: ValidateOptions): Promise<T> {
    return this.schema.validate(data, options);
  }
}

export default DataValidator;
