import {
  authLoginSchema,
  authRegisterSchema,
} from "@/app/api/zod-schema/validation";
import { NextRequest } from "next/server";
import { ZodSchema } from "zod";
import { validate } from "./middleware-validations";

type validateObjType = {
  path: string;
  schema: ZodSchema;
}[];

const validateObj: validateObjType = [
  {
    path: "/api/auth/register",
    schema: authRegisterSchema,
  },
  {
    path: "/api/auth/log-in",
    schema: authLoginSchema,
  },
];

export async function validateFn(path: string, req: NextRequest) {
  // check if the path matches any of the path in the config object
  const check = validateObj.findIndex((el) => el.path === path);
  // if it matches any  of the path, validate the object using the schema
  if (check !== -1) {
    const validationResponse = await validate(req, validateObj[check].schema);
    if (validationResponse.status === 403) {
      return validationResponse;
    }
  }
}
