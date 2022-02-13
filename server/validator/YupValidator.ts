import { ObjectSchema } from "yup";
import { ValidateOptions } from "yup/lib/types.d";

interface YupValidator {
  schema: ObjectSchema<any>;
  validate: (data: any, options?: ValidateOptions) => Promise<any>;
}

export default YupValidator;
