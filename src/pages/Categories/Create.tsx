import { TextInput } from "@mantine/core";
import { HttpError } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/mantine";
import { CategorySchema } from "interfaces";

type CategoryData = Pick<CategorySchema, "name">;

export const CategoryCreate: React.FC = () => {
  const { getInputProps, saveButtonProps } = useForm<
    CategorySchema,
    HttpError,
    CategoryData
  >({
    initialValues: {
      name: "",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <TextInput mt="sm" label="Name" {...getInputProps("name")} />
    </Edit>
  );
};
