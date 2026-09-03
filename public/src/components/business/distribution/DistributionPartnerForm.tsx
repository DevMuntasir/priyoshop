import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function DistributionPartnerForm(props: { data: ResolvedSection }) {
  const { heading } = props.data;

  return (
    <section className="bg-section-gradient py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <form className="mx-auto mt-12 max-w-5xl rounded-ps-xl bg-white p-8 sm:p-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input label="Full Name" name="fullName" placeholder="Enter your full name" />
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email address"
            />
            <Input label="Company Name" name="companyName" placeholder="Enter the company name" />
            <Input label="Job Title" name="jobTitle" placeholder="Enter your job title" />
          </div>

          <Button type="submit" fullWidth className="mt-8">
            Submit
          </Button>

          <p className="m-0 mt-4 text-center font-body text-ps-xs font-normal text-ps-ink-500">
            By clicking, you agree to our
            {' '}
            <a href="/terms" className="text-ps-ink-700 underline">Terms & Conditions,</a>
            <br />
            <a href="/privacy" className="text-ps-ink-700 underline">
              Privacy and Data Protection Policy
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
