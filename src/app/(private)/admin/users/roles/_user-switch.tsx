"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { editUserRoles } from "@/api/actions";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { showErrorToasts } from "@/lib/utils";

export function UserSwitch({ id, isMod }: { id: number; isMod: boolean }) {
  const [checked, setChecked] = useState(isMod ? true : false);
  const router = useRouter();

  //when the switch is toggled, this function is called
  const handleSwitch = async (id: number) => {
    const response = await editUserRoles({
      user_id: id,
      is_mod: !isMod,
    });
    if (response.success === true) {
      toast.success(response.message);
    } else {
      showErrorToasts(response.errorData);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="role-switcher"
        checked={checked}
        onCheckedChange={(checked) => {
          setChecked(checked);
          handleSwitch(id);
        }}
        // onChange={handleSwitch}
      />
      <Label htmlFor="role-switcher">Is Moderator</Label>
    </div>
  );
}
