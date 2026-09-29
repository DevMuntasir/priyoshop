import { RetailFinanceHowWork } from '@/components/business/retail-finance/RetailFinanceHowWork';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function DistributionProcessFlow(props: { data: ResolvedSection }) {
  return (
    <section className="bg-white">
      <RetailFinanceHowWork data={props.data} />
    </section>
  );
}
