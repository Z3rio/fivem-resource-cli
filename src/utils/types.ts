import minimist from "minimist";

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

export type CommandHandler = (args: minimist.ParsedArgs) => void
