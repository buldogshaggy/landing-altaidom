import localFont from "next/font/local";

export const halvar = localFont({
  src: [
    {
      path: "../public/fonts/halvar-thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/halvar-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/halvar-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/halvar-medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-halvar",
});