# Infallible Academy — Local Website Starter

A responsive static website starter built with plain HTML, CSS and JavaScript.

## Run locally

1. Extract this ZIP.
2. Open the `infallible-academy-starter` folder in VS Code.
3. Install the **Live Server** extension (if it is not already installed).
4. Right-click `index.html` and choose **Open with Live Server**.
5. Your site will open at an address similar to `http://127.0.0.1:5500`.

You can also open `index.html` directly in a browser, but Live Server is recommended while editing.

## Files

- `index.html` — page content and sections
- `styles.css` — responsive layout, colors and styling
- `script.js` — mobile navigation and current year

## Before publishing

- Replace the sample contact email if needed.
- Add your real course details, project links, event dates and social links.
- Add your own logo and project photographs.
- Test all links and the mobile layout.
- This is a front-end starter: student accounts, admin login, course enrolment, payments and database features are not connected yet.

## Deployment plan

When the site is ready, push these files to a GitHub repository and connect that repository to Netlify. Then add `infallibleacademy.in` in Netlify's domain settings and follow the DNS records Netlify provides. Do not change DNS records until the hosting project is ready.


## Logo and images

- The supplied academy logo is stored separately at `images/logo.png`.
- Header and footer both load the logo from `images/logo.png`.
- Keep the `images` folder alongside `index.html`, `styles.css` and `script.js` when moving or publishing the website.
- Add future website images inside the same `images` folder and reference them with paths such as `images/project-name.jpg`.
