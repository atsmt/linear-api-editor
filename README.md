# Linear API Editor

A Node.js application that uses the Linear SDK to manage and update workflow states in Linear projects. This tool helps standardize workflow state colors, types, and positions according to predefined configurations.

## Features

- Fetches all workflow states from Linear
- Updates workflow state properties including:
  - Colors
  - Types (backlog, triage, unstarted, started, completed, canceled)
  - Positions
- Supports multiple predefined status types with consistent styling

## Prerequisites

- Node.js (v14 or higher)
- Linear API key
- Access to a Linear workspace

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd linear_API_editor
```

2. Install dependencies:
```bash
npm install
```

3. Set up your Linear API key as an environment variable:
```bash
# Windows (PowerShell)
$env:LINEAR_API_KEY = "your-linear-api-key-here"

# Windows (Command Prompt)
set LINEAR_API_KEY=your-linear-api-key-here

# Linux/macOS
export LINEAR_API_KEY=your-linear-api-key-here
```

Alternatively, create a `.env` file in the project root:
```
LINEAR_API_KEY=your-linear-api-key-here
```

## Usage

Run the application:
```bash
node index.js
```

The application will:
1. Fetch all workflow states from your Linear workspace
2. Update each state with predefined colors and types
3. Skip the "Triage" state (as it cannot be updated)
4. Position states according to the predefined order

## Workflow State Configuration

The application includes predefined configurations for the following states:

| State | Color | Type | Description |
|-------|-------|------|-------------|
| Backlog | #cccccc | backlog | Items in backlog |
| Incoming | #cccccc | backlog | New incoming items |
| Triage | #ffcc00 | triage | Items being triaged (not updated) |
| Discussion | #ffcc00 | backlog | Items under discussion |
| Proposed | #87ceeb | unstarted | Proposed items |
| Approved | #6a5acd | unstarted | Approved items |
| Preparation | #4682b4 | unstarted | Items in preparation |
| Todo | #1e90ff | unstarted | Todo items |
| Prepared | #1e90ff | unstarted | Prepared items |
| In Progress | #f2dc11 | started | Items in progress |
| In Review | #8a2be2 | started | Items under review |
| Review | #8a2be2 | started | Items in review |
| Beta Release | #20b2aa | started | Items in beta |
| Testing | #ffa500 | started | Items being tested |
| Deployment | #20b2aa | started | Items being deployed |
| Done | #32cd32 | completed | Completed items |
| Postponed | #d2691e | canceled | Postponed items |
| Canceled | #ff4d4f | canceled | Canceled items |
| Duplicate | #ff4d4f | canceled | Duplicate items |
| Discarded | #a52a2a | canceled | Discarded items |

## Getting Your Linear API Key

1. Go to [Linear Settings](https://linear.app/settings/api)
2. Click "Create API key"
3. Give it a descriptive name
4. Copy the generated key
5. Set it as the `LINEAR_API_KEY` environment variable

## Dependencies

- `@linear/sdk`: Official Linear SDK for JavaScript/TypeScript
- `axios`: HTTP client for making requests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

ISC

## Security

⚠️ **Important**: Never commit your Linear API key to version control. Always use environment variables or a `.env` file (which is gitignored) to store sensitive credentials.
