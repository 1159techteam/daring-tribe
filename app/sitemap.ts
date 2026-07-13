import { MetadataRoute } from "next"

const base = "https://daringtribe.1159realty.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/learn",
    "/leaderboard",
    "/course",
    "/testimonials",
    "/blog",
    "/contact",
    "/signup",
    "/login",
  ]
  return paths.map((path, i) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/blog" || path === "/learn" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/learn" ? 0.9 : 0.7,
  }))
}
