import { Ability } from "@casl/ability";

export type AclActions = "read" | "create" | "update" | "delete" | "manage";
export type AclSubjects =
  | "all"
  | "Courses"
  | "Clients"
  | "CreateCourse"
;

export type AppAbility = Ability<[AclActions, AclSubjects]>;
