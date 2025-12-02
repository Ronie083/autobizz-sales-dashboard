# AutoBizz Sales Dashboard – Junior Frontend Engineer Assessment

This project was completed as part of a Junior Frontend Engineer assessment. The goal was to build a simple one-page sales dashboard using data from a backend API.

Live Demo: [https://autobizz-sales-dashboard-peach.vercel.app/](https://autobizz-sales-dashboard-peach.vercel.app/)


## Assessment Requirements Implemented
1. Date Range Filter: Select start and end dates to reload sales data.
2. Additional Filters: Filter by Minimum Price, Customer Email, and Phone Number.
3. Time-Series Chart: Line chart showing Total Sales over time.
4. Sales Table:
 - Displays 50 items per page.
 - Supports sorting by Date and Price.
 - Pagination using before/after tokens from the API.
5. Deployment: Dashboard deployed on Vercel.
6. Bonus Features Implemented
 - Caching: Using React Query for faster navigation between filters/pages.
 - Responsive Design: Works on desktop, tablet, and mobile screens.

## Tech Stack
1. Frontend: React
2. Charts: Recharts
3. State Management / Caching: React Query
4. Styling: Tailwind CSS
5. Deployment: Vercel

## Getting Started
To run this project locally:
### Clone the repository
git clone https://github.com/your-username/autobizz-sales-dashboard.git
### Go into the project folder
cd autobizz-sales-dashboard
### Install dependencies
npm install
### Start the development server
npm run dev

## Notes
 - The project fetches data from the provided API endpoints (/getAuthorize and /sales).
 - Sorting, filtering, and pagination are all handled using the API.
