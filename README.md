<div align=center>

![views] ![stars] ![forks] ![issues] ![license] ![repo-size]

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./public/nextjs-light.svg">
  <source media="(prefers-color-scheme: light)" srcset="./public/nextjs-dark.svg">
  <img alt="Next.js" src="./public/nextjs-light.svg">
</picture>

# Next.js Starter Template

## A Minimal Next.js Starter Template with _TypeScript_, _Tailwind CSS_, pre-configured with _ESLint_, and _Prettier_

</div>

## Features

- ⚡ **[Next.js](https://nextjs.org/)** - A React Framework for Production
- 🔥 **[App Router](https://nextjs.org/docs/app)** - It is a new paradigm for building applications using React's latest features.
- 🎨 **[Tailwind CSS](https://tailwindcss.com/)** - A Utility-First CSS Framework for Rapid UI Development
- 📦 **[TypeScript](https://www.typescriptlang.org/)** - A typed superset of JavaScript that compiles to plain JavaScript
- 📝 **[ESLint](https://eslint.org/)** - The pluggable linting utility for JavaScript and JSX
- 🛠 **[Prettier](https://prettier.io/)** - An opinionated code formatter

## Getting Started

```bash
bunx create-next-app -e "https://github.com/Khushal-ag/nextjs-template" <project-name>
```

<div align="center">

**OR**

</div>

**Install `degit` globally**

```bash
bun i -g degit || pnpm i -g degit || yarn global add degit || npm i -g degit
```

**Create a new project from this template**

```bash
degit Khushal-ag/nextjs-template <project-name>
cd <project-name>
```

**Install dependencies**

```bash
bun i || pnpm i || yarn || npm i
```

**Initialize a new git repository _(Optional)_:**

```bash
git init
git add .
git commit --no-verify -m "init"
```

## Available Scripts

In the project directory, you can run:

| **Script**   | **Description**                                      |
| ------------ | ---------------------------------------------------- |
| `dev`        | Runs the app in the development mode.                |
| `build`      | Builds the app for production to the `.next` folder. |
| `start`      | Runs the built app in the production mode.           |
| `preview`    | Builds and serves the app in the production mode.    |
| `lint`       | Runs next lint on the project.                       |
| `type-check` | Runs TypeScript type checker.                        |
| `fmt:check`  | Checks if the code is formatted with Prettier.       |
| `fmt`        | Formats the code with Prettier.                      |
| `clean`      | Remove build cache (.next).                          |
| `cleani`     | Remove cache and dependencies and reinstall them.    |

## After Installation Checklist

- [ ] Update `package.json` with your project details.
- [ ] Update `README.md` with your project details.
- [ ] Update `LICENSE` with your name and year.
- [ ] Update `layout.tsx` to your liking.
- [ ] Clear `page.tsx` and write your own.

## Switching Package Manager

This template uses [bun](https://bun.sh/) as the default package manager. If you want to use `npm` or `yarn` or `pnpm`, you need to remove the `bun.lockb` file and run `npm i` or `yarn` or `pnpm i` to generate the lock file for the respective package manager.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributors

<div align=center>

[![][contributors]][contributors-graph]

_Note: It may take up to 24h for the [contrib.rocks][contrib-rocks] plugin to update because it's refreshed once a day._

</div>

<!----------------------------------{ Labels }--------------------------------->

[views]: https://komarev.com/ghpvc/?username=nextjs-template&label=view%20counter&color=red&style=flat
[repo-size]: https://img.shields.io/github/repo-size/Khushal-ag/nextjs-template
[issues]: https://img.shields.io/github/issues-raw/Khushal-ag/nextjs-template
[license]: https://img.shields.io/github/license/Khushal-ag/nextjs-template
[forks]: https://img.shields.io/github/forks/Khushal-ag/nextjs-template?style=flat
[stars]: https://img.shields.io/github/stars/Khushal-ag/nextjs-template
[contributors]: https://contrib.rocks/image?repo=Khushal-ag/nextjs-template&max=500
[contributors-graph]: https://github.com/Khushal-ag/nextjs-template/graphs/contributors
[contrib-rocks]: https://contrib.rocks/preview?repo=Khushal-ag%2Fnextjs-template
