import { Image } from "@chakra-ui/react";
export interface SliderItemProps {
  imageUrl: string;
}

export function SlideItem({ imageUrl }: SliderItemProps) {
  return (
    <Image
      w="100%"
      maxW={1240}
      minW={1220}
      h={["250px", "450px"]}
      mx="auto"
      mb={["5", "10"]}
      objectFit="cover"
      borderRadius="10"
      src={imageUrl}
      alt={imageUrl}
    />
  );
}
