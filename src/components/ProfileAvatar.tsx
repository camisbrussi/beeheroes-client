import { Stack, Text, Avatar, Link, VStack } from "@chakra-ui/react";
import { ProfileAvatarInfo } from "../@types/user";

interface ProfileAvatarProps {
  hasVisitButton?: boolean;
  data: ProfileAvatarInfo;
}

export function ProfileAvatar({ data }: ProfileAvatarProps) {
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
            />
            <Text>{data?.name}</Text>
          </VStack>
        </Link>
      )}
    </Stack>
  );
}
