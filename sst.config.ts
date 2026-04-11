// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "trimly",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Nextjs("Web", {
      path: ".",
      domain: {
        name: "trimly.lokeshwardewangan.in",
        dns: false,
        cert: "arn:aws:acm:us-east-1:910520206848:certificate/f0c23c3c-f2a7-48f1-b7f1-e3e36a1c6dda",
      },
    });
  },
});
