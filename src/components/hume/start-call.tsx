import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useVoice } from "@humeai/voice-react";
import { Phone } from "lucide-react";

const variant = {
  scale: {
    initial: { scale: 0.5 },
    enter: { scale: 1 },
    exit: { scale: 0.5 },
  },
  opacity: {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

export function StartCall() {
  const { status, connect } = useVoice();

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className="fixed inset-0 p-4 flex items-center justify-center bg-background"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={variant.opacity}
        >
          <AnimatePresence>
            {status.value === "error" ? (
              <motion.div
                variants={variant.scale}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <div className="text-center">
                  <div className="text-lg font-semibold">Connection Error</div>
                  <div className="text-sm opacity-50">
                    Please try again later.
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                variants={variant.scale}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <Button
                  className="z-50 flex items-center gap-1.5"
                  onClick={() => connect().then().catch().finally()}
                >
                  <span>
                    <Phone
                      className="size-4 opacity-50"
                      stroke="currentColor"
                      strokeWidth={2}
                    />
                  </span>
                  <span>Start Call</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
