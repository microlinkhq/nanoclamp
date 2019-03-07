import * as React from "react";

export type NanoClampProps = {
  accessibility?: boolean;
  className?: string;
  debounce?: number;
  ellipsis?: string;
  is?: string;
  lines?: number;
  text: string;
};

declare const NanoClamp: React.ComponentClass<NanoClampProps>;

export default NanoClamp;
