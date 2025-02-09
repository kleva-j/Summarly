# Summarly

## Description

Summarly is a web application designed to provide users with a seamless experience for summarizing content. The application offers various features that enhance user interaction and accessibility.

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/summarly.git
   cd summarly
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env.local` file based on the `.env.example` template and configure your environment variables.

## Usage

To start the application, run:

```bash
pnpm dev
```

Visit http://localhost:3000 in your browser to access the application.

## Features

- User Authentication: Users can sign up and sign in to access personalized features.
- UI Components: The application includes various UI components such as buttons, cards, and navigation menus to enhance user experience.
- Responsive Design: The application is designed to be responsive and accessible on various devices.

## Convex Directory

The `convex` directory contains configurations and generated code related to the backend functionality of the application. This includes:

- **auth.config.ts**: Configuration for authentication settings.
- **schema.ts**: Defines the data schema used in the application.
- **_generated/**: Contains generated files that facilitate API interactions and server functionality, including:
  - **api.d.ts**: Type definitions for the API.
  - **api.js**: JavaScript implementation of the API.
  - **dataModel.d.ts**: Type definitions for the data model.
  - **server.d.ts**: Type definitions for the server.
  - **server.js**: JavaScript implementation of the server.

These files ensure type safety and maintainability for the backend services.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to contribute.

## License

This project is licensed under the Apache License - see the LICENSE file for details.
