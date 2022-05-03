import {
  Stack,
  Text,
  Avatar,
  Link,
  VStack,
  AvatarBadge,
} from "@chakra-ui/react";

import { ProfileAvatarInfo } from "../@types/user";
import customDataStatus from "../utils/status.json";

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
  const status = customDataStatus.subscription[statusSubscriptions];

  return (
    <Stack w={40} mt={10} direction="column" align="left">
      {data && (
        <Link href={`/users/profile/${data.user_id || data.id}`}>
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
                  bg={status?.color}
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
