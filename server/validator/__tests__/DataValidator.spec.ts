import * as Yup from "yup";
import { ValidationError } from "yup";

import DataValidator from "../DataValidator";

describe("DataValidator", () => {
  const validationSchema = Yup.object().shape({
    value: Yup.string()
      .min(2, "too short")
      .max(50, "too long")
      .required("required"),
  });

  const validator = new DataValidator<{ value?: string }>(validationSchema);

  it("should return the validated value", async () => {
    const value = { value: "VALUE" };

    const validatedValue = await validator.validate(value);

    expect(validatedValue).toEqual(value);
  });

  it("should throw on value too short", async () => {
    const value = { value: "V" };
    let errorMessage;

    try {
      await validator.validate(value);
    } catch (err: any) {
      errorMessage = err.message;
    }

    expect(errorMessage).toBe("too short");
  });

  it("should throw on value too long", async () => {
    const value = {
      value:
        "Valksjdslakjdalskjdsalkjdsalkjdsalkjdslakjdslkajdsalkjdsalkjdlksajdlksajdlskajdlksajdaskljdslkajdaslkjdaslkdjsalkjdsalkdjsalkaj",
    };
    let errorMessage;

    try {
      await validator.validate(value);
    } catch (err: any) {
      errorMessage = err.message;
    }

    expect(errorMessage).toBe("too long");
  });

  it("should throw on value missing", async () => {
    const value = {};
    let errorMessage;

    try {
      await validator.validate(value);
    } catch (err: any) {
      errorMessage = err.message;
    }

    expect(errorMessage).toBe("required");
  });
});
