import DashboardLayout from "@/components/dashborads/handicraft/DashboardLayout";
import ItemsPageComponent from "@/components/dashborads/handicraft/ItemsPageComponent";

export default function Items() {
  return (
    <DashboardLayout>
      <ItemsPageComponent title="Archived Items" itemsToRender={false} />
    </DashboardLayout>
  );
}
