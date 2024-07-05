import { getInput, notice, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";

try {
    const token = getInput("token", { required: true });
    const { owner, repo } = context.repo;
    const octokit = getOctokit(token);
    let prNumber = context.payload.pull_request?.number;
    if (!prNumber) {
        throw new Error(`No open pull request found for ${context.eventName}, ${context.sha}`);
    }
    // Retrieve PR body based on PR number, author, repository
    const { data } = await octokit.rest.pulls.get({
        owner,
        repo,
        pull_number: prNumber,
    });
    const body = data.body;
    // Use regex to match and replace
    const commentPattern = /<!--[\s\S]*?-->[\r\n]?/g;
    const isMatchFound = commentPattern.test(body);
    let newBody;
    if (isMatchFound) {
        newBody = body.replace(commentPattern, '');
        // one way to console log
        notice("Successfully removed");
    } else {
        newBody = body;
        notice("No need to replace");
    }
    // Update PR body
    await octokit.rest.pulls.update({
        owner,
        repo,
        body: newBody,
        pull_number: prNumber,
    });
} catch (error) {
    setFailed(error.message);
}