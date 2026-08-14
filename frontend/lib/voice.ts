export function playSoftFemaleVoice(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID";
  utterance.pitch = 1.3; // Nada sedikit lebih tinggi agar terdengar lembut/feminin
  utterance.rate = 0.95; // Tempo sedikit lebih lambat agar jelas dan menenangkan

  // Ambil daftar suara yang tersedia di browser pengguna
  const voices = window.speechSynthesis.getVoices();
  
  // Cari suara berbahasa Indonesia
  const idVoices = voices.filter(v => v.lang.includes("id"));
  
  // Prioritaskan suara perempuan yang umum ada di Chrome / Edge
  const femaleVoice = idVoices.find(v => 
    v.name.includes("Google") || 
    v.name.includes("Gadis") || 
    v.name.toLowerCase().includes("female")
  );

  if (femaleVoice) {
    utterance.voice = femaleVoice;
  } else if (idVoices.length > 0) {
    // Jika tidak ada yang spesifik perempuan, pakai suara Indonesia pertama yang ada
    utterance.voice = idVoices[0];
  }

  window.speechSynthesis.speak(utterance);
}
