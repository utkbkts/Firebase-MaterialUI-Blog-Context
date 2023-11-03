import React, { useEffect, useState } from "react";
import MyContext from "./Context";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../firebase/config";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
  where,
  getDocs,
  limit,
  orderBy,
  startAfter,
  Timestamp,
  getDoc,
  endAt,
  endBefore,
  limitToLast,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useLocation, useParams } from "react-router-dom";
import { isEmpty, isNull } from "lodash";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const State = (props) => {
  const [mode, setMode] = useState("light");
  const [loading, setloading] = useState(false);
  const [User, setUser] = useState(null);
  const [totalBlogs, setTotalBlogs] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        setUser(authuser);
      } else {
        setUser(null);
      }
    });
  }, []);
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(51, 54, 61)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  //!SIGN IN

  const login = async (FirstName, Email, Password) => {
    const UserResponse = await signInWithEmailAndPassword(
      auth,
      Email,
      Password
    );

    if (UserResponse.user) {
      localStorage.setItem("user", JSON.stringify(UserResponse.user));
    }

    return UserResponse.user;
  };

  //! SIGN UP
  const Register = async (
    Email,
    Password,
    FirstName,
    LastName,
    selectedFile
  ) => {
    try {
      const userResponse = await createUserWithEmailAndPassword(
        auth,
        Email,
        Password
      );
      if (userResponse.user) {
        const userRef = collection(db, "users");
        const userDoc = await addDoc(userRef, {
          displayName: FirstName,
          lastname: LastName,
          email: Email,
          password: Password,
          time: serverTimestamp(),
          uid: userResponse.user.uid,
          photoURL: "",
        });
        const stogaRef = ref(
          storage,
          `user-profiles/${userResponse.user.uid}/${selectedFile}`
        );
        await uploadBytesResumable(stogaRef, selectedFile);
        const downloadURL = await getDownloadURL(stogaRef);
        await updateDoc(userDoc, {
          photoURL: downloadURL,
        });
        await updateProfile(userResponse.user, {
          displayName: FirstName,
          photoURL: downloadURL,
        });
        localStorage.setItem("user", JSON.stringify(userResponse.user));
      }

      return userResponse.user;
    } catch (error) {
      console.error(error);
    }
  };
  //!SignupGetData
  const [userData, setuserData] = useState([]);

  const getuserData = async () => {
    setloading(true);
    try {
      const q = query(collection(db, "users"));
      const data = onSnapshot(q, (snapshot) => {
        let productArray = [];

        snapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setuserData(productArray);
        setloading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getuserData();
  }, []);

  //!AddEditBlog
  const initialState = {
    title: "",
    tags: [],
    trending: "no",
    category: "",
    description: "",
    comments: [],
    likes: [],
    imageURL: "",
  };
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);

  const [progress, setProgress] = useState(null);
  const uploadFile = () => {
    const storageRef = ref(storage, "Blog/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setForm((prev) => ({ ...prev, imageURL: downloadUrl }));
        });
      }
    );
  };

  useEffect(() => {
    file && uploadFile();
  }, [file]);

  const handleDelete = (i) => {
    const newTags = [...form.tags];
    newTags.splice(i, 1);
    setForm({ ...form, tags: newTags });
  };

  const handleAddition = (tag) => {
    const newTags = [...form.tags, tag];
    setForm({ ...form, tags: newTags });
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...form.tags];
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setForm({ ...form, tags: newTags });
  };
  //!HomeGEtBlog

  const [Getblog, setGetBlog] = useState([]);
  const [Tags, setTags] = useState([]);
  const GetData = async () => {
    const unsub = onSnapshot(
      collection(db, "Blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        // setGetBlog(list);
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setTotalBlogs(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  };
  useEffect(() => {
    GetData();
  }, []);

  //!homeBlogDelete
  const handleDeleteBlog = async (id) => {
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        setloading(true);
        await deleteDoc(doc(db, "Blogs", id));
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //!GetTrendingBlog
  const [Trending, setTrending] = useState([]);
  const GetTrendingBlog = async () => {
    const BlogRef = collection(db, "Blogs");
    const TrendQuery = query(BlogRef, where("trending", "==", "yes"));
    const querysnapShot = await getDocs(TrendQuery);
    let trendBlog = [];

    querysnapShot.forEach((doc) => {
      trendBlog.push({ id: doc.id, ...doc.data() });
    });
    setTrending(trendBlog);
  };
  useEffect(() => {
    GetTrendingBlog();
    return () => {
      GetTrendingBlog();
    };
  }, []);

  //!Search
  const queryString = useQuery();
  const [search, setSearch] = useState("");
  const searchQuery = queryString.get("searchQuery");
  const searchBlogs = async () => {
    const blogRef = collection(db, "Blogs");
    const searchQueryLower = searchQuery.toLowerCase();
    //! Başlık (title) araması
    const searchTitleQuery = query(blogRef, where("title", "==", searchQuery));
    const titleSnapshot = await getDocs(searchTitleQuery);
    let searchTitleBlogs = [];
    titleSnapshot.forEach((doc) => {
      searchTitleBlogs.push({ id: doc.id, ...doc.data() });
    });
    //! Etiket (tags) araması
    const searchTagQuery = query(
      blogRef,
      where("tags", "array-contains", searchQuery)
    );
    const tagSnapshot = await getDocs(searchTagQuery);
    let searchTagBlogs = [];
    tagSnapshot.forEach((doc) => {
      searchTagBlogs.push({ id: doc.id, ...doc.data() });
    });
    const combinedSearchBlogs = searchTitleBlogs.concat(searchTagBlogs);
    setGetBlog(combinedSearchBlogs);
    setEmptyIs(true);
  };

  useEffect(() => {
    if (!isNull(searchQuery)) {
      searchBlogs();
    }
  }, [searchQuery]);

  const handleChange = (e) => {
    const { value } = e.target;
    if (isEmpty(value)) {
      GetData();
      setEmptyIs(false);
    }
    setSearch(value);
  };

  //!Lazy Loading
  const [lastVisible, setlastVisible] = useState(null);
  const [EmptyIs, setEmptyIs] = useState(false);
  const getBlogs = async () => {
    const blogRef = collection(db, "Blogs");
    const firstFour = query(blogRef, orderBy("title"), limit(4));
    const docSnapShot = await getDocs(firstFour);
    setGetBlog(docSnapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setlastVisible(docSnapShot.docs[docSnapShot.docs.length - 1]);
  };
  const updateState = (docsnapShot) => {
    const CollectionEmpty = docsnapShot.size === 0;
    if (!CollectionEmpty) {
      const blogData = docsnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGetBlog((blogs) => [...blogs, ...blogData]);
      setlastVisible(docsnapShot.docs[docsnapShot.docs.length - 1]);
    } else {
      console.log("no more blog to display");
      setEmptyIs(true);
    }
  };
  const fetchMore = async () => {
    setloading(true);
    const blogRef = collection(db, "Blogs");
    const nextFour = query(
      blogRef,
      orderBy("title"),
      limit(4),
      startAfter(lastVisible)
    );
    const docsnapShot = await getDocs(nextFour);
    setloading(false);
    updateState(docsnapShot);
  };

  useEffect(() => {
    getBlogs();
    setEmptyIs(false);
  }, []);

  //!category count aynı kategoriden kaç tane var
  const counts = totalBlogs.reduce((prevValue, currentValue) => {
    let name = currentValue.category;
    if (!prevValue.hasOwnProperty(name)) {
      prevValue[name] = 0;
    }
    prevValue[name]++;
    return prevValue;
  }, {});

  const categoryCount = Object.keys(counts).map((k) => {
    return {
      category: k,
      count: counts[k],
    };
  });
  //!commnet
  const [blog, setBlog] = useState(null);
  const [tagsuniq, setTagsuniq] = useState([]);
  const [comments, setComments] = useState([]);
  const [localId, setLocalId] = useState("");
  let [likes, setLikes] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const userId = User?.uid;
  const handleComment = async (e) => {
    e.preventDefault();
    if (userComment === "") {
      return window.confirm("boş bırakılamaz");
    }
    comments.push({
      createdAt: Timestamp.fromDate(new Date()),
      userId,
      name: User?.displayName,
      body: userComment,
      imageURL: User?.photoURL,
    });
    console.log("başarılı");
    await updateDoc(doc(db, "Blogs", localId), {
      ...blog,
      comments,
      timestamp: serverTimestamp(),
    });
    setComments(comments);
    setUserComment("");
  };

  //!blog detay
  const getBlogDetail = async () => {
    setloading(true);
    const blogRef = collection(db, "Blogs");
    const docRef = doc(db, "Blogs", localId);
    const blogDetail = await getDoc(docRef);
    const blogs = await getDocs(blogRef);
    let tags = [];
    blogs.docs.map((doc) => tags.push(...doc.get("tags")));
    let uniqueTags = [...new Set(tags)];
    setTagsuniq(uniqueTags);
    setBlog(blogDetail.data());
    const relatedBlogsQuery = query(
      blogRef,
      where("tags", "array-contains-any", blogDetail.data().tags, limit(3))
    );
    setComments(blogDetail.data().comments ? blogDetail.data().comments : []);
    setLikes(blogDetail.data().likes ? blogDetail.data().likes : []);
    const relatedBlogSnapshot = await getDocs(relatedBlogsQuery);
    const relatedBlogs = [];
    relatedBlogSnapshot.forEach((doc) => {
      relatedBlogs.push({ id: doc.id, ...doc.data() });
    });
    setRelatedBlogs(relatedBlogs);
    setloading(false);
  };

  //! handleLike

  const handleLike = async () => {
    if (userId) {
      if (blog?.likes) {
        const index = likes.findIndex((id) => id === userId);
        if (index === -1) {
          likes.push(userId);
          setLikes([...new Set(likes)]);
        } else {
          likes = likes.filter((id) => id !== userId);
          setLikes(likes);
        }
      }
      await updateDoc(doc(db, "Blogs", localId), {
        ...blog,
        likes,
        timestamp: serverTimestamp(),
      });
    }
  };
  //! pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [paginationBlog, setPaginationblog] = useState([]);
  const [count, setcount] = useState(null);
  const [NoofPages, setNoofPages] = useState(null);
  const [Lastvisiblepagination, setLastvisiblepagination] = useState(null);
  const panigationblog = async () => {
    const blogref = collection(db, "Blogs");
    const first = query(blogref, orderBy("title"), limit(3));
    const docsnapShot = await getDocs(first);
    setPaginationblog(
      docsnapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setcount(docsnapShot.size);
    if (docsnapShot.docs.length > 0) {
      setLastvisiblepagination(docsnapShot.docs[docsnapShot.docs.length - 1]);
    } else {
      setLastvisiblepagination(null);
    }
  };
  const getTotalBlog = async () => {
    const blogref = collection(db, "Blogs");
    const docsnapShot = await getDocs(blogref);
    const totalblog = docsnapShot.size;
    const totalPages = Math.ceil(totalblog / 3);
    setNoofPages(totalPages);
  };
  const fetchMorePagination = async () => {
    if (Lastvisiblepagination) {
      const blogref = collection(db, "Blogs");
      const nextblogQuery = query(
        blogref,
        orderBy("title"),
        startAfter(Lastvisiblepagination),
        limit(4)
      );
      const nextblogsnap = await getDocs(nextblogQuery);
  
      // Yeni sayfada yeni veriler yüklendiğinde paginationBlog sıfırlanır.
      setPaginationblog(
        nextblogsnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setcount(nextblogsnap.size);
  
      if (nextblogsnap.docs.length > 0) {
        setLastvisiblepagination(nextblogsnap.docs[nextblogsnap.docs.length - 1]);
      } else {
        setLastvisiblepagination(null);
      }
    }
  };
  
  const fetchPrev = async () => {
    if (Lastvisiblepagination) {
      const blogref = collection(db, "Blogs");
      const end =
        NoofPages !== currentPage
          ? endAt(Lastvisiblepagination)
          : endBefore(Lastvisiblepagination);
      const limitData =
        NoofPages !== currentPage
          ? limit(3)
          : count <= 3 && NoofPages % 2 === 0
          ? limit(3)
          : limitToLast(3);
      const prevquery = query(blogref, orderBy("title"), end, limitData);
      const prevblogsnap = await getDocs(prevquery);
  
      // Yeni sayfada yeni veriler yüklendiğinde paginationBlog sıfırlanır.
      setPaginationblog(
        prevblogsnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setcount(prevblogsnap.size);
  
      if (prevblogsnap.docs.length > 0) {
        setLastvisiblepagination(prevblogsnap.docs[prevblogsnap.docs.length - 1]);
      } else {
        setLastvisiblepagination(null);
      }
    }
  };
  useEffect(() => {
    panigationblog();
    getTotalBlog();
  }, []);
  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setloading,
        Register,
        userData,
        User,
        login,
        handleAddition,
        handleDrag,
        handleDelete,
        uploadFile,
        form,
        setForm,
        setFile,
        progress,
        Getblog,
        handleDeleteBlog,
        Tags,
        Trending,
        handleChange,
        search,
        fetchMore,
        EmptyIs,
        categoryCount,
        setTagsuniq,
        setComments,
        setRelatedBlogs,
        relatedBlogs,
        setUserComment,
        comments,
        handleComment,
        userId,
        userComment,
        setBlog,
        blog,
        getBlogDetail,
        handleLike,
        likes,
        setLikes,
        localId,
        setLocalId,
        paginationBlog,
        currentPage,
        NoofPages,
        setcurrentPage,
        fetchMorePagination,
        fetchPrev,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default State;
