# AI-Assisted Workflow Drill

This repository was created for the **FlyRank Frontend AI Engineering – FE-03** assignment. The project demonstrates how the quality of AI prompts affects the quality of generated frontend code by implementing the same feature using two different prompting approaches.

---

## Project Goal

The objective of this assignment is to compare:

* **Round 1:** A vague AI prompt with minimal instructions.
* **Round 2:** A structured AI prompt with clear requirements, constraints, validation rules, accessibility expectations, and verification steps.

The comparison is documented in `WORKFLOW.md`.

---

## Feature Implemented

**Profile Settings Form**

The form includes fields such as:

* Full Name
* Email
* Phone Number
* Password

The second implementation includes client-side validation, accessibility improvements, and responsive styling.

---

## Repository Structure

```text
ai-workflow-drill/
│
├── README.md
├── LICENSE
├── .gitignore
├── CLAUDE.md
├── WORKFLOW.md
├── index.html
├── style.css
└── script.js
```

---

## Branches

This repository contains two implementation branches:

* **round-1** → implementation generated from a vague prompt
* **round-2** → implementation generated from a detailed prompt

Use GitHub's compare feature to view the differences between the two branches.

---

## Setup

Clone the repository:

```bash
git clone https://github.com/yourusername/ai-workflow-drill.git
cd ai-workflow-drill
```

Open the project in VS Code:

```bash
code .
```

---

## Run the Project

No build tools are required.

Open `index.html` directly in a browser, or use the VS Code **Live Server** extension for a better development experience.

---

## AI-Assisted Workflow

This project was developed using an AI-assisted workflow:

1. Generate an initial implementation using a prompt.
2. Review the generated code manually.
3. Improve the prompt with specific requirements.
4. Generate a refined implementation.
5. Verify functionality, validation, accessibility, and usability.
6. Commit changes using **Conventional Commits**.

Project-specific AI rules are documented in `CLAUDE.md`.

---

## Key Learnings

* Detailed prompts produce significantly better code.
* Validation and accessibility should be specified explicitly.
* AI-generated code must always be reviewed and tested.
* Comparing branches provides concrete evidence of prompt quality differences.

---

## Documentation

The detailed comparison between the two workflows is available in **WORKFLOW.md**.

---

## License

This project is licensed under the **MIT License**.
