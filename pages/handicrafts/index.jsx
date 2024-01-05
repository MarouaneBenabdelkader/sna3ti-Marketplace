import HandicraftsTab from "@/components/dashborads/handicraft/HandicraftsTab";
import React from "react";
import NoSsr from "@mui/base/NoSsr";
import DefualtLayout from "@/components/dashborads/DefualtLayout";
function Handicrafts() {
  return (
    <NoSsr>
      <HandicraftsTab></HandicraftsTab>
    </NoSsr>
  );
}

Handicrafts.getLayout = function getLayout(page) {
  return <DefualtLayout>{page}</DefualtLayout>;
};
export default Handicrafts;
