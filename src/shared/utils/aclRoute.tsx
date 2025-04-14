/* eslint-disable react/display-name */
"use client";

import { useEffect } from "react";
import { useAbility } from "../providers/AbilityProvider";
import { redirect } from "next/navigation";
import Routes from "../config/routes.config";
import { AclActions, AclSubjects } from "../types/acl.type";

const aclRoute = (
  WrappedComponent: React.FC,
  action: AclActions,
  subject: AclSubjects | AclSubjects[]
) => {
  return () => {
    const { ability } = useAbility();

    useEffect(() => {
      if (
        (Array.isArray(subject) && subject.every((sub) => ability.cannot(action, sub))) ||
        (!Array.isArray(subject) && ability.cannot(action, subject as AclSubjects))
      ) {
        return redirect(Routes.forbidden);
      }
    }, [ability]);

    return <WrappedComponent />;
  };
};

export default aclRoute;
