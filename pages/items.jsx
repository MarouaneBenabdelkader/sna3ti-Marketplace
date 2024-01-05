import Error from "@/components/Error";
import Items from "@/components/Items";
import axios from "axios";
import React from "react";

/* import { useSelector, useDispatch } from "react-redux";
import { login } from "@/reduxFolder/userSlice";
import DashboardLayout from "@/components/dashborads/handicraft/DashboardLayout";
import CustomerLayout from "@/components/dashborads/customer/CustomerLayout"; */

import DefualtLayout from "@/components/dashborads/DefualtLayout";

function ItemsPage({ items, error }) {
  if (error) {
    return <Error error={error} />;
  }
  return <Items items={items}></Items>;
}
ItemsPage.getLayout = function getLayout(page) {
  return <DefualtLayout>{page}</DefualtLayout>;
};
export async function getServerSideProps(context) {
  /* const { req } = context;
  const user = req.user || {};
  console.log(user);
  try {
    const res = await axios.get(
      "http://localhost:3000/api/resources/items?populateHandicraft=true"
    );
    const items = res.data.data;
    return {
      props: {
        user,
        items,
      },
    };
  } catch (error) {
    // Check if error response exists and if status is 500
    return {
      props: {
        error: error.response.data || {},
      },
    };
  } */
  try {
    let res = await axios.get(
      `${process.env.DOMAINNAME}/api/resources/items?populateHandicraft=true`
    );
    const items = res.data.data;
    return {
      props: {
        items,
      },
    };
  } catch (error) {
    // Check if error response exists and if status is 500
    return {
      props: {
        error: error.response.data || {},
      },
    };
  }
}

/* export async function getStaticProps() {
  try {
    let res = await axios.get(
      `${process.env.DOMAINNAME}/api/resources/items?populateHandicraft=true`
    );
    const items = res.data.data;
    return {
      props: {
        items,
      },
    };
  } catch (error) {
    // Check if error response exists and if status is 500
    return {
      props: {
        error: error.response.data || {},
      },
    };
  }
} */

export default ItemsPage;
