const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const courses = [
  {
    title: "Mengenal Emosi",
    description: "Belajar mengenali berbagai perasaan dalam kehidupan sehari-hari.",
    category: "Emosi",
    difficulty: "Mudah",
    lessons: ["Mengenal Senang", "Mengenal Sedih", "Mengenal Marah", "Mengenal Takut", "Mengenal Tenang"]
  },
  {
    title: "Komunikasi Sehari-hari",
    description: "Latihan kata dan kalimat sederhana untuk berbicara dengan orang lain.",
    category: "Komunikasi",
    difficulty: "Mudah",
    lessons: ["Memperkenalkan Diri", "Menyapa Teman", "Meminta Tolong", "Mengucapkan Terima Kasih", "Berpamitan"]
  },
  {
    title: "Kemandirian Sehari-hari",
    description: "Belajar kebiasaan kecil agar anak lebih mandiri di rumah dan sekolah.",
    category: "Kemandirian",
    difficulty: "Sedang",
    lessons: ["Menjaga Kebersihan", "Menyiapkan Barang", "Mengatur Waktu", "Meminta Bantuan", "Menyelesaikan Tugas"]
  }
];

async function main() {
  await prisma.simulationMessage.deleteMany();
  await prisma.simulationSession.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.simulation.deleteMany();

  for (const course of courses) {
    await prisma.course.create({
      data: {
        title: course.title,
        description: course.description,
        category: course.category,
        difficulty: course.difficulty,
        thumbnail: `/images/${course.category.toLowerCase()}.png`,
        lessons: {
          create: course.lessons.map((title, index) => ({
            title,
            description: `Materi sederhana tentang ${title.toLowerCase()}.`,
            content: `${title} membantu kita memahami kegiatan harian. Perhatikan wajah, suara, dan keadaan di sekitar. Pilih kata yang baik dan minta bantuan saat perlu.`,
            visual: "Ilustrasi anak dalam kegiatan sehari-hari.",
            videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
            activityPrompt: `Pilih contoh yang cocok untuk ${title.toLowerCase()}.`,
            activityAnswer: "Jawaban yang menunjukkan sikap baik dan aman.",
            order: index + 1,
            duration: 8,
            quizQuestions: {
              create: [
                {
                  question: `Apa yang sedang kita pelajari di materi ${title}?`,
                  options: [`Tentang ${title}`, "Tentang angka sulit", "Tentang hukuman"],
                  correctAnswer: `Tentang ${title}`,
                  explanation: `Benar. Materi ini membahas ${title.toLowerCase()} dengan contoh sederhana.`
                },
                {
                  question: "Apa yang sebaiknya dilakukan saat belum paham?",
                  options: ["Diam saja", "Meminta bantuan dengan sopan", "Marah-marah"],
                  correctAnswer: "Meminta bantuan dengan sopan",
                  explanation: "Meminta bantuan adalah pilihan yang baik dan aman."
                },
                {
                  question: "Kalimat mana yang terdengar sopan?",
                  options: ["Tolong bantu aku", "Cepat lakukan", "Aku tidak mau bicara"],
                  correctAnswer: "Tolong bantu aku",
                  explanation: "Kata tolong membuat kalimat lebih sopan."
                }
              ]
            }
          }))
        }
      }
    });
  }

  await prisma.simulation.createMany({
    data: [
      {
        title: "Bertemu Teman",
        description: "Latihan menyapa dan memperkenalkan diri.",
        scenario: "Anak bertemu teman baru di sekolah.",
        difficulty: "Mudah",
        systemPrompt: "Berperan sebagai teman baru. Gunakan bahasa Indonesia sederhana dan satu pertanyaan setiap giliran."
      },
      {
        title: "Meminta Bantuan",
        description: "Latihan meminta bantuan dengan sopan.",
        scenario: "Anak butuh bantuan mengambil barang.",
        difficulty: "Mudah",
        systemPrompt: "Berperan sebagai orang dewasa yang membantu. Dorong anak memakai kata tolong."
      },
      {
        title: "Berbicara dengan Guru",
        description: "Latihan bertanya kepada guru di kelas.",
        scenario: "Anak ingin bertanya saat pelajaran.",
        difficulty: "Sedang",
        systemPrompt: "Berperan sebagai guru yang ramah. Tanggapi singkat dan jelas."
      },
      {
        title: "Membeli Sesuatu",
        description: "Latihan percakapan membeli barang sederhana.",
        scenario: "Anak membeli pensil di toko.",
        difficulty: "Sedang",
        systemPrompt: "Berperan sebagai penjaga toko. Gunakan percakapan realistis dan sederhana."
      }
    ]
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

