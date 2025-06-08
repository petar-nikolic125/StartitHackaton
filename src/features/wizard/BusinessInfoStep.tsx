// src/features/wizard/BusinessInfoStep.tsx
import {
    forwardRef,
    useImperativeHandle,
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import type { Basics } from "./types";
import { FieldGroup } from "../../components/FieldGroup";
import { Toast } from "../../components/ui/Toast";
import { motion } from "framer-motion";

/**
 * BusinessInfoStep: Collect and validate detailed business info.
 * - 12+ fields (text, select, date, tags)
 * - neon/Tailwind styling
 * - scroll-to-first-error + toast
 */
export interface BusinessInfoHandles {
    isValid(): boolean;
    getData(): Basics;
}
export interface BusinessInfoStepProps {
    onChange?: (data: Basics) => void;
}

// slide/fade animation
const fade = { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } };

// preset option lists
const ALL_NICHES: string[] = [
    "Fitness",
    "Health & Wellness",
    "E-commerce",
    "Coaching",
    "Education",
    "Software",
    "Personal Finance",
    "Marketing",
    "Art & Design",
    "Music",
    "Food & Beverage",
    "Travel",
    "Fashion",
    "SaaS",
    "Consulting",
    "Gaming",
    "Real Estate",
    "Non-profit",
    "Subscription Box",
    "Mobile App",
];

const ALL_PRODUCT_TYPES: string[] = [
    "Video",
    "PDF",
    "Coaching",
    "Consulting",
    "Subscription",
    "Software",
    "Membership",
    "Workshop",
    "eBook",
    "Physical Product",
    "Service Package",
];

const ALL_PRICE_RANGES: string[] = [
    "$0–49",
    "$50–99",
    "$100–199",
    "$200–499",
    "$500–999",
    "$1,000–1,999",
    "$2,000–4,999",
    "$5,000–9,999",
    "$10,000+",
];

const ALL_BUSINESS_MODELS: string[] = [
    "B2B",
    "B2C",
    "Marketplace",
    "Subscription",
    "Freemium",
    "Ad-supported",
];

const ALL_AUDIENCE_SIZES: string[] = [
    "0–100",
    "100–1K",
    "1K–10K",
    "10K–100K",
    "100K+",
];

const ALL_REGIONS: string[] = [
    "North America",
    "South America",
    "Europe",
    "Asia",
    "Africa",
    "Oceania",
    "Global",
];

