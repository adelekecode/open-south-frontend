import Environment from "~/assets/illustrations/categories/environment.png";
import Health from "~/assets/illustrations/categories/health.png";
import Education from "~/assets/illustrations/categories/education.png";
import Economy from "~/assets/illustrations/categories/economy.png";
import Transportation from "~/assets/illustrations/categories/transportation.png";

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
  // {
  //   name: "Geography",
  //   slug: "geography",
  //   illustration: Economy,
  //   description: "Data about landforms, climate, and natural resources in a specific region.",
  // },
];

export default data;
