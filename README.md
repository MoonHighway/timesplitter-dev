# Timesplitter Course Builder ⏰

`timesplitter-dev` helps presenters build engaging instructor-led content that can be used by `timesplitter` to progress presenter notes and track time.

```
npm install @moonhighway/timesplitter-dev
```

## Running `timesplitter-dev`

`@moonhighway/timesplitter-dev` is a CLI that can be run globally:

```
npm install -g @moonhighway/timesplitter-dev
timesplitter-dev
```

Once installed, you can run the `timesplitter-dev` command from the folder where you want to add a course.

Additionally, you can install the `timesplitter-dev` locally to your repository and run it using an _npm script_:

```json
"scripts": {
    "start": "timesplitter-dev"
},
```

## Running Presenter Notes

`timesplitter` treats your course materials like software. Your materials exist as a package in their own repository, which gives you the benefit of using tools like Git and GitHub to track changes and keep your course up to date. The `timesplitter-dev` package is a web tool to help you build these training packages, while the `timesplitter` is a tool for running the training presenter notes during a live class.

Additionally, the [@moonhighway/create-timesplitter-course](https://www.npmjs.com/package/@moonhighway/create-timesplitter-course) package is a CLI that can be used to create the boilerplate for a `timesplitter` course including both `timesplitter` and `timesplitter-dev` along with all of the necessary configuration to easily run either of these applications.

## Under Construction 🚧

This project is currently under construction. Please send your questions to [info@moonhighway.com](info@moonhighway.com).
