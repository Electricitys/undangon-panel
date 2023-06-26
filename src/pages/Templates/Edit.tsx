import { Select, TextInput } from "@mantine/core";
import { HttpError } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/mantine";
import { TemplateSchema } from "interfaces";

type TemplateData = Pick<
  TemplateSchema,
  "name" | "category_id" | "thumbnail_url"
>;

export const TemplateEdit: React.FC = () => {
  const {
    getInputProps,
    saveButtonProps,
    refineCore: { queryResult },
  } = useForm<TemplateSchema, HttpError, TemplateData>({
    initialValues: {
      name: "",
      category_id: 0,
      thumbnail_url: "",
    },
  });

  const templateData = queryResult?.data?.data;

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    defaultValue: templateData?.category_id,
    optionLabel: "name",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <TextInput mt="sm" label="Name" {...getInputProps("name")} />
      <Select
        mt="sm"
        label="Category"
        {...getInputProps("category_id")}
        {...categorySelectProps}
        filterDataOnExactSearchMatch={false}
      />
    </Edit>
  );
};
