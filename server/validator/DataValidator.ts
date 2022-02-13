import { ObjectSchema } from "yup";
import { ValidateOptions } from "yup/lib/types.d";

import YupValidator from "./YupValidator";

class DataValidator implements YupValidator {
  schema: ObjectSchema<any>;

  constructor(schema: ObjectSchema<any>) {
    this.schema = schema;
  }

  validate(data: any, options?: ValidateOptions): Promise<any> {
    return this.schema.validate(data, options);
  }
}

export default DataValidator;
