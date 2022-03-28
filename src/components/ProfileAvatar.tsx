import { Stack, Text, Avatar, Link, VStack } from "@chakra-ui/react";

interface ProfileAvatarProps {
  hasVisitButton?: boolean;
  data: ProfileAvatarInfo;
}

export type ProfileAvatarInfo = {
  id?: string;
  name: string;
  user_id: string;
  avatar_url: string;
};

export function ProfileAvatar({ data }: ProfileAvatarProps) {
  console.log(data);
  return (
    <Stack w={40} mt={10} direction="column" align="left">
      <Link href={`/profile/${data?.user_id}`}>
        <VStack>
          <Avatar size="lg" objectFit="cover" src={data?.avatar_url} />
          <Text>{data?.name}</Text>
        </VStack>
      </Link>
    </Stack>
  );
}
