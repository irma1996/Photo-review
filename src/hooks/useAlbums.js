import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const useAlbums = () => {
  const { currentUser } = useAuth();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = db
      .collection("albums")
      .where("owner", "==", currentUser.uid)
      .orderBy("title")
      .onSnapshot(snapshot => {
        setLoading(true);
        const dbAlbums = [];
        snapshot.forEach(doc => {
          dbAlbums.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setAlbums(dbAlbums);
        setLoading(false);
      });
    return unsub;
  }, [currentUser]);
  return { albums, loading };
};

export default useAlbums;
