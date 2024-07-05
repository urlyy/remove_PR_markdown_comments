# Introduction
This action supports pull_request event, after obtaining the PR body with Markdown comments removed, 
automatically updates the original PR body via the GitHub bot.

## Inputs
- `token`
The GitHub token to use

## Outputs

### `PR body`
The PR body whose comments are removed

# Example usage
```yaml
on:
    pull_request:
jobs:
    remove_pr_markdown_comments:
        runs-on: ubuntu-latest
        steps:
            - name: Checkout
              uses: actions/checkout@v4
            - name: Remove PR Markdown Comments
              uses: ./
              with:
                  token: ${{ secrets.GITHUB_TOKEN }}
```

# Notice
As this action uses `secrets.GITHUB_TOKEN`, we need to turn the switch on
![](assets/image.png)

# A simple javascript test
```javascript
const text = `<!--
**Thanks for contributing to Fury.**

**If this is your first time opening a PR on fury, you can refer to [CONTRIBUTING.md](https://github.com/apache/fury/blob/main/CONTRIBUTING.md).**

Contribution Checklist

    - The **Apache Fury (incubating)** community has restrictions on the naming of pr titles. You can also find instructions in [CONTRIBUTING.md](https://github.com/apache/fury/blob/main/CONTRIBUTING.md).

    - Fury has a strong focus on performance. If the PR you submit will have an impact on performance, please benchmark it first and provide the benchmark result here.
-->

## What does this PR do?
1
<!-- Describe the purpose of this PR. -->
2
3
## Related issues
1
<!--
Is there any related issue? Please attach here.

- #xxxx0
- #xxxx1
- #xxxx2
-->
2
3
## Does this PR introduce any user-facing change?
1
<!--
If any user-facing interface changes, please [open an issue](https://github.com/apache/fury/issues/new/choose) describing the need to do so and update the document if necessary.
-->
2
- [ ] Does this PR introduce any public API change?
- [ ] Does this PR introduce any binary protocol compatibility change?
3
4
## Benchmark

<!--
When the PR has an impact on performance (if you don't know whether the PR will have an impact on performance, you can submit the PR first, and if it will have impact on performance, the code reviewer will explain it), be sure to attach a benchmark data here.
-->
1`

function removeMarkdownComments(markdownText = "") {
    // regex for comments in Markdown (<!-- comment -->）
    const commentPattern = /<!--[\s\S]*?-->[\r\n]*/g;
    // use regex.replace method remove all matched comments
    const cleanedText = markdownText.replace(commentPattern, '');
    return cleanedText;
}

const res = removeMarkdownComments(text);
console.log(res);
```