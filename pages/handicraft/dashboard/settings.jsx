import AccountTab from "@/components/dashborads/handicraft/Settings";
import React from "react";
import DashboardLayout from "@/components/dashborads/handicraft/DashboardLayout";
import EditProfileTab from "@/components/dashborads/handicraft/EditProfileTab";
function accountSettings() {
  return (
    <DashboardLayout>
      <AccountTab></AccountTab>
    </DashboardLayout>
  );
}

export default accountSettings;
