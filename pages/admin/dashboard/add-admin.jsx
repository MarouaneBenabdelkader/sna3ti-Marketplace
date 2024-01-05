import AdminDashboardLayout from "@/components/dashborads/admin/AdminDashboardLayout";
import React from "react";

function AddAdmin() {
  return <div>AddAdmin</div>;
}

export default AddAdmin;
AddAdmin.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
