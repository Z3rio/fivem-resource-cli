import minimist from "minimist";

export interface File {
  name: string;
  content: string;
  comment?: string;
}

export type Action = {
  type: "command";
  list: Array<string | {
    js: string
    ts: string
  }>
} | {
  type: "file",
  list: File[]
}

export interface UIFramework {
  label: string;
  actions: Array<Action>
}

export interface FiveMTemplate {
  label: string;
  actions: Array<Action>
}

export type FileList = {
  [key: string]: FileList | string
}

export type CommandHandler = (args: minimist.ParsedArgs) => void
