import React from "react";
import AdminDashboardLayout from "@/components/dashborads/admin/AdminDashboardLayout";

function Page404() {
  return <div>Page404</div>;
}

export default Page404;
Page404.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
