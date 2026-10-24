import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  const routesToTest = [
    { path: "/", name: "Homepage" },
    { path: "/about", name: "About" },
    { path: "/services", name: "Services" },
    { path: "/our-work", name: "Our Work" },
    { path: "/case-studies", name: "Case Studies" },
    { path: "/studio", name: "Studio" },
    { path: "/careers", name: "Careers" },
    { path: "/contact", name: "Contact" },
    { path: "/admin/login", name: "Admin Login" },
    { path: "/admin", name: "Admin Dashboard" },
  ];

  routesToTest.forEach(({ path, name }) => {
    it(`matches a valid route for ${name} (${path}) without falling back to root/not-found`, () => {
      const matches = router.matchRoutes(path);
      expect(matches.length).toBeGreaterThan(0);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    });
  });
});
