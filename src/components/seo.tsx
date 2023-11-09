import { HelmetProvider, Helmet } from "react-helmet-async";

type SeoProps = {
  title: string;
  description: string;
};

const helmetContext = {};

export default function Seo({ title, description }: SeoProps) {
  return (
    <HelmetProvider context={helmetContext}>
      <Helmet>
        <title>Open South - {title}</title>
        <meta name="title" content={`Title — ${title}`} />
        <meta name="description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
}
