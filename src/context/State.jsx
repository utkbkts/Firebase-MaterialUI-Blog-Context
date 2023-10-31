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
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";

const State = (props) => {
  const [mode, setMode] = useState("light");
  const [loading, setloading] = useState(false);
  const [User, setUser] = useState(null);

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
          const docTags = doc.get("tags");
          if (Array.isArray(docTags)) {
            tags = [...tags, ...docTags];
          }
          list.push({ id: doc.id, ...doc.data() });
        });
        setGetBlog(list);
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
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
        Trending
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default State;
