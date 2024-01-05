import { Home, Handicrafts, About, Contact } from '../components/sections'
import Navbar from "@/components/Navbar";
import '@fontsource/public-sans';
import dynamic from 'next/dynamic';

/* const DynamicSwiperWithNoSSR = dynamic(() => import('@/components/sections/Handicrafts_Items'), {
  ssr: false, // This line will handle the server-rendering
}); */
import DynamicSwiperWithNoSSR from '@/components/sections/Handicrafts_Items'
// import Handicrafts_Items from '@/components/sections/Handicrafts_Items';
export default function HomePage() {
  return (
    <>
      <Navbar></Navbar>
      <Home></Home>
      <DynamicSwiperWithNoSSR></DynamicSwiperWithNoSSR>
      <About></About>
      <Contact></Contact>
    </>
  )
}
/* export async function getStaticProps(context) {
  console.log('getStaticProps');
  console.log(context);
  // console.log(req.user);
  // Fetch data from external API
  // const res = await fetch(`https://.../data`);
  const data = {};
  return {
    props: { data }, // will be passed to the page component as props
  }
} */

/* export async function getServerSideProps({req, res, params}) {
  // Fetch data from external API
  console.log('getServerSideProps');
  console.log(req.user);
  // const res = await fetch(`https://.../data`);
  const data = {};

  // Pass data to the page via props
  return { props: { data } };
} */