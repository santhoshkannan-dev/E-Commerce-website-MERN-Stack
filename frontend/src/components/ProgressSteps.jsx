import { FaCheck } from "react-icons/fa";

const ProgressSteps = ({ step1, step2, step3 }) => {
  const steps = [
    { label: "Account", active: step1, completed: step1 },
    { label: "Shipping", active: step2, completed: step2 },
    { label: "Review & Pay", active: step3, completed: step3 },
  ];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-emerald-950/40 -translate-y-1/2 z-0" />
        
        {/* Active track line */}
        <div 
          className="absolute top-1/2 left-0 h-[2px] bg-emerald-500 -translate-y-1/2 transition-all duration-500 z-0"
          style={{
            width: step3 ? "100%" : step2 ? "50%" : "0%"
          }}
        />

        {steps.map((step, idx) => (
          <div key={step.label} className="relative z-10 flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs transition-all duration-300 shadow-md ${
                step.completed
                  ? "bg-emerald-600 text-white ring-4 ring-emerald-900/40 shadow-emerald-900/50"
                  : step.active
                  ? "bg-forest-900 text-emerald-400 border-2 border-emerald-500 ring-4 ring-emerald-950"
                  : "bg-forest-950/90 text-stone-500 border border-emerald-900/30"
              }`}
            >
              {step.completed ? <FaCheck className="text-xs" /> : idx + 1}
            </div>
            <span
              className={`mt-2.5 text-xs font-medium tracking-wide uppercase ${
                step.completed || step.active ? "text-emerald-300 font-semibold" : "text-stone-500"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
