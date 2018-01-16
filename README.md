

Important decisions chosen:
  - Editor: VS Code with editorconfig extension
  - Package Management: npm
  - Security checks: Node security platform (npm run security-check)
  - Dev server: Express
  - Quick Show Off: localtunnel (lt --port # --subdomain [string] after -g install)
  - Automation: npm scripts + npm-run-all for parallelization 

Available scripts:
  npm start: starts dev server, running security checks
  npm share: starts dev server with remote access via localtunnel
