
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, setDoc, onSnapshot, query, writeBatch } from "firebase/firestore";
import { GalleryItem } from "../types";

const firebaseConfig = {
  apiKey: "AIzaSyDrGjywrdSLOZGfdViPSBGlCPsuzJ6r-NM",
  authDomain: "dronec-db3f5.firebaseapp.com",
  projectId: "dronec-db3f5",
  storageBucket: "dronec-db3f5.firebasestorage.app",
  messagingSenderId: "806653517032",
  appId: "1:806653517032:web:731c9d2fe4d899a31efd5d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const GALLERY_COLLECTION = "gallery";

// Gerçek zamanlı dinleyici
export const subscribeToGallery = (callback: (items: GalleryItem[]) => void) => {
  const q = query(collection(db, GALLERY_COLLECTION));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as GalleryItem));
    callback(items);
  });
};

export const fetchGallery = async (): Promise<GalleryItem[]> => {
  const querySnapshot = await getDocs(collection(db, GALLERY_COLLECTION));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as GalleryItem));
};

export const saveGalleryItem = async (item: Omit<GalleryItem, "id">) => {
  return await addDoc(collection(db, GALLERY_COLLECTION), item);
};

export const removeGalleryItem = async (id: string) => {
  return await deleteDoc(doc(db, GALLERY_COLLECTION, id));
};

// Toplu temizle ve kaydet (Admin'deki 'Kaydet' butonu için)
export const updateFullGallery = async (items: GalleryItem[]) => {
  const batch = writeBatch(db);
  
  // Önce mevcutları temizle (Basitlik için tüm koleksiyonu temizleyip yeniden yazıyoruz)
  const currentDocs = await getDocs(collection(db, GALLERY_COLLECTION));
  currentDocs.forEach((d) => batch.delete(d.ref));

  // Yenileri ekle
  items.forEach((item) => {
    const newDocRef = doc(collection(db, GALLERY_COLLECTION));
    const { id, ...data } = item;
    batch.set(newDocRef, data);
  });

  return await batch.commit();
};
