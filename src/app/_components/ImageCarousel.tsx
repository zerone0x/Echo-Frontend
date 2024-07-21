"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Pagination, Navigation } from "swiper/modules";

function ImageCarousel({
  images,
  initialIndex,
}: {
  images: Array<string>;
  initialIndex: number;
}) {
  return (
    <section className="m-auto flex h-full w-full max-w-6xl items-center p-4">
      <Swiper
        slidesPerView={1}
        spaceBetween={40}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        initialSlide={initialIndex}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt={`Image ${index}`}
              width={1600}
              height={900}
              layout="responsive"
              objectFit="contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default ImageCarousel;
