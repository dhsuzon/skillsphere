"use client"; 

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function HeroSlider() {

  const bannerData = [
    {
      id: 1,
      title: "Upgrade Your Skills Today",
      subTitle: "Learn from Industry Experts",
      image: "/images/web_deg.avif",
    },
    {
      id: 2,
      title: "Master Modern Technologies",
      subTitle: "Focused on MERN Stack & Next.js",
      image: "/images/web_dev.jpg",
    },
    {
      id: 3,
      title: "Future with Artificial Intelligence",
      subTitle: "Learn AI, Machine Learning & Deep Learning",
      image: "/images/ai.avif", 
    },
    {
      id: 4,
      title: "Master Cyber Security & Ethics",
      subTitle: "Protect Digital Assets from Cyber Threats",
      image: "/images/cyber.avif", 
    },
    {
      id: 5,
      title: "Start Your Career Journey",
      subTitle: "Practical Projects & Mentorship",
      image: "/images/marketing.avif",
    },
  ];


  return (
    <section className="w-full py-5">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 h-100 md:h-137.5 lg:h-162.5">
        <Swiper
          spaceBetween={2}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper h-full rounded-2xl shadow-lg"
        >
          {bannerData.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full  h-full">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg  leading-tight">
                    {banner.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-4xl font-medium">
                    {banner.subTitle}
                  </p>
                  <Link
                    href="/"
                    className="btn bg-orange-500 hover:bg-orange-600 border-none text-white text-lg px-10 rounded-full transition-all shadow-xl"
                  >
                    Explore Courses
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