const BusinessInfoStep = forwardRef<BusinessInfoHandles, BusinessInfoStepProps>(
    ({ onChange }, ref) => {
        // load any saved basics
        const stored = useSelector((s: RootState) => s.wizard.basics);

        // create refs for required fields (for scrolling)
        const businessNameRef = useRef<HTMLInputElement>(null);
        const taglineRef = useRef<HTMLInputElement>(null);
        const websiteRef = useRef<HTMLInputElement>(null);
        const nicheRef = useRef<HTMLInputElement>(null);
        const productTypeRef = useRef<HTMLSelectElement>(null);
        const businessModelRef = useRef<HTMLSelectElement>(null);
        const targetPriceRangeRef = useRef<HTMLSelectElement>(null);
        const launchDateRef = useRef<HTMLInputElement>(null);
        const audienceSizeRef = useRef<HTMLSelectElement>(null);
        const regionRef = useRef<HTMLSelectElement>(null);
        const competitorInputRef = useRef<HTMLInputElement>(null);
        const teamSizeRef = useRef<HTMLSelectElement>(null);

        // state for each field
        const [businessName, setBusinessName] = useState<string>("");
        const [tagline, setTagline] = useState<string>("");
        const [website, setWebsite] = useState<string>("");
        const [niche, setNiche] = useState<string>("");
        const [productType, setProductType] = useState<string>("");
        const [businessModel, setBusinessModel] = useState<string>("");
        const [targetPriceRange, setTargetPriceRange] = useState<string>("");
        const [launchDate, setLaunchDate] = useState<string>("");
        const [audienceSize, setAudienceSize] = useState<string>("");
        const [region, setRegion] = useState<string>("");
        const [competitors, setCompetitors] = useState<string[]>([]);
        const [competitorInput, setCompetitorInput] = useState<string>("");
        const [teamSize, setTeamSize] = useState<string>("");
        const [errors, setErrors] = useState<Record<string,string>>({});
        const [toast, setToast] = useState<string>("");

        // hydrate from Redux
        useEffect(() => {
            if (stored) {
                setBusinessName(stored.businessName || "");
                setTagline(stored.tagline || "");
                setWebsite(stored.website || "");
                setNiche(stored.niche);
                setProductType(stored.productType);
                setBusinessModel(stored.businessModel || "");
                setTargetPriceRange(stored.targetPriceRange);
                setLaunchDate(stored.launchDate || "");
                setAudienceSize(stored.audienceSize || "");
                setRegion(stored.region || "");
                setCompetitors(stored.competitors || []);
                setTeamSize(stored.teamSize || "");
            }
        }, [stored]);

        // build payload
        const payload = useMemo(
            () => ({
                businessName,
                tagline,
                website,
                niche,
                productType,
                businessModel,
                targetPriceRange,
                launchDate,
                audienceSize,
                region,
                competitors,
                teamSize,
            }),
            [
                businessName,
                tagline,
                website,
                niche,
                productType,
                businessModel,
                targetPriceRange,
                launchDate,
                audienceSize,
                region,
                competitors,
                teamSize,
            ]
        );

        // notify parent
        useEffect(() => onChange?.(payload as Basics), [payload, onChange]);

        // validation
        const validate = useCallback(() => {
            const errs: Record<string,string> = {};
            if (!businessName) errs.businessName = "Required";
            else if (!niche) errs.niche = "Required";
            else if (!productType) errs.productType = "Required";
            else if (!targetPriceRange) errs.targetPriceRange = "Required";
            else if (!launchDate) errs.launchDate = "Required";
            else if (!teamSize) errs.teamSize = "Required";
            setErrors(errs);
            if (Object.keys(errs).length) {
                setToast("Please fix highlighted fields");
                if (errs.businessName) businessNameRef.current?.scrollIntoView({behavior:"smooth",block:"center"});
                else if (errs.niche) nicheRef.current?.scrollIntoView({behavior:"smooth",block:"center"});
                else if (errs.productType) productTypeRef.current?.scrollIntoView({behavior:"smooth",block:"center"});
                else if (errs.targetPriceRange) targetPriceRangeRef.current?.scrollIntoView({behavior:"smooth",block:"center"});
                else if (errs.launchDate) launchDateRef.current?.scrollIntoView({behavior:"smooth",block:"center"});
                else if (errs.teamSize) teamSizeRef.current?.scrollIntoView({behavior:"smooth",block:"center"});
                return false;
            }
            return true;
        }, [businessName, niche, productType, targetPriceRange, launchDate, teamSize]);

        // expose to parent
        useImperativeHandle(
            ref,
            () => ({
                isValid: validate,
                getData: () => payload as Basics,
            }),
            [validate, payload]
        );

        // competitor tag handlers
        const addCompetitor = () => {
            const val = competitorInput.trim();
            if (val && !competitors.includes(val)) setCompetitors(prev => [...prev, val]);
            setCompetitorInput("");
        };
        const removeCompetitor = (c: string) => setCompetitors(prev => prev.filter(x => x !== c));

        return (
            <motion.div
                variants={fade}
                initial="initial"
                animate="animate"
                className="glow-bg p-6 rounded-2xl space-y-6"
            >
                {toast && (
                    <div className="fixed top-4 right-4 z-50">
                        <Toast message={toast} onClose={() => setToast("")} />
                    </div>
                )}

                <FieldGroup label="Business Name">
                    <input
                        ref={businessNameRef}
                        className={`w-full bg-dark2 p-3 rounded-lg text-gray-100 border-2 transition-all ${errors.businessName ? "border-red-500" : "border-dark-overlay focus:border-primary focus:ring-2 focus:ring-primary/50"}`}
                        value={businessName}
                        onChange={e => setBusinessName(e.target.value)}
                    />
                    {errors.businessName && <p className="mt-1 text-red-400 text-sm">{errors.businessName}</p>}
                </FieldGroup>

                <FieldGroup label="Tagline">
                    <input
                        ref={taglineRef}
                        className="w-full bg-dark2 p-3 rounded-lg text-gray-100 border-2 border-dark-overlay focus:border-accent transition-all"
                        placeholder="Empower your business with AI"
                        value={tagline}
                        onChange={e => setTagline(e.target.value)}
                    />
                </FieldGroup>

                <FieldGroup label="Website">
                    <input
                        ref={websiteRef}
                        type="url"
                        className="w-full bg-dark2 p-3 rounded-lg text-gray-100 border-2 border-dark-overlay focus:border-accent transition-all"
                        placeholder="https://your-site.com"
                        value={website}
                        onChange={e => setWebsite(e.target.value)}
                    />
                </FieldGroup>

                <FieldGroup label="Your Niche">
                    <input
                        ref={nicheRef}
                        list="niche-list"
                        className={`w-full bg-dark2 p-3 rounded-lg text-gray-100 border-2 transition-all ${errors.niche ? "border-red-500" : "border-dark-overlay focus:border-primary focus:ring-2 focus:ring-primary/50"}`}
                        placeholder="Select or type…"
                        value={niche}
                        onChange={e => setNiche(e.target.value)}
                    />
                    <datalist id="niche-list">
                        {ALL_NICHES.map(n => (
                            <option key={n} value={n} />
                        ))}
                    </datalist>
                    {errors.niche && <p className="mt-1 text-red-400 text-sm">{errors.niche}</p>}
                </FieldGroup>

                <FieldGroup label="Product Type">
                    <select
                        ref={productTypeRef}
                        className={`w-full bg-dark2 p-3 rounded-lg text-gray-100 border-2 transition-all ${errors.productType ? "border-red-500" : "border-dark-overlay focus:border-primary focus:ring-2 focus:ring-primary/50"}`}
                        value={productType}
                        onChange={e => setProductType(e.target.value)}
                    >
                        <option value="">Select…</option>
                        {ALL_PRODUCT_TYPES.map(pt => (
                            <option key={pt} value={pt}>
                                {pt}
                            </option>
                        ))}
                    </select>
                    {errors.productType && <p className="mt-1 text-red-400 text-sm">{errors.productType}</p>}
                </FieldGroup>

                <FieldGroup label="Business Model">
                    <select
                        ref={businessModelRef}
                        className="w-full bg-dark2 p-3 rounded-lg text-gray-100 border-2 border-dark-overlay focus:border-accent transition-all"
                        value={businessModel}
                        onChange={e => setBusinessModel(e.target.value)}
                    >
                        <option value="">Select…</option>
                        {ALL_BUSINESS_MODELS.map(bm => (
                            <option key={bm} value={bm}>
                                {bm}
                            </option>
                        ))}
                    </select>
                </FieldGroup>

                <FieldGroup label="Target Price Range">
                    <select
                        ref={targetPriceRangeRef}
                        className={`w-full bg-dark2 p-3 rounded-lg text-gray-100 border-2 transition-all ${errors.targetPriceRange ? "border-red-500" : "border-dark-overlay focus:border-primary focus:ring-2 focus:ring-primary/50"}`}
                        value={targetPriceRange}
                        onChange={e => setTargetPriceRange(e.target.value)}
                    >
                        <option value="">Select…</option>
                        {ALL_PRICE_RANGES.map(pr => (
                            <option key={pr} value={pr}>
                                {pr}
                            </option>
                        ))}
                    </select>
                    {errors.targetPriceRange && <p className="mt-1 text-red-400 text-sm">{errors.targetPriceRange}</p>}
                </FieldGroup>

                <FieldGroup label="Launch Date">
                    <input
                        ref={launchDateRef}
                        type="date"
                        className={`w-full bg-dark2 p-3 rounded-lg text-gray-100 border-2 transition-all ${errors.launchDate ? "border-red-500" : "border-dark-overlay focus:border-primary focus:ring-2 focus:ring-primary/50"}`}
                        value={launchDate}
                        onChange={e => setLaunchDate(e.target.value)}
                    />
                    {errors.launchDate && <p className="mt-1 text-red-400 text-sm">{errors.launchDate}</p>}
                </FieldGroup>

                <FieldGroup label="Audience Size">
                    <select
                        ref={audienceSizeRef}
                        className="w-full bg-dark2 p-3 rounded-lg text-gray-100 border-2 border-dark-overlay focus:border-accent transition-all"
                        value={audienceSize}
                        onChange={e => setAudienceSize(e.target.value)}
                    >
                        <option value="">Select…</option>
                        {ALL_AUDIENCE_SIZES.map(as => (
                            <option key={as} value={as}>
                                {as}
                            </option>
                        ))}
                    </select>
                </FieldGroup>

                <FieldGroup label="Region of Focus">
                    <select
                        ref={regionRef}
                        className="w-full bg-dark2 p-3 rounded-lg text-gray-100 border-2 border-dark-overlay focus;border-accent transition-all"
                        value={region}
                        onChange={e => setRegion(e.target.value)}
                    >
                        <option value="">Select…</option>
                        {ALL_REGIONS.map(r => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                </FieldGroup>

                <FieldGroup label="Competitors (press Enter or click Add)">
                    <div className="flex space-x-2 mb-2">
                        <input
                            ref={competitorInputRef}
                            type="text"
                            list="comp-list"
                            className="flex-1 bg-dark2 p-3 rounded-lg text-gray-100 border-2 border-dark-overlay focus;border-accent transition-all"
                            placeholder="Add competitor…"
                            value={competitorInput}
                            onChange={e => setCompetitorInput(e.target.value)}
                            onKeyDown={e => e.key==='Enter' && (e.preventDefault(), addCompetitor())}
                        />
                        <button type="button" className="btn-primary px-4 py-2" onClick={addCompetitor}>
                            Add
                        </button>
                    </div>
                    <datalist id="comp-list">
                        {ALL_NICHES.map(n => <option key={n} value={n}/>)}
                    </datalist>
                    <div className="flex flex-wrap gap-2">
                        {competitors.map(c => (
                            <span key={c} className="inline-flex items-center space-x-1 bg-insta-pink/20 text-insta-pink px-3 py-1 rounded-full">
                <span>{c}</span>
                <button onClick={()=>removeCompetitor(c)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
                        ))}
                    </div>
                </FieldGroup>

                <FieldGroup label="Team Size">
                    <select
                        ref={teamSizeRef}
                        className={`w-full bg-dark2 p-3 rounded-lg text-gray-100 border-2 transition-all ${errors.teamSize?"border-red-500":"border-dark-overlay focus:border-primary focus:ring-2 focus:ring-primary/50"}`}
                        value={teamSize}
                        onChange={e=>setTeamSize(e.target.value)}
                    >
                        <option value="">Select…</option>
                        <option value="Solo">Solo</option>
                        <option value="2-5">2-5</option>
                        <option value="6-10">6-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51+">51+</option>
                    </select>
                    {errors.teamSize && <p className="mt-1 text-red-400 text-sm">{errors.teamSize}</p>}
                </FieldGroup>
            </motion.div>
        );
    }
);

BusinessInfoStep.displayName = "BusinessInfoStep";
export default BusinessInfoStep;