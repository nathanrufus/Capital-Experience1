import Route from "@/api/route";
import Link from "next/link";

function page() {
  return <div>
    <Link href='/'>
     <Route/>
    </Link>
   
  </div>;
}

export default page;
