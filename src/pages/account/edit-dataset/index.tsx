import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Autocomplete, InputLabel, MenuItem, TextField } from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import Button from "~/components/button";
import DashboardLoader from "~/components/loader/dashboard-loader";
import NotFound from "~/pages/404";
import { useUserDatasetDetails } from "~/queries/dataset";
import { useAddDatasetTags, useEditDataset, useRemoveDatasetTags } from "~/mutations/dataset";
import Success from "./success";
import SelectField from "~/components/fields/select-field";
import DatePickerField from "~/components/fields/date-picker-field";
import TagsField from "~/components/fields/tags-field";
import FormField from "~/components/fields/form-field";
import TextEditorField from "~/components/fields/text-editor-field";
import UpdateFrequencyData from "~/utils/data/update-frequency.json";
import LicenseData from "~/utils/data/license.json";
import spatialCoverageData from "~/utils/data/spatial-coverage.json";
import { getCountryCoordinates } from "~/utils/helper";
import { usePublicCategories } from "~/queries/category";

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

export default function EditDataset() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [formCompleted, setFormCompleted] = useState(false);
  const [chosenCategoryObj, setChosenCategoryObj] = useState<Category | null>(null);

  const { data, isLoading } = useUserDatasetDetails(id || "");
  const { data: categories, isLoading: isLoadingCategories } = usePublicCategories();

  const editDataset = useEditDataset();
  const addDatasetTags = useAddDatasetTags();
  const removeDatasetTags = useRemoveDatasetTags();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const spatialCoverage = useMemo(
    () => spatialCoverageData.find((v) => v.label === data?.spatial_coverage),
    [data?.spatial_coverage]
  );

  const category = useMemo(
    () => categories?.find((v) => v.id === data?.category),
    [categories, data?.category]
  );

  if (isLoading) {
    return <DashboardLoader />;
  }

  if (!data) {
    return <NotFound />;
  }

  const arr = data.temporal_coverage?.split(",");

  const temporalCoverage = {
    from: dayjs(arr?.[0], "DD-MM-YYYY"),
    to: dayjs(arr?.[1], "DD-MM-YYYY"),
  };

  const tagsData = data.tags_data ? data.tags_data.map((item) => item.name) : [];

  return (
    <>
      <main className="p-6 px-8 tablet:px-4 pb-16 flex flex-col gap-6 w-full">
        <h1 className="text-2xl font-semibold largeMobile:text-xl">Edit Dataset</h1>
        <div className="bg-white w-full border border-info-100 p-6 tablet:px-4 rounded-md">
          {formCompleted ? (
            <Success data={editDataset.data} />
          ) : (
            <div>
              <Formik
                initialValues={{
                  title: data.title || "",
                  description: data.description || "",
                  license: data.license || "",
                  tags: data.tags_data ? data.tags_data.map((item) => item.name) : [],
                  updateFrequency: data.update_frequency || "Unknown",
                  start: temporalCoverage.from || "",
                  end: temporalCoverage.to || "",
                  category: category?.name || "",
                  spatialCoverage: data.spatial_coverage || "",
                }}
                validateOnBlur={false}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  const newValues: Omit<typeof values, "category"> & {
                    category?: string;
                  } = structuredClone(values);

                  delete newValues.category;

                  const {
                    tags,
                    spatialCoverage,
                    start,
                    end,
                    updateFrequency,
                    ...rest
                  }: Omit<typeof values, "category"> = newValues;

                  const reqData: typeof rest & {
                    coordinates?: string;
                    update_frequency: string;
                    temporal_coverage?: string;
                    spatial_coverage: string;
                    category?: Category;
                  } = {
                    ...rest,
                    spatial_coverage: spatialCoverage,
                    update_frequency: updateFrequency,
                    temporal_coverage: `${start},${end}`,
                  };

                  if (chosenCategoryObj) {
                    reqData.category = chosenCategoryObj || undefined;
                  }

                  if (!(data.spatial_coverage === values.spatialCoverage)) {
                    reqData.coordinates = (await getCountryCoordinates(spatialCoverage)).toString();
                  }

                  const datasetResponse = await editDataset.mutateAsync({
                    id: id || "",
                    data: reqData,
                  });

                  if (datasetResponse) {
                    const tagsToBeRemoved = tagsData.filter((item) => !tags.includes(item));
                    const tagsToBeAdded = tags.filter((item) => !tagsData.includes(item));

                    if (tagsToBeAdded.length > 0) {
                      await addDatasetTags.mutateAsync({
                        datasetId: datasetResponse.id,
                        tags: tagsToBeAdded,
                      });
                    }

                    if (tagsToBeRemoved.length > 0) {
                      await removeDatasetTags.mutateAsync({
                        datasetId: datasetResponse.id,
                        tags: tagsToBeRemoved,
                      });
                    }

                    return setFormCompleted(true);
                  }
                }}
              >
                {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
                  <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
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
                        />
                        <SelectField
                          label="License"
                          required
                          name="license"
                          value={values.license}
                          labelProps={{
                            className: "!font-medium",
                          }}
                        >
                          {LicenseData.map((item, index) => (
                            <MenuItem key={index + 1} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </SelectField>
                        <SelectField
                          label="Update Frequency"
                          required
                          name="updateFrequency"
                          value={values.updateFrequency}
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
                            onChange={(tags) => {
                              setFieldValue("tags", Array.from(new Set(tags)));
                            }}
                          />
                        </div>
                        <div className="w-full flex flex-col">
                          <InputLabel
                            className={`!text-sm mb-[0.35rem] !font-Work-Sans !font-medium`}
                          >
                            Temporal Coverage
                            <span className="!text-red-600 !text-[0.9rem] pl-1">*</span>
                          </InputLabel>
                          <div className="flex gap-4 items-center [@media(max-width:560px)]:flex-col [@media(max-width:560px)]:gap-2">
                            <DatePickerField
                              className="[&_input]:!text-[0.9rem]"
                              name="start"
                              format="DD-MM-YYYY"
                              required
                              disableFuture
                              value={dayjs(values.start) as any}
                              onChange={(date) =>
                                setFieldValue("start", dayjs(date).format("DD-MM-YYYY"))
                              }
                            />
                            <span>To</span>
                            <DatePickerField
                              className="[&_input]:!text-[0.9rem]"
                              name="end"
                              format="DD-MM-YYYY"
                              required
                              value={dayjs(values.end) as any}
                              onChange={(date) =>
                                setFieldValue("end", dayjs(date).format("DD-MM-YYYY"))
                              }
                              disableFuture
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
                          value={values.category}
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
                          <InputLabel
                            className={`!text-sm mb-[0.35rem] !font-Work-Sans !font-medium`}
                          >
                            Spatial Coverage
                            <span className="!text-red-600 !text-[0.9rem] pl-1">*</span>
                          </InputLabel>
                          <Autocomplete
                            options={spatialCoverageData}
                            onChange={(_, value) => setFieldValue("spatialCoverage", value?.label)}
                            value={spatialCoverage}
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
                    <footer className="p-2 flex items-center justify-between">
                      <Button
                        color="info"
                        className="!py-2"
                        onClick={() => {
                          navigate(`/account/datasets/${id}`);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="!py-2" loading={isSubmitting}>
                        Save
                      </Button>
                    </footer>
                  </form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
