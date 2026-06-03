export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Planning",
    description:
      "Deep dive into your goals, audience, and competition. I map out requirements, define scope, and create a strategic roadmap that aligns with your vision and budget.",
  },
  {
    number: "02",
    title: "Design & Prototyping",
    description:
      "Pixel-perfect mockups and interactive prototypes in Figma. We iterate on the look, feel, and flow until every detail feels right before a single line of code is written.",
  },
  {
    number: "03",
    title: "Development & Testing",
    description:
      "Clean, semantic code with modern frameworks. Each component is built, tested, and optimised across devices and browsers throughout the entire build process.",
  },
  {
    number: "04",
    title: "Launch & Optimisation",
    description:
      "Smooth deployment with CI/CD, performance monitoring, and post-launch analysis. I ensure everything runs at peak performance and iterate based on real user data.",
  },
];
