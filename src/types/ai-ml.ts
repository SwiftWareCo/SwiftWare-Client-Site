// AI/ML specific type definitions

export interface AIMLCapabilities {
  // Advanced RAG capabilities
  rag: {
    retrievalMethods: string[];
    embeddingModels: string[];
    contextWindow: number;
  };
  // Hybrid search configuration
  search: {
    vectorDimensions: number;
    keywordWeight: number;
    semanticWeight: number;
  };
  // Document processing pipeline
  processing: {
    supportedFormats: string[];
    chunkingStrategy: string;
    metadataExtraction: string[];
  };
}

export interface AIProcessingStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress?: number;
}

export interface AISearchResult {
  id: string;
  title: string;
  snippet: string;
  relevanceScore: number;
  source: string;
  metadata?: Record<string, any>;
}

export interface DocumentProcessingStatus {
  filename: string;
  status:
    | 'uploading'
    | 'processing'
    | 'chunking'
    | 'embedding'
    | 'completed'
    | 'error';
  progress: number;
  chunks?: number;
  error?: string;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  category: 'trend' | 'anomaly' | 'prediction' | 'correlation';
  impact: 'low' | 'medium' | 'high';
  data?: any;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  sources?: AISearchResult[];
}
