import type { Brand } from '../sections/brands/data';

export function BackersCard(props: { brand: Brand }) {
  return (
    <>
      <div className="group relative flex h-34 w-full items-center justify-center overflow-hidden rounded-ps-md bg-ps-white-600 px-6">
        <div className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-linear-to-r from-transparent from-40% via-white via-50% to-transparent to-60% transition-transform duration-700 ease-out group-hover:translate-x-full" />
        {/* oxlint-disable-next-line next/no-img-element -- static brand logo; next/image adds no value for a small inline mark */}
        <img
          src={props.brand.logo}
          alt={props.brand.name}
          className="max-h-12 w-auto object-contain"
        />
      </div>
    </>
  );
}
