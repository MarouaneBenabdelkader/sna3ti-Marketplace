import React from "react";
import AdminDashboardLayout from "@/components/dashborads/admin/AdminDashboardLayout";

function Settings() {
  return <div>Settings</div>;
}

export default Settings;
Settings.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
