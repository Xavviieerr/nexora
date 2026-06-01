# Nexora — Visual Query Builder

Nexora is a **schema-driven visual query builder** built with Next.js (App Router) and TypeScript. It allows users to construct complex, deeply nested query logic using a graphical interface instead of writing raw query syntax.

The system supports recursive condition groups, real-time query compilation, validation, execution simulation, and history management.

---

# Core Idea

Users can build queries like:
(age > 18 AND country = "Nigeria")
OR
(status = "active" AND purchases > 10)

without writing code, while the system generates a structured MongoDB-style query in real time.

---

# Live Features

- Recursive query builder (unlimited nesting depth)
- AND / OR logical groups
- Rule-based filtering system
- Schema-driven UI rendering
- Live query preview (MongoDB-style output)
- Query execution simulator (mock dataset filtering)
- Undo / redo history system
- Import / export query JSON
- Saved query presets
- Collapsible nested groups
- Drag-and-drop structure support (infrastructure-ready)
- Dark / light mode
- Real-time validation engine

---

# Architecture Overview

## 1. Data Model (Recursive AST)

The entire system is built on a recursive Abstract Syntax Tree (AST):

Node = RuleNode | GroupNode

- **RuleNode** → single condition (field, operator, value)
- **GroupNode** → logical container (AND / OR) holding child nodes

Each group can contain:

- rules
- other groups (infinite nesting)

This enables fully recursive query structures.

---

## 2. Why AST instead of normalized structure?

The system intentionally uses an AST rather than a normalized relational graph.

### Advantages

- Direct mapping to UI recursion
- Simple rendering model (NodeRenderer recursion)
- Natural fit for query logic trees
- Easier query compilation via tree traversal

### Tradeoffs

- Requires recursive traversal for updates (update/delete/reorder)
- Harder to perform global indexing or fast lookup without traversal
- Slight performance cost at extremely large depths
- Less optimal for backend relational persistence

### Why this choice was made

The primary goal is **UI-driven query building**, not database normalization.

AST provides:

- simpler mental model
- predictable recursion
- easier component composition

---

## 3. State Management (Zustand)

The application uses Zustand for centralized state.

### Stored state:

- query tree (AST)
- schema definition
- undo history (past)
- redo history (future)

### Mutation model:

All updates go through immutable tree operations:

- updateNode
- addRule
- addGroup
- deleteNode
- reorderChildren

Each mutation creates a new tree state.

---

## 4. Query Compilation Engine

The AST is compiled into MongoDB-style query syntax.

### Rule mapping:

- eq → direct match
- neq → $ne
- gt → $gt
- lt → $lt
- contains → regex
- startsWith → regex prefix
- in → $in
- between → $gte + $lte

### Group mapping:

- AND → $and
- OR → $or

### Example output:

```json
{
  "$and": [
    { "age": { "$gt": 18 } },
    { "status": "active" }
  ]
}

## 5. Validation Engine

Validation runs recursively across the AST.

### It ensures:

- Field exists in schema
- Operator is valid for field type
- Values are not empty
- Groups are not empty
- Node structure is valid

Errors are surfaced in real time in the UI.

---

## 6. Execution Simulator

The system includes a mock execution engine that:

- Applies compiled query to dataset
- Filters matching records
- Returns result set
- Displays result count + table view

This simulates real database query behavior.

---

## 7. UI Architecture (Recursive Rendering)

The UI is fully recursive:

- `NodeRenderer` recursively renders tree
- `GroupNode` wraps children nodes
- `RuleNode` handles field/operator/value editing

This enables infinite nesting without special casing.

---

## 8. Schema-Driven System

All UI controls are dynamically generated from schema definitions.

### Each field defines:

- Name
- Type (string, number, date, enum)
- Allowed operators

### This ensures:

- Correct input types
- Valid operator selection
- Context-aware UI rendering

---

## 9. Performance Strategy

Optimizations include:

- Memoized query preview computation
- Isolated node updates (no full tree rerender)
- Stable keys in recursive rendering
- Minimized state mutation surface area

---

## 10. Tradeoffs

| Decision | Tradeoff |
|----------|----------|
| AST structure | Simplicity vs expensive global updates |
| Recursive UI | Clarity vs potential deep tree cost |
| Centralized Zustand store | Predictability vs scaling complexity |
| In-memory history | Fast UX vs memory growth |

---

## 11. Future Improvements

- SQL / GraphQL output modes
- Advanced operators (regex, null, date range validation)
- Virtualized rendering for large trees
- Backend persistence layer
- Shared query URLs
- Full E2E testing (Playwright)
- Performance benchmarking suite

---

## 12. Tech Stack

- Next.js (App Router)
- TypeScript
- Zustand
- React
- Custom recursive AST engine
- Schema-driven UI system

---

## Summary

Nexora is a production-grade frontend system demonstrating:

- Recursive UI engineering
- AST-based state modeling
- Schema-driven rendering
- Real-time query compilation
- Complex state orchestration
- Scalable frontend architecture design
```
