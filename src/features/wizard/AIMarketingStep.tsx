import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useGenerateMarketingMutation } from "./aiAgent";
import { LoadingDots } from "../../components/LoadingDots";
import { Toast } from "../../components/ui/Toast";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import { useWizardGuard } from "./useWizardGuard";
import type { MarketingData } from "./types";

export interface MarketingHandles {
  isValid: () => boolean;
  getData: () => MarketingData;
}

export const AIMarketingStep = forwardRef<MarketingHandles>((_, ref) => {
  const basics = useSelector((s: RootState) => s.wizard.basics);
  const pricing = useSelector((s: RootState) => s.wizard.pricing);
  const marketing = useSelector((s: RootState) => s.wizard.marketing);
  const [generate, { data, isLoading }] = useGenerateMarketingMutation();
  const [captions, setCaptions] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [times, setTimes] = useState<Array<{ time: string; count: number }>>([]);
  const [toast, setToast] = useState("");
  useWizardGuard(2);

  useEffect(() => {
    if (marketing) {
      setCaptions(marketing.captions);
      setHashtags(marketing.hashtags);
      setTimes(marketing.bestTimes || []);
    } else if (basics && pricing) {
      generate({ basics, pricing });
    }
  }, [marketing, basics, pricing, generate]);

  useEffect(() => {
    if (data) {
      setCaptions(data.captions);
      setHashtags(data.hashtags);
      setTimes(data.bestTimes?.map((t) => ({ time: t.time, count: t.count })) || []);
    }
  }, [data]);

  const validate = () => {
    const invalid = captions.length === 0 || hashtags.length === 0;
    if (invalid) {
      setToast("Marketing tips are incomplete.");
      return false;
    }
    return true;
  };

  useImperativeHandle(ref, () => ({
    isValid: validate,
    getData: () => ({ captions, hashtags, bestTimes: times }),
  }));

  return (
    <motion.div
      className="space-y-4"
      variants={{ initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } }}
      initial="initial"
      animate="animate"
    >
      {isLoading && (
        <div className="text-center py-10">
          <LoadingDots />
        </div>
      )}
      {captions.length > 0 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1">Captions</h3>
            <textarea
              className="w-full bg-dark2 p-2 rounded-md"
              rows={4}
              value={captions.join("\n")}
              onChange={(e) => setCaptions(e.target.value.split(/\n/))}
            />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Hashtags</h3>
            <input
              className="w-full bg-dark2 p-2 rounded-md"
              value={hashtags.join(" ")}
              onChange={(e) => setHashtags(e.target.value.split(/\s+/))}
            />
          </div>
          {times.length > 0 && (
            <BarChart width={280} height={150} data={times} className="mx-auto">
              <XAxis dataKey="time" fontSize={12} />
              <YAxis hide />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          )}
        </div>
      )}
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </motion.div>
  );
});

AIMarketingStep.displayName = "AIMarketingStep";
