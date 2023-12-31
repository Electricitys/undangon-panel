import { Select, TextInput } from "@mantine/core";
import { HttpError } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/mantine";
import { InvitationSchema } from "interfaces";

type InvitationData = Pick<
  InvitationSchema,
  "name" | "category_id" | "slug" | "package_id" | "content"
>;

export const InvitationCreate: React.FC = () => {
  const { getInputProps, saveButtonProps } = useForm<
    InvitationSchema,
    HttpError,
    InvitationData
  >({
    initialValues: {
      name: "",
      slug: "",
      category_id: 0,
      package_id: 0,
      content: " ",
    },
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    optionLabel: "name",
  });
  const { selectProps: packageSelectProps } = useSelect({
    resource: "packages",
    optionLabel: "name",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <TextInput mt="sm" label="Name" {...getInputProps("name")} />
      <TextInput mt="sm" label="Slug" {...getInputProps("slug")} />
      <Select
        mt="sm"
        label="Category"
        {...getInputProps("category_id")}
        {...categorySelectProps}
        filterDataOnExactSearchMatch={false}
      />
      <Select
        mt="sm"
        label="Package"
        {...getInputProps("package_id")}
        {...packageSelectProps}
        filterDataOnExactSearchMatch={false}
      />
    </Edit>
  );
};
