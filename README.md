# Cline MCP Servers

A collection of Model Context Protocol (MCP) servers that extend Cline's capabilities. These servers provide additional tools and resources that Cline can use to accomplish various tasks.

## Installation

1. Clone this repository under your Cline directory:
```bash
cd ~/Documents/Cline
git clone [repository-url] MCP
```

2. Configure Cline to use the servers you want by asking:
```
"Help me set up the [server-name] server"
```
Cline will help you configure the MCP settings file with the appropriate server configuration.

## Using with Cline

Simply ask Cline to:

1. Add a new tool/capability:
   ```
   "Add a tool that can [description of what you want]"
   ```
   Cline will create a new MCP server with the requested functionality.

2. Update an existing server:
   ```
   "Update the [server-name] server to [description of changes]"
   ```
   Cline will modify the server code and configuration as needed.

3. Configure a server:
   ```
   "Help me set up the [server-name] server"
   ```
   Cline will walk you through getting any necessary credentials or API keys.

## Available Servers

- **perplexity-server**: Real-time information search with citations using Perplexity AI

## License

MIT
