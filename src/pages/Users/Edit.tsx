import { PasswordInput, Select, TextInput, Title } from "@mantine/core";
import { yupResolver } from "@mantine/form";
import { HttpError } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/mantine";
import { UserSchema } from "interfaces";
import { USER_ROLES } from "interfaces/constants";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().min(2, "Name must have at least 3 letters"),
  email: Yup.string().email().required(),
  password: Yup.string().test(
    "is-password-not-empty",
    "Required",
    (value: any) => !value
  ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null as any], "Passwords must match")
    .test("is-password-not-empty", "Required", (value: any) => !value),
  role: Yup.string().oneOf(Object.values(USER_ROLES)),
});

interface UserValue extends Pick<UserSchema, "name" | "email" | "role"> {
  password?: UserSchema["password"];
}

export const UserEdit: React.FC = () => {
  const {
    getInputProps,
    saveButtonProps,
  } = useForm<UserSchema, HttpError, UserValue>({
    initialValues: {
      name: "",
      email: "",
      role: "public",
    },
    validate: yupResolver(schema),
    transformValues: (value) => ({
      ...value,
      confirm_password: undefined,
    }),
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <TextInput mt="sm" label="Name" {...getInputProps("name")} />
      <TextInput mt="sm" label="Email" {...getInputProps("email")} />
      <Select
        mt="sm"
        label="Role"
        data={Object.values(USER_ROLES)}
        {...getInputProps("role")}
      />
      <Title mt="lg" order={4}>
        Change Password
      </Title>
      <PasswordInput
        mt="sm"
        label="New Password"
        type="password"
        {...getInputProps("password")}
      />
      <PasswordInput
        mt="sm"
        label="Confirm Password"
        type="password"
        {...getInputProps("confirm_password")}
      />
    </Edit>
  );
};
