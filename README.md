<img src="https://raw.githubusercontent.com/subvincdebian/subvincdebian/main/assets/repo-cross-platform-labs.svg" alt="cross-platform-labs project overview" width="100%" />

# CyberClub · Cross-Platform Labs

Coursework exploring the same esports club booking domain across a browser interface, REST and GraphQL APIs, a React SPA, and an Expo mobile app. Each lab is a separate learning project.

## Labs and source map

| Lab | Implementation | Stack and storage |
| --- | --- | --- |
| [1 — Browser app](lab-1/) | Responsive booking interface and session history | HTML, CSS, JavaScript, localStorage |
| [2 — REST API](lab-2/) | Booking CRUD, DTO validation, request logging | NestJS, TypeScript, MongoDB, Mongoose |
| [3 — GraphQL API](lab-3/) | Registration, login, booking queries and mutations | NestJS, Apollo Server, JWT, bcryptjs; in-memory data |
| [4 — React SPA](lab-4/) | Booking form, pricing, status changes, search, filters | React 19, Vite 6, Tailwind CSS 4, TypeScript, localStorage |
| [5 — Mobile app](lab-5/) | Booking form, list, status changes, search, filters | React Native, Expo, TypeScript; in-memory state |

The React and mobile clients organize code into `app`, `pages`, `widgets`, `features`, `entities`, and `shared` layers. [Design documentation](docs/tspp/lab3-design/) contains architecture diagrams, an ER diagram, a wireframe, and a mockup for the broader project concept.

## Run locally

Use Node.js and npm for labs 2–5; the locked React Native dependency accepts Node.js 24.3+ within the 24.x line. Install dependencies separately for each lab you want to run. There is no root npm workspace.

| Lab | Install from repository root | Start from repository root | Local entry point |
| --- | --- | --- | --- |
| 1 | No dependencies | Open `lab-1/index.html` in a browser | Local HTML file |
| 2 | `npm --prefix lab-2 ci` | `npm --prefix lab-2 run start:dev` | `http://localhost:3000/api/bookings` |
| 3 | `npm --prefix lab-3 ci` | `npm --prefix lab-3 run dev` | `http://localhost:4001/` — Apollo Sandbox |
| 4 | `npm --prefix lab-4 ci` | `npm --prefix lab-4 run dev` | `http://localhost:5173/` |
| 5 | `npm --prefix lab-5 ci` | `npm --prefix lab-5 start` | Expo development server |

Before starting **lab 2**, provide a running MongoDB instance. Create `lab-2/.env`:

```dotenv
MONGO_URI=mongodb://localhost:27017/cyberclub
PORT=3000
```

A MongoDB Atlas connection string can be used instead. Lab 3 needs no database configuration. For lab 5, use a compatible Expo Go client or an emulator; the iOS simulator requires macOS and Xcode. The package also provides `npm --prefix lab-5 run android`, `npm --prefix lab-5 run ios`, and `npm --prefix lab-5 run web` entry points.

## Checks

Run these commands from the repository root after installing the corresponding lab:

```sh
npm --prefix lab-2 run build
npm --prefix lab-3 run build
npm --prefix lab-4 run build
```

Lab 5 has no build, lint, or test script. To check its TypeScript configuration with the installed compiler:

```sh
cd lab-5
npx tsc --noEmit
```

No lab currently exposes an automated test or lint script. Use [REST requests](lab-2/requests.http), [GraphQL operations](lab-3/test-queries.gql), and the lab-specific [browser](lab-1/README.md), [SPA](lab-4/README.md), and [mobile](lab-5/README.md) scenario checklists for manual verification: invalid input, create, filter, toggle status, delete, and empty states. Browser persistence applies to labs 1 and 4.

## Scope and coursework

These labs are independent demonstrations; the SPA and mobile app are not connected to the API labs. GraphQL users and bookings reset on server restart, and mobile bookings reset when the app restarts. Lab 3 uses a demonstration JWT signing key in source and does not enforce booking ownership on deletion. It needs further security work before use with real accounts or data.

The design documents describe a broader target architecture, including PostgreSQL, payments, and additional modules. Those diagrams are design work rather than a list of implemented features. Existing lab READMEs retain the original Ukrainian coursework instructions; where version or platform notes differ, the checked-in package manifests and source describe the current implementation. No repository-level license is included.

<details>
<summary>Academic context and planned labs</summary>

- **Course:** Cross-Platform Programming, academic year 2026/2027.
- **Programme:** Web Development Technologies and Web Design.
- **Speciality:** F6 — Information Systems and Technologies.
- **Institution:** Faculty of Information Technology, Taras Shevchenko National University of Kyiv.
- **Student:** Аг Міхал, second year, group ВЕБ-21.
- **Instructor:** Фендьо Олена Миколаївна, associate professor, PhD.
- **Semester theme:** An application for an esports club (CyberClub).

The original semester plan also includes Electron (lab 6), Tauri (lab 7), shared code and architecture (lab 8), continuous integration (lab 9), and continuous delivery (lab 10). These directories are not present yet. Tournament registration, player balances, and the wider club ecosystem remain project goals.

</details>
