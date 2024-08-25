import Image from "next/image";
import Categories from "@/app/components/categories/Categories";
import PropertyList from "@/app/components/properties/PropertyList";
import {Suspense} from "react";
import {PropertyItemSkeleton, PropertyListSkeleton} from "@/app/components/skeletons";

export default function Home() {
  return (
    <main className="max-w-[1500px] mx-auto px-6">
      <Categories/>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <Suspense fallback={<PropertyListSkeleton/>}>
          <PropertyList/>
        </Suspense>
      </div>
    </main>
  );
}
