"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, Maximize, Loader2 } from "lucide-react";
import { clsx } from "clsx";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  securityLevel: "loose",
  themeVariables: {
    primaryColor: "#000000",
    primaryTextColor: "#ffffff",
    primaryBorderColor: "#00ffff", // Electric blue
    lineColor: "#00ffff",
    secondaryColor: "#111111",
    tertiaryColor: "#222222",
    fontFamily: "var(--font-outfit), sans-serif",
    fontSize: "14px",
    background: "#000000",
  },
  er: {
    layoutDirection: "TB",
    minEntityWidth: 100,
    minEntityHeight: 75,
    entityPadding: 15,
    stroke: "cyan",
    fill: "black",
    fontSize: 14,
  },
});

type DiagramViewerProps = {
  chart: string;
  title?: string;
  className?: string;
};

export default function DiagramViewer({ chart, title, className }: DiagramViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const renderChart = async () => {
      setLoading(true);
      setError(null);
      try {
        // Need a unique ID for mermaid to render into
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        
        if (isMounted) {
          // Add custom CSS to the SVG for the gold accents on PKs
          const customizedSvg = svg.replace(
            /<style>/,
            `<style>
              .er.entityBox { stroke: #00ffff !important; fill: #050505 !important; }
              .er.attributeBoxOdd { fill: #111 !important; stroke: #00ffff !important; }
              .er.attributeBoxEven { fill: #0a0a0a !important; stroke: #00ffff !important; }
              .er.relationshipLine { stroke: #00ffff !important; stroke-width: 2px !important; }
              /* Highlight PKs in gold */
              text.er.entityLabel { fill: #fff !important; font-weight: bold !important; }
              /* We rely on standard text styling but SVG manipulation might be tricky, we let Mermaid do its best */
            `
          );
          setSvgContent(customizedSvg);
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error("Mermaid rendering failed:", err);
          setError(err.message || "Failed to render diagram");
          setLoading(false);
        }
      }
    };

    if (chart) {
      renderChart();
    }

    return () => {
      isMounted = false;
    };
  }, [chart]);

  return (
    <div className={clsx("flex flex-col border border-white/10 rounded-2xl overflow-hidden glass-panel my-8", className)}>
      {title && (
        <div className="bg-zinc-900/80 px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <h4 className="text-white font-medium font-outfit">{title}</h4>
          <div className="flex gap-1 text-xs font-mono text-zinc-500">
            <span className="text-primary">Mermaid.js</span> Engine
          </div>
        </div>
      )}
      
      <div className="relative bg-[#050505] min-h-[300px] w-full flex items-center justify-center">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 z-10 bg-black/50 backdrop-blur-sm">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
            <span>Rendering Diagram...</span>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 z-10 bg-black/80 p-6 text-center">
            <span className="font-bold mb-2">Syntax Error in Diagram</span>
            <pre className="text-xs text-red-400 bg-red-500/10 p-2 rounded">{error}</pre>
          </div>
        )}

        {!loading && !error && svgContent && (
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={4}
            centerOnInit={true}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className="absolute bottom-4 right-4 z-20 flex gap-2 glass-panel p-1 rounded-lg border border-white/10">
                  <button 
                    onClick={() => zoomIn()} 
                    className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => zoomOut()} 
                    className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => resetTransform()} 
                    className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                    title="Reset"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
                
                <TransformComponent wrapperClass="w-full h-full min-h-[300px]" contentClass="w-full h-full flex items-center justify-center">
                  <div 
                    className="mermaid-wrapper p-8"
                    dangerouslySetInnerHTML={{ __html: svgContent }} 
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        )}
      </div>
    </div>
  );
}
