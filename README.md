# Rules App

The Rules App is a dynamic web application built using React.js and Redux to manage rulesets. Each ruleset contains multiple configurable rules. Users can view, edit, copy, and create rulesets, as well as manage individual rules within a ruleset.

This project has been bootstrapped with:

- Typescript
- React
- Vite
- Redux Toolkit
- React Router
- Tailwind
- Husky
- Stylelint
- Babel
- ESLint
- Prettier
- assuming `uat` branch represents staging environment, should be set as default branch
- assuming `master` branch represents production environment
- assuming app is built into `dist` folder

## Getting Started

Fork the project and run `npm install`.

### Project Layout

```
├── dist                        # output from compilation
├── husky                       # pre-commit checks
├── config                      # public files
├── public                      # public files
├── src                         # application code
│   ├── index.html              # html file
│   ├── assets                  # static files
│   ├── components              # component files
│   └── pages                   # page files
│   └── hooks                   # general purpose hooks
│   └── mock                    # mock apis and data
│   └── store                   # application state management
│   └── routes                  # routes and urls
│   └── lib                     # utility functions and reusable modules
│   └── utils                   # general reusabale code
│   └── App.tsx                 # includes routes, providers, etc.
│   └── main.tsx                # vite entry point
└── tests                       # tests utility and setup
└── .babelrc                    # compiler config
└── .eslintrc.json              # code quality config
└── .prettierrc                 # logic formatting config
└── .stylelint                  # style formatting config
└── jest.config.ts              # testing config
└── tsconfig.json               # typescript config file
└── vite.config.ts              # vite configuration
└── vitest.config.ts            # vitest configuration

```

### Development

To start the project in `development` mode, run `npm run dev`.

The project runs on port `3000` by default, but this can be changed in `./vite.config.ts`.

### Building

To build the project in `prodction` mode `npm run build`.

### Commit with Husky

Husky is used to enforce pre-commit hooks to ensure code quality before commits. Follow these steps to commit:

- Make your changes to the codebase.
- Stage the changes with git add ..
- Run git commit -m "Your commit message".
- Husky will trigger and run lint-staged to check for formatting issues and linting errors.
- If all checks pass, the commit will be completed.
- If any checks fail, Husky will prevent the commit and show you the issues to fix.

### IDE Configuration

The suggested IDE for this project is VSCode.

Install these extension for code-completion and linting in the IDE:

- **ESLint** (by Microsoft) to enforce **Code Quality Rules**
- **Prettier** (by Prettier) to enforce **JS/TS Formatting Rules**
- **Tailwind CSS IntelliSense** (by Tailwind) for **CSS tooling**
