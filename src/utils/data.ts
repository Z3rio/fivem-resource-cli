import { CommandHandler } from "./types.js";
import NewHandler from "../handlers/new.js";
import HelpHandler from "../handlers/help.js";
import TemplatesHandler from "../handlers/templates.js";

export const commentStart: Record<string, string> = {
  ts: "//",
  lua: "--"
};

export const viteCfgAdjustmentLines: string[] = [
  '  base: "",',
  "  build: {",
  '    outDir: "../html",',
  "  },"
];

export const verboseExecSettings = { stdio: [0, 1, 2] };

export const commandList: Record<string, CommandHandler> = {
  new: argv => NewHandler(argv),
  help: argv => HelpHandler(argv),
  templates: argv => TemplatesHandler(argv)
};
