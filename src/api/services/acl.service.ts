import { AbilityBuilder } from "@casl/ability";
import type { AppAbility } from "@/shared/types/acl.type";

class AclService {
  private can: AbilityBuilder<AppAbility>["can"];

  constructor(ability: AbilityBuilder<AppAbility>) {
    this.can = ability.can;
  }

  public CoursesPermissions() {
    this.can("manage", "Courses", [""]);
  }

  public ClientsPermissions() {
    this.can("manage", "Clients", [""]);
  }

  public CreateCoursePermissions() {
    this.can("manage", "CreateCourse", [""]);
  }
}

export default AclService;
