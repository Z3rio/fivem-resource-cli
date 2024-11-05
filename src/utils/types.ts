import minimist from "minimist";

export interface Addon {
  label: string;
  files: File[];
  name: string;
  checkedByDefault?: boolean;
}

export interface File {
  name: string;
  content: string;
  comment?: string;
  values?: ContentValue[];
}

export interface ContentValue {
  name: string;
  label: string;
}

export type Action =
  | {
      type: "command";
      list: Array<
        | string
        | {
            js: string;
            ts: string;
          }
      >;
      quiet?: boolean;
    }
  | {
      type: "file";
      list: File[];
    }
  | {
      type: "action";
      name: string;
    };

export interface UIFramework {
  label: string;
  actions: Array<Action>;
}

export interface FiveMTemplate {
  label: string;
  actions: Array<Action>;
}

export type FileList = {
  [key: string]: FileList | File;
};

export type CommandHandler = (args: minimist.ParsedArgs) => void;

export type QuickAction = (data: {
  projName: string;
  uiLanguage: "ts" | "js" | undefined;
  projPath: string;
}) => boolean;
