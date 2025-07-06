const { LinearClient } = require('@linear/sdk');

const client = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY,
});

async function fetchAllIssues() {
  try {
    let states = [];
    let nextPage1 = true;
    let after1 = undefined;
    while (nextPage1) {
        console.log('Fetching workflow states...');
      const issuesConnection = await client.workflowStates({ first: 250, after1 });
      states = states.concat(issuesConnection.nodes);

      nextPage1 = issuesConnection.pageInfo.hasNextPage;
      after1 = issuesConnection.pageInfo.endCursor;
    }

    const STATUS_TYPES = {
        Backlog:        { color: '#cccccc', type: 'backlog' },
        Incoming:       { color: '#cccccc', type: 'backlog' },
        Triage:         { color: '#ffcc00', type: 'triage' },
        Discussion:     { color: '#ffcc00', type: 'backlog' },
        Proposed:       { color: '#87ceeb', type: 'unstarted' },
        Approved:       { color: '#6a5acd', type: 'unstarted' },
        Preparation:    { color: '#4682b4', type: 'unstarted' },
        Todo:           { color: '#1e90ff', type: 'unstarted' },
        Prepared:       { color: '#1e90ff', type: 'unstarted' },
        'In Progress':  { color: '#f2dc11', type: 'started' },
        'In Review':    { color: '#8a2be2', type: 'started' },
        Review:         { color: '#8a2be2', type: 'started' },
        'Beta Release': { color: '#20b2aa', type: 'started' },
        Testing:        { color: '#ffa500', type: 'started' },
        Deployment:     { color: '#20b2aa', type: 'started' },
        Done:           { color: '#32cd32', type: 'completed' },
        Postponed:      { color: '#d2691e', type: 'canceled' },
        Canceled:       { color: '#ff4d4f', type: 'canceled' },
        Duplicate:      { color: '#ff4d4f', type: 'canceled' },
        Discarded:      { color: '#a52a2a', type: 'canceled' },
    };

    for (const status of states) {
        const color = STATUS_TYPES[status.name].color;
        const type = STATUS_TYPES[status.name].type;
        // Skip Triage state (cannot be updated)
        if (status.name === "Triage") continue;
        if (color && !status._inheritedFrom) {
            const pos = Object.keys(STATUS_TYPES).indexOf(status.name) + 1;
            await client.updateWorkflowState(
                status.id, 
                { 
                    color,
                    type,
                    position: pos,
                }
            );
        }
    }

    /*let allIssues2 = [];
    let nextPage2 = true;
    let after2 = undefined;

    while (nextPage2) {
        console.log('Fetching issues...');
      const issuesConnection = await client.issues({ first: 250, after2 });
      allIssues2 = allIssues2.concat(issuesConnection.nodes);

      nextPage2 = issuesConnection.pageInfo.hasNextPage;
      after2 = issuesConnection.pageInfo.endCursor;
    }

    const issues = [];
    for (const issue of allIssues) {
      issues.push({
        id: issue.id,
        title: issue.title,
        status: issue.stateId,
        assignee: issue.assignee?.name || 'Unassigned',
      });
    }

    console.log(`Fetched ${issues.length} issues:`);
    console.table(issues);*/
  } catch (error) {
    console.error('Error fetching issues from Linear:', error);
  }
}

fetchAllIssues();
