import {
  collection,
  getDocs,
  DocumentData,
  DocumentReference,
  query,
  orderBy,
} from "firebase/firestore";

export const getSubCollections = async (
  docRef: DocumentReference,
  knownSubCollections: string[]
): Promise<{ [key: string]: DocumentData[] }> => {
  const subCollectionsData: { [key: string]: DocumentData[] } = {};

  if (!Array.isArray(knownSubCollections)) {
    throw new TypeError("KnownSubCollections must be an array");
  }

  for (const subCollectionName of knownSubCollections) {
    const subCollectionRef = collection(docRef, subCollectionName);
    const subCollectionSnapshot = await getDocs(subCollectionRef);
    const subDocuments = await Promise.all(
      subCollectionSnapshot.docs.map(async (subDoc) => {
        const subDocData = subDoc.data();
        subDocData.id = subDoc.id;

        const nestedSubCollections = await getSubCollections(
          subDoc.ref,
          knownSubCollections
        );
        return {
          ...subDocData,
          created_at: subDocData?.created_at?.toDate(),
          ...nestedSubCollections,
        }; 
      })
    );
    if (subDocuments.length > 0) {
      subCollectionsData[subCollectionName] = subDocuments;
    }
  }



  const sortedData = {
    ...subCollectionsData,
    session_list: subCollectionsData?.session_list?.sort((a, b) => {
      if(a.created_at > b.created_at) {
        return -1
      } else {
        return 1
      }
    })
  }

  return sortedData;
};
