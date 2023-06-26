import { Text, Title } from "@mantine/core";
import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/mantine";
import { InvitationSchema } from "interfaces";

export const InvitationShow: React.FC = () => {
  const { queryResult } = useShow<InvitationSchema>();

  const { data } = queryResult;

  const record = data?.data;

  return (
    <Show>
      <Title order={4}>Name</Title>
      <Text>{record?.name}</Text>
      <Title order={4}>Category</Title>
      <Text>{record?.category.name}</Text>
      <Title order={4}>Owner</Title>
      <Text>{record?.user.name}</Text>
    </Show>
  );
};
