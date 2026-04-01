# ✅ TODO — OM Export Web App

---

## 🚀 Phase 1: Project Setup

### 📦 Initialize Project

* [ ] Create Next.js app (`npx create-next-app@latest om-export`)
* [ ] Setup TypeScript (if not already)
* [ ] Install dependencies:

  * [ ] tailwindcss
  * [ ] shadcn/ui
  * [ ] lucide-react
  * [ ] @supabase/supabase-js

---

### 🎨 Configure Styling

* [ ] Setup Tailwind CSS
* [ ] Configure global styles
* [ ] Define theme colors:

  * [ ] Primary: Dark Blue (#0B1F3A)
  * [ ] Accent: Gold (#D4AF37)
* [ ] Setup reusable UI components (Button, Card, Input)

---

### 📁 Folder Structure Setup

* [ ] Create folders:

  * [ ] /app
  * [ ] /components
  * [ ] /lib/supabase
  * [ ] /types
* [ ] Setup layout.tsx (global layout)
* [ ] Setup navbar + footer

---

## 🗄️ Phase 2: Supabase Setup

### 🔌 Project Setup

* [ ] Create Supabase project
* [ ] Get API keys
* [ ] Add environment variables:

  * [ ] NEXT_PUBLIC_SUPABASE_URL
  * [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY

---

### 🧱 Database Schema

#### Categories Table

* [ ] Create `categories` table:

  * id (uuid, primary key)
  * name (text)

#### Products Table

* [ ] Create `products` table:

  * id (uuid)
  * name (text)
  * description (text)
  * category_id (foreign key)
  * image_url (text)
  * MOQ (integer)
  * specifications (json/text)
  * created_at (timestamp)

#### Inquiries Table

* [ ] Create `inquiries` table:

  * id (uuid)
  * name (text)
  * country (text)
  * product_id (foreign key)
  * quantity (integer)
  * message (text)
  * created_at (timestamp)

---

### 🗂 Storage Setup

* [ ] Create storage bucket (`products`)
* [ ] Enable public access for images

---

### 🔐 Security

* [ ] Enable Row Level Security (RLS)
* [ ] Allow public read for products
* [ ] Allow insert for inquiries

---

## 🧩 Phase 3: Core Frontend Pages

---

### 🏠 Homepage

* [ ] Build Hero Section:

  * [ ] Background image (export ship)
  * [ ] Title + tagline
  * [ ] CTA button ("Explore Products")

* [ ] Build Categories Section:

  * [ ] Grid layout
  * [ ] Category cards

* [ ] Build Featured Products Section:

  * [ ] Horizontal scroll cards

* [ ] Build About Section:

  * [ ] Company info
  * [ ] Founder highlights

* [ ] Build Contact CTA section

---

### 📦 Product Listing Page (`/products`)

* [ ] Fetch products from Supabase
* [ ] Display product grid
* [ ] Add search bar
* [ ] Add category filters
* [ ] Build product card component

---

### 📄 Product Detail Page (`/products/[id]`)

* [ ] Fetch single product data

* [ ] Build Hero section:

  * [ ] Large product image
  * [ ] Title overlay

* [ ] Build Product Info section:

  * [ ] Specifications
  * [ ] MOQ
  * [ ] Description

* [ ] Build Image Gallery

* [ ] Build Inquiry Form:

  * [ ] Name
  * [ ] Country
  * [ ] Quantity
  * [ ] Message

* [ ] Connect form to Supabase (insert inquiry)

---

### 📞 Contact Page

* [ ] Display founders:

  * [ ] Jayesh Avaiya
  * [ ] Dipak Nakrani
  * [ ] Kalpesh Sabhani
* [ ] Show phone numbers
* [ ] Show email ([omexport291@gmail.com](mailto:omexport291@gmail.com))

---

## 🔌 Phase 4: Supabase Integration

* [ ] Create Supabase client in `/lib/supabase/client.ts`

* [ ] Write functions:

  * [ ] getProducts()
  * [ ] getCategories()
  * [ ] getProductById()
  * [ ] createInquiry()

* [ ] Connect frontend to backend

---

## 🧑‍💼 Phase 5: Admin Panel (Basic)

### 🔐 Admin Access

* [ ] Setup simple login (Supabase Auth)

---

### 📦 Product Management

* [ ] Create admin dashboard page
* [ ] Add product form:

  * [ ] Upload image
  * [ ] Add details
* [ ] Edit/Delete products

---

### 📩 Inquiry Management

* [ ] View inquiries list
* [ ] Display details (name, country, product, message)

---

## 🧪 Phase 6: Testing

* [ ] Test product listing
* [ ] Test product detail page
* [ ] Test inquiry submission
* [ ] Test responsiveness (mobile + desktop)
* [ ] Fix UI bugs

---

## 🚀 Phase 7: Deployment

### 🌐 Frontend Deployment

* [ ] Push code to GitHub
* [ ] Connect repo to Vercel
* [ ] Deploy project

---

### 🔑 Environment Setup

* [ ] Add environment variables in Vercel

---

### 🔍 Final Checks

* [ ] Check SEO meta tags
* [ ] Test live site
* [ ] Fix broken links

---

## 📈 Phase 8: Future Enhancements

* [ ] Add multi-language support
* [ ] Add WhatsApp integration
* [ ] Add analytics (Google Analytics)
* [ ] Add product search optimization
* [ ] Add chat system

---

## 🎯 Priority Order (IMPORTANT)

1. Setup + Supabase
2. Product Listing
3. Product Detail + Inquiry
4. Homepage UI
5. Admin Panel
6. Deployment

---

## 🧠 Final Note

Focus on:

* Shipping MVP fast
* Getting real inquiries
* Improving based on users

Avoid:

* Over-engineering
* Adding unnecessary features early
