---
agent: 'agent'
description: 'Help new team members onboard to the vscode-json-languageservice repository with a structured plan tailored to their experience level.'
---
# Create My Onboarding Plan for vscode-json-languageservice

I'm a new team member joining the vscode-json-languageservice project and I need help creating a structured onboarding plan.

My background: ${input:background:Briefly describe your experience level - e.g., "new to TypeScript", "experienced with language servers", "familiar with VS Code extensions", etc.}

Please create a personalized phased onboarding plan that includes the following phases.

## Phase 1 - Foundation (Days 1-3)

### Environment Setup
- Clone the repository: `git clone https://github.com/microsoft/vscode-json-languageservice`
- Install Node.js (version 22.x or compatible)
- Run `npm install` to install dependencies
- Run `npm test` to verify the setup works
- Configure VS Code with the workspace settings in `.vscode/`

### Understanding the Project
- Read the README.md to understand the project's purpose and API
- Review the main entry point: `src/jsonLanguageService.ts`
- Understand the Language Service interface and its methods
- Learn about the relationship between this library and VS Code's JSON extension
- Read through CHANGELOG.md to see recent changes and development patterns

### Key Documentation
- Language Server Protocol: https://microsoft.github.io/language-server-protocol/
- JSON Schema specification: https://json-schema.org/
- VS Code Language Extensions guide
- TypeScript documentation for advanced types

## Phase 2 - Exploration (Days 4-7)

### Codebase Discovery
- **Main Components:**
  - `src/jsonLanguageService.ts` - Main API surface
  - `src/jsonLanguageTypes.ts` - Type definitions
  - `src/parser/jsonParser.ts` - JSON parsing and AST
  - `src/services/` - Individual feature implementations (completion, validation, hover, etc.)
  - `src/utils/` - Utility functions

- **Run and Debug:**
  - Set breakpoints in service files (e.g., `jsonCompletion.ts`)
  - Run tests in debug mode from VS Code's Run viewlet
  - Step through code to understand how features work
  - Try the sample: `npm run sample`

- **Run Existing Tests:**
  ```bash
  npm run compile    # Compile TypeScript
  npm test          # Run all tests
  npm run lint      # Check code style
  ```

### Finding Beginner-Friendly Tasks
Based on your background (${input:background}), here are suitable starting points:

- **For TypeScript beginners:**
  - Review test files to understand patterns
  - Add test cases for edge cases in existing features
  - Improve inline documentation (JSDoc comments)

- **For experienced developers new to language services:**
  - Study one service implementation (e.g., `jsonHover.ts`)
  - Add test coverage for under-tested scenarios
  - Fix minor bugs in GitHub issues labeled "good first issue"

- **For VS Code/Language Server experts:**
  - Implement new LSP features
  - Improve performance of existing features
  - Add support for new JSON Schema features

### Explore Open Issues
- Look for issues labeled `help wanted`, `good first issue`, or `bug`
- Read through recent pull requests to understand contribution patterns
- Check SECURITY.md for security considerations

## Phase 3 - Integration (Days 8-14)

### Making Your First Contribution

1. **Choose a Task:**
   - Start with documentation improvements or test additions
   - Then move to bug fixes or small feature additions
   - Discuss larger changes in issues before implementing

2. **Development Workflow:**
   ```bash
   # Create a branch
   git checkout -b fix/your-feature-name
   
   # Make changes
   npm run compile
   npm test
   npm run lint
   
   # Commit with descriptive messages
   git commit -m "Fix: description of what you fixed"
   ```

3. **Pull Request Process:**
   - Ensure all tests pass and linting is clean
   - Write clear PR descriptions explaining the change
   - Reference related issues with "Fixes #123"
   - Respond to review feedback promptly
   - Follow the project's squash-merge strategy

### Learning Team Processes

- **Code Review Standards:**
  - All code must pass TypeScript compilation
  - Tests are required for bug fixes and new features
  - Maintain backward compatibility
  - Follow existing code style and patterns

- **Testing Standards:**
  - Use Mocha's TDD interface (`suite`, `test`)
  - Write descriptive test names
  - Test both success and error cases
  - Aim for clear, maintainable test code

- **Communication:**
  - Ask questions in GitHub issues or pull requests
  - Be respectful and constructive in reviews
  - Share knowledge and help other contributors

### Building Confidence

- **Hands-On Practice:**
  - Implement a small feature end-to-end
  - Debug a failing test and fix the issue
  - Review someone else's pull request
  - Improve test coverage in an area you've learned

- **Understanding the Bigger Picture:**
  - How does this library fit into VS Code's architecture?
  - What other projects depend on this library (Monaco editor, etc.)?
  - How are breaking changes handled?
  - What's the release process?

## Continuous Learning

### Advanced Topics (After Phase 3)
- Performance optimization techniques
- Advanced JSON Schema features ($ref, allOf, anyOf, etc.)
- Complex AST traversal and manipulation
- Integration with other VS Code language features
- Contributing to the Language Server Protocol specification

### Resources
- VS Code source code: https://github.com/microsoft/vscode
- Monaco editor: https://github.com/microsoft/monaco-editor
- JSON Schema validation library: https://github.com/ajv-validator/ajv
- Language Server Protocol implementations

## Getting Help

- **GitHub Issues:** Ask questions or propose changes
- **Pull Requests:** Get feedback on your contributions
- **Documentation:** Refer to inline comments and TypeScript types
- **Related Projects:** Study VS Code's json-language-features extension

---

Remember: Start small, ask questions, and focus on understanding one component at a time. Every expert was once a beginner, and hands-on practice is the best way to learn!
