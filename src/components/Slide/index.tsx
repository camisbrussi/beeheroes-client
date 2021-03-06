import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Flex } from "@chakra-ui/react";

import { SlideItem } from "./SlideItem";

interface SlideInfoProps {
  imagesUrl: string[];
}

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const Slide = ({ imagesUrl }: SlideInfoProps) => {
  return (
    <Flex
      w="100%"
      maxW={1220}
      minW={1220}
      h={["200px", "500px"]}
      mx="auto"
      mb={["5", "10"]}
    >
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        initialSlide={0}
        color="#FFBA08"
      >
        {imagesUrl?.map((imageUrl) => (
          <SwiperSlide key={imageUrl}>
            <SlideItem imageUrl={imageUrl} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
};
