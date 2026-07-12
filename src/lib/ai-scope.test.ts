import { describe, expect, it } from "vitest";

import { generateTaskScope } from "./ai-scope";

describe("generateTaskScope", () => {
  it("detects useful skills and returns a complete scope", () => {
    const result = generateTaskScope({
      title: "Create a QR menu website",
      description: "Build a simple mobile menu for our cafe with prices and a QR code",
      desiredOutcome: "Customers can browse the menu on their phones",
      budget: 3500,
    });

    expect(result.skills).toContain("Responsive design");
    expect(result.deliverables).toHaveLength(3);
    expect(result.acceptanceCriteria).toHaveLength(3);
    expect(result.estimatedHours).toBeGreaterThan(0);
    expect(result.budgetGuidance).toContain("₹3,500");
  });

  it("handles a short, non-technical brief", () => {
    const result = generateTaskScope({
      title: "Help with customer records",
      description: "Organise our records",
      category: "Data & automation",
    });

    expect(result.complexity).toBe("Starter");
    expect(result.skills).toContain("Data & automation");
    expect(result.summary).toMatch(/Organise our records/);
  });
});
