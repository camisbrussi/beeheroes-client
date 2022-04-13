import {
  Stack,
  Text,
  Avatar,
  Link,
  VStack,
  AvatarBadge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ProfileAvatarInfo } from "../@types/user";

interface ProfileAvatarProps {
  data: ProfileAvatarInfo;
  isProject?: boolean;
  statusSubscriptions?: number;
}

export function ProfileAvatar({
  data,
  isProject = null,
  statusSubscriptions = null,
}: ProfileAvatarProps) {
  const [colorStatus, setColorStatus] = useState("");

  console.log(statusSubscriptions);

  useEffect(() => {
    switch (statusSubscriptions) {
      case 1:
        setColorStatus("green");
      case 2:
        setColorStatus("blue");
      case 3:
        setColorStatus("orange");
      case 4:
        setColorStatus("tomato");
      case 5:
        setColorStatus("yellow");
    }
  }, [statusSubscriptions]);

  return (
    <Stack w={40} mt={10} direction="column" align="left">
      {data && (
        <Link href={`/user/profile/${data.user_id}`}>
          <VStack>
            <Avatar
              size="lg"
              objectFit="cover"
              src={
                data?.avatar
                  ? `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/avatar/${data?.avatar}`
                  : null
              }
            >
              {isProject && (
                <AvatarBadge
                  borderColor="papayawhip"
                  bg={colorStatus}
                  boxSize="1.25em"
                />
              )}
            </Avatar>
            <Text>{data?.name}</Text>
          </VStack>
        </Link>
      )}
    </Stack>
  );
}
