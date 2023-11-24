import { useState } from "react";
import { MenuItem, Pagination } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import SearchInput from "~/components/search-input";
import Seo from "~/components/seo";
import SelectInput from "~/components/select-input";
import Card from "./card";
// import AutocompleteInput from "~/components/auto-complete-input";

type SortByValue = "relevance" | "creation-date" | "last-update";

const data: Dataset[] = [
  {
    title: "Sectors of departmental solidarity spaces (EDS) of the Department of Loire-Atlantique",
    organization: {
      name: "Department of Loire-Atlantique",
      image: "https://static.data.gouv.fr/avatars/cd/6d9c448556476ca76e8c4fcf0221a3-100.jpg",
    },
    user: null,
    description:
      "Scope of intervention of departmental solidarity spaces (EDS). These constitute places to welcome users in the areas of maternal and child protection, social life and integration.",
    slug: "sectors-of-departmental-solidarity-spaces-eds-of-the-department-of-loire-atlantique",
    updatedAt: "2023-11-22T23:49:50+0100",
  },
  {
    title: "Air Quality Monitoring in Beijing, China",
    organization: null,
    user: {
      firstName: "John",
      lastName: "Doe",
      image: "john-doe.jpg",
    },
    description:
      "Comprehensive dataset providing real-time and historical data on air quality in Beijing, China. The dataset includes information on air pollutants, sources, and the impact on public health.",
    slug: "air-quality-monitoring-beijing-china",
    updatedAt: "2022-11-24T12:30:00+0100", // One year ago
  },
  {
    title: "Water Scarcity in Cape Town, South Africa",
    organization: null,
    user: {
      firstName: "Alice",
      lastName: "Smith",
      image: "alice-smith.jpg",
    },
    description:
      "Dataset focusing on water scarcity issues in Cape Town, South Africa. The data includes information on water consumption, reservoir levels, and measures taken to address the water crisis.",
    slug: "water-scarcity-cape-town-south-africa",
    updatedAt: "2023-10-24T13:45:00+0100", // One month ago
  },
  {
    title: "Urbanization Challenges in Mumbai, India",
    organization: {
      name: "Urban Development Council",
      image: "urban-development-council.jpg",
    },
    user: null,
    description:
      "Dataset highlighting urbanization challenges in Mumbai, India. The data includes information on population growth, infrastructure development, and the impact on the city's environment.",
    slug: "urbanization-challenges-mumbai-india",
    updatedAt: "2023-11-20T14:30:00+0100", // A few days ago
  },
  {
    title: "Educational Disparities in Rio de Janeiro, Brazil",
    organization: null,
    user: {
      firstName: "Maria",
      lastName: "Silva",
      image: "maria-silva.jpg",
    },
    description:
      "Dataset focusing on educational disparities in Rio de Janeiro, Brazil. The data includes information on access to education, literacy rates, and challenges faced by marginalized communities.",
    slug: "educational-disparities-rio-de-janeiro-brazil",
    updatedAt: "2023-11-23T15:15:00+0100", // Today
  },
  {
    title: "Renewable Energy Usage in Berlin, Germany",
    organization: {
      name: "Green Energy Alliance",
      image: "green-energy-alliance.jpg",
    },
    user: null,
    description:
      "Dataset highlighting the usage of renewable energy in Berlin, Germany. The data includes information on renewable energy sources, energy consumption patterns, and the city's efforts to promote sustainability.",
    slug: "renewable-energy-usage-berlin-germany",
    updatedAt: "2023-11-24T16:00:00+0100", // Today
  },
  {
    title: "Public Transportation Efficiency in Tokyo, Japan",
    organization: {
      name: "Tokyo Transit Authority",
      image: "tokyo-transit-authority.jpg",
    },
    user: null,
    description:
      "Dataset focusing on the efficiency of public transportation in Tokyo, Japan. The data includes information on transit times, ridership patterns, and initiatives to improve public transportation services.",
    slug: "public-transportation-efficiency-tokyo-japan",
    updatedAt: "2023-11-22T16:45:00+0100", // A few days ago
  },
  {
    title: "Wildlife Conservation in Nairobi, Kenya",
    organization: null,
    user: {
      firstName: "Linda",
      lastName: "Omondi",
      image: "linda-omondi.jpg",
    },
    description:
      "Dataset highlighting wildlife conservation efforts in Nairobi, Kenya. The data includes information on endangered species, conservation projects, and the impact of human activities on local ecosystems.",
    slug: "wildlife-conservation-nairobi-kenya",
    updatedAt: "2023-11-18T17:30:00+0100", // A week ago
  },
  {
    title: "Climate Change Adaptation in Sydney, Australia",
    organization: {
      name: "Climate Action Coalition",
      image: "climate-action-coalition.jpg",
    },
    user: null,
    description:
      "Dataset focusing on climate change adaptation strategies in Sydney, Australia. The data includes information on temperature trends, sea-level rise, and initiatives to mitigate the impact of climate change on the city.",
    slug: "climate-change-adaptation-sydney-australia",
    updatedAt: "2022-11-24T18:15:00+0100", // One year ago
  },
  {
    title: "Housing Affordability in Vancouver, Canada",
    organization: {
      name: "Affordable Housing Coalition",
      image: "affordable-housing-coalition.jpg",
    },
    user: null,
    description:
      "Dataset highlighting housing affordability challenges in Vancouver, Canada. The data includes information on property prices, rental rates, and policies aimed at addressing housing affordability issues.",
    slug: "housing-affordability-vancouver-canada",
    updatedAt: "2023-11-19T19:00:00+0100", // A week ago
  },
  {
    title: "Cultural Heritage Preservation in Rome, Italy",
    organization: {
      name: "Heritage Conservation Society",
      image: "heritage-conservation-society.jpg",
    },
    user: null,
    description:
      "Dataset focusing on the preservation of cultural heritage in Rome, Italy. The data includes information on historical sites, conservation efforts, and the impact of tourism on cultural landmarks.",
    slug: "cultural-heritage-preservation-rome-italy",
    updatedAt: "2023-11-23T20:00:00+0100", // Today
  },
];

