import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from '../../firebase_setup/firebase';
import { documentId } from 'firebase/firestore';

const MAX_QUERY_LENGTH = 10;

export const firebaseQuery = async (ids, path) => {
  let newData = [];
  if (ids && ids.length >= 1) {
    for (let i = 0; i < ids.length; i += MAX_QUERY_LENGTH) {
      const batchIds = ids.slice(i, i + MAX_QUERY_LENGTH);
      const q = query(collection(db, path), where(documentId(), 'in', batchIds));
      const querySnapshot = await getDocs(q);
      const batchData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      newData = newData.concat(batchData);
    }
  }
  newData.sort((a, b) => {
    const aTime = new Timestamp(a.createdAt.seconds, a.createdAt.nanoseconds).toDate();
    const bTime = new Timestamp(b.createdAt.seconds, b.createdAt.nanoseconds).toDate();
    return bTime - aTime;
  }); // Sort by createdAt field
  return newData;
};