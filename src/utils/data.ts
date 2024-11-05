export const commentStart: Record<string, string> = {
  ts: "//",
  lua: "--"
}

export const viteCfgAdjustmentLines: string[] = [
  '  base: "",',
  '  build: {',
  '    outDir: "../html",',
  '  },'
]

export const verboseExecSettings = { stdio: [0, 1, 2] }
