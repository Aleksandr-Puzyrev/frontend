import AclService from "@/api/services/acl.service";
import { Ability, AbilityBuilder } from "@casl/ability";
import { AppAbility } from "../types/acl.type";
import { UserRoleEnum } from "../interfaces/user/User";

export const defineAbilitiesFor = (role?: UserRoleEnum | "") => {
  const ability = new AbilityBuilder<AppAbility>(Ability);
  const { cannot, build, can } = ability;
  const Acl = new AclService(ability);

  switch (role) {
    case UserRoleEnum.ADMIN:
      can("manage", "all");
      break;
    case UserRoleEnum.USER:
      Acl.CoursesPermissions();
      break;
    default:
      cannot("manage", "all");
      break;
  }

  return build();
};
