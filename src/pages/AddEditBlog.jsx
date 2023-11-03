import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextareaAutosize,
} from "@mui/material";
import { useContext, useEffect } from "react";
import "../utils/Addeditblog.scss";
import MyContext from "../context/Context";
import { WithContext as ReactTags } from "react-tag-input";
import { useNavigate, useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const categoryOptions = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
];

const AddEditBlog = () => {
  const context = useContext(MyContext);
  const {id}=useParams()
  const navigate=useNavigate()
  const {
    mode,
    User,
    handleAddition,
    handleDrag,
    handleDelete,
    form,
    setForm,
    setFile,
    progress
  } = context;

const { title, tags, category, trending, description, imageURL } = form;
// Güncelleme durumunda formun ilgili blog verileriyle doldurulması
const getBlogDetailUpdate = async () => {
  const docRef = doc(db, "Blogs", id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists) {
    setForm({ ...snapshot.data() });
  }
};
useEffect(() => {
  if (id) {
    getBlogDetailUpdate();
  }
}, [id]);
const handleSubmit = async (e) => {
  e.preventDefault();

  if (category && tags && title && description && trending && imageURL) {
    if (!id) {
      setForm("");
      try {
        await addDoc(collection(db, "Blogs"), {
          ...form,
          timestamp: serverTimestamp(),
          author: User.displayName,
          userId: User.uid,
          createdImg:User.photoURL
        });
        console.log("Blog created successfully");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await updateDoc(doc(db, "Blogs", id), {
          ...form,
          timestamp: serverTimestamp(),
          author: User.displayName,
          userId: User.uid,
        });
        console.log("Blog updated successfully");
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    return console.log("All fields are mandatory to fill");
  }

  navigate("/");
};
  return (
    <div className="Edit">
      <div>
        <h3>{id ? "Update Blog":"Create Blog"}</h3>
        <form className="__a" onSubmit={handleSubmit}>
          <FormControl>
            <Input
              type="text"
              name="title"
              placeholder="Title..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </FormControl>
          <div className="Tags">
            <ReactTags
              tags={form.tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              inputFieldPosition="bottom"
              autocomplete
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </div>
          <div className="__b">
            <div>
              <span>Is it trending blog ?</span>
            </div>
            <RadioGroup
              className="__c"
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="yes"
                onChange={(e) => setForm({ ...form, trending: e.target.value })}
                control={<Radio />}
                label="yes"
                checked={form.trending === "yes"}
              />
              <FormControlLabel
                value="no"
                onChange={(e) => setForm({ ...form, trending: e.target.value })}
                control={<Radio />}
                label="no"
                checked={form.trending === "no"}
              />
            </RadioGroup>
          </div>
          <div className="__e">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {categoryOptions.map((item, index) => (
                  <MenuItem key={index} value={item || ""}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="__d">
              <TextareaAutosize
                aria-label="maximum height"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div>
              <FormControl className="file">
                <FormHelperText>Upload File</FormHelperText>
                <input
                  accept=".jpg, .jpeg, .png"
                  className={""}
                  id="contained-button-file"
                  onChange={(e) => setFile(e.target.files[0])}
                  multiple
                  type="file"
                  style={{ display: "none" }}
                />
                <label htmlFor="contained-button-file">
                  {form.imageURL ? (
                    <Avatar
                      src={form.imageURL}
                      style={{ margin: "10px", width: "60px", height: "60px" }}
                    />
                  ) : (
                    <IconButton>
                      <Avatar
                        src=""
                        style={{
                          margin: "10px",
                          width: "60px",
                          height: "60px",
                        }}
                      />
                    </IconButton>
                  )}
                </label>
                <div className={`${progress === 100 ? "none" : ""}`}>
                  {progress}
                </div>
              </FormControl>
            </div>
          </div>
          <div>
            <Button disabled={!User} type="submit" fullWidth variant="contained">
              {id ? "Update":"Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditBlog;
