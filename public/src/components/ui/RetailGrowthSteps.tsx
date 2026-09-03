'use client';

import { ScrollSteps } from '@/components/ui/ScrollSteps';
import type { ScrollStep } from '@/components/ui/ScrollSteps';

/* Add / remove steps here — the slide + list scale automatically. */
const STEPS: ScrollStep[] = [
  {
    label: '01',
    title: 'Digitalisation',
    body: 'Helping MSMEs manage sourcing and inventory with a fully digital platform.',
    image: '/ecosystem/ecosystem-a.png',
    imageAlt: 'Warehouse staff managing inventory',
  },
  {
    label: '02',
    title: 'Sales Booster',
    body: 'Increase retail sales through better product access and reliable restocking.',
    image: '/ecosystem/ecosystem-a.png',
    imageAlt: 'Stacked goods ready for distribution',
  },
  {
    label: '03',
    title: 'Time Saver',
    body: 'Save hours every week with streamlined ordering and fast doorstep delivery.',
    image: '/ecosystem/ecosystem-a.png',
    imageAlt: 'Fast last-mile delivery',
  },
  {
    label: '04',
    title: 'Sales Booster',
    body: 'Increase retail sales through better product access and reliable restocking.',
    image: '/ecosystem/ecosystem-a.png',
    imageAlt: 'Stacked goods ready for distribution',
  },
];

export function RetailGrowthSteps(props: { steps?: ScrollStep[]; heading?: React.ReactNode }) {
  return (
    <ScrollSteps
      className="w-full"
      heading={props.heading}
      steps={props.steps && props.steps.length > 0 ? props.steps : STEPS}
      // Tune the feel without touching layout:
      config={{
        vhPerStep: 60,
        imageHeight: 380, // one image card height
        // peek: 40,       // how much of the next image shows
        // leftDrift: 90,  // subtle upward drift of the left list
        // spring: { stiffness: 120, damping: 24, mass: 0.5 }, // lower damping = more bounce
      }}
    />
  );
}
