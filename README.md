# Tasks timer (productivity tool)

## Resume

The goal of this project is to learn and practice frontend development skills by building a Pomodoro Timer, a productivity tool based on the Pomodoro Technique.
The Pomodoro Technique is a time management method that uses a timer to break work into intervals (typically 25 minutes) separated by short breaks.

## Technologies & Functionalities

This project is made with **VueJS**, **Tailwind CSS** and **Vite**.
For the state management for the timer, session tracking and task analytics it use **Pinia** and **Local Storage**.

Available functionalities are:

- User can start, stop and resume a pomodoro timer (timer reset and customization options).
- User can configure the default interval configuration; default work session is 25 minutes, short break is 5 minutes and longer break after 4 work sessions is 15 minutes.
- Application display the current session type (Work, Short Break, Long Break)
- Application display a tasks list with completion tracking (Waiting, In progress, Completed) and a completed tasks list to keep a track on the tasks
- Application play a sound and visually notify the user when a session ends
- Application is accessible and visually appealing on both desktop and mobile devices.

The project is modular and use reusable code structure with user-friendly UI and respect proper accessibility standards (e.g., keyboard navigation, ARIA labels).
