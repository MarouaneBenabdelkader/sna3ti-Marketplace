import DashboardLayout from "@/components/dashborads/handicraft/DashboardLayout";
import ItemsPageComponent from "@/components/dashborads/handicraft/ItemsPageComponent";
export default function ItemsPage() {
  return (
    <DashboardLayout>
      <ItemsPageComponent title="my items" itemsToRender={true} />
    </DashboardLayout>
  );
}