export default function Dataset() {
  const [sortBy, setSortBy] = useState<SortByValue>("relevance");

  return (
    <>
      <Seo title="Dataset" description="Checkout the dataset that have been created" />
      <main className="w-full max-w-maxAppWidth p-6 px-10 tablet:px-6 pt-0 mx-auto largeMobile:!px-4">
        <h1 className="text-4xl tablet:text-3xl largeMobile:!text-2xl font-semibold mb-2">
          Datasets
        </h1>
        <p className="largeMobile:text-sm">
          Search among the <span>40,042</span> datasets on Open South
        </p>
        <div className="flex flex-col gap-2 pt-4">
          <SearchInput
            placeholder="Search"
            className="w-full h-[inherit]"
            searchIcon={
              <div className="flex items-center gap-2 p-2">
                <FiSearch className="w-5 h-5 text-white" />
                <p className="text-white tablet:hidden text-base">Search</p>
              </div>
            }
          />
        </div>
        <div className="w-full grid grid-cols-[0.6fr,2fr] py-6 gap-8 tablet:grid-cols-1">
          <div className="w-full flex flex-col gap-3 pr-6 border-r-[1.5px] tablet:border-none border-zinc-300 [&>main]:flex [&>main]:flex-col [&>main]:gap-4 [&>main>div]:flex [&>main>div]:flex-col [&>main>div]:w-full">
            <header>
              <h4 className="font-semibold text-base">Filter</h4>
            </header>
            <main>
              <div>
                <label htmlFor="organization">Organizations</label>
                {/* <AutocompleteInput
            id="organization"
                  options={[
                    { label: "The Shawshank Redemption", year: 1994 },
                    { label: "The Godfather", year: 1972 },
                    { label: "The Godfather: Part II", year: 1974 },
                    { label: "The Dark Knight", year: 2008 },
                    { label: "12 Angry Men", year: 1957 },
                  ]}
                /> */}
              </div>
              <div>
                <label htmlFor="keyword">Keywords</label>
                {/* <AutocompleteInput
            id="keyword"
                  options={[
                    { label: "The Shawshank Redemption", year: 1994 },
                    { label: "The Godfather", year: 1972 },
                    { label: "The Godfather: Part II", year: 1974 },
                    { label: "The Dark Knight", year: 2008 },
                    { label: "12 Angry Men", year: 1957 },
                  ]}
                /> */}
              </div>
            </main>
          </div>
          <div className="flex flex-col gap-8">
            <header className="flex items-center gap-4 justify-between border-b-[1.5px] border-info-300 pb-4">
              <p>
                <span>1400</span> results
              </p>
              <div className="flex items-center gap-2">
                <p className="whitespace-nowrap text-sm">Sort by:</p>
                <SelectInput
                  className="min-w-[210px]"
                  value={sortBy}
                  onChange={(e) => {
                    if (e.target.value) {
                      setSortBy(e.target.value as SortByValue);
                    }
                  }}
                >
                  <MenuItem value="relevance">Relevance</MenuItem>
                  <MenuItem value="creation-date">Creation Date</MenuItem>
                  <MenuItem value="last-update">Last Update</MenuItem>
                </SelectInput>
              </div>
            </header>
            <main className="w-full flex flex-col gap-8">
              {data.map((item, index) => (
                <Card key={index + 1} {...item} />
              ))}
            </main>
            <footer className="flex items-center justify-center">
              <Pagination count={10} variant="outlined" shape="rounded" />
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}
