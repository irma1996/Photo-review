import { useEffect } from "react";
import { db, storage } from "../firebase";

const useDeleteImage = image => {
  useEffect(() => {
    if (!image) {
      return;
    }

    (async () => {
      //delete document from firebase
      await db
        .collection("images")
        .doc(image.id)
        .delete();

      //delete picture from storage
      await storage.ref(image.path).delete();
    })();
  }, [image]);

  return {};
};

export default useDeleteImage;
