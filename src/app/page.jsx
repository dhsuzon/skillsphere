import HeroSlider from "@/components/banner/HeroSlider";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex mt-2 justify-center items-center container mx-auto">
      <HeroSlider />
    </div>
  );
}
