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
    <section className="flex h-full w-full items-center justify-center">
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
        className="flex h-full w-full items-center justify-center"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <div className="m-auto h-full w-full sm:max-h-[70vh] sm:max-w-[70vw] md:max-h-[70vh] md:max-w-[70vw] lg:max-w-[40vw]">
              <Image
                src={image}
                alt={`Image ${index}`}
                layout="responsive"
                objectFit="cover"
                width={500}
                height={500}
                className="h-full w-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default ImageCarousel;
