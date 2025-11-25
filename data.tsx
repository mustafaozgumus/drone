import React from 'react';
import { PartyPopper, Home, Film, Mountain, Building2, Camera } from 'lucide-react';

export const siteData = {
  general: {
    brandName: "DRONE ÇEKİMİ",
    brandNameHighlight: "NEVŞEHİR",
    slogan: "Gökyüzünden Hikayeler",
    description: "Nevşehir ve Kapadokya bölgesi için modern drone fotoğrafçılığı ve videografi hizmetleri.",
    heroTitle: "GÖKYÜZÜNDEN",
    heroHighlight: "HİKAYELER",
    heroSubtitle: "Sinematik drone çekimleriyle markanızın ve anılarınızın sınırlarını zorlayın.",
    heroVideoPoster: "https://picsum.photos/1920/1080?grayscale",
    // Arka plan videosu (Şu an placeholder var, kendi videonuzun linkini buraya koyun)
    heroVideoUrl: "https://youtu.be/jCUgWQqj9qU?si=K2skdLTsIB35OyMd$0" 
  },
  contact: {
    phone: "+90 538 084 1450",
    email: "dronecekimi50@gmail.com",
    address: "Merkez, Nevşehir, Türkiye",
    social: {
      instagram: "https://instagram.com/dronecekiminevsehir",
      facebook: "https://facebook.com",
      youtube: "https://youtube.com"
    },
    // BURAYA FORMSPREE.IO'DAN ALDIĞINIZ LINKI YAPIŞTIRIN
    // Örnek: "https://formspree.io/f/xaybzqrd"
    formEndpoint: "https://formspree.io/f/meowvozb" 
  },
  services: [
    {
      icon: <PartyPopper className="w-6 h-6" />,
      title: "Düğün & Hikaye",
      desc: "Kapadokya'nın masalsı atmosferinde, en özel gününüzü sinematik bir filmle ölümsüzleştirin.",
      colSpan: "md:col-span-2",
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Emlak & Arsa",
      desc: "Gayrimenkul portföyünüzü havadan detaylı görüntülerle daha hızlı pazarlayın.",
      colSpan: "md:col-span-1",
    },
    {
      icon: <Film className="w-6 h-6" />,
      title: "Reklam & Tanıtım",
      desc: "Markanızın prestijini artıracak, yüksek prodüksiyonlu reklam filmleri.",
      colSpan: "md:col-span-1",
    },
    {
      icon: <Mountain className="w-6 h-6" />,
      title: "Turizm & Otel",
      desc: "Turistik bölgeler ve oteller için büyüleyici hava çekimleri.",
      colSpan: "md:col-span-2",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Endüstriyel Denetim",
      desc: "Ulaşılması zor alanlar için endüstriyel denetim ve raporlama.",
      colSpan: "md:col-span-1",
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Prodüksiyon",
      desc: "Belgesel ve klipler için 4K/60fps RAW ve Log çekim desteği.",
      colSpan: "md:col-span-2 lg:col-span-2",
    },
  ],
  gallery: [
    { src: "https://picsum.photos/id/1015/800/1200", title: "Kapadokya Balonlar", height: "h-96" },
    { src: "https://picsum.photos/id/1036/800/600", title: "Peri Bacaları", height: "h-64" },
    { src: "https://picsum.photos/id/16/800/800", title: "Doğa Yürüyüşü", height: "h-80" },
    { src: "https://picsum.photos/id/1040/800/1000", title: "Ürgüp Kalesi", height: "h-[450px]" },
    { src: "https://picsum.photos/id/106/800/600", title: "Gün Batımı", height: "h-64" },
    { src: "https://picsum.photos/id/1018/800/900", title: "Göl Manzarası", height: "h-96" },
  ]
};