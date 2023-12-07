import Environment from "~/assets/illustrations/categories/environment.png";
import Health from "~/assets/illustrations/categories/health.png";
import Education from "~/assets/illustrations/categories/education.png";
import Economy from "~/assets/illustrations/categories/economy.png";
import Transportation from "~/assets/illustrations/categories/transportation.png";
import Geography from "~/assets/illustrations/categories/geography.png";
import Energy from "~/assets/illustrations/categories/energy.png";
import FinanceAndBudget from "~/assets/illustrations/categories/finance-and-budget.png";
import CultureAndHistory from "~/assets/illustrations/categories/culture-and-history.png";
import HousingAndLabor from "~/assets/illustrations/categories/housing-and-labor.png";
import Infrastructure from "~/assets/illustrations/categories/infrastructure.png";
import Agriculture from "~/assets/illustrations/categories/agriculture.png";
import SocialServices from "~/assets/illustrations/categories/social-services.png";
import UrbanizationAndHousing from "~/assets/illustrations/categories/urbanization-and-housing.png";
import LocalLanguagesLinguisticDiversity from "~/assets/illustrations/categories/local-languages-linguistic-diversity.png";

const data = [
  {
    name: "Environment",
    slug: "environment",
    illustration: Environment,
    description:
      "A category that encompasses datasets related to the environment, including air quality, water scarcity, wildlife conservation, and renewable energy.",
  },
  {
    name: "Health",
    slug: "health",
    illustration: Health,
    description:
      "Data on health indicators, disease prevalence, healthcare infrastructure, access to healthcare services, and public health initiatives.",
  },
  {
    name: "Education",
    slug: "education",
    illustration: Education,
    description:
      "Data on education systems, enrollment rates, literacy rates, educational attainment, and educational infrastructure.",
  },
  {
    name: "Economy",
    slug: "economy",
    illustration: Economy,
    description:
      "Data on economic indicators, GDP, employment rates, labor market trends, industries, trade, and economic development initiatives.",
  },
  {
    name: "Transportation",
    slug: "transportation",
    illustration: Transportation,
    description: "Data on road infrastructure, public transit systems, and traffic patterns.",
  },
  {
    name: "Geography",
    slug: "geography",
    illustration: Geography,
    description: "Data about landforms, climate, and natural resources in a specific region.",
  },
  {
    name: "Energy",
    slug: "energy",
    illustration: Energy,
    description: "Information on energy production, consumption, and renewable energy initiatives.",
  },
  {
    name: "Finance and Budget",
    slug: "finance-and-budget",
    illustration: FinanceAndBudget,
    description: "Government budget details, revenue sources, and fiscal policies.",
  },
  {
    name: "Culture and History",
    slug: "culture-and-history",
    illustration: CultureAndHistory,
    description: "Data about local traditions, customs, and historical events.",
  },
  {
    name: "Housing and Labor",
    slug: "housing-and-labor",
    illustration: HousingAndLabor,
    description: "Data on housing market trends, employment rates, and workforce demographics.",
  },
  {
    name: "Infrastructure",
    slug: "infrastructure",
    illustration: Infrastructure,
    description:
      "Data on transportation systems, energy infrastructure, telecommunications, water and sanitation facilities, urban development, and public infrastructure projects.",
  },
  {
    name: "Agriculture",
    slug: "agriculture",
    illustration: Agriculture,
    description:
      "Data on agricultural production, land use, food security, crop yields, agricultural policies, and sustainable farming practices.",
  },
  {
    name: "Social Services",
    slug: "social-services",
    illustration: SocialServices,
    description:
      "Data on social welfare programs, poverty rates, income inequality, social inclusion, gender equality, and social development initiatives.",
  },
  {
    name: "Urbanization and Housing",
    slug: "urbanization-and-housing",
    illustration: UrbanizationAndHousing,
    description:
      "Data on urbanization trends, housing affordability, slum populations, urban infrastructure, and urban planning.",
  },
  {
    name: "Local Languages (Linguistic Diversity)",
    slug: "local-languages-linguistic-diversity",
    illustration: LocalLanguagesLinguisticDiversity,
    description:
      "Data on the languages spoken, language translation, language endangerment levels, and the distribution of different languages.",
  },
];

export default data;
