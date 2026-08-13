# DisaEdu

DisaEdu adalah MVP platform belajar inklusif sesuai PRD: register, profil anak, dashboard, kursus, materi, kuis, progress, DisaAI, dan DisaTalk.

## Struktur

- `frontend`: Next.js + TypeScript + Tailwind CSS.
- `backend`: Express.js + TypeScript + Prisma.
- AI berjalan lewat abstraksi provider. Default `AI_PROVIDER=mock`, jadi aplikasi tetap demo-ready tanpa API key.

## Setup Lokal

```bash
cd disaedu
npm install
npm --prefix backend install
npm --prefix frontend install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
npm --prefix backend run prisma:push
npm run seed
npm run dev
```

Frontend: `http://localhost:3000`
Backend: `http://localhost:5000`

Untuk demo lokal, autentikasi memakai token sesi sederhana dari backend. `DATABASE_URL` default di `.env.example` memakai SQLite agar bisa langsung berjalan; ganti ke PostgreSQL/Supabase untuk deployment.

