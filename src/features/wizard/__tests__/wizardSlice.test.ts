import { wizardSlice, setBasics, setPricing, reset } from "../wizardSlice";

const reducer = wizardSlice.reducer;

describe("wizardSlice", () => {
  it("sets basics", () => {
    const state = reducer(
      undefined,
      setBasics({
        niche: "fitness",
        productType: "video",
        targetPriceRange: "$50",
      }),
    );
    expect(state.basics?.niche).toBe("fitness");
  });

  it("resets state", () => {
    const initial = reducer(undefined, setPricing({ tiers: [] }));
    const cleared = reducer(initial, reset());
    expect(cleared.pricing).toBeNull();
  });
});
