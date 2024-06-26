import { useEffect } from "react";
import Loading from "./loading";
import { useRouter } from "next/router";

// export async function getServerSideProps(context) {
//   return {
//     redirect: {
//       destination: '/home',
//       permanent: false, // 如果重定向是临时的，设置为 false
//     }
//   };
// }

export default function App() {
  return <Loading />;
}