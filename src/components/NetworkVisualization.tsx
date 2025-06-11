import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Controls,
  MiniMap,
  Background,
  Position,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Badge } from '@/components/ui/badge';

interface NetworkNode extends Node {
  data: {
    label: string;
    framework: string;
    controlId: string;
    type: 'control' | 'framework';
    connections: number;
  };
}

interface NetworkEdge extends Edge {
  data: {
    relationship: string;
    confidence: number;
  };
}

const mockNodes: NetworkNode[] = [
  {
    id: 'nist-ac-1',
    position: { x: 100, y: 100 },
    data: {
      label: 'Access Control Policy',
      framework: 'NIST 800-53',
      controlId: 'AC-1',
      type: 'control',
      connections: 3,
    },
    type: 'custom',
  },
  {
    id: 'pci-7-1-1',
    position: { x: 350, y: 50 },
    data: {
      label: 'Access Control Systems',
      framework: 'PCI-DSS',
      controlId: '7.1.1',
      type: 'control',
      connections: 2,
    },
    type: 'custom',
  },
  {
    id: 'hipaa-164-312-a-1',
    position: { x: 200, y: 250 },
    data: {
      label: 'Access Control',
      framework: 'HIPAA',
      controlId: '164.312(a)(1)',
      type: 'control',
      connections: 2,
    },
    type: 'custom',
  },
  {
    id: 'sox-cc6-1',
    position: { x: 450, y: 200 },
    data: {
      label: 'Logical Access',
      framework: 'SOX',
      controlId: 'CC6.1',
      type: 'control',
      connections: 1,
    },
    type: 'custom',
  },
  {
    id: 'adobe-ccf-001',
    position: { x: 300, y: 350 },
    data: {
      label: 'Identity & Access Management',
      framework: 'Adobe CCF',
      controlId: 'CCF-001',
      type: 'control',
      connections: 4,
    },
    type: 'custom',
  },
];

const mockEdges: NetworkEdge[] = [
  {
    id: 'e1',
    source: 'nist-ac-1',
    target: 'pci-7-1-1',
    type: 'smoothstep',
    animated: true,
    data: {
      relationship: 'Direct Mapping',
      confidence: 95,
    },
    style: { stroke: '#10b981', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
  },
  {
    id: 'e2',
    source: 'nist-ac-1',
    target: 'hipaa-164-312-a-1',
    type: 'smoothstep',
    data: {
      relationship: 'Partial Overlap',
      confidence: 78,
    },
    style: { stroke: '#f59e0b', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' },
  },
  {
    id: 'e3',
    source: 'hipaa-164-312-a-1',
    target: 'sox-cc6-1',
    type: 'smoothstep',
    data: {
      relationship: 'Indirect Support',
      confidence: 65,
    },
    style: { stroke: '#3b82f6', strokeWidth: 1 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' },
  },
  {
    id: 'e4',
    source: 'adobe-ccf-001',
    target: 'nist-ac-1',
    type: 'smoothstep',
    data: {
      relationship: 'Direct Mapping',
      confidence: 92,
    },
    style: { stroke: '#10b981', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
  },
  {
    id: 'e5',
    source: 'adobe-ccf-001',
    target: 'pci-7-1-1',
    type: 'smoothstep',
    data: {
      relationship: 'Partial Overlap',
      confidence: 71,
    },
    style: { stroke: '#f59e0b', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' },
  },
];

const CustomNode = ({ data, selected }: { data: any; selected?: boolean }) => {
  const getFrameworkColor = (framework: string) => {
    switch (framework) {
      case 'NIST 800-53': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PCI-DSS': return 'bg-green-100 text-green-800 border-green-200';
      case 'HIPAA': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'SOX': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Adobe CCF': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`min-w-48 p-3 border-2 rounded-lg bg-white shadow-md transition-all ${
      selected ? 'border-primary shadow-lg' : 'border-border'
    }`}>
      <div className="space-y-2">
        <Badge variant="outline" className={getFrameworkColor(data.framework)}>
          {data.controlId}
        </Badge>
        <h4 className="font-medium text-sm leading-tight">{data.label}</h4>
        <p className="text-xs text-muted-foreground">{data.framework}</p>
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">Connections:</span>
          <Badge variant="secondary" className="text-xs">
            {data.connections}
          </Badge>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

interface NetworkVisualizationProps {
  selectedFrameworks?: string[];
  selectedCategory?: string;
}

export function NetworkVisualization({ selectedFrameworks, selectedCategory }: NetworkVisualizationProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(mockNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(mockEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const filteredNodes = useMemo(() => {
    if (!selectedFrameworks?.length) return nodes;
    return nodes.filter(node => 
      selectedFrameworks.includes(node.data.framework)
    );
  }, [nodes, selectedFrameworks]);

  const filteredEdges = useMemo(() => {
    const nodeIds = new Set(filteredNodes.map(node => node.id));
    return edges.filter(edge => 
      nodeIds.has(edge.source) && nodeIds.has(edge.target)
    );
  }, [edges, filteredNodes]);

  return (
    <div className="h-96 w-full border border-border rounded-lg bg-background">
      <ReactFlow
        nodes={filteredNodes}
        edges={filteredEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap 
          nodeStrokeColor="#374151"
          nodeColor="#f3f4f6"
          nodeBorderRadius={8}
          maskColor="rgba(0, 0, 0, 0.1)"
          position="top-right"
        />
      </ReactFlow>
    </div>
  );
}
