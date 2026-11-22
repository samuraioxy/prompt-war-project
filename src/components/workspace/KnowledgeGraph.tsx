import React, { useState, useRef, useMemo } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  List, 
  GitGraph, 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  X,
  Zap,
  ArrowRight
} from 'lucide-react';
import { KnowledgeNode, KnowledgeEdge } from '../../types/echo';

interface KnowledgeGraphProps {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
  onSelectNodeRef?: (refId: string) => void;
  onChallengeNodeRef?: (refId: string) => void;
}

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({
  nodes,
  edges,
  onSelectNodeRef,
  onChallengeNodeRef
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'GRAPH' | 'LIST'>('GRAPH');
  const [filterType, setFilterType] = useState<string>('ALL');

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Filtered nodes based on category toggle
  const visibleNodes = useMemo(() => {
    if (filterType === 'ALL') return nodes;
    return nodes.filter((n) => n.type === filterType || n.type === 'CLAIM' || n.type === 'ASSESSMENT');
  }, [nodes, filterType]);

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map((n) => n.id)), [visibleNodes]);

  const visibleEdges = useMemo(() => {
    return edges.filter((e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target));
  }, [edges, visibleNodeIds]);

  // Connected nodes map for highlighting
  const connectedNodeIds = useMemo(() => {
    const targetId = hoveredNodeId || selectedNodeId;
    if (!targetId) return new Set<string>();
    const set = new Set<string>([targetId]);
    edges.forEach((edge) => {
      if (edge.source === targetId) set.add(edge.target);
      if (edge.target === targetId) set.add(edge.source);
    });
    return set;
  }, [hoveredNodeId, selectedNodeId, edges]);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  // Visual styling mapper for node types
  const getNodeStyle = (node: KnowledgeNode) => {
    const isSelected = node.id === selectedNodeId;
    const isConnected = connectedNodeIds.has(node.id);
    const isChallenged = node.status === 'CHALLENGED';

    if (isChallenged) {
      return {
        fill: '#451A03',
        stroke: '#F59E0B',
        textColor: '#FDE68A',
        glow: 'rgba(245, 158, 11, 0.4)',
        radius: 28
      };
    }

    switch (node.type) {
      case 'CLAIM':
        return {
          fill: '#083344',
          stroke: '#00F2FE',
          textColor: '#ECFEFF',
          glow: 'rgba(0, 242, 254, 0.5)',
          radius: 36
        };
      case 'FACT':
        return {
          fill: '#064E3B',
          stroke: '#10B981',
          textColor: '#D1FAE5',
          glow: 'rgba(16, 185, 129, 0.3)',
          radius: 26
        };
      case 'ASSUMPTION':
        return {
          fill: '#451A03',
          stroke: '#F59E0B',
          textColor: '#FEF3C7',
          glow: 'rgba(245, 158, 11, 0.3)',
          radius: 28
        };
      case 'SUPPORT_EVIDENCE':
        return {
          fill: '#064E3B',
          stroke: '#34D399',
          textColor: '#A7F3D0',
          glow: 'rgba(52, 211, 153, 0.3)',
          radius: 24
        };
      case 'CHALLENGE_EVIDENCE':
        return {
          fill: '#4C0519',
          stroke: '#F43F5E',
          textColor: '#FFE4E6',
          glow: 'rgba(244, 63, 94, 0.3)',
          radius: 26
        };
      case 'PERSPECTIVE':
        return {
          fill: '#3B0764',
          stroke: '#A855F7',
          textColor: '#F3E8FF',
          glow: 'rgba(168, 85, 247, 0.3)',
          radius: 24
        };
      case 'ASSESSMENT':
        return {
          fill: '#1E1B4B',
          stroke: '#38BDF8',
          textColor: '#E0F2FE',
          glow: 'rgba(56, 189, 248, 0.5)',
          radius: 34
        };
      default:
        return {
          fill: '#1E293B',
          stroke: '#94A3B8',
          textColor: '#F1F5F9',
          glow: 'rgba(148, 163, 184, 0.2)',
          radius: 22
        };
    }
  };

  const nodeMap = useMemo(() => {
    const map = new Map<string, KnowledgeNode>();
    nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [nodes]);

  const handleResetZoom = () => setZoomLevel(1);
  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.2, 1.8));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.2, 0.6));

  return (
    <div className="space-y-4">
      {/* Top Controls & View Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl bg-echo-900/80 border border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-800/40 text-cyan-400">
            <GitGraph className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Claim Relationship Map
            </h3>
            <span className="text-[11px] text-slate-400">
              Interactive topological knowledge topology
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 text-xs font-mono overflow-x-auto">
          <span className="text-slate-500 mr-1 text-[11px]">Layer:</span>
          {['ALL', 'FACT', 'ASSUMPTION', 'SUPPORT_EVIDENCE', 'CHALLENGE_EVIDENCE', 'PERSPECTIVE'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                filterType === cat
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'
                  : 'bg-echo-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'ALL' ? 'All Nodes' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* View mode toggle & zoom */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setViewMode(viewMode === 'GRAPH' ? 'LIST' : 'GRAPH')}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono bg-echo-950 border border-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            {viewMode === 'GRAPH' ? <List className="w-3.5 h-3.5" /> : <GitGraph className="w-3.5 h-3.5" />}
            <span>{viewMode === 'GRAPH' ? 'Accessible List' : 'SVG Graph'}</span>
          </button>

          {viewMode === 'GRAPH' && (
            <div className="flex items-center gap-1 bg-echo-950 p-0.5 rounded border border-slate-800">
              <button
                onClick={handleZoomOut}
                className="p-1 text-slate-400 hover:text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-slate-400 px-1">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1 text-slate-400 hover:text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1 text-slate-400 hover:text-white transition-colors ml-0.5"
                title="Reset View"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {viewMode === 'GRAPH' ? (
        <div className="relative rounded-2xl bg-echo-950 border border-slate-800 overflow-hidden shadow-2xl">
          {/* Legend Banner */}
          <div className="absolute top-3 left-3 z-10 p-2.5 rounded-xl bg-echo-900/90 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1.5 max-w-xs shadow-lg">
            <span className="text-slate-400 uppercase tracking-widest block font-bold text-[9px] mb-1">
              Topological Legend
            </span>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00F2FE]"></span>
                <span className="text-slate-300">Central Claim</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]"></span>
                <span className="text-slate-300">Empirical Fact</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_#F59E0B]"></span>
                <span className="text-slate-300">Assumption</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_6px_#F43F5E]"></span>
                <span className="text-slate-300">Challenging Evidence</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_6px_#8B5CF6]"></span>
                <span className="text-slate-300">Perspective Lens</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38BDF8]"></span>
                <span className="text-slate-300">Synthesis Verdict</span>
              </div>
            </div>
            <div className="pt-1 border-t border-slate-800 text-slate-500 text-[9px]">
              Click any node to inspect details or trigger a challenge
            </div>
          </div>

          {/* Interactive SVG Canvas */}
          <div className="w-full h-[620px] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing">
            <svg
              ref={svgRef}
              viewBox="0 0 1000 680"
              className="w-full h-full select-none"
              style={{
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.25s ease-out'
              }}
            >
              <defs>
                <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Arrow markers */}
                <marker
                  id="arrow-supports"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
                </marker>
                <marker
                  id="arrow-challenges"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#F43F5E" />
                </marker>
                <marker
                  id="arrow-assumes"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#F59E0B" />
                </marker>
                <marker
                  id="arrow-default"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748B" />
                </marker>
              </defs>

              {/* Background Grid Accent Lines */}
              <g opacity="0.15">
                {Array.from({ length: 20 }).map((_, i) => (
                  <line
                    key={`grid-x-${i}`}
                    x1={i * 50}
                    y1="0"
                    x2={i * 50}
                    y2="680"
                    stroke="#334155"
                    strokeWidth="0.5"
                  />
                ))}
                {Array.from({ length: 14 }).map((_, i) => (
                  <line
                    key={`grid-y-${i}`}
                    x1="0"
                    y1={i * 50}
                    x2="1000"
                    y2={i * 50}
                    stroke="#334155"
                    strokeWidth="0.5"
                  />
                ))}
              </g>

              {/* Render Edges */}
              <g className="edges">
                {visibleEdges.map((edge) => {
                  const sourceNode = nodeMap.get(edge.source);
                  const targetNode = nodeMap.get(edge.target);
                  if (!sourceNode || !targetNode) return null;

                  const isConnected =
                    connectedNodeIds.has(edge.source) && connectedNodeIds.has(edge.target);
                  const isHighlighted =
                    selectedNodeId === edge.source || selectedNodeId === edge.target;

                  let strokeColor = '#334155';
                  let markerEnd = 'url(#arrow-default)';

                  if (edge.type === 'SUPPORTS') {
                    strokeColor = '#10B981';
                    markerEnd = 'url(#arrow-supports)';
                  } else if (edge.type === 'CHALLENGES' || edge.type === 'WEAKENS') {
                    strokeColor = '#F43F5E';
                    markerEnd = 'url(#arrow-challenges)';
                  } else if (edge.type === 'ASSUMES') {
                    strokeColor = '#F59E0B';
                    markerEnd = 'url(#arrow-assumes)';
                  }

                  // Midpoint for relationship label
                  const midX = (sourceNode.x + targetNode.x) / 2;
                  const midY = (sourceNode.y + targetNode.y) / 2;

                  return (
                    <g key={edge.id} className="transition-all duration-300">
                      <line
                        x1={sourceNode.x}
                        y1={sourceNode.y}
                        x2={targetNode.x}
                        y2={targetNode.y}
                        stroke={strokeColor}
                        strokeWidth={isHighlighted ? 2.5 : isConnected ? 2 : 1.2}
                        strokeOpacity={
                          selectedNodeId || hoveredNodeId
                            ? isConnected
                              ? 0.9
                              : 0.15
                            : 0.5
                        }
                        strokeDasharray={edge.isDashed ? '4 3' : undefined}
                        markerEnd={markerEnd}
                      />
                      {/* Edge Label Pill */}
                      {(isHighlighted || !selectedNodeId) && (
                        <g transform={`translate(${midX}, ${midY})`}>
                          <rect
                            x="-45"
                            y="-9"
                            width="90"
                            height="18"
                            rx="4"
                            fill="#0B0F19"
                            stroke={strokeColor}
                            strokeWidth="0.8"
                            opacity={isConnected || !selectedNodeId ? 0.85 : 0.2}
                          />
                          <text
                            textAnchor="middle"
                            y="3"
                            fill="#94A3B8"
                            fontSize="8"
                            fontFamily="monospace"
                            opacity={isConnected || !selectedNodeId ? 1 : 0.2}
                          >
                            {edge.label.length > 16 ? `${edge.label.slice(0, 14)}..` : edge.label}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>

              {/* Render Nodes */}
              <g className="nodes">
                {visibleNodes.map((node) => {
                  const style = getNodeStyle(node);
                  const isSelected = selectedNodeId === node.id;
                  const isHovered = hoveredNodeId === node.id;
                  const isConnected = connectedNodeIds.has(node.id);
                  const isDimmed = (selectedNodeId || hoveredNodeId) && !isConnected;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => setSelectedNodeId(isSelected ? null : node.id)}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      opacity={isDimmed ? 0.25 : 1}
                    >
                      {/* Ambient Glow Ring */}
                      {(isSelected || isHovered || node.type === 'CLAIM') && (
                        <circle
                          cx="0"
                          cy="0"
                          r={style.radius + 8}
                          fill="none"
                          stroke={style.stroke}
                          strokeWidth="1.5"
                          strokeOpacity="0.4"
                          strokeDasharray="4 3"
                          className="animate-spin"
                          style={{ animationDuration: '16s' }}
                        />
                      )}

                      {/* Main Node Body */}
                      <circle
                        cx="0"
                        cy="0"
                        r={style.radius}
                        fill={style.fill}
                        stroke={style.stroke}
                        strokeWidth={isSelected ? 3 : 2}
                        style={{
                          filter: isSelected || isHovered ? `drop-shadow(0 0 10px ${style.glow})` : undefined
                        }}
                      />

                      {/* Inner Target Center */}
                      <circle
                        cx="0"
                        cy="0"
                        r={style.radius * 0.3}
                        fill={style.stroke}
                        opacity="0.8"
                      />

                      {/* Node Label Below */}
                      <g transform={`translate(0, ${style.radius + 14})`}>
                        <rect
                          x="-65"
                          y="-10"
                          width="130"
                          height="20"
                          rx="4"
                          fill="#06080F"
                          stroke={style.stroke}
                          strokeWidth="0.8"
                          strokeOpacity={isSelected ? 1 : 0.4}
                        />
                        <text
                          textAnchor="middle"
                          y="4"
                          fill={style.textColor}
                          fontSize="9"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          fontFamily="sans-serif"
                        >
                          {node.label.length > 22 ? `${node.label.slice(0, 20)}...` : node.label}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Node Inspector Drawer Overlay (Bottom or Side) */}
          {selectedNode && (
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-echo-900/95 backdrop-blur-xl border border-cyan-500/50 rounded-2xl p-5 shadow-2xl z-30 transition-all duration-300">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                    {selectedNode.type} NODE
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1.5 leading-snug">
                    {selectedNode.label}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedNodeId(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-3 text-xs">
                <div className="text-slate-300 font-mono text-[11px] flex items-center justify-between">
                  <span>Connected Relational Edges:</span>
                  <span className="text-cyan-400 font-bold">{connectedNodeIds.size - 1} links</span>
                </div>

                {selectedNode.refId && onChallengeNodeRef && (
                  <button
                    onClick={() => {
                      onChallengeNodeRef(selectedNode.refId!);
                      setSelectedNodeId(null);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono font-semibold text-echo-950 bg-gradient-to-r from-amber-400 to-amber-350 hover:from-amber-350 hover:to-amber-300 transition-all shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Challenge This Node in Studio</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Accessible List-Based View */
        <div className="rounded-2xl bg-echo-950 border border-slate-800 p-6 space-y-4">
          <h4 className="text-sm font-mono uppercase tracking-wider text-slate-300 font-bold">
            Accessible Linear Representation of Knowledge Nodes
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {visibleNodes.map((n) => (
              <div
                key={n.id}
                className="p-4 rounded-xl bg-echo-900 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {n.type}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">ID: {n.id}</span>
                </div>
                <h5 className="font-semibold text-white text-sm">{n.label}</h5>
                <div className="text-xs text-slate-400 font-mono">
                  Coordinates: X={n.x}, Y={n.y} | Status: {n.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
