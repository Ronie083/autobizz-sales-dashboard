# Autobizz Sales Dashboard

A responsive one-page sales dashboard built as part of a **Frontend Engineer technical assessment**.  
The application consumes backend APIs to display, filter, sort, and visualize sales data in a clean and performant UI.

🔗 **Live Demo:** https://autobizz-sales-dashboard-peach.vercel.app/

---

## 🚀 Features

### Sales Data & Filters
- Date range filter (start & end date)
- Filter by minimum price
- Filter by customer email
- Filter by customer phone number
- Server-side sorting by **date** and **price**
- Paginated table (50 records per page)
- Pagination handled using API `before` / `after` tokens

### Data Visualization
- Time-series **line chart** showing total sales over time
- Dynamic updates based on active filters

### Performance & UX
- Client-side caching using **React Query** for faster navigation
- Fully responsive layout (desktop, tablet, mobile)
- Clean, minimal UI using Tailwind CSS

---

## 🛠 Tech Stack

- **Frontend:** React.js
- **Charts:** Recharts
- **State Management & Caching:** React Query
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

---

## 📦 Getting Started

To run the project locally:

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/autobizz-sales-dashboard.git
