# GitHub Copilot Instructions for vscode-json-languageservice

This repository contains the JSON language service used by Visual Studio Code and Monaco editor. When contributing to this project, please follow these guidelines.

## Project Overview

This is a TypeScript-based language service that provides:
- JSON validation, completion, hover, and formatting
- Schema-based validation and IntelliSense
- Document symbols, colors, folding ranges, and selection ranges
- Integration with VS Code Language Server Protocol

## Coding Standards

### TypeScript Style
- Use TypeScript strict mode features
- Follow PascalCase for type names (enforced by ESLint)
- Use semicolons consistently
- Use curly braces for all control structures
- Prefer `===` and `!==` over `==` and `!=`
- Avoid throwing literal values; use Error objects

### File Organization
- Main service interfaces are in `src/jsonLanguageService.ts` and `src/jsonLanguageTypes.ts`
- Service implementations are in `src/services/`
- Parser logic is in `src/parser/`
- Tests are located in `src/test/` and follow the pattern `*.test.ts`
- Utilities are in `src/utils/`

### Copyright and Licensing
- All source files must include the Microsoft copyright header:
```typescript
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
```

## Testing

### Test Framework
- Use Mocha with TDD-style tests (`suite` and `test`)
- Test files should mirror the structure of source files
- Use descriptive test names that explain the scenario being tested

### Writing Tests
- Import `assert` from Node.js for assertions
- Create helper functions for common test patterns (see existing test files)
- Test both positive and negative cases
- Include edge cases and boundary conditions

### Running Tests
```bash
npm test          # Compile and run tests with linting
npm run compile   # Compile TypeScript
npm run lint      # Run ESLint
```

## Dependencies

### Core Dependencies
- `jsonc-parser`: JSON parsing with comments support
- `vscode-languageserver-types`: Language Server Protocol types
- `vscode-languageserver-textdocument`: Text document utilities
- `vscode-uri`: URI handling
- `@vscode/l10n`: Localization support

### When Adding Dependencies
- Prefer well-maintained packages from the VS Code ecosystem
- Avoid adding unnecessary dependencies
- Update package-lock.json by running `npm install`

## API Design

### Public API
- The main API is exported from `src/jsonLanguageService.ts`
- All public types are in `src/jsonLanguageTypes.ts`
- Use `PromiseLike<T>` for async operations (compatible with Thenable)
- Follow Language Server Protocol conventions for parameter and return types

### Backward Compatibility
- This is a library used by VS Code and other projects
- Avoid breaking changes to public APIs
- Deprecate APIs before removing them
- Document breaking changes in CHANGELOG.md

## Common Patterns

### Document Handling
- Use `TextDocument` from vscode-languageserver-textdocument
- Create `JSONDocument` using `parseJSONDocument()`
- Navigate AST with `getNodeFromOffset()`

### Schema Validation
- Schema resolution is handled by `JSONSchemaService`
- Support for $ref resolution and schema composition
- Handle both local and remote schema references

### Position and Range
- Use Language Server Protocol types: `Position`, `Range`, `Location`
- Positions are zero-based (line and character)
- Ranges are inclusive of start, exclusive of end

## Build and Release

### Build Process
```bash
npm run clean              # Remove build artifacts
npm run compile            # Compile UMD module
npm run compile-esm        # Compile ES module
npm run prepack            # Full build with tests
```

### Module Formats
- UMD module: `lib/umd/` (main entry point)
- ES module: `lib/esm/` (module entry point)
- Both formats are published to npm

## Debugging

### In VS Code
1. Open the folder in VS Code
2. Set breakpoints in TypeScript source files
3. Run "Run Tests" from the Run viewlet
4. Use "Debug: Attach to Node process" for debugging in a running VS Code instance

### With Language Server
- Link this package in VS Code's json-language-features extension
- Run VS Code from sources
- Attach debugger to the json-language-features process

## Style Preferences

- Prefer explicit types over implicit `any`
- Use arrow functions for callbacks
- Destructure objects and arrays when appropriate
- Use template literals for string concatenation
- Prefer `const` over `let`, avoid `var`
- Use meaningful variable names that describe their purpose
