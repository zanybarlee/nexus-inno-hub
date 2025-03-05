
export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface ResizeStart extends Size {
  x: number;
  y: number;
}

export interface ResizableIframeProps {
  url: string;
  initialWidth?: number;
  initialHeight?: number;
}
