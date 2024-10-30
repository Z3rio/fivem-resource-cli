export interface File {
  name: string;
  content: string;
}

export interface UIFramework {
  label: string;
  command?: string;
  files?: File[]
}

export interface FiveMTemplate {
  label: string;
  files: File[]
}
