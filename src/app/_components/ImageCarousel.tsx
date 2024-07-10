"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";

function ImageCarousel({ images, initialIndex, onClose }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (emblaApi && typeof initialIndex === "number") {
      emblaApi.scrollTo(initialIndex);
    }
  }, [emblaApi, initialIndex]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
    console.log("prev");
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla h-full max-h-full w-full max-w-6xl p-4">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images.map((image, index) => (
            <div className="embla__slide" key={index}>
              <Image
                src={image}
                alt={`Image ${index}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white"
      >
        Prev
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-white"
      >
        Next
      </button>
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-red-700 bg-opacity-70 p-2 text-white"
      >
        Close
      </button>
    </div>
  );
}

export default ImageCarousel;
