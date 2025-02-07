import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("functions", "./routes/functions.tsx", [
    index("./routes/placeholder.tsx"),
    route("rss", "./routes/rss.tsx"),
    ...prefix("llm", [
      index("./routes/llm.tsx"),
      route("list", "./routes/llm_list.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
