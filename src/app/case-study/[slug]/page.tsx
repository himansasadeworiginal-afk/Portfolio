import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import CaseStudyClient from "./case-study-client";

export function generateStaticParams() {
  return caseStudies.map((study: CaseStudy) => ({
    slug: study.slug,
  }));
}

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <CaseStudyClient slugPromise={params} />;
}
