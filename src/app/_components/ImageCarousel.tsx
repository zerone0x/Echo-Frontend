"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback } from "react";
function ImageCarousel({ images }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images.length > 0
            ? images.map((image, index) => (
                <div className="embla__slide" key={index}>
                  <Image
                    src={image}
                    alt={`${index}`}
                    width={300}
                    height={200}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
      <button className="embla_prev" onClick={scrollPrev}>
        Prev
      </button>
      <button className="embla_next" onClick={scrollNext}>
        Next
      </button>
    </div>
  );
}

export default ImageCarousel;
