# Property Connect - Direct Property Rentals Platform

## Project Overview

Property Connect is a modern web application that connects property seekers directly with property owners in Bangalore, eliminating the need for brokers and reducing rental costs.

## Features

- **Direct Owner Connection**: Connect directly with property owners without broker interference
- **Verified Properties**: All properties are verified for authenticity
- **No Brokerage Fees**: Save money by avoiding broker commissions
- **Advanced Search**: Filter properties by location, price, amenities, and more
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Communication**: Chat directly with property owners

## How to run this project locally

**Prerequisites**

Make sure you have Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

**Setup Instructions**

Follow these steps:

```sh
# Step 1: Clone the repository
git clone https://github.com/your-username/property-connect.git

# Step 2: Navigate to the project directory
cd property-connect

# Step 3: Install the necessary dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run build:dev` - Build the project in development mode
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Development Workflow

**Local Development**

1. Make your changes in your preferred IDE
2. Test locally using `npm run dev`
3. Run linting with `npm run lint`
4. Commit and push your changes

**Production Deployment**

1. Run `npm run build` to create a production build
2. Test the build with `npm run preview`
3. Deploy the `dist` folder to your hosting platform

## Technology Stack

This project is built with modern web technologies:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **UI Components**: shadcn/ui component library
- **Styling**: Tailwind CSS for responsive design
- **Routing**: React Router for navigation
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Query for server state
- **Icons**: Lucide React icons
- **Charts**: Recharts for data visualization

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── store/              # State management
├── contexts/           # React contexts
└── main.tsx           # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any queries or support, please contact the Property Connect team.
