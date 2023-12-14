import { useState } from "react";
import { Autocomplete, InputLabel, MenuItem, TextField } from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import Button from "~/components/button";
import DatePickerField from "~/components/date-picker-field";
import FormField from "~/components/form-field";
import SelectField from "~/components/select-field";
import TextEditorField from "~/components/text-editor-field";
import { useCreateDataset } from "~/mutations/dataset";
import { useCreateTags } from "~/mutations/tags";
import UpdateFrequencyData from "~/utils/data/update-frequency.json";
import countryData from "~/utils/data/country.json";
import TagsField from "~/components/tags-field";
import { useCategories } from "~/queries/category";

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Title field is required")
    .min(3, "Title must be atleast 3 characters"),
  description: Yup.string()
    .trim()
    .required("Description field is required")
    .min(3, "Description must be atleast 3 characters"),
  license: Yup.string().trim().required("License field is required"),
  updateFrequency: Yup.string().trim().required("Update Frequency field is required"),
  tags: Yup.array().min(1, "Tags is a required field"),
  start: Yup.string().trim().required("This field is required"),
  end: Yup.string().trim().required("This field is required"),
  category: Yup.string().trim().required("Category field is required"),
  spatialCoverage: Yup.string().trim().required("Spatial Coverage field is required"),
});

type NewDatasetProps = {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function NewDataset({ setActiveIndex }: NewDatasetProps) {
  const [chosenCategoryObj, setChosenCategoryObj] = useState<Category | null>(null);

  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const createDataset = useCreateDataset();
  const createTags = useCreateTags();

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        license: "Licence Ouverte / Open Licence version 2.0",
        tags: [],
        updateFrequency: "",
        start: "",
        end: "",
        category: "",
        spatialCoverage: "",
      }}
      validateOnBlur={false}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        if (!chosenCategoryObj) return;

        const newValues: Omit<typeof values, "category"> & {
          category?: string;
        } = structuredClone(values);

        delete newValues.category;

        const { tags, ...rest } = newValues;

        const datasetResponse = await createDataset.mutateAsync({
          ...rest,
          category: chosenCategoryObj,
        });

        if (datasetResponse) {
          const tagsResponse = await createTags.mutateAsync({
            datasetId: datasetResponse.id,
            tags,
          });

          if (tagsResponse) {
            setActiveIndex((prev) => prev + 1);
          }
        }
      }}
    >
      {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
        <form className="pt-4 flex flex-col gap-10" onSubmit={handleSubmit}>
          <div className="px-4 flex flex-col gap-6">
            <h2 className="w-full text-center text-base font-semibold">
              Fill the fields below to create a dataset
            </h2>
            <div className="flex flex-col gap-4">
              <FormField
                label="Title"
                required
                name="title"
                className="[&_input]:!text-[0.9rem]"
                labelProps={{
                  className: "!font-medium",
                }}
              />
              <TextEditorField
                label="Description"
                required
                name="description"
                labelProps={{
                  className: "!font-medium",
                }}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "indent",
                ]}
              />
              <FormField
                label="License"
                className="[&_input]:!text-[0.9rem]"
                required
                name="license"
                readOnly
              />
              <SelectField
                label="Update Frequency"
                required
                name="updateFrequency"
                defaultValue={"Unknown"}
                labelProps={{
                  className: "!font-medium",
                }}
              >
                {UpdateFrequencyData.map((item, index) => (
                  <MenuItem key={index + 1} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </SelectField>
              <div>
                <TagsField
                  name="tags"
                  required
                  label="Tags"
                  labelProps={{
                    className: "!font-medium",
                  }}
                />
              </div>
              <div className="w-full flex flex-col">
                <InputLabel className={`!text-sm mb-[0.35rem] !font-Work-Sans !font-medium`}>
                  Temporal Coverage
                  <span className="!text-red-600 !text-[0.9rem] pl-1">*</span>
                </InputLabel>
                <div className="flex gap-4 items-center [@media(max-width:560px)]:flex-col [@media(max-width:560px)]:gap-2">
                  <DatePickerField
                    className="[&_input]:!text-[0.9rem]"
                    name="start"
                    format="DD-MM-YYYY"
                    required
                  />
                  <span>To</span>
                  <DatePickerField
                    className="[&_input]:!text-[0.9rem]"
                    name="end"
                    format="DD-MM-YYYY"
                    required
                  />
                </div>
              </div>
              <SelectField
                label="Category"
                required
                name="category"
                labelProps={{
                  className: "!font-medium",
                }}
                value={values.category || ""}
              >
                {!isLoadingCategories &&
                  categories &&
                  categories?.length > 0 &&
                  categories.map((item, index) => (
                    <MenuItem
                      key={index + 1}
                      value={item.name}
                      onClick={() => {
                        setChosenCategoryObj(item);
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                {isLoadingCategories &&
                  Array.from({ length: 5 }).map((_, index) => (
                    <MenuItem
                      key={index + 1}
                      className="animate-pulse rounded-lg bg-gray-200 h-24"
                    ></MenuItem>
                  ))}
              </SelectField>
              <div>
                <InputLabel className={`!text-sm mb-[0.35rem] !font-Work-Sans !font-medium`}>
                  Spatial Coverage
                  <span className="!text-red-600 !text-[0.9rem] pl-1">*</span>
                </InputLabel>
                <Autocomplete
                  options={countryData}
                  onChange={(_, value) => setFieldValue("spatialCoverage", value?.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      value={values.spatialCoverage || ""}
                      name="spatialCoverage"
                      className="[&_input]:!text-[0.9rem]"
                    />
                  )}
                />
                <ErrorMessage
                  name={"spatialCoverage"}
                  className={`!text-red-600 !font-medium !text-xs pl-1`}
                  component={"p"}
                />
              </div>
            </div>
          </div>
          <footer className="border-t p-4 py-2 flex items-center justify-between">
            <Button
              color="info"
              className="!py-2"
              onClick={() => {
                setActiveIndex((prev) => prev - 1);
              }}
            >
              Previous
            </Button>
            <Button type="submit" className="!py-2" loading={isSubmitting}>
              Next
            </Button>
          </footer>
        </form>
      )}
    </Formik>
  );
}
