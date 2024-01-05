import React from 'react'
import AdminDashboardLayout from "@/components/dashborads/admin/AdminDashboardLayout";
import NewHandicrafts from '@/components/dashborads/admin/NewHandicrafts';

function Index() {
  return (
    <NewHandicrafts />
  )
}

export default Index
Index.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
