import minimist from "minimist";

export interface File {
  name: string;
  content: string;
  comment?: string;
}

export interface UIFramework {
  label: string;
  command?: string;
  files?: File[]
}

export interface FiveMTemplate {
  label: string;
  command?: string;
  files?: File[]
}

export type FileList = {
  [key: string]: FileList | string
}

export type CommandHandler = (args: minimist.ParsedArgs) => void
