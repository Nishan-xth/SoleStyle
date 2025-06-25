# ShoeStore - Premium Footwear E-commerce Platform

A comprehensive fullstack e-commerce application built with Next.js 14, TypeScript, PostgreSQL, and modern web technologies.

## Features

### Customer Features
- **Product Browsing**: Advanced filtering, search, and sorting capabilities
- **Product Details**: High-quality image galleries, size/color variants, reviews
- **User Authentication**: Secure registration and login system
- **Shopping Cart**: Real-time cart management with persistent storage
- **Wishlist**: Save favorite products for later
- **Order Management**: Complete checkout process and order tracking
- **User Dashboard**: Profile management, order history, addresses
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Admin Features
- **Product Management**: CRUD operations for products, categories, variants
- **Order Management**: View and update order statuses
- **User Management**: Customer account oversight
- **Analytics Dashboard**: Sales reports and inventory tracking
- **Content Management**: Category and product image management

### Technical Features
- **Modern Stack**: Next.js 14 App Router, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with optimized queries and indexing
- **Authentication**: JWT-based secure authentication system
- **API Design**: RESTful API endpoints with proper error handling
- **Performance**: Image optimization, caching, and lazy loading
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Accessibility**: WCAG compliant with proper ARIA attributes

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL with pg driver
- **Authentication**: JWT with bcryptjs
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd shoe-store
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   \`\`\`env
   DATABASE_URL=postgresql://username:password@localhost:5432/shoestore
   JWT_SECRET=your-super-secret-jwt-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   \`\`\`

4. **Set up the database**
   \`\`\`bash
   # Create database
   createdb shoestore
   
   # Run migrations (execute SQL files in scripts/ folder)
   psql -d shoestore -f scripts/01-create-tables.sql
   psql -d shoestore -f scripts/02-seed-data.sql
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

### Core Tables
- **users**: Customer and admin accounts
- **categories**: Product categories (sneakers, boots, etc.)
- **products**: Main product information
- **product_images**: Product image gallery
- **product_variants**: Size and color combinations
- **product_reviews**: Customer reviews and ratings

### E-commerce Tables
- **cart_items**: Shopping cart persistence
- **wishlist_items**: Customer wishlists
- **addresses**: Customer shipping/billing addresses
- **orders**: Order information and status
- **order_items**: Individual items within orders

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - List products with filtering/pagination
- `GET /api/products/[id]` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/[id]` - Update cart item quantity
- `DELETE /api/cart/[id]` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get order details
- `PUT /api/orders/[id]` - Update order status (admin)

## Project Structure

\`\`\`
shoe-store/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── admin/             # Admin dashboard
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/                # shadcn/ui components
│   └── layout/            # Layout components
├── lib/                   # Utility functions
│   ├── db.ts              # Database connection
│   ├── auth.ts            # Authentication utilities
│   └── types.ts           # TypeScript types
├── scripts/               # Database scripts
│   ├── 01-create-tables.sql
│   └── 02-seed-data.sql
└── public/                # Static assets
\`\`\`

## Default Accounts

### Admin Account
- **Email**: admin@shoestore.com
- **Password**: admin123

### Customer Account
- **Email**: customer@example.com
- **Password**: customer123

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

3. **Set up PostgreSQL**
   - Use Vercel Postgres or external provider (Neon, Supabase)
   - Update DATABASE_URL in environment variables
   - Run database migrations

### Environment Variables for Production
\`\`\`env
DATABASE_URL=your-production-database-url
JWT_SECRET=your-production-jwt-secret
NEXT_PUBLIC_APP_URL=https://your-domain.com
\`\`\`

## Features Roadmap

### Phase 1 (Current)
- ✅ Product catalog and search
- ✅ User authentication
- ✅ Shopping cart functionality
- ✅ Basic order management
- ✅ Admin dashboard

### Phase 2 (Future)
- [ ] Payment integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Inventory alerts
- [ ] Multi-language support
- [ ] Advanced search with filters
- [ ] Product recommendations
- [ ] Social media integration

### Phase 3 (Advanced)
- [ ] Mobile app (React Native)
- [ ] Advanced reporting
- [ ] Multi-vendor support
- [ ] Subscription products
- [ ] Advanced SEO features
- [ ] Performance monitoring

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@shoestore.com or create an issue in the GitHub repository.

## Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide](https://lucide.dev/) - Icons
- [PostgreSQL](https://postgresql.org/) - Database
