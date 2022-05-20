interface contextType {
    user: String;
  }
  const contextType: contextType = {
    user: "pushname",
  };
  const responseObject = [
    {
      text: `Hallo *${contextType.user}*, Selamat datang di AI-Ssisten\NKami disini membantu anda dalam permasalahan barang/eletronika anda
      `,
  
      intent: "bantuan",
    },
    {
      text: `
Untuk melakukkan cara penggunaan\Nbarang bisa ketik Namabarnag#kodebarang
      `,
      intent: "bantuan_barang",
    },
    { 
      text: `Untuk menghubungi layanan servis kami\NBisa anda hubungi ke nomor wa.me/6285155139920
      `,
      intent: "manusia",
    }
  ];
  
  export default responseObject;
  