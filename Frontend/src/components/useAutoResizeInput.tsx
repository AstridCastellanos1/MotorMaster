import { useState, useRef, useEffect } from 'react';

const useAutoResizeInput = (value: string) => {
  const [inputWidth, setInputWidth] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth);
    }
  }, [value]);

  return { inputWidth, spanRef };
};

export default useAutoResizeInput;