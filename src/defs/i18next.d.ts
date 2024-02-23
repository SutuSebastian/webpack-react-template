import { resources } from "i18n/i18n";

import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: typeof resources.en_US;
  }
}
