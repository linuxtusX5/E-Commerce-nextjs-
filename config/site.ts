export const siteConfig = {
  name: "MyStore",
  description: "The best e-commerce store",
  url: process.env.NEXT_PUBLIC_APP_URL!,
  nav: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ],
  social: {
    twitter: "https://twitter.com/mystore",
    instagram: "https://instagram.com/mystore",
  },
};
