// author: meisto
// date: 2024-10-27 22:46:00
/*
const h1Variants = {
   variant: {
      default: "",
   },
   size: {
      default: "text-lg",
   },
};
*/

export function Head1({
  children,
}: {
  className?: string;
  children: React.ReactNode;
  variant?: undefined | "";
  size?: string;
}) {
  /*
   const variantClassName: string = variant
      ? (h1Variants.variant[variant] ?? "")
      : h1Variants.variant.default;
   const sizeClassName: string = size
      ? (h1Variants.size[size] ?? "")
      : h1Variants.size.default;
   */

  return <h1 className={""}>{children}</h1>;
}
